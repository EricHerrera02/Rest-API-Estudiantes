const{response, request} = require('express')
const fs = require('fs');
const path = require('path');

const estudiantes = (req = request, res = response) => {
    try {
      const dataF = fs.readFileSync(path.join(__dirname,'../', 'listaEstudiantes.json'));
      const listaEstudiantes = JSON.parse(dataF);

      const dataC = fs.readFileSync(path.join(__dirname,'../', 'listaCarreras.json'));
      const listaCarreras = JSON.parse(dataC);

      for (let i = 0; i < listaEstudiantes.length; i++) {
  const estudiante = listaEstudiantes[i];
  const idCarrera = estudiante.carrera;
  
  for (let j = 0; j < listaCarreras.length; j++) {
    const carrera = listaCarreras[j];
    if (carrera.id === idCarrera) {

      estudiante.carrera = carrera.nombre;
      break;
    }
  }
}

      res.json({
          msg:'Lista de Estudiantes: ',
          listaEstudiantes,
      });
    } catch (err) {

      console.log(err);
      res.status(500).json({ error: 'Error al obtener la lista de estudiantes' });
    }
  }

const nuevoEstudiante = (req, res) => {
    try{
    const {nombre, rut, carrera} = req.body

    if (!Number.isInteger(carrera)) {
      res.status(400).json({ error: 'El campo carrera debe ser un número entero' });
      return;
    }

    const dataF = fs.readFileSync(path.join(__dirname,'../', 'listaEstudiantes.json'));
    const listaEstudiantes = JSON.parse(dataF);
    const dataC = fs.readFileSync(path.join(__dirname,'../', 'listaCarreras.json'));
    const listaCarreras = JSON.parse(dataC);
    const ultimoIdE = listaEstudiantes[listaEstudiantes.length - 1].id;
    const ultimoIdC = listaCarreras[listaCarreras.length - 1].id;
    const nuevoE = {}
    nuevoE.id = ultimoIdE + 1;
    nuevoE.nombre = nombre;
    nuevoE.rut = rut;
    nuevoE.carrera = carrera;
    if(carrera < 1 || carrera > ultimoIdC){
      res.status(400).json({ error: 'La carrera no existe' });
      return;
    }else{
      fs.writeFile(path.join(__dirname,'../', 'listaEstudiantes.json'), JSON.stringify([...listaEstudiantes, nuevoE]), err => {
        if (err) {
          console.log(err);
          res.status(500).send('Error al escribir en el archivo JSON');
          return;
        }
        res.json(nuevoE);
      });
    }
    
    }catch (err) {

        console.log(err);
        res.status(500).json({ error: 'Error al obtener la lista de estudiantes' });
      }
}

const editarEstudiante = (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, rut, carrera } = req.body;

      if (!Number.isInteger(carrera)) {
        res.status(400).json({ error: 'El campo carrera debe ser un número entero' });
        return;
      }

      const dataF = fs.readFileSync(path.join(__dirname, '../', 'listaEstudiantes.json'));
      const listaEstudiantes = JSON.parse(dataF);
      const dataC = fs.readFileSync(path.join(__dirname,'../', 'listaCarreras.json'));
      const listaCarreras = JSON.parse(dataC);
      const ultimoIdC = listaCarreras[listaCarreras.length - 1].id;
      const estudianteIndex = listaEstudiantes.findIndex((estudiante) => estudiante.id === parseInt(id));
      if (estudianteIndex === -1) {
        res.status(404).json({ error: 'Estudiante no encontrado' });
        return;
      }
      if(carrera < 1 || carrera > ultimoIdC){
        res.status(400).json({ error: 'Carrera no existe' });
        return;
      }
      listaEstudiantes[estudianteIndex].nombre = nombre;
      listaEstudiantes[estudianteIndex].rut = rut;
      listaEstudiantes[estudianteIndex].carrera = carrera;
      fs.writeFile(path.join(__dirname, '../', 'listaEstudiantes.json'), JSON.stringify(listaEstudiantes), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error al escribir en el archivo JSON');
          return;
        }
        res.json(listaEstudiantes[estudianteIndex]);
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error al obtener la lista de estudiantes' });
    }
  };

  const eliminarEstudiante = (req, res) => {
    try {
      const { id } = req.params;
      const dataF = fs.readFileSync(path.join(__dirname, '../', 'listaEstudiantes.json'));
      const listaEstudiantes = JSON.parse(dataF);
      const estudianteIndex = listaEstudiantes.findIndex((estudiante) => estudiante.id === parseInt(id));
      if (estudianteIndex === -1) {
        res.status(404).json({ error: 'Estudiante no encontrado' });
        return;
      }
      listaEstudiantes.splice(estudianteIndex, 1);
      fs.writeFile(path.join(__dirname, '../', 'listaEstudiantes.json'), JSON.stringify(listaEstudiantes), (err) => {
        if (err) {
          console.log(err);
          res.status(500).send('Error al escribir en el archivo JSON');
          return;
        }
        res.json({ mensaje: `Estudiante con ID ${id} eliminado exitosamente` });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Error al obtener la lista de estudiantes' });
    }
  };

  module.exports ={
    estudiantes,
    nuevoEstudiante,
    editarEstudiante,
    eliminarEstudiante
}