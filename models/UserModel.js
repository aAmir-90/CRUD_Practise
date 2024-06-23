import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
    const user = this;
    try {
        if (!user.isModified("password")) return next();
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        return next(error)
    }
})

userSchema.methods.comparePassword = async function (password) {
    try {
        const isMatch = await bcrypt.compare(password, this.password)
        return isMatch
    } catch (error) {
        throw error
    }
}

const User = mongoose.model("User", userSchema);
export default User;
