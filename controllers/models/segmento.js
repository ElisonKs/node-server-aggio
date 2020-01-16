'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const segmentoSchema = new Schema({
  
   dlv_id_seg : String,
   dlv_desc_seg:String
 
   
});



module.exports = mongoose.model('segmento', segmentoSchema);