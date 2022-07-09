const fs = require('fs');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

async function webCat(url){
    try {
        let res = await axios.get(url);
        console.log(res);
    } catch (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    }

}

let path = process.argv[2]

if (path.slice(0,4) === 'http'){
    webCat(path)
} else {
    cat(path)
}