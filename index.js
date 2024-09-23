const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/Users");
const TodoModel = require("./models/Todo");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

app.get('/users/list', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => {
            console.error(err);
        });
});

app.get('/todo/list', (req, res) => {
    TodoModel.find().sort({_id: -1})
        .then(todos => res.json(todos))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to retrieve todos' });
        });
});

app.post('/todo', (req, res) => {
    console.log("Adding todo", req.body);
    TodoModel.create(req.body)
        .then(todo => res.status(201).json(todo))
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to create todo' });
        });
});

app.post('/signup', (req, res) => {
    const { userName, password } = req.body;

    UserModel.findOne({ userName: userName })
        .then(user => {
            console.log(user);
            
            if (user) {
                res.status(400).json({
                    messege: "user already register",
                  });
            } else {

                UserModel.create({ userName, password })
                    .then(user => res.status(201).json(user))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ error: 'Failed to create user' });
                    });
            }
        }).catch(result => {

        })

});

app.post('/login', (req, res) => {
    const { userName, password } = req.body;

    UserModel.findOne({ userName, password })
        .then(user => {
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ error: 'Invalid username or password' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to authenticate user' });
        });
});

app.delete('/todos/:id', (req, res) => {
    TodoModel.findByIdAndDelete(req.params.id)
        .then(todo => {
            if (todo) {
                res.status(200).json({ message: 'Todo deleted' });
            } else {
                res.status(404).json({ error: 'Todo not found' });
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete todo' });
        });
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});
