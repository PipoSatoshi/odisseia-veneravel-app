import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import session from 'express-session';
import authRoutes from './routes/auth.routes.js';
// Importar outras rotas aqui quando forem criadas

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// No Replit, a origem é dinâmica, por isso `origin: true` é uma boa prática
app.use(cors({ origin: true, credentials: true })); 
app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 1 dia
    } 
}));

// Rotas da API
app.use('/api/auth', authRoutes);
// app.use('/api/trips', tripRoutes);
// app.use('/api/logs', logRoutes);

app.get('/', (req, res) => {
  res.send('Servidor da Odisseia Venerável está a funcionar!');
});

// Tratamento de erros
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo correu mal!');
});

app.listen(PORT, () => {
    console.log(`🚀 Servidor a correr na porta ${PORT}`);
});