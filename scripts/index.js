import { PluginBase } from "./staycation/plugin/PluginBase"
import { mc_fetch } from "./staycation/network/Fetch";

class Main extends PluginBase {

    async onInit() {
        this.getServer().getLogger().enablePrintConsole(true);
        this.getServer().getLogger().setUTCOffset(2);
        this.getServer().getLogger().Info("Hello World")
    }
}

new Main();