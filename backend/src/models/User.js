import { Timestamp } from "mongodb";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate(value) {
        if (!validator.isAlpha(value)) {
          throw new Error("Username must be letters");
        }
      },
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },

    password: {
      type: String,
      required: true,
      validate(value) {
        if (value.length < 6) {
          throw new Error("Min length is 6");
        }
      },
    },
  },
  { timestamps: true },
);

//password hashing that runs before save
userSchema.pre('save',async function(next){
    const user=this

    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password,8);
    }
})

//removes sensitive data before sending it to the client
userSchema.methods.removeSensitiveData = async function(){
    const user = this;

    const userObject = user.toObject()
    delete userObject.password
    return userObject;
}

//used for logIn
userSchema.statics.getUserCredentials = async (email,password)=>{
    const user = await User.findOne({email});
    if(!user){
        throw Error("email or password is incorrect")
    }
    const isValid = await bcrypt.compare(password,user.password);

    if(!isValid){
        throw Error("email or password is incorrect")
    }
    return user.removeSensitiveData();
}

const User = mongoose.model("User", userSchema);

export default User;
