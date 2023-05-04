const express = require('express')
const cors = require('cors')
const fs = require('fs');
const bodyParser = require('body-parser');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3030;
        this.estudiantesPath = '/api/estudiantes';

        // Middlewares
        this.middlewares();
        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares(){

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        // Directorio Publico
        this.app.use( express.static('public'))

    }

    routes() {
        
      this.app.use(this.estudiantesPath, require('../routes/estudiantesRoute'))
    }

    listen(){
            this.app.listen(this.port, () => {
            console.log(`Puerto activo: ${this.port}`)
          })
    }
}

module.exports = Server;