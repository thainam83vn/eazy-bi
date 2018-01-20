import csv from "csvtojson";

export class JsonHelper {
  static csvtojson(csvStr, callback) {
    let header = null;
    let rows = [];
    csv({ noheader: true })
      .fromString(csvStr)
      .on("csv", csvRow => {
        // this func will be called 3 times
        if (!header) {
          header = csvRow;
        } else {
          let obj = {};
          for (let i = 0; i < csvRow.length; i++) {
            obj[header[i]] = isNaN(csvRow[i])?csvRow[i]:parseFloat(csvRow[i]);
          }
          rows.push(obj);
        }
      })
      .on("done", () => {
        if (header) {
          header.splice(0, 0, "index");
          for (let i = 0; i < rows.length; i++) {
            rows[i].index = i + 1;
          }
          callback({
            header: header,
            rows: rows
          });
        } else {
          callback(null);
        }
      });
  }
}
