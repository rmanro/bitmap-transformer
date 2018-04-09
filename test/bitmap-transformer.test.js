const assert = require('assert');
const BitmapTransformer = require('../lib/bitmap-transformer');
const invert = require('../lib/invert-transformer');

describe('bitmap file transformer', () => {
    
    let actual = null;

    beforeEach(() => {
        const filename = ('./test/test-bitmap.bmp');
        return BitmapTransformer.create(filename) 
            .then (bitmap => {
                actual = bitmap;
            });
    });

    it('CREATE - returns header info in object', () => {
        const filename = ('./test/test-bitmap.bmp');
        return BitmapTransformer.create(filename) 
            .then (bitmap => {
                assert.deepEqual(bitmap, {
                    filename: './test/test-bitmap.bmp',
                    header: { pixelOffset: 54, bitsPerPixel: 24, fileSize: 30054 } });
                actual = bitmap;
            }); 
    });

    it.only('TRANSFORM - invert bmp', () => {
        const filename = './test/output-bitmap.bmp';
        const expected = './test/inverted-expected.bmp';
        return actual.transform(invert, filename)
            .then(bitmap => {
                assert.deepEqual(bitmap, expected);
            });
    });

});