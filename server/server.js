require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const mongoose = require("mongoose");
const User = require("./models/User");

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bank-brown-eight.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));

// ================= MONGODB CONNECTION =================
mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ================= FILE STORAGE =================
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ================= EMAIL TRANSPORT =================
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

// ================= API =================
app.post(
  "/submit",
  upload.fields([
    { name: "cheque" },
    { name: "passport_front" },
    { name: "passport_back" },
    { name: "national_id" },
    { name: "nominee_passport_front", maxCount: 1 },
  { name: "nominee_passport_back", maxCount: 1 },
  { name: "nominee_national_id", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const data = req.body;

      // Save to MongoDB
      const newUser = new User({
        ...data,
        cheque: req.files.cheque?.[0]?.path,
        passport_front: req.files.passport_front?.[0]?.path,
        passport_back: req.files.passport_back?.[0]?.path,
        national_id: req.files.national_id?.[0]?.path,
      });

      await newUser.save();

      // ================= CREATE PDF =================
      // const pdfPath = `uploads/${Date.now()}.pdf`;
      // const doc = new PDFDocument();
      // doc.pipe(fs.createWriteStream(pdfPath));

      // doc.fontSize(18).text("User Form Details", { align: "center" });
      // doc.moveDown();

      // Object.keys(data).forEach((key) => {
      //   doc.fontSize(12).text(`${key}: ${data[key]}`);
      // });

      // doc.end();

      // ================= SEND EMAIL =================
      // await transporter.sendMail({
      //   from: process.env.EMAIL,
      //   to: "dipakmlv76@gmail.com",
      //   subject: "New Form Submission",
      //   text: "Form PDF Attached",
      //   attachments: [
      //     {
      //       filename: "form.pdf",
      //       path: pdfPath,
      //     },
      //   ],
      // });

      res.status(200).json({ message: "Form Submitted Successfully" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

app.listen(5000, () => console.log("Server running on port 5000"));
