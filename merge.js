const _ = require('lodash');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs   = require('fs');
const exec = require('child_process').exec;

var videos = [
  'download\\media_b4000000_0.ts',
  'download\\media_b4000000_1.ts',
  'download\\media_b4000000_2.ts',
  'download\\media_b4000000_3.ts',
  'download\\media_b4000000_4.ts',
  'download\\media_b4000000_5.ts',
  'download\\media_b4000000_6.ts',
  'download\\media_b4000000_7.ts',
  'download\\media_b4000000_8.ts',
  'download\\media_b4000000_9.ts',
  'download\\media_b4000000_10.ts',
  'download\\media_b4000000_11.ts',
  'download\\media_b4000000_12.ts',
  'download\\media_b4000000_13.ts',
  'download\\media_b4000000_14.ts',
  'download\\media_b4000000_15.ts',
  'download\\media_b4000000_16.ts',
  'download\\media_b4000000_17.ts',
  'download\\media_b4000000_18.ts',
  'download\\media_b4000000_19.ts',
  'download\\media_b4000000_20.ts',
  'download\\media_b4000000_21.ts',
  'download\\media_b4000000_22.ts',
  'download\\media_b4000000_23.ts',
  'download\\media_b4000000_24.ts',
  'download\\media_b4000000_25.ts',
  'download\\media_b4000000_26.ts',
  'download\\media_b4000000_27.ts',
  'download\\media_b4000000_28.ts',
  'download\\media_b4000000_29.ts',
  'download\\media_b4000000_30.ts',
  'download\\media_b4000000_31.ts',
  'download\\media_b4000000_32.ts',
  'download\\media_b4000000_33.ts',
  'download\\media_b4000000_34.ts',
  'download\\media_b4000000_35.ts',
  'download\\media_b4000000_36.ts',
  'download\\media_b4000000_37.ts',
  'download\\media_b4000000_38.ts',
  'download\\media_b4000000_39.ts',
  'download\\media_b4000000_40.ts',
  'download\\media_b4000000_41.ts',
  'download\\media_b4000000_42.ts',
  'download\\media_b4000000_43.ts',
  'download\\media_b4000000_44.ts',
  'download\\media_b4000000_45.ts',
  'download\\media_b4000000_46.ts',
  'download\\media_b4000000_47.ts',
  'download\\media_b4000000_48.ts',
  'download\\media_b4000000_49.ts',
  'download\\media_b4000000_50.ts',
  'download\\media_b4000000_51.ts',
  'download\\media_b4000000_52.ts',
  'download\\media_b4000000_53.ts',
  'download\\media_b4000000_54.ts',
  'download\\media_b4000000_55.ts',
  'download\\media_b4000000_56.ts',
  'download\\media_b4000000_57.ts',
  'download\\media_b4000000_58.ts',
  'download\\media_b4000000_59.ts',
  'download\\media_b4000000_60.ts',
  'download\\media_b4000000_61.ts',
  'download\\media_b4000000_62.ts',
  'download\\media_b4000000_63.ts',
  'download\\media_b4000000_64.ts',
  'download\\media_b4000000_65.ts',
  'download\\media_b4000000_66.ts',
  'download\\media_b4000000_67.ts',
  'download\\media_b4000000_68.ts',
  'download\\media_b4000000_69.ts',
  'download\\media_b4000000_70.ts',
  'download\\media_b4000000_71.ts',
  'download\\media_b4000000_72.ts',
  'download\\media_b4000000_73.ts',
  'download\\media_b4000000_74.ts',
  'download\\media_b4000000_75.ts',
  'download\\media_b4000000_76.ts',
  'download\\media_b4000000_77.ts',
  'download\\media_b4000000_78.ts',
  'download\\media_b4000000_79.ts',
  'download\\media_b4000000_80.ts',
  'download\\media_b4000000_81.ts',
  'download\\media_b4000000_82.ts',
  'download\\media_b4000000_83.ts',
  'download\\media_b4000000_84.ts',
  'download\\media_b4000000_85.ts',
  'download\\media_b4000000_86.ts',
  'download\\media_b4000000_87.ts',
  'download\\media_b4000000_88.ts',
  'download\\media_b4000000_89.ts',
  'download\\media_b4000000_90.ts',
  'download\\media_b4000000_91.ts',
  'download\\media_b4000000_92.ts',
  'download\\media_b4000000_93.ts',
  'download\\media_b4000000_94.ts',
  'download\\media_b4000000_95.ts',
  'download\\media_b4000000_96.ts',
  'download\\media_b4000000_97.ts',
  'download\\media_b4000000_98.ts',
  'download\\media_b4000000_99.ts',
  'download\\media_b4000000_100.ts',
  'download\\media_b4000000_101.ts',
  'download\\media_b4000000_102.ts',
  'download\\media_b4000000_103.ts',
  'download\\media_b4000000_104.ts',
  'download\\media_b4000000_105.ts',
  'download\\media_b4000000_106.ts',
  'download\\media_b4000000_107.ts',
  'download\\media_b4000000_108.ts',
  'download\\media_b4000000_109.ts',
  'download\\media_b4000000_110.ts',
  'download\\media_b4000000_111.ts',
  'download\\media_b4000000_112.ts',
  'download\\media_b4000000_113.ts',
  'download\\media_b4000000_114.ts',
  'download\\media_b4000000_115.ts',
  'download\\media_b4000000_116.ts',
  'download\\media_b4000000_117.ts',
  'download\\media_b4000000_118.ts',
  'download\\media_b4000000_119.ts',
  'download\\media_b4000000_120.ts',
  'download\\media_b4000000_121.ts',
  'download\\media_b4000000_122.ts',
  'download\\media_b4000000_123.ts',
  'download\\media_b4000000_124.ts',
  'download\\media_b4000000_125.ts',
  'download\\media_b4000000_126.ts',
  'download\\media_b4000000_127.ts',
  'download\\media_b4000000_128.ts',
  'download\\media_b4000000_129.ts',
  'download\\media_b4000000_130.ts',
  'download\\media_b4000000_131.ts',
  'download\\media_b4000000_132.ts',
  'download\\media_b4000000_133.ts',
  'download\\media_b4000000_134.ts',
  'download\\media_b4000000_135.ts',
  'download\\media_b4000000_136.ts',
  'download\\media_b4000000_137.ts',
  'download\\media_b4000000_138.ts',
  'download\\media_b4000000_139.ts',
  'download\\media_b4000000_140.ts',
  'download\\media_b4000000_141.ts',
  'download\\media_b4000000_142.ts',
  'download\\media_b4000000_143.ts',
  'download\\media_b4000000_144.ts',
  'download\\media_b4000000_145.ts',
  'download\\media_b4000000_146.ts',
  'download\\media_b4000000_147.ts',
  'download\\media_b4000000_148.ts',
  'download\\media_b4000000_149.ts',
  'download\\media_b4000000_150.ts',
  'download\\media_b4000000_151.ts',
  'download\\media_b4000000_152.ts',
  'download\\media_b4000000_153.ts',
  'download\\media_b4000000_154.ts',
  'download\\media_b4000000_155.ts',
  'download\\media_b4000000_156.ts',
  'download\\media_b4000000_157.ts',
  'download\\media_b4000000_158.ts',
  'download\\media_b4000000_159.ts',
  'download\\media_b4000000_160.ts',
  'download\\media_b4000000_161.ts',
  'download\\media_b4000000_162.ts',
  'download\\media_b4000000_163.ts',
  'download\\media_b4000000_164.ts',
  'download\\media_b4000000_165.ts',
  'download\\media_b4000000_166.ts',
  'download\\media_b4000000_167.ts',
  'download\\media_b4000000_168.ts',
  'download\\media_b4000000_169.ts',
  'download\\media_b4000000_170.ts',
  'download\\media_b4000000_171.ts',
  'download\\media_b4000000_172.ts',
  'download\\media_b4000000_173.ts',
  'download\\media_b4000000_174.ts',
  'download\\media_b4000000_175.ts',
  'download\\media_b4000000_176.ts',
  'download\\media_b4000000_177.ts',
  'download\\media_b4000000_178.ts',
  'download\\media_b4000000_179.ts',
  'download\\media_b4000000_180.ts',
  'download\\media_b4000000_181.ts',
  'download\\media_b4000000_182.ts',
  'download\\media_b4000000_183.ts',
  'download\\media_b4000000_184.ts',
  'download\\media_b4000000_185.ts',
  'download\\media_b4000000_186.ts',
  'download\\media_b4000000_187.ts',
  'download\\media_b4000000_188.ts',
  'download\\media_b4000000_189.ts',
  'download\\media_b4000000_190.ts',
  'download\\media_b4000000_191.ts',
  'download\\media_b4000000_192.ts',
  'download\\media_b4000000_193.ts',
  'download\\media_b4000000_194.ts',
  'download\\media_b4000000_195.ts',
  'download\\media_b4000000_196.ts',
  'download\\media_b4000000_197.ts',
  'download\\media_b4000000_198.ts',
  'download\\media_b4000000_199.ts',
  'download\\media_b4000000_200.ts',
  'download\\media_b4000000_201.ts',
  'download\\media_b4000000_202.ts',
  'download\\media_b4000000_203.ts',
  'download\\media_b4000000_204.ts',
  'download\\media_b4000000_205.ts',
  'download\\media_b4000000_206.ts',
  'download\\media_b4000000_207.ts',
  'download\\media_b4000000_208.ts',
  'download\\media_b4000000_209.ts',
  'download\\media_b4000000_210.ts',
  'download\\media_b4000000_211.ts',
  'download\\media_b4000000_212.ts',
  'download\\media_b4000000_213.ts',
  'download\\media_b4000000_214.ts',
  'download\\media_b4000000_215.ts',
  'download\\media_b4000000_216.ts',
  'download\\media_b4000000_217.ts',
  'download\\media_b4000000_218.ts',
  'download\\media_b4000000_219.ts',
  'download\\media_b4000000_220.ts',
  'download\\media_b4000000_221.ts',
  'download\\media_b4000000_222.ts',
  'download\\media_b4000000_223.ts',
  'download\\media_b4000000_224.ts',
  'download\\media_b4000000_225.ts',
  'download\\media_b4000000_226.ts',
  'download\\media_b4000000_227.ts',
  'download\\media_b4000000_228.ts',
  'download\\media_b4000000_229.ts',
  'download\\media_b4000000_230.ts',
  'download\\media_b4000000_231.ts',
  'download\\media_b4000000_232.ts',
  'download\\media_b4000000_233.ts',
  'download\\media_b4000000_234.ts',
  'download\\media_b4000000_235.ts',
  'download\\media_b4000000_236.ts',
  'download\\media_b4000000_237.ts',
  'download\\media_b4000000_238.ts',
  'download\\media_b4000000_239.ts',
  'download\\media_b4000000_240.ts',
  'download\\media_b4000000_241.ts',
  'download\\media_b4000000_242.ts',
  'download\\media_b4000000_243.ts',
  'download\\media_b4000000_244.ts',
  'download\\media_b4000000_245.ts',
  'download\\media_b4000000_246.ts',
  'download\\media_b4000000_247.ts',
  'download\\media_b4000000_248.ts',
  'download\\media_b4000000_249.ts',
  'download\\media_b4000000_250.ts',
  'download\\media_b4000000_251.ts',
  'download\\media_b4000000_252.ts',
  'download\\media_b4000000_253.ts',
  'download\\media_b4000000_254.ts',
  'download\\media_b4000000_255.ts',
  'download\\media_b4000000_256.ts',
  'download\\media_b4000000_257.ts',
];

new Promise((resolve, reject) => {
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
});

// ffmpeg -f concat -i videos.txt -c copy all.ts