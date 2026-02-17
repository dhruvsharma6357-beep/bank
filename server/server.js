require("dotenv").config();
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const nodemailer = require("nodemailer");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

// File Storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Email Transport
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

// API
app.post(
  "/submit",
  upload.fields([
    { name: "cheque" },
    { name: "passport_front" },
    { name: "passport_back" },
    { name: "national_id" },
  ]),
  (req, res) => {
    const data = req.body;

    const query = `
      INSERT INTO users 
      (name,email,phone,passport,gender,address,state,zip,country,
      bank_name,account_holder,account_number,ifsc,branch,
      cheque,passport_front,passport_back,national_id,selfie)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    `;

    const values = [
      data.name,
      data.email,
      data.phone,
      data.passport,
      data.gender,
      data.address,
      data.state,
      data.zip,
      data.country,
      data.bank_name,
      data.account_holder,
      data.account_number,
      data.ifsc,
      data.branch,
      req.files.cheque[0].path,
      req.files.passport_front[0].path,
      req.files.passport_back[0].path,
      req.files.national_id[0].path,
      data.selfie,
    ];

    db.query(query, values, (err, result) => {
      if (err) return res.status(500).send(err);

      // Create PDF
      const doc = new PDFDocument();
      const pdfPath = `uploads/${Date.now()}.pdf`;
      doc.pipe(fs.createWriteStream(pdfPath));
      doc.text("User Form Details", { align: "center" });
      doc.moveDown();

      Object.keys(data).forEach((key) => {
        doc.text(`${key}: ${data[key]}`);
      });

      doc.end();

      // Send Email
      transporter.sendMail({
        from: process.env.EMAIL,
        to: "dipakmlv76@gmail.com",
        subject: "New Form Submission",
        text: "Form Attached",
        attachments: [
          { filename: "form.pdf", path: pdfPath },
        ],
      });

      res.send("Form Submitted Successfully");
    });
  }
);

app.listen(5000, () => console.log("Server running on 5000"));
