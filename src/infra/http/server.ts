import 'dotenv/config';

import { app } from './app';

const { API_PORT } = process.env;

app.listen(API_PORT, () => {
  console.log(`Servidor rodando! PORTA INTERNA:${API_PORT}`);
});
