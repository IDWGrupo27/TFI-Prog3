# TFI-Prog3

## Endpoints de la API

### Inicio Sesion
`POST /inicio-sesion/login` - Devuelve permisos para el ingreso y validaciones para las diferentes rutas

### Usuarios

`GET /api/usuarios` - Devuevle todos los usuarios

`GET /api/usuarios/mi-perfil` - Devuevle la información del usuario logueado

`PATCH /api/usuarios/mi-perfil` - Permite modificar nombre, apellido y correo electrónico

`GET /api/usuarios/:idUsuario` - Busca un usuario por ID

`PATCH /api/usuarios/:idUsuario` - Actualiza la información de un usuario: nombre, apellido, correoElectronico, activo,    idUsuarioTipo

`GET /api/usuarios/:idUsuario/reclamos` - Devuevle todos los reclamos del usuario

`POST /api/usuarios/register` - Crea un usuario

### Reclamos

`GET /api/reclamos` - Devuevle todos los reclamos

`POST /api/reclamos` - Crea un nuevo reclamo

`GET /api/reclamos/mis-reclamos` - Devuelve los reclamos del usuario logueado

`GET /api/reclamos/:idReclamo` - Busca un reclamo por ID

`PATCH /api/reclamos/:idReclamo` - Actualiza el estado de un reclamo - Los clientes solo pueden pasarlo a "Cancelado" si fue creado por ellos, los empleados pueden cambiarlo a los demás estados si el reclamo se atiende en su oficina.

### Reclamos Tipo

`GET /api/reclamos-tipo` - Devuevle todos los tipos de reclamo

`POST /api/reclamos-tipo` - Agrega un tipo de reclamos

`GET /api/reclamos-tipo/:idReclamosTipo` - Devuevle todos los tipos de reclamos

`PATCH /api/reclamos-tipo/:idReclamosTipo` - Actualiza un tipo de reclamo

### Oficinas

`GET /api/oficinas/:idOficina` - Busca una oficina por ID

`GET /api/oficinas` - Devuelve todas las oficinas activas

`POST /api/oficinas` - Crear oficinas

`PATCH /api/oficinas/:idOficina` - Actualiza la oficina.

`PATCH /api/oficinas/eliminar/:idOficina` - Elimina la oficina

`POST /api/oficinas/agregar-empleados` - Agrega uno o varios empleados a la oficina

`POST /api/oficinas/eliminar-oficinas` - Elimina uno o varios empleados en la oficina

`GET /api/oficinas/:idOficina/reclamos` - Devuelve los reclamos atendidos en la oficina
