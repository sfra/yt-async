var http = require('https'),
    cheerio = require('cheerio'),
    sys = require('sys'),
    exec = require('child_process').exec,
    argv = require('optimist').argv,
    getList = require('./libs/getList').getList;

//node run.js -F --ytl-u PLSPScJcnp4W6lC0vME0UuCDTQ4W2h5cg9




/* params passed to youtube-dl */
var paramsYTL = {};
/* params for yt_list */
var paramsYTDL = {};

/* divide command line parameters for paramsYTL and paramsYTDL */
for (var prop in argv) {
    if (argv.hasOwnProperty(prop) && prop !== '_' && prop !== '$0') {
        if (prop.substr(0, 3) === 'ytl') {
            paramsYTDL[prop.substr(4)] = argv[prop];
        } else {
            paramsYTL[prop] = argv[prop];
        }
    }
}

if (paramsYTDL.d === undefined) {
    paramsYTDL.d = '.';
}

/*if the full adress has not been given let us complete it*/
if (((paramsYTDL.u).slice(0, 24) !== 'https://www.youtube.com/')) {
    paramsYTDL.u = 'https://www.youtube.com/playlist?list=' + paramsYTDL.u;
}

console.log(paramsYTDL.u);

if (paramsYTDL.c) {
    getList(paramsYTDL, {F: ''});
}

getList(paramsYTDL, paramsYTL);