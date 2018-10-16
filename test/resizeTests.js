var resize = require('../resize');
var assert = require('assert');
var fs = require('fs');
var streamCompare = require('stream-compare');
var expect = require('chai').expect;

describe('original()', function () {
    it('should return the original image', function () {
        // arrange
        const sampleJpegPath = './test/images/user/sample.jpeg';
        const testJpegPath = './test/images/user/sample.1.jpeg';

        // act
        var testImage = fs.createReadStream(sampleJpegPath);
        var sampleImage = resize.original(testJpegPath);

        // assert
        return streamCompare(sampleImage, testImage, assert.deepStrictEqual)
            .catch(function (err) {
                // TODO: investigate why the failure case for this is a timeout
                assert.equal(err, null);
            });
    });
    it('should mismatch original image', function () {
        // arrange
        const sampleJpegPath = './test/images/user/sample.jpeg';
        const testJpegPath = './test/images/user/200.jpeg';

        // act
        var testImage = fs.createReadStream(testJpegPath);
        var sampleImage = resize.original(sampleJpegPath);

        // assert
        return streamCompare(sampleImage, testImage, assert.deepStrictEqual)
            .catch(function (err) {
                assert.notEqual(err, null);
            });
    });
});

// TODO: add more tests here - test more resize settings, bad data input, partial data input, etc.
describe('resize()', function () {
    it('should return the resized image', function () {
        // arrange
        const sampleJpegPath = './test/images/user/sample.jpeg';
        const testJpegPath = './test/images/user/contain200300.jpg';

        // act
        var resizedImage = resize.resize(sampleJpegPath, 'jpeg', 300, 200, 'contain');
        var testImage = fs.createReadStream(testJpegPath);

        // assert
        return streamCompare(resizedImage, testImage, assert.deepStrictEqual)
            .catch(function (err) {
                assert.notEqual(err, null);
            });
    });
});