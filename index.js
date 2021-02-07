//npm install express body-parser cors express-fileupload morgan lodash --save
//npm install express body-parser cors express-fileupload morgan lodash mysql --save
// https://flaviocopes.com/update-npm-dependencies/
// https://medium.com/@jagatjyoti.1si13cs040/npm-g-install-npm-package-not-working-as-desired-why-why-why-19795abf0b59
// npm install -g npm
// npm cache clean
// npm update
// sudo npm install -g npm-check-updates
// ncu -u
// npm update
// npm install
// yarn add node-fetch
// sudo scp index.js package.json tracker.js  root@173.82.173.9:/Crimson/Code/CrimsonAirTracker/BE
//sudo npm install --save-dev better-docs
//sudo jsdoc /media/ruby/ruby/github/Global-Observation-Deck/crimson-code/global/text/javascript/ui/container.js -t ./node_modules/better-docs
// const mysql = require('mysql');
const http = require('http')
// const Tm = require('./global/text/javascript/T');
const https = require('https')
const Tm = require('./text/javascript/T');
const fs = require('fs');
const express = require('express');
const expressip = require('express-ip');
const query = require('url');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');
const colors = require('colors');
const fetch = require("node-fetch");
const app = express();
app.use(expressip().getIpInfoMiddleware);
var hostname;
var os = require('os');
var ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (ifname) {
    var alias = 0;
    ifaces[ifname].forEach(function (iface) {
        if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
        }
        if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
            console.log('%c' + iface.address, 'background: red; color: white');
            hostname = iface.address;
        } else {
            // this interface has only one ipv4 adress
            //   console.log(ifname, iface.address);
            console.clear();
            console.log(iface.address.white.bgRed);
            hostname = iface.address;
        }
        ++alias;
    });
});
// const xyztem = "/home/crimson/RubyOS/web/Global-Observation-Deck/crimson-code";
const xyztem = ".";
const port = 5050;
var hash = 0;
var map = new Map();
app.use(fileUpload({
    createParentPath: true,
    limits: {fileSize: 200 * 1024 * 1024 * 1024 }}));//200MB max file(s) size
app.use(cors());//add other middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//const port = process.env.PORT || 3000;
app.post('/Ruby/xyztem', async(req, res) => {
    console.log(`incoming files from ${"ip"}`);
    try {
        if (!req.files) {
            console.log(`nofiles from ${"ip"}`);
            res.send({status: false,message: 'No file uploaded'});} 
        else {            
            let avatar = req.files;//Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            console.log(`files from ${typeof avatar}`);
            for (var key in avatar) {
                console.log(key, avatar[key]);
                avatar[key].mv('/ruby/xyztem/uploads/' + key);}
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            //avatar.mv('./uploads/' + avatar.name);
            res.send({//send response
                status: true,
                message: 'File is uploaded',
                data: {name: avatar.name,mimetype: avatar.mimetype,size: avatar.size}});}} 
    catch (err) {res.status(500).send(err);}});
app.use((req, res) => {
    var url = req.url.split('/');
    let ipInfo = req.ipInfo;
    let location = ipInfo.city + ", " + ipInfo.country;
    if (req.files) {
        try {
            console.log(`incoming files from ${ip}`);
            let data = [];
            _.forEach(_.keysIn(req.files.photos), (key) => {//loop all files
                let photo = req.files.photos[key];
                photo.mv('./uploads/' + photo.name);//move photo to uploads directory
                data.push({name: photo.name,mimetype: photo.mimetype,size: photo.size});});//push file details
            res.send({//return response
                status: true,
                message: 'Files are uploaded',
                data: data});}
        catch (error) {res.status(500).send(error);}} 
    else if (url[1] === "") {
        var v = { ceo: "janice", coo: "imran", cto: "sadern" };
        for (var key in v) {}// console.log(key, v[key]);
        var ip = req.header('x-forwarded-for') || req.socket.remoteAddress;
        res.writeHead(200, { 'Content-Type': 'text/html' });
        hash++;
        let path = xyztem + "/text/html/index.html";
        fs.readFile(path,function(err, data) {
            if (err) {console.error(`error on ${path} + ${err}\n`);
                res.write(`body</body></html>`);} 
            else {res.write(`${data.toString()}`);}
            res.end();});
        console.log(`end incoming request ${ip}`);} 
    else {
        let path = xyztem + url.join('/');
        if (url[1] === "favicon.ico") {
            fs.readFile(`${xyztem}/favicon.ico`, function(err, data) {
                if (err) {console.error(`error on favicon`);} 
                else {
                    res.writeHead(200, { 'Content-Type': `image/ico` });
                    res.write(data);}
                res.end();});} 
        else if (url[1] === "map") {
            var offset = 3;
            var parameter = query.parse(req.url, true).query;
            //parameter.asset_name = "Soldier.glb";
            parameter.asset_name = "ruby_node.glb";
            // parameter.asset_name = "rubynode.glb";
            parameter.mesh_Name = "vanguard_Mesh";
            map.set(parameter.e, parameter);
            var parameters = Array.from(map.values());
            res.json(JSON.stringify(parameters));
            res.end();} 
        else if (url[1] === "icon") {
            var directory = "/image/svg+xml";
            res.json(JSON.stringify(
                fs.readdirSync(xyztem + directory).map(
                    node => {
                        if (node.endsWith(".svg")) {return `https://${hostname}:${port}${directory}/${node}`;}})));
            res.end();} 
        else if (url[1] !== "socket.io") {
            fs.readFile(path, function(err, data) {
                if (err) {console.error(`error on ${path} + ${err} ${url.length}`);} 
                else {res.writeHead(200, { 'Content-Type': `${url[1]}/${url[2]}` });
                    res.write(data);}
                res.end();});}
    }});
https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')}, app).
        listen(port, hostname, () => {
        console.log(`Listening on https://${hostname}:${port}/`);});