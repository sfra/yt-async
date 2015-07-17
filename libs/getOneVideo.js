#!/usr/bin/env node

var exec = require('child_process').exec;

var argv = require('optimist').argv;
var child;

var dir=argv.d;
var url=argv.u;
var F=argv.F;
var paramsYTLString=argv.paramsYTLString;

//console.log(argv);

//console.log('cd '+dir+' && youtube-dl '+paramsYTLString+' '+url +' | less');

if (F) {
   // console.log('youtube-dl -F '+url + '| less');
    child=exec('youtube-dl -F '+url + '| less',function(data){
        
        
    });

  // child.stdout.pipe(process.stdout);    
    
    

} else {
    
  console.log('cd '+dir+' && youtube-dl '+url +' | less');  
  child=exec('cd '+dir+' && youtube-dl '+url +' | less');   
}



//child=exec('cd '+dir+' && youtube-dl '+paramsYTLString+' '+url +' | less',function(err,stdout,stderr){

							
//});





child.stdout.pipe(process.stdout);


child.on('exit',function(data){
    
    console.log('Downloaded!');
    });


