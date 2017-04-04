'use strict'
var m3u8 = require('m3u8');
var Promise = require('bluebird');
var rp = require('request-promise');
var URL = require('url');

module.exports = (url, tmpDir) => {
  return new Promise((resolve, reject) => {
    var data = [];
    // get m3u8 file
    var parser = m3u8.createStream();
    parser.on('item', item => {
      data.push(URL.resolve(url, item.get('uri')));
    });
    parser.on('m3u', m3u => {
      resolve(data);
    });
    rp(url).pipe(parser);
  });
}
