import { PluginBase } from "./staycation/plugin/PluginBase"

class Main extends PluginBase {

    onInit() {
        console.log("Hello from init");
        this.getServer()
    }
}

new Main();