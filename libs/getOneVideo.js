#!/usr/bin/env node

const exec = require('child_process').exec,
    argv = require('optimist').argv,
    dir = argv.d,
    url = argv.u,
    F = argv.F;



  console.log('[[[[[[[[[[[[[[[[[[[[');
    console.log(`cd ${dir} && youtube-dl https://www.youtube.com${url}`);
let child = exec(`cd ${dir} && youtube-dl https://www.youtube.com${url}`);
    console.log(']]]]]]]]]]]]]]]]]]]]');


child.stdout.pipe(process.stdout);

child.on('exit', function (data) {
    console.log('Downloaded!');
});
