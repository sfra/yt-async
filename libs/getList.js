'use strict';

const Crawler = require('crawler'),
    child_process = require('child_process');


const wholeOutput = [];
const nr = 0;

let printLineFromStd = function (line, that) {
    if (line.slice(0, 6) === '[info]') {
        let lineArr = line.split('\n');
        for (let i = 0, max = lineArr.length; i < max; i++) {
            that.wholeOutput.push(lineArr[i]);
        }
    }
};


function getFullListOfParams(paramsYTDL, paramsYTL, add) {

    let out = [];

    if (paramsYTL.F) {
        out.push('-F');

        return out;
    }

    for (let prop in paramsYTL) {
        if (paramsYTL.hasOwnProperty(prop)) {
            out.push(' -' + prop + ' ' + paramsYTL[prop]);
        }
    }

    out.push('-d ' + paramsYTDL.d);

    return out;
}

function getList(paramsYTDL, paramsYTL) {

    if (!paramsYTL.F) {
        printLineFromStd = function () {};
    }

    let listName = paramsYTDL.u.split('list=')[1];



    let links = [];

    let c = new Crawler({
        callback:(error,result,$)=>{
          //  console.log(result.body);

            let a= result.$(`a[href*="${listName}"][href^="/watch"]`);

           for(let i=0, max=a.length; i<max; i++) {
             links.push(a[i].attribs.href);
            }

            links = Array.from(new Set(links));

            let nr = links.length-1;
            let fullListOfParams = getFullListOfParams(paramsYTDL, paramsYTL);


            for(let i=0, max = links.length; i<max;i++){
                
              child_process.fork('libs/getOneVideo', fullListOfParams.concat([`-u${links[i]}`]))
                  .on('data', function (data) {
                      printLineFromStd(data, child);
                  })
                  .on('exit', function (e) {
                      nr -= 1;
                      console.log(nr);

                      if (nr <= 0) {
                          // var end = new Date();
                          // console.log('FINISHED:' + (end - start));
                      }

                  });
            }






        }
    })

c.queue(paramsYTDL.u);







}


exports.getList = getList;
