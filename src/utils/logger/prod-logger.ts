import log, { methodFactory, setDefaultLevel } from "loglevel";

const prodLogger = () => {
  setDefaultLevel("INFO");

  const originalFactory = methodFactory;

  log.methodFactory = (methodName, logLevel, loggerName) => {
    const rawMethod = originalFactory(methodName, logLevel, loggerName);

    let coloredMethod: string;
    if (methodName === "error") {
      coloredMethod = "\u001b[31merror\u001b[39m";
    } else if (methodName === "warn") {
      coloredMethod = "\u001b[33mwarn\u001b[39m";
    } else if (methodName === "info") {
      coloredMethod = "\u001b[32minfo\u001b[39m";
    } else if (methodName === "debug") {
      coloredMethod = "\u001b[34mdebug\u001b[39m";
    } else if (methodName === "trace") {
      coloredMethod = "\u001b[35mtrace\u001b[39m";
    }

    return async (...message) => {
      const lineBreakArr = ["\n"].concat(...message.map((e) => [e, "\n"]));

      rawMethod(
        `[${coloredMethod}] - ${new Date().toLocaleString()}`,
        ...lineBreakArr
      );
    };
  };

  log.resetLevel();
};

export default prodLogger;
