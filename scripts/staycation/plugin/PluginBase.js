import { Server } from "../server/Server";
import { world } from "@minecraft/server";
import {EventManager} from "../event/EventManager";

export class PluginBase {
    #initWorld;

    constructor() {
        this.#initWorld = world.afterEvents.worldInitialize.subscribe(() => {
            this.onInit();
            world.afterEvents.worldInitialize.unsubscribe(this.#initWorld);
        });
    }

    onInit() {}

    getEventManager() {
        return new EventManager()
    }

    getServer() {
        return new Server();
    }
}