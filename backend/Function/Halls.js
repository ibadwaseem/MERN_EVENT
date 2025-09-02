const Hall = require("../Collection/Hall");


exports.createHall = async (req, res) => {
    try {
      const { hall_no, events } = req.body;
  
      // Check if this hall_no already exists for the given event
      const existingHall = await Hall.findOne({ hall_no, events });
  
      if (existingHall) {
        return res.status(400).json({ error: "This hall is already assigned to the event." });
      }
  
      const hall = new Hall(req.body);
      const savedHall = await hall.save();
  
      res.status(201).json(savedHall);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  



exports.getAllHalls = async (req, res) => {
    try {
        const halls = await Hall.find().populate("events", "title").sort({ _id: -1 });
        res.json(halls);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getHallById = async (req, res) => {
    try {
        const hall = await Hall.findById(req.params.id);
        if (!hall) return res.status(404).json({ message: "Hall not found" });
        res.json(hall);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateHall = async (req, res) => {
    try {
        const updatedHall = await Hall.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedHall);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.deleteHall = async (req, res) => {
    try {
        await Hall.findByIdAndDelete(req.params.id);
        res.json({ message: "Hall deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
