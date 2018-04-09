const BitmapHeader = require('./bitmap-header');
const fs = require('fs');
const readFrom = require('../lib/read-from');

class BitmapTransformer {
    constructor(filename, header) {
        this.filename = filename;
        this.header = header;
        this.readStream = fs.createReadStream(filename, {
            // encoding: 'hex',
            highWaterMark: 3,
            start: 54
        });
    }

    transform(fn, filename) {
        const { readStream } = this;
        const writeStream = fs.createWriteStream(filename);
        let writeData = '';

        return new Promise((resolve, reject) => {
    
            readFrom(this.filename, 53)
                .then(buffer => {
                    writeStream.write(buffer);
                })
                .catch(err => reject(err));
                
            readStream.on('data', chunk => {
                let colorData = fn({ r: chunk[0], g: chunk[1], b: chunk[2] });
                
                writeData += colorData.r.toString();
                writeData += colorData.g.toString();
                writeData += colorData.b.toString();
                
                // writeData += (colorData.r.toString() + colorData.g.toString() + colorData.b.toString());
            });

            readStream.on('close', () => {
                writeStream.write(writeData, 54);
                writeStream.end(resolve);
            });

            readStream.on('error', reject);
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