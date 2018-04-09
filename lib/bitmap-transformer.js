const BitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('../lib/read-from');

class BitmapTransformer {
    constructor(filename, header) {
        this.filename = filename;
        //this.buffer = buffer;
        this.header = header; //new BitmapHeader(buffer);
    }

    transform(fn, filename) {
        const writeStream = fs.createWriteStream(filename);

        return new Promise((resolve, reject) => {
    
            readFrom(this.filename, 53)
                .then(buffer => {
    
                    
                })
                .catch(err => reject(err));
        });
        

    }
}

BitmapTransformer.create = function(filename){
    return BitmapHeader(filename)
        .then(header =>{
            return new BitmapTransformer(filename, header); 
        });
};
module.exports = BitmapTransformer;


// for(let i = 54; i < this.header.fileSize; i += 3) {
//     let r = this.buffer[i];
//     let g = this.buffer[i + 1];
//     let b = this.buffer[i + 2];
//     let newNum = fn({ r: r, g: g, b: b });
//     this.buffer[i] = newNum.r;
//     this.buffer[i + 1] = newNum.g;
//     this.buffer[i + 2] = newNum.b;
// }