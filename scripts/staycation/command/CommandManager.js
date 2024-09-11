import { World, Player, ChatSendBeforeEvent } from "@minecraft/server";

export class CommandManager {

    #commands = {};
    #prefix = null;

    /**
     * @param content {String}
     */
     #parseArgs = (content) => {

        const commandBody = content.slice(this.#prefix.length).trim();
        const regex = /"([^"]*)"|(\S+)/g;
        const args = [];
        let match;

        while ((match = regex.exec(commandBody)) !== null) {
            if (match[1]) {
                args.push(match[1]);
            } else if (match[2]) {
                args.push(match[2]);
            }
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
        for(let i = 0; i < command.aliases.length; i++) {
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
            for(let i = 0; i < command.aliases.length; i++) {
                const alias = command.aliases[i];
                delete this.#commands[alias];
            }
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param event {ChatSendBeforeEvent}
     * @param world {World}
     * @return boolean
     */
    handleCommand(event, world) {

        let content = event.message;
        let player = event.sender;

        if(this.#prefix === null) {
            throw new Error("No prefix has been specified.");
        }

        if(content.startsWith(this.#prefix) === false) {
            return false;
        }

        event.cancel = true

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
