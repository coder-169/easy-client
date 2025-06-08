import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Processing" },
    senderAcc: { type: String, required: true },
    receiverAcc: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
