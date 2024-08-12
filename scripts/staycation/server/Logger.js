import { world } from "@minecraft/server";
import { McTimeDate } from "../utils/McTimeDate";

export class Logger {
    #console = false;
    #chat = false;
    #utcOffset = 0;

    /**
     * @param boolean {Boolean}
     */
    enablePrintConsole(boolean) {
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
     * @return {log}
     */
    getLogger(name) {
        return new log(name, this.#chat, this.#console, this.#utcOffset);
    }
}

class log {
    /**
     * @param name {String}
     * @param chat {Boolean}
     * @param console {Boolean}
     * @param utcOffset {Number}
     */
    constructor(name, chat, console, utcOffset) {
        this.name = name;
        this.chat = chat;
        this.console = console;
        this.timeDate = new McTimeDate(utcOffset);
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
        const timeDate = this.timeDate.getCurrentDateTime();

        if (this.chat) {
            const formattedMessage = `§6[${timeDate}] [${level} ${this.name}]:§r ${content}`;
            world.sendMessage(formattedMessage);
        }

        if (this.console) {
            const formattedMessage = `[${timeDate}] [${level} ${this.name}]: ${content}`;
            console.log(formattedMessage);
        }
    }
}