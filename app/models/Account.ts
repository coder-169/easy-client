import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema(
  {
    accountId: { type: mongoose.SchemaTypes.ObjectId, required: true },
    accountNumber: { type: Number, default: 0 },
    address: { type: String, default: null },
    balancePkr: { type: Number, default: 0 },
    balanceEth: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.models.Account || mongoose.model("Account", AccountSchema);
