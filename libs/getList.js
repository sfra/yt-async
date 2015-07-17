var https = require('https'),
    cheerio = require('cheerio'),
    sys = require('sys'),
    exec = require('child_process').exec,
    child_process=require('child_process');
    
var wholeOutput=[];    
//var stream=require('stream');    
//var last=true;
var nr=0;


var printLineFromStd=function(line,that) {

    if (line.slice(0,6)==='[info]') {
	var lineArr=line.split('\n');
	    for (var i=0, max=lineArr.length; i<max;i++) {
		that.wholeOutput.push(lineArr[i]);
	    }
    }
}







function getFullListOfParams(paramsYTDL,paramsYTL,add) {
    var start=add.indexOf('?');
    var end=add.indexOf('&');
    var ytId=add.slice(0,end);
    var url='https://www.youtube.com'+ytId;
    var out=[];
    if (paramsYTL.F) {
	out.push('-F');
	out.push('-u '+url);
	return out;
    };
    
//    var paramsYTLString='';


    for (var prop in paramsYTL) {
	if (paramsYTL.hasOwnProperty(prop)) {
	    out.push(' -' + prop + ' '+paramsYTL[prop]);
	}
    }
    out.push('-d '+paramsYTDL.d);
    out.push('-u '+url);
    return out;
}




function getList(paramsYTDL, paramsYTL) {
if (!paramsYTL.F) {
    printLineFromStd=function(){};
}

//console.log(paramsYTLString);
//process.exit(0);
var start=new Date();
https.get(paramsYTDL.u, function(res) {

    var data = '';
    
    res.on('data', function (chunk) {
	data += chunk;
    });
    
    res.on('end', function() {
	$ = cheerio.load(data);
	$('#pl-load-more-destination>tr>td>a').each(function(i,e){
        nr+=1;
	    var child;
	    var add=e.attribs.href;
        var fullListOfParams = getFullListOfParams(paramsYTDL,paramsYTL,add);				    
        console.log(fullListOfParams);
	    //last=false;
	    //	    
	    //if(last) return;
						    
	    if(add.slice(0,6)==='/user/') return;
						    
	   child_process.fork('libs/getOneVideo',fullListOfParams).on('data',function(data){
		printLineFromStd(data,child);
	    
	    }).on('exit',function(e){
            nr-=1;
            console.log(nr);
            if (nr<=0) {
                var end=new Date();
                
                console.log('FINISHED:'+(end-start));
            }
        });
	});
						    
		

    });
}).on('error', function() {
    console.log('Error');
    });

 
}


exports.getList=getList;
