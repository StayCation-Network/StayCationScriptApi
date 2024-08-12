import { Player, World } from "@minecraft/server";

export class Command {
    constructor(name, description, usage, aliases = []) {
        this.name = name;
        this.description = description;
        this.usage = usage;
        this.aliases = aliases.map(alias => alias.toLowerCase());
    }

    /**
     * @param player {Player}
     * @param world {World}
     * @param args {Array}
     */
    onCommand(player, world, args) {
        throw new Error("onCommand must be overridden in the derived class");
    }

    /**
     * @param player {Player}
     * @param world {World}
     * @param args {Array}
     */
    execute(player, world, args) {
        this.onCommand(player, world, args);
    }
}
