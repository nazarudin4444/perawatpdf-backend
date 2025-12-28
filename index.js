import express from "express";
import multer from "multer";
import fetch from "node-fetch";

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/api/merge", upload.array("files"), async (req, res) => {
  try {
    const response = await fetch("https://api.pdf.co/v1/pdf/merge", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.PDFCO_API_KEY
      },
      body: JSON.stringify({
        url: "https://example.com/file1.pdf,https://example.com/file2.pdf",
        name: "hasil-merge.pdf"
      })
    });

    const result = await response.json();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Gagal memproses PDF" });
  }
});

app.listen(3000, () => {
  console.log("Backend PerawatPDF berjalan di port 3000");
});