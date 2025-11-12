import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assignees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    points: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["todo", "inprogress", "done"],
      default: "todo"
    },
    dueDate: Date
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
