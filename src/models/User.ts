import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Определяем интерфейс для документа пользователя
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  role: 'user' | 'admin';
  comparePassword(candidatePassword: string): Promise<boolean>;
  isModified(path: string): boolean;
}

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

// Хеширование пароля перед сохранением
UserSchema.pre('save', async function(this: IUser, next: (err?: any) => void) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10); // 283405627345 1234567890
    this.password = await bcrypt.hash(this.password, salt); // hash
    next();
  } catch (err) {
    next(err);
  }
});

// Метод для сравнения паролей
UserSchema.methods.comparePassword = async function(this: IUser, candidatePassword: string) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema);

 
