// src/api-config.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3100', // Substitua pela URL da sua API Node.js
  headers: {
    'Content-Type': 'application/json',
    // Adicione outros headers necessários aqui
  },
});

export default api;
