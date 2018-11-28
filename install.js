const fs = require('fs'),
  path = require('path'),
  http = require('http'),
  https = require('https'),
  spawn = require('child_process').spawn,
  exec = require('child_process').exec,
  readline = require('readline'),
  download = require('download-file'),
  CliFrames = require('cli-frames');

let rl = readline.createInterface(process.stdin, process.stdout);
let nodePromise = null;


function instalYoutubeDl() {

  exec('youtube-dl --version', (err, stdout, stderr) => {
    if (err || stderr) {
      console.error(err || stderr);
      return;
    } else {

      http.get('http://youtube-dl.org/', function (res) {
        let ytPage = '';

        res.on('data', function (chunk) {
          ytPage += chunk;
        });

        res.on('end', function () {
          ytPage.replace(/\(v([0-9\.]*)\)/g, (match, gr0) => {

            if (stdout < gr0) {
              console.log(`The current version of youtube-dl is (${gr0}) and is newest than yours (${stdout.replace(/(\r\n\t|\n|\r\t)/gm,'')}).
It is recommended to install the newest version of youtube-dl. Do you want to proceed [y/n]?`);
              rl.setPrompt('>');
              rl.prompt();
              rl.on('line', (line) => {
                if (line === 'y' || line === 'Y' || line === 'yes' || line === 'Yes') {
                  let optiuons = {
                    directory: './bin/',
                    filename: process.platform === 'linux' ? 'youtube-dl' : 'youtube-dl.exe'
                  };


                  let wget = spawn('wget', [`http://youtube-dl.org/downloads/latest/youtube-dl${process.platform==='linux'?'':'.exe'}`]);

                  let animationOptions = {
                    frames: [">", ">>", ">>>", ">>>>", ">>>>>", ">>>>>>"],
                    autostart: {
                      delay: 1000,

                      end: function (err, data) {

                      }
                    }
                  };

                  let animation = new CliFrames(
                    animationOptions
                  );

                  wget.stdout.on('data', (data) => {






                    console.log(data.toString());
                  });

                  wget.on('exit', (code) => {

                    if (code === 0) {
                      exec(`mv youtube-dl${process.platform==='linux'?'':'.exe'} bin`);
                      console.log('OK.');
                    }
                  });



                }
              })
            }
          });
        });

      });


    }

  });


}

function main() {

  instalYoutubeDl();
}

main();
