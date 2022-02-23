const fs = require('fs');
const db = './db/data.json';

const save = (data) => {
    fs.writeFileSync(db, JSON.stringify(data));
}

const read = () => {
    if (!fs.existsSync(db)) {
        return null;
    }

    return JSON.parse(fs.readFileSync(db, {encoding: 'utf-8'}));
}


module.exports = {save, read}