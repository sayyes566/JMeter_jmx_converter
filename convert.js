const fs = require('fs');
//const DOMParser = require('xmldom').DOMParser;
require.extensions['.jmx'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var template = {
 "params": "./template/parameters.jmx",
 "body": "./template/body.jmx",
 "null": "./template/body.jmx"
}

var data = require("./input.json")
//loding file
file = (data.parameter)? template.params : (data.body)? template.body : template.null ;
const xml = require(file);
console.log(file)


//jQuery
var jsdom = require('jsdom');
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);
xmlDoc = $.parseXML( xml ),
$xml = $( xmlDoc ),
$title = $xml.find( "jmeterTestPlan" );




//JMX position
var pos = {
  method: 'stringProp[name$="HTTPSampler.method"]',
  url_domain: 'stringProp[name$="HTTPSampler.domain"]',
  url_port: 'stringProp[name$="HTTPSampler.port"]',
  url_protocol: 'stringProp[name$="HTTPSampler.protocol"]',
  url_path: 'stringProp[name$="HTTPSampler.path"]',
  redirect_follow: 'boolProp[name$="HTTPSampler.follow_redirects"]',
  redirect_auto: 'boolProp[name$="HTTPSampler.auto_redirects"]',
  use_keepalive: 'boolProp[name$="HTTPSampler.use_keepalive"]',
  multipart_post: 'boolProp[name$="HTTPSampler.DO_MULTIPART_POST"]',
  browser_compatible: 'boolProp[name$="HTTPSampler.BROWSER_COMPATIBLE_MULTIPART"]',
  connect_timeout: 'stringProp[name$="HTTPSampler.connect_timeout"]',
  response_timeout: 'stringProp[name$="HTTPSampler.response_timeout"]',
  parameter: 'collectionProp[name$="Arguments.arguments"]',
  body: 'stringProp[name$="Argument.value"]',
  thread_ramp_time: 'stringProp[name$="ThreadGroup.ramp_time"]',
  thread_num_threads: 'stringProp[name$="ThreadGroup.num_threads"]',
  thread_loops: 'stringProp[name$="LoopController.loops"]',
  thread_loops_continue_forever: 'stringProp[name$="LoopController.continue_forever"]',
  thread_on_sample_error: 'stringProp[name$="LoopController.on_sample_error"]'
}

//
//  ------ set elements -----
//
var assign = async(data) =>{
  //method
  $title.find(pos.method).text(data.method);
  //url
  let url = data.url;
  split_url = url.split("/")
  $title.find(pos.url_protocol).text(split_url[0].split(":")[0]);
  $title.find(pos.url_domain).text(split_url[2].split(":")[0]);
  (split_url[2].split(":").length == 2) ? $title.find(pos.url_port).text(split_url[2].split(":")[1]): $title.find(pos.url_port).text(80);
  $title.find(pos.url_path).text(url.split(split_url[2])[1]);
  //redirect
  if ( data.redirect == 'follow_redirects'){
    $title.find(pos.redirect_follow).text(true);
    $title.find(pos.redirect_auto).text(false);
  }
  else{
    $title.find(pos.redirect_auto).text(true);
    $title.find(pos.redirect_follow).text(false);
  }
  //use_keepalive
  $title.find(pos.use_keepalive).text(data.use_keepalive);
  //multipart_post
  $title.find(pos.multipart_post).text(data.multipart_post);
  //browser_compatible
  $title.find(pos.browser_compatible).text(data.browser_compatible);
  //connect_timeout
  $title.find(pos.connect_timeout).text(data.connect_timeout);
  //response_timeout
  $title.find(pos.response_timeout).text(data.response_timeout);

  if (file == template.params){
  //parameter
  let params = data.parameter;
  var param_template = "";
  for (let key in params){
    let value = params[key];
    param_template += `<elementProp name=\"`+value+`\" elementType=\"HTTPArgument\">
                  <boolProp name=\"HTTPArgument.always_encode\">false</boolProp>
                  <stringProp name=\"Argument.value\">`;
    param_template +=  value;
    param_template +=  `</stringProp>
    <stringProp name=\"Argument.metadata\">=</stringProp>
    <boolProp name=\"HTTPArgument.use_equals\">true</boolProp>
    <stringProp name=\"Argument.name\">`;
    param_template +=  key;
    param_template +=  `</stringProp></elementProp>`;


  }
  //$title.find(pos.parameter).html(param_template);
  $title.find(pos.parameter).text(param_template);
  }else if (file == template.body){
  //body
  $title.find(pos.body).text(JSON.stringify(data.body));
  }
  //thread_ramp_time
  $title.find(pos.thread_ramp_time).text(data.thread.ramp_time);
  //thread_num_threads
  $title.find(pos.thread_num_threads).text(data.thread.num_threads);
  //thread_loops
  $title.find(pos.thread_loops).text(data.thread.loops);
  //thread_loops_continue_forever
  if(data.thread.loops == -1)
    $title.find(pos.thread_loops_continue_forever).text(true);
  //thread_on_sample_error
  $title.find(pos.thread_on_sample_error).text(data.thread.on_sample_error);
}

//
//   ----- print all ------
//
//console.log('<?xml version="1.0" encoding="UTF-8"?>');
//console.log('<jmeterTestPlan version="1.2" properties="4.0" jmeter="4.0 r1823414">');
assign(data);
//console.log( $title.find("stringProp[name$='ThreadGroup.num_threads']").text())
//console.log( $title.html())
//console.log('</jmeterTestPlan>');

let jmx =  '<?xml version="1.0" encoding="UTF-8"?>';
    jmx += '<jmeterTestPlan version="1.2" properties="4.0" jmeter="4.0 r1823414">';
    jmx += $title.html().replace(/&lt;/g, "<").replace(/&gt;/g,">");
    jmx += '</jmeterTestPlan>';

fs.writeFile('input.jmx', jmx, (err) => {
    if (err) throw err; 
});

