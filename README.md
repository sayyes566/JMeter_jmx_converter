JMETER CONVERTER
========================
JSON -> JMX

JSON Format:

#### Step 1. create input.json

```
{
  "testname" :"label-23", //string
  "method": "GET",  //string
  "url": "http://domain:port/path",  //string
  "redirect": "follow_redirects", //string
  "use_keepalive" : true, //boolean
  "multipart_post" : false, //boolean
  "browser_compatible": true, //boolean
  "connect_timeout": 0, //number
  "response_timeout": 0, //number
  "parameter": {"q":"vvdd"}, // json or null or ""
  "body": "",  // json or null or ""
  "headers": {"conten-type":"application/json"},  // json or null or ""
  "thread":{
                "ramp_time": 4, //number
                "num_threads": 4, //number
                "loops" : 1, //number
                "on_sample_error": "startnextloop" //string
  }
}
```


#### step 2. install nodejs

#### step 3. npm i

#### step 4. node app.js

#### step 5. execute JMeter

```
jmeter -n -t ./input.jmx -l ./result.jtl
```

#### step 6. generate dashbaord
```
jmeter -g *jtl -o ./dashbaord
```
#### step 7. to get  aggregate report
```
node fetch-aggregate-report.js 

output result.json 
```
|Author|Coding Dog|
|---|---
|Github|sayyes566





