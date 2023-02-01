/** Command-line tool to generate Markov text. */

const { MarkovMachine } = require('./markov')

const fs = require('fs');
const process = require('process');
const axios = require('axios')


function makeText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText());
}

function fileText(path) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.log(`There was an erro: ${err}`);
            process.exit(1);
        }
        makeText(data);
    });
}

async function webText(path) {
    try {
        let resp = await axios.get(path);
        makeText(resp.data)
    }
    catch (err) {
        console.error(`Error fetching ${path}: ${err}`);
        process.exit(1);
    }
}

if (process.argv[2] === 'url') {
    webText(process.argv[3]);

} else {
    fileText(process.argv[3]);
}
