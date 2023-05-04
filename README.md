API de estudiantes

Descripción

API RESTful para manejo de estudiantes en una base de datos. La API permite realizar las operaciones básicas de CRUD (Create, Read, Update, Delete) sobre los estudiantes.

##Instalación
Ejecutar el comando `npm install` para descargar las dependencias de Node.js.
Levantar la API con el comando `npm start`.
Ejecutar las pruebas con el comando `artillery run artillery.yml --target http://localhost:3030`.

Rutas
##La API fue probada en Postman con las siguientes rutas:

`http://localhost:3030/api/estudiantes` (GET): Obtiene la lista de todos los estudiantes.
`http://localhost:3030/api/estudiantes/nuevoEstudiante` (POST) pasando los datos mediante un JSON: Crea un nuevo estudiante.
`http://localhost:3030/api/estudiantes/editarEstudiante/:id` (PUT) pasando los datos mediante un JSON: Edita la información de un estudiante existente. Se debe especificar el ID del estudiante en la URL.
`http://localhost:3030/api/estudiantes/eliminarEstudiante/:id` (DELETE): Elimina un estudiante existente. Se debe especificar el ID del estudiante en la URL.