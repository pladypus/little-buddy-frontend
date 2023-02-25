import devLogger from "./dev-logger";
import prodLogger from "./prod-logger";
import testLogger from "./test-logger";

const configLogger = () => {
  if (process.env.NODE_ENV === "development") {
    devLogger();
    return;
  }

  if (process.env.NODE_ENV === "test") {
    testLogger();
    return;
  }

  prodLogger();
  return;
};

export default configLogger;
