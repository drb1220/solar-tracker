const fs = require('fs');
const fetch = require("node-fetch");

console.log('Hello World!');

fetch('http://192.168.254.160/cgi-bin/dl_cgi?Command=DeviceList')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // or response.text(), response.blob(), etc.
    })
    .then(data => {
        //console.log('Data received:', data);
        let time = data.devices[0].CURTIME;
        let timeFixed = time[5]+time[6]+"-"+time[8]+time[9]+"-"+time[0]+time[1]+time[2]+time[3]+" "+time[11]+time[12]+":"+time[14]+time[15];
        console.log(timeFixed);
        let working = (data.devices[0].STATE == "working");
        let gross = parseFloat(data.devices[1].p_3phsum_kw).toFixed(4);
        let exported = (parseFloat(data.devices[2].p_3phsum_kw)*-1).toFixed(4);
        let usage = (gross - exported).toFixed(4);
        if(exported < 0) exported = 0;
        console.log('Result: ', gross,usage,exported);

        let csvString = "\n" + timeFixed + ", " + working + ", "+ gross + ", " + usage + ", " + exported + ",";
        console.log(csvString);
        for(let i = 3; i < 31; i++){
            csvString += ", " + parseFloat(data.devices[i].p_3phsum_kw).toFixed(4);
        }
        console.log(csvString);

        fs.appendFile("log.csv", csvString, (err) => {
            if (err) {
                console.error('Error appending to file:', err);
                return;
            }
            console.log('Data appended to file successfully.');
        });

    })
    .catch(error => {
        console.error('Error:', error);
    });