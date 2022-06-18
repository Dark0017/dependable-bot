async function createPR(url, dep, from, pkgLockData, pkgData, octokit) {
  const arr = url.split("/");
  const owner = arr[3];
  const repo = arr[4];
  const depName = dep.split("@")[0];
  const depVer = dep.split("@")[1];

  const prBody = {
    owner,
    repo,
    title: "chore: updates " + depName + " to " + depVer,
    body:
      "Updates the version of " +
      depName +
      " from `" +
      from +
      "`" +
      " to `" +
      depVer +
      "`",
    head: `${dep}/${Date.now().toString(36)}`,
    changes: [
      {
        files: {
          "package-lock.json": {
            content: pkgLockData,
            encoding: "utf-8",
          },
          "package.json": {
            content: pkgData,
            encoding: "utf-8",
          },
        },
        commit: "chore: updates " + depName,
      },
    ],
  };
  const pr = await octokit.createPullRequest(prBody);
  return pr.data;
}

module.exports = { createPR };
