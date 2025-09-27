import express from "express";

const router = express.Router();

router.post("/logout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
  });
  res.status(200).json({ message: "Logout Successful" });
});

export default router;
