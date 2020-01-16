const Segmento = require('./models/segmento');
const moment = require('moment');


exports.getSegmentos = {
    auth: false,
    handler: (request, h) => {

        return new Promise(resolve => {
            Segmento.countDocuments({} , (err, sentenceCount) => {
                if (!err) {
                    var totalElems = sentenceCount;
                    Segmento.find({ }).exec((err, sentences) => {
                        if (err) {
                            console.log(err);
                            resolve({ status: 'ERROR', message: "Server error" });
                        } else {
                            // FORMAT DATA
                            var tmpLeads = [];
                            for (var elem of sentences) {
                                var elemTmp = JSON.parse(JSON.stringify(elem));
                                var elemData = moment(elemTmp.created);
                                elemTmp.created = elemData.format("DD/MM/YYYY HH:mm");
                                //console.log(elemTmp.created);
                                tmpLeads.push(elemTmp);
                            }
                            // - - -                            
                          
                            resolve({
                                status: "OK",
                                totalElems: totalElems,
                                data: tmpLeads
                            })
                        }
                    });
                } else {
                    console.log(err);
                    resolve({ status: 'ERROR', message: "Server error" });
                }
            });
        });
    }
}