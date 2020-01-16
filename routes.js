'use strict'

const Empresas = require("./controllers/empresas");
const Segmentos = require("./controllers/segmentos");

module.exports = [
    
  
    { method: 'GET',    path: '/getEmpresas',                         options: Empresas.getEmpresas },
    { method: 'GET',    path: '/getSegmentos',                         options: Segmentos.getSegmentos },

 
]