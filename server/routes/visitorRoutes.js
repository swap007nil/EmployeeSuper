const router = require('express').Router();
const c = require('../controllers/visitorController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.use(protect); // everyone must be logged in

// viewers and admins can read
router.get('/', c.getVisitors);
router.get('/:id', c.getVisitor);

// only admins can change data
router.post('/', adminOnly, c.createVisitor);
router.put('/:id', adminOnly, c.updateVisitor);
router.delete('/:id', adminOnly, c.deleteVisitor);

module.exports = router;