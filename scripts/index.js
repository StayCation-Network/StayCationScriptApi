import { system, world } from "@minecraft/server";
import { CommandManager } from  "./staycation/command/CommandManager";
import { Ping } from "./Commands/ping";

var commandManager = new CommandManager();
commandManager.setPrefix(".");

world.afterEvents.worldInitialize.subscribe((ctx) => {
    commandManager.registerCommand(new Ping())
})

world.beforeEvents.chatSend.subscribe((ctx) => {

    ctx.cancel = true;
    commandManager.handleCommand(ctx.sender, world, ctx.message);
})