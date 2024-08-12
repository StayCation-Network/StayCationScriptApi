import { Logger } from "./Logger"

export class Server {

    #logger = new Logger();

    Logger(){
        return this.#logger;
    }

}