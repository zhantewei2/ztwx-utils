class GetUniqueId {
    b64Table = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM0123456789*~";
    t=64;
    to64(num: number): string {
        let str = "";
        let remainder;
        do {
            remainder = num % this.t;
            num = Math.floor(num / this.t);
            str += this.b64Table[remainder];
        } while (num >=1);

        return str;
    }
    de64(str:string):number {
        let total = 0;
        
        for (let i = 0, len = str.length; i < len; i++) {
            total += Math.pow(this.t, i) * this.b64Table.indexOf(str[i]);
        }
        return total;
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
            nowUniqueId = this.to64(this.preTimestamp) + this.to64(this.preUniqueTag);
        } else {
            this.preTimestamp = nowTimestamp;
            nowUniqueId = this.to64(this.preTimestamp);
            this.preUniqueTag = 0;
        }
        return nowUniqueId;
    }
}

const _getUniqueId = new GetUniqueId();
export const uniqueId=_getUniqueId;
export const getUniqueId = () => _getUniqueId.getUniqueId();