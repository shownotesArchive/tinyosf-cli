#!/usr/bin/env node

var tinyosf = require('tinyosf');
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
  var parsed = tinyosf.tinyosf.Parser(osf);
  var exported = tinyosf.tinyosf.Export(parsed, tinyosf.osfExportModules[argv.mode]);
  console.log(exported);
});
