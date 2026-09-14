import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = ['PORT', 'NODE_ENV'];

function validateEnvironment() {
  for (const key of requiredEnv) {
    if (!process.env[key] || process.env[key].trim() === '') {
      throw new Error(`Falta la variable de entorno ${key}. Defínela en el archivo .env antes de iniciar la aplicación.`);
    }
  }
}

validateEnvironment();

export const config = {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV
};
