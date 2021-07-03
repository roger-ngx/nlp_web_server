const formidable = require('formidable');
const file = require('fs');
const path = require('path');
const express = require('express');
const router = express.Router();
var io = require('../ws/server');
const WebSocket = require('ws');
const { get, set, find } = require('lodash');

const DatasetControler = require('../controller/datasetController');

router.route('/').post(DatasetControler.view);

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
            try{
                const data = file.readFileSync(f.path);
                file.writeFileSync(`${path.resolve('./')}/uploaded_files/${get(reqData, 'user.id','')}-${f.name}`, data);
                file.unlinkSync(f.path);

                set(reqData, 'filePath', `${path.resolve('./')}/uploaded_files/${get(reqData, 'user.id','')}-${f.name}`);
            }catch(ex){
                console.log(ex);
            }
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
            // console.log(io.sockets.sockets);
            const socket = find(Array.from(io.sockets.sockets.values()), {'id': 'thanhnguyen', connected: true});
            if (socket) {
                socket.emit('thanhnguyen', Math.round(bytesReceived/bytesExpected * 100));
            }
            // io.to('thanhnguyen').emit('thanhnguyen', Math.round(bytesReceived/bytesExpected * 100))
        })
        .on("aborted", () => {
            reject(res.status(500).send('Aborted')) 
        })
        .on("end", () => {
            try{
                const {user, projectId, datasetName, datasetType, filePath} = reqData;

                const _req = {
                    body: {
                        owner_id: user.id,
                        project_id: projectId,
                        name: datasetName,
                        type: datasetType,
                        filePath: filePath
                    }
                };

                DatasetControler.add(_req, res);
                res.status(200).send('Dataset is saved');
            }catch(ex){
                res.status(500).send('Error' + JSON.parse(ex));
            }
        });

        await form.parse(req);
    });
});

module.exports = router;