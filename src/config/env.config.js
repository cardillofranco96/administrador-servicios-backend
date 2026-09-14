import dotenv from 'dotenv';

dotenv.config();

const requiredEnv = ['PORT', 'NODE_ENV', 'MONGODB_URI'];

function validateEnvironment() {
  for (const key of requiredEnv) {
    if (!process.env[key] || process.env[key].trim() === '') {
      throw new Error(`Falta la variable de entorno ${key}. Defínela en el archivo .env antes de iniciar la aplicación.`);
    }
  }
}

validateEnvironment();

export const config = {
  PORT: Number(process.env.PORT) || 8080,
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI: process.env.MONGODB_URI
};

// Optional MongoDB URI (only used if provided)
export const MONGO_URI = process.env.MONGO_URI || null;
