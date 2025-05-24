import  { Schema, Document, models, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface UserProps {
  username: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserProps, Document {
  comparePassword: (password: string) => Promise<boolean>;
}


// ---------------------
// 2. Schema definition
// ---------------------
const UserSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: [true, 'Account must have a username'],
    unique: true,
    maxlength: [20, 'Username must be less than 20 characters'],
    validate: {
      validator: (username: string) => /^([a-z0-9])*$/i.test(username),
      message: 'Username can only contain letters and numbers',
    },
  },
  email: {
    type: String,
    required: [true, 'Account must have an email'],
  },
  password: {
    type: String,
    required: [true, 'Account must have a password'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
});

// ---------------------
// 3. Middleware
// ---------------------
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err as Error);
    }
  }
  next();
});


UserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};


const User = models.User || model<UserDocument>('User', UserSchema);
export default User;