const fs = require('fs');
const http = require('http');

// Options for the POST request.
const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/v1/kaomojis',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
};

// Extract Kaomojis from the `kaomojis.json` file.
const data = fs.readFileSync("kaomojis.json", 'utf8');
const kaomojis = JSON.parse(data);

let count = kaomojis.length
console.log(`${count} kaomoji(s) to be sent...`)

function sendRequest(kaomoji, index) {
    if(index % 200 == 0) {
        console.log(`[${index}/${kaomojis.length}] Send kaomoji(s)...`);
    }

    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let statusCode = res.statusCode;
            if (statusCode == 201) {
                resolve();
            } else {
                reject(new Error(`Request failed with status code ${statusCode} - body: ${JSON.stringify(kaomoji)}`));
            }
        });

        req.on('error', (error) => {
            reject(error);
        });

        req.write(JSON.stringify(kaomoji));

        req.end();
        }
    );
}

async function sendRequests() {
    let index = 1;
    for (const kaomoji of kaomojis) {
        await sendRequest(kaomoji, index);
        index++;
    }
    console.log('All requests completed successfully');
    process.exit(0);
}

sendRequests();