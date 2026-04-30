import express from "express";
import AdminEmail from "../models/AdminEmail.js";

const router = express.Router();

// PUBLIC but protected by a secret key
router.post("/register-admin-email", async (req, res) => {
  try {
    const { email, secret } = req.body;

    // 🔐 change this to anything you want
    if (secret !== process.env.ADMIN_SECRET) {
      return res.status(403).json({ message: "Invalid secret" });
    }

    const exists = await AdminEmail.findOne({ email });
    if (exists) {
      return res.json({ message: "Email already added" });
    }

    await AdminEmail.create({ email });

    res.json({ message: "Email saved as admin" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;