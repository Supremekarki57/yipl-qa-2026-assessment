const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");

module.exports = {
  e2e: {
    specPattern: "Cypress/e2e/**/*.cy.js",
    setupNodeEvents(on, config) {
      on("task", {
        writeApiResults({ results, filename }) {
          const filePath = path.join(__dirname, filename);
          const dir = path.dirname(filePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          let existing = [];
          if (fs.existsSync(filePath)) {
            try {
              existing = JSON.parse(fs.readFileSync(filePath, "utf8"));
            } catch (e) {
              existing = [];
            }
          }
          const combined = [...existing, ...results];
          fs.writeFileSync(filePath, JSON.stringify(combined, null, 2));
          return null;
        },
        writeApiResultsExcel({ results, filename }) {
          const filePath = path.join(__dirname, filename);
          const dir = path.dirname(filePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          let workbook,
            worksheet,
            isNewFile = false;
          const sheetName = "API Results";

          if (fs.existsSync(filePath)) {
            workbook = XLSX.readFile(filePath);
            worksheet =
              workbook.Sheets[sheetName] || XLSX.utils.json_to_sheet([]);
          } else {
            workbook = XLSX.utils.book_new();
            worksheet = XLSX.utils.json_to_sheet([]);
            isNewFile = true;
          }

          const existingData = XLSX.utils.sheet_to_json(worksheet);
          const updatedData = [...existingData, ...results];
          const updatedWorksheet = XLSX.utils.json_to_sheet(updatedData);

          if (isNewFile) {
            XLSX.utils.book_append_sheet(workbook, updatedWorksheet, sheetName);
          } else {
            workbook.Sheets[sheetName] = updatedWorksheet;
          }

          XLSX.writeFile(workbook, filePath);
          return null;
        },
        // ...your other tasks (writeToExcel, saveToJson) remain unchanged...
        writeToExcel({ filePath, sheetName, data }) {
          const absolutePath = path.resolve(filePath);
          const dir = path.dirname(absolutePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          let workbook;
          let worksheet;
          let isNewFile = false;

          if (fs.existsSync(absolutePath)) {
            workbook = XLSX.readFile(absolutePath);
            worksheet =
              workbook.Sheets[sheetName] || XLSX.utils.json_to_sheet([]);
          } else {
            workbook = XLSX.utils.book_new();
            worksheet = XLSX.utils.json_to_sheet([]);
            isNewFile = true;
          }

          const existingData = XLSX.utils.sheet_to_json(worksheet);
          const updatedData = [...existingData, ...data];
          const updatedWorksheet = XLSX.utils.json_to_sheet(updatedData);

          if (isNewFile) {
            XLSX.utils.book_append_sheet(workbook, updatedWorksheet, sheetName);
          } else {
            workbook.Sheets[sheetName] = updatedWorksheet;
          }

          XLSX.writeFile(workbook, absolutePath);
          return null;
        },

        saveToJson({ filePath, data }) {
          const absolutePath = path.resolve(filePath);
          const dir = path.dirname(absolutePath);
          if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
          }
          let existingData = [];
          if (fs.existsSync(absolutePath)) {
            existingData = JSON.parse(fs.readFileSync(absolutePath, "utf8"));
          }
          const updatedData = [...existingData, ...data];
          fs.writeFileSync(absolutePath, JSON.stringify(updatedData, null, 2));
          return null;
        },
      });
    },
  },
};
