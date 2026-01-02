import { LoggerFactory } from "./factory-class.js";
const logger = LoggerFactory.createLogger();

logger.debug("Debug Message");
logger.warn("Warn Message");
logger.info("Info Message");
logger.error("Error Message");