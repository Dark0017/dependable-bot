const { Octokit } = require("@octokit/rest");
const { createPullRequest } = require("octokit-plugin-create-pull-request");
const MyOctokit = Octokit.plugin(createPullRequest);

async function login(pat) {
  try {
    const octokit = new MyOctokit({
      auth: pat,
    });
    return octokit;
  } catch (e) {
    console.log(e);
  }
}
module.exports = { login };
