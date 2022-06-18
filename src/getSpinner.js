const cliSpinners = require("cli-spinners");

const getSpinner = async (text, prefix) => {
  const { default: ora } = await import("ora");
  const spin = ora(text, cliSpinners.random, (prefix = prefix));

  return spin;
};

const callLoadingFunc = async (text, postText = null, func, funcArg) => {
  const { default: ora } = await import("ora");
  const spin = ora(text + "\n", cliSpinners.random);
  spin.start();
  let res;
  try {
    res = await func(...funcArg);
  } catch (e) {
    setTimeout(() => {
      spin.fail(`${text} failed, Error: ${e}\n`);
    }, 1000);
  }
  if (postText) {
    setTimeout(() => {
      spin.succeed(postText + "\n");
    }, 1000);
  } else {
    spin.stop();
  }
  return res;
};

module.exports = { callLoadingFunc };
