import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * @interface IUser
 * @description Интерфейс, представляющий документ пользователя в MongoDB.
 * @extends {Document}
 * @property {string} username - Имя пользователя.
 * @property {string} email - Электронная почта пользователя.
 * @property {string} password - Хэшированный пароль пользователя.
 * @property {Date} createdAt - Дата создания пользователя.
 * @property {string} role - Роль пользователя ('user' или 'admin').
 */
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  role: 'user' | 'admin';

  /**
   * Сравнивает предоставленный пароль с сохраненным хэшированным паролем.
   * @method
   * @param {string} candidatePassword - Пароль для проверки.
   * @returns {Promise<boolean>} Promise, разрешающийся в true, если пароли совпадают.
   */
  comparePassword(candidatePassword: string): Promise<boolean>;

  /**
   * Проверяет, было ли изменено указанное поле.
   * @method
   * @param {string} path - Путь к полю для проверки.
   * @returns {boolean} True, если поле было изменено.
   */
  isModified(path: string): boolean;
}
/**
 * Схема пользователя для MongoDB.
 * @constant {mongoose.Schema} UserSchema
 */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

/**
 * Предварительная обработка перед сохранением пользователя.
 * Хэширует пароль, если он был изменен.
 * @function
 * @param {Function} next - Функция обратного вызова для продолжения процесса сохранения.
 */
UserSchema.pre('save', async function(this: IUser, next: (err?: any) => void) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10); // 
    this.password = await bcrypt.hash(this.password, salt); // hash
    next();
  } catch (err) {
    next(err);
  }
});

/**
 * Метод для сравнения паролей.
 * @function
 * @param {string} candidatePassword - Пароль для проверки.
 * @returns {Promise<boolean>} Promise, разрешающийся в true, если пароли совпадают.
 */
UserSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);

 
