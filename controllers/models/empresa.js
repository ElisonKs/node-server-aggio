'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empresaSchema = new Schema({
  
   dlv_id_emp : String,
   dlv_nome_emp:String
 
   
});



module.exports = mongoose.model('empresa', empresaSchema);