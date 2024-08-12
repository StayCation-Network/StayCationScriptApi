import { world } from "@minecraft/server";
import { McTimeDate } from "../utils/McTimeDate";

export class McLogger {
    #console = false;
    #chat = false;
    #utcOffset = 0;
    #name = '';

    /**
     * @param boolean {Boolean}
     */
    enabledPrintConsole(boolean) {
        this.#console = boolean;
    }

    /**
     * @param boolean {Boolean}
     */
    enabledPrintChat(boolean) {
        this.#chat = boolean;
    }

    /**
     * @param offset {Number}
     */
    setUTCOffset(offset) {
        this.#utcOffset = offset;
    }

    /**
     * @param name {String}
     */
    setLoggerName(name) {
        this.#name = name;
    }

    /**
     * @param content {String}
     */
    Info(content) {
        this.#log("INFO", content);
    }

    /**
     * @param content {String}
     */
    Debug(content) {
        this.#log("DEBUG", content);
    }

    /**
     * @param content {String}
     */
    Warn(content) {
        this.#log("WARN", content);
    }

    /**
     * @param content {String}
     */
    Error(content) {
        this.#log("ERROR", content);
    }

    /**
     * @param level {String}
     * @param content {String}
     */
    #log(level, content) {
        const timeDate = new McTimeDate(this.#utcOffset).getCurrentDateTime();
        const name = this.#name || "Logger";

        if (this.#chat) {
            const formattedMessage = `§6[${timeDate}] [${level} ${name}]:§r ${content}`;
            world.sendMessage(formattedMessage);
        }

        if (this.#console) {
            const formattedMessage = `[${timeDate}] [${level} ${name}]: ${content}`;
            console.warn(formattedMessage);
        }
    }
}
