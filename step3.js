const fs = require('fs');
const axios = require('axios');

function copy(path, added){
        if(added){
            fs.writeFile(added, path, 'utf8', function(err){
                if(err){
                    console.error(`Error writing ${added}: ${err}`);
                    process.exit(1);
                }
            });
        } else {
            console.log(path)
        }
}

function cat(path, added){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        copy(data, added);
    });
}

async function webCat(url, added){
    try {
        let res = await axios.get(url);
        copy(res.data, added);
    } catch (err) {
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    }

}

let path;
let added;

if(process.argv[2] === '--out'){
    added = process.argv[3]
    path =process.argv[4] 
} else {
    path = process.argv[2]
}



if (path.slice(0,4) === 'http'){
    webCat(path, added)
} else {
    cat(path, added)
}