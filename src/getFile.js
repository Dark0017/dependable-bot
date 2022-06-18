const fs = require("fs").promises;
const { parse } = require("csv-parse/sync");

async function read(filename) {
  let data;
  data = await fs.readFile(filename);
  return parse(data, { columns: true, trim: true });
}

module.exports = { read };
