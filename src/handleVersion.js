const fs = require("fs");
const os = require("os");
const path = require("path");
const { promisify } = require("util");
const exec = promisify(require("child_process").exec);

const { createPR } = require("./makePR");

const handleProcessedData = async (data, octokit, dep) => {
  const baseUrl = "https://raw.githubusercontent.com";
  const update_pr = {};
  const tempDirList = [];
  await Promise.all(
    data.map(async (row) => {
      let tempDir = "";
      if (row.version_satisfied) {
        update_pr[row.repo] = "";
      } else {
        const arr = row.repo.split("/");
        const owner = arr[3];
        const repo = arr[4];
        try {
          const repoData = await octokit.rest.repos.get({
            owner,
            repo,
          });
          let branch = "";
          if (repoData.status === 200) branch = repoData.data.default_branch;

          const pkgLockFile = await octokit.request(
            "GET /{owner}/{repo}/{branch}/{filename}",
            {
              baseUrl: baseUrl,
              owner: owner,
              repo: repo,
              branch: branch,
              filename: "package-lock.json",
            }
          );
          const pkgFile = await octokit.request(
            "GET /{owner}/{repo}/{branch}/{filename}",
            {
              baseUrl: baseUrl,
              owner: owner,
              repo: repo,
              branch: branch,
              filename: "package.json",
            }
          );
          const packageLockData = JSON.stringify(
            JSON.parse(pkgLockFile.data),
            null,
            2
          );
          const packageData = JSON.stringify(JSON.parse(pkgFile.data), null, 2);
          tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "dependable-temp"));
          tempDirList.push(tempDir);
          await fs.promises.writeFile(
            path.join(tempDir, "package-lock.json"),
            packageLockData,
            "utf8"
          );
          await fs.promises.writeFile(
            path.join(tempDir, "package.json"),
            packageData,
            "utf8"
          );
          await exec(
            `cd ${tempDir} &&  npm i ${dep} --package-lock-only --save`
          );

          const updatedLockData = await fs.promises.readFile(
            path.join(tempDir, "package-lock.json"),
            { encoding: "utf-8" }
          );
          const updatedPkgData = await fs.promises.readFile(
            path.join(tempDir, "package.json"),
            { encoding: "utf-8" }
          );

          // console.log("Name:", row.name, "updateData:", updatedPkgData);

          const prRes = await createPR(
            row.repo,
            dep,
            row.version,
            updatedLockData,
            updatedPkgData,
            octokit
          );

          update_pr[row.repo] = prRes.html_url;
        } catch (e) {
          if (e.name === "HttpError" && e.status === 422) {
            update_pr[row.repo] = "PR already exists";
          } else {
            console.log(e);
          }
        }
      }
    })
  );

  const result = data.map((row) => {
    if (update_pr[row.repo] !== undefined)
      return {
        ...row,
        update_pr: update_pr[row.repo],
      };
    else return row;
  });

  tempDirList.forEach((dir) => {
    try {
      if (dir && dir !== "") {
        fs.rmSync(dir, { recursive: true });
      }
    } catch (e) {
      console.log(e);
    }
  });

  return result;
};

module.exports = { handleProcessedData };
