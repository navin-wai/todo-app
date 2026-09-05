const {Router} = require("express");

const router = Router();


const Todo = require("../models/todo");

router.use((req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: "Please sign in first" });
    }

    next();
});

router.get("/" , async (req, res)=>{
    try{
        const todos = await Todo.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching todos' });
    }
})


router.post("/", async (req, res)=> {
    const {title, priority} = req.body;
    try{
        if (!title?.trim()) {
        return res.status(400).json({ message: "Title is required" });
  }
    const todo = await Todo.create({
        title: title.trim(),
        priority,
        createdBy: req.user._id
    });

    res.status(201).json(todo);
} catch (error) {
    res.status(500).json({ message: 'Error creating todo' });
}});


router.patch("/:id", async (req, res) => {
    const updates = {};

    if(typeof req.body.title === "string"){
        updates.title = req.body.title.trim();
    }

    if(typeof req.body.completed === "boolean"){
        updates.completed = req.body.completed;
    }

    if(["low", "medium", "high"].includes(req.body.priority)){
        updates.priority = req.body.priority;
    }

    const todo = await Todo.findOneAndUpdate({
        _id: req.params.id,
        createdBy: req.user._id,
    },
    {
        $set: updates
    },
    {new: true, runValidators: true}
);
      if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }

  res.json(todo);
});




router.delete("/:id", async (req, res) => {
    const todo = await Todo.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user._id,
    });

    if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
});


module.exports = router;
