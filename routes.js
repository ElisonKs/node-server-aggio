'use strict'

const Empresas = require("./controllers/empresas");

module.exports = [
    
  
    { method: 'GET',    path: '/getEmpresas',                         options: Empresas.getEmpresas },

 
]