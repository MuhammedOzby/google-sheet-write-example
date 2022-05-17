const { GoogleSpreadsheet } = require("google-spreadsheet");
const fs = require("fs");
require("dotenv").config();

const doc = new GoogleSpreadsheet(
  "1-i73serjUneVsa_IRPep9pSOWYv5iISt8kWFHSK7Rts"
);

function readJsonFile(file) {
  let bufferData = fs.readFileSync(file);
  let stData = bufferData.toString();
  let data = JSON.parse(stData);
  return data;
}

(async () => {
  await doc.useServiceAccountAuth(readJsonFile("credentials.json"));

  await doc.loadInfo();
  console.log(doc.title);
  const sheet = await doc.sheetsByIndex[0];
  await sheet.setHeaderRow(["name", "email"]);
  const larryRow = await sheet.addRow({
    name: "Larry Page",
    email: "larry@google.com",
  });
  const moreRows = await sheet.addRows([
    { name: "Sergey Brin", email: "sergey@google.com" },
    { name: "Eric Schmidt", email: "eric@google.com" },
  ]);
  console.log(larryRow);
  console.log(moreRows);
})();
