const {Schema , model} = require("mongoose");

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium'
    }, 
    createdBy:{
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {timestamps: true});

const Todo = model("todo", todoSchema);

module.exports = Todo;