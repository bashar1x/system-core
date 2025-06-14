import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const routerLogin = express.Router();

routerLogin.post('/login', async (req, res) => {
    console.log('log');
    
  try {
    if(req?.body?.key === process.env.KEY) {
        res.status(201).json({status: true});
    } else {
        res.status(401).json({status: false});
    }
  } catch (err) {
    res.status(400).json({ message: false, error: err.message });
  }
});

export default routerLogin;