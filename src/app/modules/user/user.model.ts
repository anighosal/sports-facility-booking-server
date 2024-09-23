// eslint-disable-next-line @typescript-eslint/no-this-alias
import bcrypt from 'bcrypt';
import mongoose, { Schema } from 'mongoose';
import config from '../../config';
import { TUser } from './user.interface';
const userSchema: Schema<TUser> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, trim: true },
    role: {
      type: String,
      required: true,
      enum: ['admin', 'user'],
      default: 'user',
    },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  },
);
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );

  next();
});

userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

const User = mongoose.model<TUser>('User', userSchema);
export default User;
