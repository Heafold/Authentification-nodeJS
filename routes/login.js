import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email: email });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                // Mot de passe correct, créez une session et redirigez l'utilisateur
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                // Mot de passe incorrect
                res.redirect('/login');
            }
        } else {
            // Utilisateur non trouvé
            res.redirect('/login');
        }
    } catch (error) {
        console.log(error);
        res.redirect('/login');
    }
});

export default router;
