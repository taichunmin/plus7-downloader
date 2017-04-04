'use strict'
var _ = require('lodash');
var fs   = require('fs');
var m3u8Parser = require('./m3u8-parser');
var Promise = require('bluebird');
var rp = require('request-promise');
var URL = require('url');
var path = require('path');

var args = process.argv.splice(2)
if (!args) {
    throw new Error('no args.')
}
// console.log(url.parse(args[0]))

var tmpDir = 'download';
var mergedFilename = '';

m3u8Parser(args[0])
  .then(playlists => playlists[0])
  .then(m3u8Parser)
  .then(videos => {
    // console.log(JSON.stringify(videos, null, 2));
    if (!fs.existsSync(tmpDir)){
      fs.mkdirSync(tmpDir);
    }
    var downloaded = 0, amount = videos.length;
    return Promise.each(videos, video => new Promise((resolve, reject) => {
      var filename = path.join(tmpDir, URL.parse(video).pathname.split('/').pop());
      var stream = fs.createWriteStream(filename);
      stream.on('finish', () => {
        console.info('Download:', ++downloaded, '/', amount);
        resolve(filename);
      });
      rp(video).pipe(stream);
    }));
  })
  .then(videos => new Promise((resolve, reject) => {
    // merge ts files
    var videosTxt = 'ffconcat version 1.0\n';
    var videosTxtPath = path.join('download', 'videos.txt');
    var fout = path.join('download', (new Date()).getTime() + '.ts');
    console.log(videosTxtPath);
    videosTxt += _.map(videos, video => 'file ' + video.replace(/\\/g, '/')).join('\n');
    fs.writeFileSync(videosTxtPath, videosTxt);
    exec('ffmpeg -f concat -i '+videosTxtPath+' -c copy ' + fout, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      }
      videos.push(videosTxtPath);
      resolve(videos);
    });
  })).then(deleteFiles => {
    // delete files
    _.each(deleteFiles, deleteFile => {
      if(fs.statSync(deleteFile).isFile())
        fs.unlinkSync(deleteFile);
    });
  });

// node index.js "http://plus7hd-pts.cdn.hinet.net/pts-plus7hd/_definst_/smil:mbroutput/169/7_SUN/PTS-2017-04-02-21-00/PTS-2017-04-02-21-00.smil/playlist.m3u8?token=3b2CVXsgM_Nud__XBaH9bw&expires=1491753599"
