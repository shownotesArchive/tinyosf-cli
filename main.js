#!/usr/bin/env node

//var tinyosf = require(__dirname + '/node_modules/tinyosf/dist/tinyosf.js');
var tinyosf = require('/home/luto/luto-tinyosf/');
var argv = require('optimist').argv;

if(argv.help) {
  console.log("node main.js --mode=mode");
  console.log("Valid modes:");
  var modes = Object.keys(tinyosf.osfExportModules);
  console.log(modes.join('\n'));
  process.exit();
}

if(!argv.mode) {
  console.error("Missing mode.");
  process.exit(1);
}

if(!tinyosf.osfExportModules[argv.mode]) {
  console.error("Invalid mode.");
  process.exit(2);
}

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(osf) {
  var exported = tinyosf.tinyosf.Export(tinyosf.tinyosf.Parser(osf), tinyosf.osfExportModules[argv.mode]);
  console.log(exported);
});
