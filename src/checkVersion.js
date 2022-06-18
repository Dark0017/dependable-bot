const { compare } = require("compare-versions");

const getDepData = (str) => {
  const data = str.split("@");
  return { name: data[0], version: data[1] };
};

const checkVersion = async (data, octokit, dep) => {
  const baseUrl = "https://raw.githubusercontent.com";
  const result = await Promise.all(
    data.map(async (row) => {
      const arr = row.repo.split("/");
      const owner = arr[3];
      const repo = arr[4];
      let branch = "";
      try {
        const repoData = await octokit.rest.repos.get({
          owner,
          repo,
        });
        
        if (repoData.status === 200) branch = repoData.data.default_branch;
      } catch (e) {
        console.log(e);
      }
      try {
        const pkgFile = await octokit.request(
          "GET /{owner}/{repo}/{branch}/{filename}",
          {
            baseUrl: baseUrl,
            owner: owner,
            repo: repo,
            branch,
            filename: "package-lock.json",
          }
        );
        if (pkgFile.status === 200) {
          const data = await JSON.parse(pkgFile.data);
          const version =
            data.dependencies[`${getDepData(dep).name}`]?.version || "0.0.1";
          return {
            ...row,
            version,
            version_satisfied: compare(version, getDepData(dep).version, ">="),
          };
        }
      } catch (e) {
        console.log(e);
      }
    })
  );
  return result;
};

module.exports = { checkVersion };
