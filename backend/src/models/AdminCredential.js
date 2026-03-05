// backend/models/AdminCredential.js
import mongoose from "mongoose";

const adminCredentialSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String } // plain for now (as you asked)
});

export default mongoose.model("AdminCredential", adminCredentialSchema);