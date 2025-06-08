
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.SchemaTypes.ObjectId, required: true },
        name: { type: String, required: true },
        email: { type: String, required: true },
        t_name: { type: String, default: 'Unknown' },
        amount: { type: Number, required: true },
        status: { type: String, default: 'Processing' },
        category: { type: String, required: true },
        date: { type: String, default: Date.now() },
        type: { type: String, required: true },
        currency: { type: String, required: true },
        senderAcc: { type: String, required: true },
        receiverAcc: { type: String, required: true },
        transferNote: { type: String, default:'' },
    },
    { timestamps: true }
);

export default mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);
