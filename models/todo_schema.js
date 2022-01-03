import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const todoSchema = Schema({
    title: {
        Type: String,
        require: true
    },
    description: {
        Type: String,
        require: true
    },
    dateTime: {
        Type: String,
        require: true
    },
    completed: {
        Type: Boolean,
        default: true
    }

});

const myTodoModel = model('todo', todoSchema)
export default myTodoModel;
