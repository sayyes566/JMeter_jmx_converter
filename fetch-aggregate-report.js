const fs = require('fs');
//const DOMParser = require('xmldom').DOMParser;

require.extensions['.js'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

//generate dashbaord by jtl report 
//command: jmeter -g *jtl -o ./dashbaord
var dashbaord = require("./dashboard/content/js/dashboard.js");

data = dashboard.toString();

var array_data = data.split('$("#statisticsTable"),');

data = array_data[1];

array_data = data.split(', function');

data = array_data[0].trim();

//json = JSON.parse(data);


fs.writeFile('result.json', data, (err) => {
    if (err) throw err;
});
