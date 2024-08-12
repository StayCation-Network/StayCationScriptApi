
export class Listener {
    constructor(eventName) {
        this.eventName = eventName;
    }

    on(ctx) {
        throw new Error("The 'on' method must be overridden in the derived class");
    }
}
