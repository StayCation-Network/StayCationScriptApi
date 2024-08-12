import { Server } from "../server/Server";
import { world } from "@minecraft/server";
import { EventManager } from "../event/EventManager";
import { CommandManager } from "../command/CommandManager";

export class PluginBase {
    #initWorld;
    #commandManager = new CommandManager();
    #eventManager = new EventManager();
    #server = new Server();

    constructor() {
        this.#initWorld = world.afterEvents.worldInitialize.subscribe(() => {
            this.onInit();
            world.afterEvents.worldInitialize.unsubscribe(this.#initWorld);
        });
    }

    onInit() {}

    getEventManager() {
        return this.#eventManager;
    }

    getCommandManager() {
        return this.#commandManager
    }

    getServer() {
        return this.#server;
    }
}