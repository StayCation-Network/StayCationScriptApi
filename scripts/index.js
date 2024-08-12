import { system, world } from "@minecraft/server";
import { CommandManager } from  "./staycation/command/CommandManager";
import { Logger } from "./staycation/server/Logger";
import { Ping } from "./Commands/ping";

var logger = new Logger();
var commandManager = new CommandManager();


world.afterEvents.worldInitialize.subscribe((ctx) => {
    commandManager.registerCommand(new Ping())
    commandManager.setPrefix(".");
    logger.enabledPrintChat(true);
    logger.enablePrintConsole(true)
    logger.setUTCOffset(2);

    logger.getLogger("Server").Info("Hello World")
})

world.beforeEvents.chatSend.subscribe((ctx) => {
    commandManager.handleCommand(ctx, world);
})