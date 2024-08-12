export class McTimeDate {
    /**
     * @param utcOffset {Number}
     */
    constructor(utcOffset = 0) {
        this.utcOffset = utcOffset;
    }

    /**
     * @return {String}
     */
    getCurrentTime() {
        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 6000);
        const localTime = new Date(utcTime + this.utcOffset * 3600000);

        const hours = String(localTime.getHours()).padStart(2, '0');
        const minutes = String(localTime.getMinutes()).padStart(2, '0');
        const seconds = String(localTime.getSeconds()).padStart(2, '0');

        return `${hours}:${minutes}:${seconds}`;
    }

    /**
     * @return {String}
     */
    getCurrentDate() {
        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const localTime = new Date(utcTime + this.utcOffset * 3600000);

        const year = localTime.getFullYear();
        const month = String(localTime.getMonth() + 1).padStart(2, '0');
        const day = String(localTime.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    }

    /**
     * @return {String}
     */
    getCurrentDateTime() {
        return `${this.getCurrentDate()} ${this.getCurrentTime()}`;
    }

    /**
     * @return {Date}
     */
    getDate() {
        const now = new Date();
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        return  new Date(utcTime + this.utcOffset * 3600000);
    }
}
