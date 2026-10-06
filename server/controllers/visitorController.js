const Visitor = require('../models/visitor');

exports.createVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);
    res.status(201).json(visitor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getVisitors = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search
      ? { $or: [
          { visitorName: { $regex: search, $options: 'i' } },
          { mobile: { $regex: search } },
        ] }
      : {};
    const visitors = await Visitor.find(filter).sort({ createdAt: -1 });
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json(visitor);
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};

exports.updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json(visitor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    res.json({ message: 'Visitor deleted' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID' });
  }
};