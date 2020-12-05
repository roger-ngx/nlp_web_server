const formidable = require('formidable');
const file = require('fs');
const express = require('express');
const router = express.Router();
var socket = require('../ws/server');
const WebSocket = require('ws');

router.get('/', async (req, res, next) => {
    res.send('file api');
})

router.post('/upload', async (req, res, next) => {

    return new Promise(async (resolve, reject) => {
        const form = formidable.IncomingForm({
          multiples: true,
          keepExtensions: true,
          maxFileSize: 1000 * 1000 * 1000
        });

        form.on("file", (name, f) => {
            console.log(f);

            const data = file.readFileSync(f.path);
            file.writeFileSync(`/Users/thanhnguyen/Code/roger/files_come_here/${f.name}`, data);
            file.unlinkSync(f.path);
        })
        .on('progress', (bytesReceived, bytesExpected) => {
            socket.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify({bytesReceived, bytesExpected}));
                }
            });
        })
        .on("aborted", () => {
            reject(res.status(500).send('Aborted'))  
        })
        .on("end", () => {
            resolve(res.status(200).send('done'));
        });

        await form.parse(req)
    });
});

module.exports = router;