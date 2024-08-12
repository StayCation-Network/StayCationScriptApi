import { world } from "@minecraft/server";

export class EventManager {
    #listeners = [];

    /**
     * @param {Listener} listenerInstance
     * @param {string} phase
     */
    registerListener(listenerInstance, phase = "before") {
        const eventPhase = this.#getEventPhase(phase);
        if (!eventPhase) {
            console.warn(`Ungültiger Phase-Wert: ${phase}. Nur 'before' und 'after' sind erlaubt.`);
            return null;
        }

        const unsubscribe = world[eventPhase][listenerInstance.eventName].subscribe((ctx) => listenerInstance.on(ctx));
        this.#listeners.push({ listenerInstance, unsubscribe });

        return () => this.unregisterListener(listenerInstance);
    }

    /**
     * @param {Listener} listenerInstance
     * @return {boolean}
     */
    unregisterListener(listenerInstance) {
        const listenerData = this.#listeners.find(
            (entry) => entry.listenerInstance === listenerInstance
        );

        if (listenerData) {
            listenerData.unsubscribe();
            this.#listeners = this.#listeners.filter(
                (entry) => entry.listenerInstance !== listenerInstance
            );
            return true;
        }
        return false;
    }

    unregisterAll() {
        this.#listeners.forEach((entry) => entry.unsubscribe());
        this.#listeners = [];
    }

    /**
     * @param {Listener} listenerInstance
     * @return {boolean}
     */
    hasListener(listenerInstance) {
        return this.#listeners.some((entry) => entry.listenerInstance === listenerInstance);
    }

    /**
     * @param {string} phase
     * @return {string|null}
     */
    #getEventPhase(phase) {
        switch (phase.toLowerCase()) {
            case "before":
                return "beforeEvents";
            case "after":
                return "afterEvents";
            default:
                return null;
        }
    }
}