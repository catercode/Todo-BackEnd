import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import myTodoModel from './models/todo_schema.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 1000;
const DB = process.env.DB_URL_DB;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


//this is our first home route
app.get('/todo', async (req, res) => {
    try {
        const getAllTodo = await myTodoModel.find({})
        if (getAllTodo) {
            // res.json(getAllTodo)
            return res.status(200).json({
                data: getAllTodo
            }

            )
        } else {
            return res.status(404).json({
                data: getAllTodo
            })
            // res.json(getAllTodo)
        }
    } catch (error) {
        console.log(error)
    }

})
app.get('/todo/:completed', async (req, res) => {
    try {
        const { completed } = req.params
        const updateTodo = await myTodoModel.find({}).where('completed').equals(completed)
        if (updateTodo) {
            return res.status(200).json({
                data: updateTodo
            })
        } else {
            return res.status(404).json({
                data: updateTodo
            })
        }

    } catch (error) {
        console.log(error)
    }

})

//this is our todo route
app.post('/todo', async (req, res) => {
    try {
        const { title, description, dateTime, completed } = req.body
        const addNewTodo = await myTodoModel.create({
            title,
            description,
            dateTime,
            completed
        })
        if (addNewTodo) {
            return res.status(200).json({
                data: addNewTodo
            })
        } else {
            return res.status(404).json({
                data: addNewTodo
            })
        }
    } catch (error) {
        console.log(error)
    }


})

//this is my update route
app.put('/todo/:id', async (req, res) => {
    try {
        const updateTodo = await myTodoModel.findByIdAndUpdate(req.params.id, req.body)
        if (updateTodo) {
            return res.status(200).json({
                data: updateTodo
            })
        } else {
            return res.status(404).json({
                data: updateTodo
            })
        }
    } catch (error) {
        console.log(error)
    }

})
//this is my delete route
app.delete('/todo/:id', async (req, res) => {
    try {
        const deleteTodo = await myTodoModel.findByIdAndDelete(req.params.id)
        if (deleteTodo) {
            return res.status(200).json({
                data: deleteTodo
            })
        } else {
            return res.status(404).json({
                data: deleteTodo
            })
        }
    } catch (error) {
        console.log(error)
    }
})

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("connect to mongodb")
}).catch((err) => {
    console.log(err);
})

app.listen(port, function () {
    console.log('App is listening to port ');
});
