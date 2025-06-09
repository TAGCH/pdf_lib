# Google Apps Script: PDF Watermarker

This Google Apps Script project demonstrates how to add a watermark to PDF files stored in Google Drive by using the [PDF-LIB](https://pdf-lib.js.org/) library.

## Features

* Loads a PDF file from Google Drive.
* Adds a text watermark (e.g., "CONFIDENTIAL") to every page.
* Saves the new watermarked PDF file back to Google Drive.

## Setup and Usage

1.  **Create a New Google Apps Script Project:**
    * Go to [Google Apps Script](https://script.google.com/home).
    * Click `New project`.

2.  **Add the `pdf-lib` Code:**
    * Copy the entire content from the `pdf-lib.min.js` file, which can be obtained from the [PDF-LIB CDN](https://cdn.jsdelivr.net/npm/pdf-lib/dist/pdf-lib.min.js) or from [your GitHub repository's raw link](https://raw.githubusercontent.com/TAGCH/pdf_lib/main/pdf-lib.min.js).
    * Create a new `.gs` file in your Apps Script project (e.g., `pdfLib.gs`) and paste the copied code into it.

3.  **Copy the Main Script Code:**
    * Copy the code from your primary Apps Script file (e.g., your `addWatermarkToPdf()` function) and paste it into your project.

4.  **Configure Folder and File IDs:**
    * In the `addWatermarkToPdf()` function, update the `folderId` and `pdfFileId` variables to match your Google Drive setup.

    ```javascript
    const folderId = "YOUR_FOLDER_ID_HERE"; // ID of your destination folder
    const pdfFileId = "YOUR_PDF_FILE_ID_HERE"; // ID of your source PDF file
    ```

5.  **Run the Script:**
    * Save the project (floppy disk icon).
    * Select the `addWatermarkToPdf` function from the dropdown menu and click the `Run` button.
    * You may be prompted for authorization the first time; follow the on-screen instructions.

## References

This project leverages the [PDF-LIB](https://pdf-lib.js.org/) library for PDF manipulation.