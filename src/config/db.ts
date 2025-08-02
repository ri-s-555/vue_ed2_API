import mongoose from "mongoose";
import dotenv from "dotenv";
/**
 * @module connectDB
 * @description Модуль для подключения к базе данных MongoDB.
 */

dotenv.config();
/**
 * Загружает переменные окружения из файла .env.
 */

/**
 * Функция для установки соединения с базой данных MongoDB.
 * @throws {Error} Если не удается подключиться к базе данных, выводит сообщение об ошибке и завершает процесс.
 */
const connectDB = async () => {
  try {
    //     if (!process.env.MONGO_URI) {
    //   throw new Error('MONGO_URI is not defined in the environment variables');
    // }
    await mongoose.connect(process.env.MONGO_URI || "");
    console.log("MongoDB Connected...");
  } catch (err: any) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
