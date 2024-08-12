import { Server } from "../server/Server";

class PluginBase {

    onEnable() {

    }

    getServer() {
        return new Server();
    }
}