const { stringify } = require("csv-stringify/sync");
const fs = require("fs").promises;

const writeFile = async (data, hasPR = false) => {
  let columns = [
    { key: "name" },
    { key: "repo" },
    { key: "version" },
    { key: "version_satisfied" },
  ];
  if (hasPR) {
    columns.push({ key: "update_pr" });
  }
  const result = stringify(data, {
    columns: columns,
    header: true,
    cast: {
      boolean: function (value) {
        return value.toString();
      },
    },
  });
  const outputName = `${process.cwd()}/output${Date.now()
    .toString()
    .toLowerCase()}.csv`;
  await fs.writeFile(outputName, result);
};

module.exports = { writeFile };
