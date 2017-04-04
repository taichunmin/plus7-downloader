'use strict'
var _ = require('lodash');
var fs   = require('fs');
var m3u8Parser = require('./m3u8-parser');
var Promise = require('bluebird');
var rp = require('request-promise');
var URL = require('url');
var Path = require('path');

var args = process.argv.splice(2)
if (!args) {
    throw new Error('no args.')
}
// console.log(url.parse(args[0]))

var tmpDir = 'download';

m3u8Parser(args[0])
  .then(playlists => playlists[0])
  .then(m3u8Parser)
  .then(videos => {
    // console.log(JSON.stringify(videos, null, 2));
    if (!fs.existsSync(tmpDir)){
        fs.mkdirSync(tmpDir);
    }
    return Promise.each(videos, video => new Promise((resolve, reject) => {
      var filename = Path.join(tmpDir, URL.parse(video).pathname.split('/').pop());
      var stream = fs.createWriteStream(filename);
      stream.on('finish', () => {resolve()});
      rp(video).pipe(stream);
      return video;
    }));
  });

// node index.js "http://plus7hd-pts.cdn.hinet.net/pts-plus7hd/_definst_/smil:mbroutput/169/7_SUN/PTS-2017-04-02-21-00/PTS-2017-04-02-21-00.smil/playlist.m3u8?token=3b2CVXsgM_Nud__XBaH9bw&expires=1491753599"
