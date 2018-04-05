const BitmapHeader = require('./bitmap-header');

class BitmapTransformer {
    constructor(buffer) {
        this.buffer = buffer;
        this.header = new BitmapHeader(buffer);
    }

    transform(fn) {

        // for(let i = 55; i < this.header.fileSize; i + 3) {
        //     let r = this.buffer.readInt8(i);
        //     let g = this.buffer.readInt8(i + 1);
        //     let b = this.buffer.readInt8(i + 2);
        //     let newNum = fn({ r: r, g: g, b: b });
        //     this.buffer.writeInt8(newNum.r.toString(16), i);
        //     this.buffer.writeInt8(newNum.g.toString(16), i + 1);
        //     this.buffer.writeInt8(newNum.b.toString(16), i + 2);
        // }

        for(let i = 54; i < this.header.fileSize; i += 3) {
            let r = this.buffer[i];
            let g = this.buffer[i + 1];
            let b = this.buffer[i + 2];
            let newNum = fn({ r: r, g: g, b: b });
            this.buffer[i] = newNum.r;
            this.buffer[i + 1] = newNum.g;
            this.buffer[i + 2] = newNum.b;
        }
        // this is a guide to what needs to happen
        // not a recipe

        // find the right place in the buffer that you to loop 
        // and start:
        // 1. reading pixel
        // 2. passing to fn
        // 3. write pixel back to buffer

        // you have access to:
        //this.buffer
        //this.header.bitsPerPixel

        // there is a buffer.slice

        // control your javascript loop 
        // (you can "step" by something other than 1)
    }
}

module.exports = BitmapTransformer;