function prefixString(radix: number) {
    switch (radix) {
        case 2: return '0b';
        case 8: return '0o';
        case 10: return '';
        case 16: return '0x';
        default: throw new Error(`cannot add prefix with this radix ${radix}`);
    }
}

function int32PairToBuffer(high: number, low: number) {
    const buf = Buffer.alloc(8);
    buf.writeUInt32BE(high >>> 0, 0);
    buf.writeUInt32BE(low >>> 0, 4);
    return buf;
}

class Int64Base {
    protected buffer: Buffer;
    constructor(num: number) {
        if (false == Number.isSafeInteger(num)) throw new Error(`Unsafe integer`);
        let high = 0, low = 0;
        if (num >= 0) {
            high = num / 0x100000000;
            low = num & 0xffffffff;
        } else {
            if (-num <= 0xffffffff) {
                high = 0xffffffff;
                low = num & 0xffffffff;
            } else {
                high = 0xffffffff - (((-num) / 0x100000000) >>> 0);
                low = 0x100000000 - ((-num) & 0xffffffff);
            }
        }
        this.buffer = int32PairToBuffer(high, low);
    }
    typename(): string { throw new Error('typename do not override'); }
    toBuffer(): Buffer { throw new Error('toBuffer do not override'); }
    toString(radix: number): string { throw new Error('toString do not override'); }
}

export class Int64 extends Int64Base {
    typename(): string { return 'Int64'; }
    toBuffer(): Buffer { return this.buffer; }
    toString(radix: number): string {
        if (radix === undefined) {
            radix = 10;
        }
        const pre = prefixString(radix);
        let str = '';
        let high = this.buffer.readUInt32BE(0);
        let low = this.buffer.readUInt32BE(4);
        const negative = (high & 0x80000000) !== 0;
        if (negative) {
            high = ~high;
            // low = 2 ** 32 - low  // over v8
            low = Math.pow(2, 32) - low;  // for node v6
        }
        while (true) {
            const low_and_high_mod = (high % radix) * (2 ** 32) + low;
            if (high == -1) break;
            high = Math.floor(high / radix);
            low = Math.floor(low_and_high_mod / radix);
            str = (low_and_high_mod % radix).toString(radix) + str;
            if (!high && !low) {
                break;
            }
        }
        str = pre + str;
        if (negative) {
            str = '-' + str;
        }
        return str;
    }
}

export class UInt64 extends Int64Base {
    typename() { return 'UInt64'; }
    toBuffer(): Buffer { return this.buffer; }
    toString(radix: number): string {
        if (radix === undefined) {
            radix = 10;
        }
        const pre = prefixString(radix);
        let high = this.buffer.readUInt32BE(0);
        let low = this.buffer.readUInt32BE(4);
        let str = '';
        while (true) {
            const low_and_high_mod = (high % radix) * (2 ** 32) + low;
            if (high == -1) break;
            high = Math.floor(high / radix);
            low = Math.floor(low_and_high_mod / radix);
            str = (low_and_high_mod % radix).toString(radix) + str;
            if (!high && !low) {
                break;
            }
        }
        return pre + str;
    }
}
