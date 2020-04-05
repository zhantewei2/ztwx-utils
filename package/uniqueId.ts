class GetUniqueId {
    b52Table = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

    to52(num: number): string {
        let str = "";
        let remainder;
        do {
            remainder = num % 52;
            num = Math.floor(num / 52);
            str += this.b52Table[remainder];
        } while (num > 1);

        return str;
    }

    preTimestamp: number | null = null;
    preUniqueTag: number = 0;

    /** not thread safe
     **/
    getUniqueId(): string {
        let nowTimestamp: number = new Date().getTime();
        let nowUniqueId: string;

        if (nowTimestamp === this.preTimestamp) {
            this.preUniqueTag += 1;
            nowUniqueId = this.to52(this.preTimestamp) + this.to52(this.preUniqueTag);
        } else {
            this.preTimestamp = nowTimestamp;
            nowUniqueId = this.to52(this.preTimestamp);
            this.preUniqueTag = 0;
        }
        return nowUniqueId;
    }
}

const _getUniqueId = new GetUniqueId();
export const getUniqueId = () => _getUniqueId.getUniqueId();