function addWatermarkToPdf() {
  const folderId = "YOUR_FOLDER_ID_HERE"; // Folder ID
  const pdfFileId = "YOUR_PDF_FILE_ID_HERE"; // PDF File ID
  const watermarkText = "CONFIDENTIAL"; // Watermark text
  const file = DriveApp.getFileById(pdfFileId);
  const bytes = new Uint8Array(file.getBlob().getBytes());
  
  // Load PDF-LIB
  eval(UrlFetchApp.fetch("https://raw.githubusercontent.com/YOUR_ACCOUNT/YOUR_REPOSITORY_NAME/BRANCH/pdf-lib.min.js").getContentText());
  
  PDFLib.PDFDocument.load(bytes).then(async (pdf) => {
    pdf.getPages().forEach(page => {
      const { width, height } = page.getSize();
      page.drawText(watermarkText, { x: width / 6, y: height / 1.5, size: 60, opacity: 0.2, rotate: PDFLib.degrees(-30) });
    });
    const newPdfBytes = await pdf.save();
    const newFile = DriveApp.getFolderById(folderId).createFile(Utilities.newBlob(newPdfBytes, "application/pdf", "watermarked.pdf"));
    Logger.log("Watermarked PDF created: " + newFile.getName());
  }).catch(e => Logger.log("Error: " + e.message));
}