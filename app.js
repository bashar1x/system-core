import express, { json, urlencoded, static as staticFiles } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';

import connectDB from "./connect.db.js";
import verifyApp from "./middlewares/verifyApp.js";
import router from "./routers/app/chating.js";
import routerLogin from "./routers/admin/login.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

// 🔌 Connect to DB
connectDB();

// 🧩 API Routes
app.use('/api/admin', routerLogin);
app.use('/api/app', verifyApp, router);

// 📦 Serve static frontend files
app.use(staticFiles(path.join(__dirname, 'build')));

// 🧭 Catch-all for frontend routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.get('/product/:id', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// 🚀 Start server
app.listen(4000, () => console.log('Server is running on http://localhost:4000'));

// PING BOT ----
app.get('/run', (req, res) => { res.json({ run: 'Server is running v1' }) })
setInterval(() => {
        fetch('https://system-core.onrender.com/run');
}, 100 * 1000)