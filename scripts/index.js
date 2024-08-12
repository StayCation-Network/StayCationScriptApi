import { PluginBase } from "./staycation/plugin/PluginBase"
import {mc_fetch} from "./staycation/network/Fetch";

class Main extends PluginBase {

    async onInit() {
        const response = await mc_fetch("http://127.0.0.1:8000/");
        this.getServer().getLogger().enablePrintConsole(true);
        this.getServer().getLogger().Info(response.body)
    }
}

new Main();