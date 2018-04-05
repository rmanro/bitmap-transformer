const BitmapHeader = require('./bitmap-header');

class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {

        for(let i = 54; i < this.header.fileSize; i += 3) {
            let r = this.buffer[i];
            let g = this.buffer[i + 1];
            let b = this.buffer[i + 2];
            let newNum = fn({ r: r, g: g, b: b });
            this.buffer[i] = newNum.r;
            this.buffer[i + 1] = newNum.g;
            this.buffer[i + 2] = newNum.b;
        }

    }
}

module.exports = BitmapTransformer;