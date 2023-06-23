import express from 'express';
import { checkAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', checkAuthenticated, (req, res) => {
    res.render('dashboard', { user: req.session.user });
});

router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect('/dashboard');
        res.clearCookie('user_sid');
        res.redirect('/login');
    });
});

export default router;
