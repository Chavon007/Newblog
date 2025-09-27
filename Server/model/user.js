import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Invalid email address"],
    },
    password: { type: String, required: true, minlength: 6 },
    selectedCategories: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 2,
        message: "Select at least 2 categories",
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
