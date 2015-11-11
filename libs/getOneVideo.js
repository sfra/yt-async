#!/usr/bin/env node

var exec = require('child_process').exec,
    argv = require('optimist').argv,
    child,
    dir = argv.d,
    url = argv.u,
    F = argv.F,
    paramsYTLString = argv.paramsYTLString;


if (F) {
    child = exec('youtube-dl -F ' + url + '| less', function (data) {});
} else {
    console.log('cd ' + dir + ' && youtube-dl ' + url + ' | less');
    child = exec('cd ' + dir + ' && youtube-dl ' + url + ' | less');
}

child.stdout.pipe(process.stdout);

child.on('exit', function (data) {
    console.log('Downloaded!');
});