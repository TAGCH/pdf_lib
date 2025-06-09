function addWatermarkToPdf() {
  const folderId = "YOUR_FOLDER_ID_HERE"; // Folder ID
  const pdfFileId = "YOUR_PDF_FILE_ID_HERE"; // PDF File ID
  const watermarkText = "CONFIDENTIAL"; // Watermark text

  // กำหนดค่าสำหรับลายน้ำ
  const watermarkOptions = {
    size: 60,
    opacity: 0.2,
    rotate: -30 // จะแปลงเป็นองศาใน drawText
  };

  const file = DriveApp.getFileById(pdfFileId);
  const fileName = file.getName(); // ดึงชื่อไฟล์ต้นฉบับ
  const newFileName = fileName.replace(".pdf", "_watermarked.pdf"); // สร้างชื่อไฟล์ใหม่
  const bytes = new Uint8Array(file.getBlob().getBytes());

  // ไม่ต้องใช้ eval(UrlFetchApp.fetch(...)) อีกต่อไป เพราะโค้ด pdf-lib อยู่ในโปรเจกต์แล้ว

  // ตรวจสอบให้แน่ใจว่า PDFLib พร้อมใช้งาน
  // หากเกิดข้อผิดพลาด "PDFLib is not defined" ให้ลองตรวจสอบว่าคุณวางโค้ด pdf-lib.min.js ถูกต้องหรือไม่
  if (typeof PDFLib === 'undefined') {
    Logger.log("Error: PDFLib library not loaded. Please ensure pdf-lib.min.js content is pasted into a .gs file.");
    return;
  }

  PDFLib.PDFDocument.load(bytes).then(async (pdf) => {
    pdf.getPages().forEach(page => {
      const { width, height } = page.getSize();
      // คำนวณตำแหน่งลายน้ำให้อยู่ตรงกลางมากขึ้นและหมุน
      const xPos = width / 2 - (watermarkText.length * watermarkOptions.size * 0.25); // ประมาณการ
      const yPos = height / 2 - (watermarkOptions.size / 2);

      page.drawText(watermarkText, {
        x: xPos,
        y: yPos,
        size: watermarkOptions.size,
        opacity: watermarkOptions.opacity,
        rotate: PDFLib.degrees(watermarkOptions.rotate) // ใช้ PDFLib.degrees()
      });
    });
    const newPdfBytes = await pdf.save();
    const newFile = DriveApp.getFolderById(folderId).createFile(Utilities.newBlob(newPdfBytes, "application/pdf", newFileName));
    Logger.log("Watermarked PDF created: " + newFile.getName());
  }).catch(e => Logger.log("Error: " + e.message));
}