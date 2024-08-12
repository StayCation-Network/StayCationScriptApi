import { McLogger } from "./McLogger"

export class Server {
    #logger = new McLogger();

    /**
     * @return {McLogger}
     * @constructor
     */
    getLogger(){
        return this.#logger;
    }

}