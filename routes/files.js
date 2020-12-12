const formidable = require('formidable');
const file = require('fs');
const express = require('express');
const router = express.Router();
var socket = require('../ws/server');
const WebSocket = require('ws');
const { get, set } = require('lodash');

const DatasetControler = require('../controller/datasetController');

router.get('/', async (req, res, next) => {
    res.send('file api');
});

router.route('/:owner_id').get(DatasetControler.view);

router.post('/upload', async (req, res, next) => {
    console.log('req body: ' + JSON.stringify(req.body));

    const reqData = {};

    return new Promise(async (resolve, reject) => {
        const form = formidable.IncomingForm({
          multiples: true,
          keepExtensions: true,
          maxFileSize: 1000 * 1000 * 1000
        });

        form.on("file", (name, f) => {
            // console.log(f);

            const data = file.readFileSync(f.path);
            file.writeFileSync(`/Users/thanhnguyen/Code/roger/files_come_here/${get(reqData, 'user.id','')}-${f.name}`, data);
            file.unlinkSync(f.path);

            set(reqData, 'filePath', `/Users/thanhnguyen/Code/roger/files_come_here/${get(reqData, 'user.id','')}-${f.name}`);
        })
        .on('field', (key, value) => {
            if(key==='user'){
                set(reqData, 'user', JSON.parse(value));
            } else {
                set(reqData, `${key}`, value);
            }
        })
        // .on('data', data => {
        //     console.log(data);
        // })
        .on('progress', (bytesReceived, bytesExpected) => {
            socket.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(Math.round(bytesReceived/bytesExpected * 100));
                }
            });
        })
        .on("aborted", () => {
            reject(res.status(500).send('Aborted'))  
        })
        .on("end", () => {
            // console.log('reqData', JSON.stringify(reqData));
            const req = {
                body: {
                    owner_id: reqData.user.id,
                    name: reqData.datasetName,
                    type: reqData.datasetType,
                    filePath: reqData.filePath
                }
            };

            DatasetControler.add(req, res);
        });

        await form.parse(req);
    });
});

module.exports = router;