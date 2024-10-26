# TFI-Prog3

## Endpoints de la API

### Usuarios

`GET /usuarios` - Devuevle todos los usuarios

`GET /usuarios/mi-perfil` - Devuevle la información del usuario logueado

`GET /usuarios/:idUsuario` - Busca un usuario por ID

`GET /usuarios/:idUsuario/reclamos` - Devuevle todos los reclamos del usuario

`POST /usuarios/login` - Devuelve un token bearer JWT si coincide el usuario y contraseña

`POST /usuarios/register` - Crea un usuario

### Reclamos

`GET /reclamos` - Devuevle todos los reclamos

`POST /reclamos` - Crea un nuevo reclamo

`GET /reclamos/mis-reclamos` - Devuelve los reclamos del usuario logueado

`GET /reclamos/:idReclamo` - Busca un reclamo por ID

`PATCH /reclamos/:idReclamo` - Actualiza el estado de un reclamo

### Oficinas

`GET /oficinas/:idOficina` - Busca una oficina por ID

`GET /oficinas/:idOficina/reclamos` - Devuelve los reclamos atendidos en la oficina
