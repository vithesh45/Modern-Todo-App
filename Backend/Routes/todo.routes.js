import express, { Router } from 'express';
import Todo from '../modules/todo.modules.js';

const router = express.Router();

//Get All the Todo's
router.get('/', async (req,res) =>{
    try {
        const todos = await Todo.find();
        res.json(todos)
    } catch (error) {
        console.log(error)
    }
})

//Add a new Todo
router.post('/', async (req,res) => {
    const todo = new Todo({
        text: req.body.text
    })
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to add todo" });
    }
});


//update the Existing/completed Todo
router.patch('/:id',async (req,res) =>{
    try{
    const todo = await Todo.findById(req.params.id)
    if(!todo) return res.status(404).json({message:"todo not found"});

    if (req.body.text !== undefined) {
        todo.text=req.body.text;
    }
    if(req.body.completed !== undefined){
        todo.completed = req.body.completed;
    }
    const updateTodo = await todo.save();
    res.json(updateTodo)
}catch (error){
    res.status(400).json({message: error.message})
}
})


//delete the Todo

router.delete('/:id', async (req,res) =>{
    try {
        await Todo.findByIdAndDelete(req.params.id);
        res.json({message :'Todo Deleted'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});
export default router;