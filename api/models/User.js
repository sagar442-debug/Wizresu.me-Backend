const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    subscription: {
      type: String,
      required: false,
      default: "Basic",
    },
    resumes: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    avatar: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
