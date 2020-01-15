'use strict';
const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const Bcrypt = require('bcryptjs');
const HapiAuthBasic = require('hapi-auth-basic');

const fs = require('fs');
// - - -
const Database = require('./controllers/helpers/database');
// CUSTOM CONTROLLERS
const Routes = require('./routes');
// SERVER SETTINGS
const server = Hapi.server({
    port: 6260,
    host: 'localhost',
    routes: {
        cors: {
          origin: ['*'],
          credentials: true
        },
        state: {
            parse: true,
            failAction: 'ignore'
        }      
    }
});


// SERVER INIT
const init = async () => {
    await server.register([
        Inert,
        Vision,        
        HapiAuthBasic   
    ]);        
  
    // ROUTES
    server.route(Routes);
    // SERVER START
    await server.start();    
    return server;
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    //process.exit(1);    
});





init().then(async (server) => {
    
        console.log(`Aggio Node Server running at: ${server.info.uri}`);   
        console.info("Connecting to database...");
        Database.getDBConnection();   
            
    })
    .catch(error => {
        console.log(error);
});