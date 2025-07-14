import cors from 'cors';
import express from 'express';
import pool from './db.js';
import {v4 as uuid} from 'uuid';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const app = express();
const port = 5000;

/*Test query and Route to check the database connection*/

pool.query('SELECT NOW()')
.then(res => console.log("🛢️ Connection to DB at:", res.rows[0].now))
.catch(err => console.error("❌ DB connection failed:", err.message))

app.use(express.json());
app.use(cors());

/* http requests */
app.get('/todos/:userEmail', async(req, res) => {
  const {userEmail} = req.params;
  try {
    const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
    res.json(todos.rows);
  } catch (error) {
    console.error("Error fetching the todos:", error);
    res.status(500).json({message: "Server Error"});
    }
  }
)

//create a new todo
app.post('/todos', async(req, res) => {
  const {userEmail, title, progress, date} =  req.body;
  console.log(userEmail, title, progress, date);

  const id = uuid();
  try {
    const newTodo = await pool.query(`INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5) RETURNING *`, [id, userEmail, title, progress, date]);
    res.json(newTodo.rows[0])
  } catch (error) {
    console.error("Error posting the new task:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
})

//put request to edit a data
app.put('/todos/:id', async(req, res) => {
  const {id} = req.params;
  const {userEmail, title, progress, date} = req.body;
  try {
  const editTodo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date = $4 WHERE id = $5 RETURNING *', [userEmail, title, progress, date, id])
  res.json(editTodo.rows[0]);
  } catch (error) {
    console.error("Error recieving the updaed task:", error);
    res.status(500).json({error: "Internal server error"})
  }
})

//delete a task
app.delete('/todos/:id', async(req, res) => {
  const {id} = req.params;
  try {
    const deleteTodo = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    if(deleteTodo.rows.length === 0){
      return res.status(404).json({error: "Todo not found"})
    }
    res.json({message: "Todo deleted successfully", todo:deleteTodo.rows[0]})
  } catch (error) {
    console.error("Error deleting data:", error.message);
    res.status(500).json({error: "Internal server error"})
  }
})

//endpoint - signup and login

//signup
app.post('/signup', async(req, res) => {
  const {email, password} = req.body;
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(password, salt)
  try {
    const signup = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [email, password]);
    const token = jwt.sign({email}, 'secret', {expiresIn: '1hr'})
    res.json({email, token})
  } catch (error) {
    console.error(error);
    if(err){
      res.json({detail: err.detail})
    }
  }
});

//login
app.post('/login', async(req, res) => {
  const {email, password} = req.body;
  try {
  } catch (error) {
  }
})


app.listen(port, console.log(`Server running on http://localhost:${port}`));