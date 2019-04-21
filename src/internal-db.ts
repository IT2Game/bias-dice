import nedb = require('nedb');
import path = require('path');
import fs = require('fs');

var databasePath = path.join(__dirname, '..', 'db');

interface PercentageEntry{
    user_id: string,
    percentage: number,
    lastBaseValue: number
}

if(!fs.existsSync(databasePath)){
    fs.mkdirSync(databasePath, {recursive: true});
}

var percentages = new nedb(path.join(__dirname, '..', 'data', 'percentanges.db'));

percentages.loadDatabase();