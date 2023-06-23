import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import indexRouter from './routes/index.js';
import registerRouter from './routes/register.js';
import loginRouter from './routes/login.js';
import dashboardRouter from './routes/dahsboard.js';
import logoutRouter from './routes/logout.js';


const app = express();

mongoose.set('strictQuery', false);

app.set('view engine', 'pug');
app.set('views', './views');

dotenv.config();

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => 
    console.log('Connected to MongoDB!')
);

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(express.static('public'));

app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', indexRouter);
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);
app.use('/logout', logoutRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
