require('dotenv').config()
const fs = require("fs");
const { Pool } = require('pg')
const path = require('path')

const pool = new Pool({
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: process.env.PG_DATABASE,
})
//console.log(__dirname);
//console.log(process.cwd());
fs.readFile("/home/jogeykristen/Downloads/development_gateways.json", "utf8", (err, jsonString) => {
    if (err) {
      console.log("File read failed:", err);
      return;
    }
    //console.log("File data:", JSON.parse(jsonString));
    const devices = JSON.parse(jsonString);
    Object.keys(devices).forEach(device_id => {
        const mac_address = devices[device_id];
        //console.log("nooo =",devices[device_id])
        const query = {
            text: 'UPDATE gateway SET device_id = $1 WHERE mac_address = $2',
            values: [device_id, mac_address],
          };
        pool.query(query, (err, res) => {
            if (err) {
              console.log(err);
            } else {
              console.log(`Device ${mac_address} updated with device_id ${device_id}`);
            }
          });
    })
    });



// pool.query('UPDATE gateway SET device_id where mac_address:mac:address and device_id:device_id', (err, res) => {
//     console.log(err, res)
//     pool.end()
//   })
  