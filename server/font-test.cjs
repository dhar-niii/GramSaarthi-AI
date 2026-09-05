const PDFDocument = require("pdfkit");
const fs = require("fs");
const path = require("path");

const doc = new PDFDocument({ size: "A4" });

doc.pipe(fs.createWriteStream("font-test.pdf"));

const regular = path.join(
  __dirname,
  "fonts",
  "NotoSans-Regular.ttf"
);

const bold = path.join(
  __dirname,
  "fonts",
  "NotoSans-Bold.ttf"
);

doc.registerFont("TestRegular", regular);
doc.registerFont("TestBold", bold);

doc.font("TestBold")
  .fontSize(20)
  .text("GRAMSAARTHI AI");

doc.moveDown();

doc.font("TestRegular")
  .fontSize(16)
  .text("Business Report");

doc.moveDown();

doc.fontSize(14)
  .text("1234567890");

doc.text("Rs. 80000");

doc.text("Monthly EMI: Rs. 2500");

doc.end();

console.log("font-test.pdf created");