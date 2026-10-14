const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const emailRegex = /^\s*[\w\-\._%+-]+@[\w\-\.]+\.[a-zA-Z]{2,}\s*$/;
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required for creating a user"],
      trim: true,
      lowercase: true,
      match: [emailRegex, "Invalid Invalid address"],
      unique: [true, "Email already exists"],
    },

    name: {
      type: String,
      required: [true, "Name is required for creating a account"],
    },

    password: {
      type: String,
      required: [true, "Passwword is required for creating an account"],
      minlength: [6, "Passwword should contain more than 6 characters"],
      select: false, // by default password won't come in qurery
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  return;
});

userSchema.methods.comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
