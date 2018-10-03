JMETER CONVERTER
========================
JSON -> JMX

JSON Format:

#### Step 1. create input.json


    {
      "method": "GET", //POST
      "url": "http://DOMAIN:PORT/PATH",
      "redirect": "follow_redirects", // (follow_redirects, auto_redirects , "")
      "use_keepalive" : true,
      "multipart_post" : false,
      "browser_compatible": true,
      "connect_timeout": 0,
      "response_timeout": 0,
      "parameter": {"name": "JOHN"},
      "body": "",
      //"body": {"name": "MARY"},
      "thread":{
                    "ramp_time": 9, //(0,~)
                    "num_threads": 10, //(0,~)
                    "loops" : 1, //(-1=forever,0, 1~)
                    "on_sample_error": "startnextloop" //(startnextloop, stopthread, stoptest, stoptestnow, continue)
      }
    }

#### step 2. install nodejs

#### step 3. npm i

#### step 4. node app.js

#### step 5. input.jmx <--- use JMeter to open then finish. 


|Author|Coding Dog|
|---|---
|Github|sayyes566





