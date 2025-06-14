import express, { json, urlencoded, static as static_ } from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./connect.db.js";
import verifyApp from "./middlewares/verifyApp.js";
import router from "./routers/app/chating.js";
import routerLogin from "./routers/admin/login.js"
dotenv.config();
const app = express();
// Middlewares
app.use(json()); app.use(urlencoded());
app.use(static_('views'));
app.use(cors());


connectDB();


app.use('/api/admin', routerLogin);
app.use('/api/app', verifyApp, router);

app.listen(4000, () => console.log('Server is running on http://localhost:4000'));

// PING BOT ----
// app.get('/run', (req, res) => { res.json({ run: 'Server is running v1' }) })
// setInterval(() => {
//         fetch('https://zin-ai.onrender.com/run');
// }, 100 * 1000)