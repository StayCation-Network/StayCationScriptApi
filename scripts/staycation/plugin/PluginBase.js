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

    /**
     * @return {EventManager}
     */
    getEventManager() {
        return this.#eventManager;
    }

    /**
     * @return {CommandManager}
     */
    getCommandManager() {
        return this.#commandManager
    }

    /**
     * @return {Server}
     */
    getServer() {
        return this.#server;
    }
}