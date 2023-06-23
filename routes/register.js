import express from 'express';
import { Router } from 'express';
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('register');
});

router.post('/', async (req, res) => {
    const { firstname, lastname, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        res.redirect('/register');
        return;
    }

    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
        res.redirect('/register');
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: hashedPassword
        });
        await user.save();
        res.redirect('/login');
    }
});

export default router;
