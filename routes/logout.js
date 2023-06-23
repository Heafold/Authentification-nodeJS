
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.redirect('/dashboard');
        res.clearCookie('user_sid');
        res.redirect('/login');
    });
});

export default router;