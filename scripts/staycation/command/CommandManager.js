import { World, Player } from "@minecraft/server";

export class CommandManager {

    #commands = {};
    #prefix = null;

    /**
     * @param content {String}
     */
    #parseArgs = (content) => {
        let args = [];
        let currentArg = "";
        let inQuotes = false;

        for(let i = 0; i < content.length; i++) {
            const char = content[i];
            if(char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ' ' && !inQuotes) {
                if(currentArg.length > 0) {
                    args.push(currentArg);
                    currentArg = "";
                }
            } else {
                currentArg += char;
            }
        }

        if(currentArg.length > 0) {
            args.push(currentArg);
        }

        return args;
    }

    /**
     * @param prefix {String}
     */
    setPrefix(prefix) {
        this.#prefix = prefix;
    }

    /**
     * @param command {Command}
     */
    registerCommand(command) {
        const commandName = command.name.toLowerCase();
        this.#commands[commandName] = command;

        for(let i = 0; i < command.aliases; i++) {
            const alias = command.aliases[i];
            this.#commands[alias] = command;
        }
    }

    /**
     * @param commandName {String}
     * @returns {boolean}
     */
    unregisterCommand(commandName) {
        commandName = commandName.toLowerCase();
        const command = this.#commands[commandName];

        if (command) {
            delete this.#commands[commandName];
            for(let i = 0; i < command.aliases; i++) {
                const alias = command.aliases[i];
                delete this.#commands[alias];
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param player {Player}
     * @param world {World}
     * @param content {String}
     * @return boolean
     */
    handleCommand(player, world, content) {

        if(this.#prefix === null) {
            throw new Error("No prefix has been specified.");
        }

        if(content.startsWith(this.#prefix) === false) {
            return false;
        }

        let args = this.#parseArgs(content.substring(this.#prefix.length));
        let commandName = args.shift().toLowerCase();

        if(this.#commands[commandName]) {
            this.#commands[commandName].execute(player, world, args);
            return true;
        } else {
            return false;
        }
    }
}
