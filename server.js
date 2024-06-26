import express from 'express';
import db from './config/db.js';
import UserRoutes from './routes/UserRoutes.js';
import MealRoutes from './routes/MealRoutes.js'

import dotenv from 'dotenv';
dotenv.config()

const app = express();

app.use(express.json())

app.get('/', async (req, res) => {
    res.send('Welcome To CRUD Operation Practise')
})

app.use('/api/v1/users', UserRoutes)
app.use('/api/v1/meals', MealRoutes)

app.listen(3000, () => {
    console.log("Server Connected successfully")
})