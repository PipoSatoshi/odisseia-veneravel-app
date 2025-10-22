import axios from 'axios';

// A configuração da proxy no Vite trata da URL base em desenvolvimento.
// Em produção (como no Replit), o /api será servido pelo mesmo host.
const api = axios.create({
  baseURL: '/', // Aponta para a mesma origem do site
  withCredentials: true, // Essencial para enviar cookies de sessão
});

export default api;