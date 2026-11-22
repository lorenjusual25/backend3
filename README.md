# backend3
Proyecto ShipNow con Node.js, Express y MongoDB
## Como correr el proyecto localmente
1. Clonar e instalar dependencias:
   ```bash
   git clone https://github.com/lorenjusual25/backend3.git
   cd backend3
   npm install
   ```
2. Crear un archivo `.env` en la raíz (junto a `package.json`):
   ```env
   PORT=8080
   NODE_ENV=development
   MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/<base>
   JWT_SECRET=una_clave_secreta
   ```
3. Iniciar el servidor:
   ```bash
   npm run dev
   ```
4. Probar: `GET http://localhost:8080/api/health`

## Documentación con Swagger

Con el servidor iniciado, entra a `http://localhost:8080/api/docs`. Si cambiaste
el puerto en `.env`, usa ese puerto.

Están documentados los módulos Users, Orders, Deliveries, Stores, Mocks y
Logger. Para probar un endpoint, selecciónalo, presiona **Try it out**, completa
los parámetros o el body si corresponde y presiona **Execute**.

Para los endpoints que usan MongoDB necesitas una conexión configurada en
`MONGO_URI` y, cuando corresponda, IDs de registros existentes. Las operaciones
de creación, actualización y eliminación modifican la base de datos. El endpoint
del logger es solo para probar los niveles de log.

## Tests

Los tests usan Mocha para ejecutarlos, Chai para las comprobaciones y Supertest
para probar los endpoints. Se prueban Users, Orders, Mocks, Logger, Swagger, Health y
la respuesta de ruta inexistente.

1. Instala las dependencias con `npm install`.
2. Crea un archivo `.env-test` en la raíz con la conexión a MongoDB:
   ```env
   MONGO_URI=mongodb+srv://<usuario>:<password>@<cluster>.mongodb.net/
   NODE_ENV=test
   ```
3. Ejecuta los tests con `npm test`. No hace falta iniciar el servidor.

Se necesita una base exclusiva para pruebas. Los tests se conectan a
`shipnow_test` y **eliminan toda esa base al finalizar**, no solo los datos
creados por un test. Asegúrate de que el cluster y la URI sean los correctos
y de que `shipnow_test` no tenga datos que quieras conservar. Una variable
`MONGO_URI` ya definida en el entorno puede tener prioridad sobre `.env-test`.
No subas `.env-test` al repositorio porque puede contener credenciales.

## Por qué separar Service y Repository 
Repository es la capa que se encarga de acceder a la base de datos o realizar consultas. Service es la capa que se encarga de la logica de negocio como pueden ser validaciones de campos y demas. Separar responsabilidades hace que el codigo sea mas facil de mantener y entender.

## Cómo usar los endpoints

### Generar usuarios sin guardarlos

**GET** `http://localhost:8080/api/mocks/getMockUsers?cant=2`

Genera usuarios simulados, pero no los guarda en MongoDB. El parámetro
`cant` indica cuántos usuarios generar; si se omite, se generan 10.

Los usuarios incluyen nombre, apellido, email, contraseña de prueba y un rol
aleatorio.

### Cargar datos de prueba en MongoDB

**POST** `http://localhost:8080/api/mocks/seed`

En Postman, selecciona **Body → raw → JSON** y envía, por ejemplo:

```json
{
  "users": 20,
  "orders": 5,
  "deliveries": 5
}
```

Cada campo indica cuántos registros crear. Puedes omitir los que no necesites.
Para cada cantidad positiva, el máximo es 100. Por ejemplo, para crear solo
usuarios:

```json
{
  "users": 10
}
```

La respuesta indica cuántos registros se insertaron:

```json
{
  "status": "success",
  "message": "Datos simulados insertados",
  "payload": {
    "users": 20,
    "orders": 5,
    "deliveries": 5,
    "stores": 0
  }
}
```

**Datos generados:**

- **Usuarios:** clientes y conductores con datos simulados.
- **Pedidos:** asociados a clientes, con dirección, prioridad e items.
- **Entregas:** asociadas a pedidos y, cuando corresponda, a conductores.
  Sus estados y prioridades usan las constantes del proyecto.

**Requisitos para el seed:**

- Para crear pedidos debe existir al menos un cliente en la base de datos.
- Para crear entregas debe existir al menos un conductor y suficientes pedidos
  sin entrega.
- Para crear tiendas debe existir al menos un usuario con rol de tienda.
- Los roles de los usuarios generados son aleatorios, por lo que una carga
  puede no incluir ambos roles. Si falta alguno, genera más usuarios.
- Si ocurre un error durante la carga, los registros insertados antes del
  error no se revierten automáticamente.

El seed calcula los importes de los pedidos antes de insertarlos.

## Manejo de errores y respuesta correcta

Los errores se centralizan en un middleware global. Los servicios lanzan errores
del dominio y el middleware los convierte en respuestas JSON:

```json
{
  "status": "error",
  "message": "Cantidad de mocks inválida",
  "code": "INVALID_MOCK_QUANTITY"
}
```

En caso de una respuesta correcta:
```json
{
  "status":"success",
  "message":"Lista de usuarios",
  "payload":[]
}
```

## Logging

El proyecto usa la libreria Winston y winston-daily-rotate-file. Los niveles son `debug`,
`http`, `info`, `warning`, `error` y `fatal`.
Para probarlos, hay que iniciar el servidor y hacer un `GET http://localhost:8080/api/logger-test`.
En desarrollo se ven los 6 niveles en la consola. Los niveles `error` y `fatal` se guardan en archivos rotativos 
en `logs/error-<fecha>.log`, con una retencion de 14 días.
En desarrollo la consola muestra desde `debug`; en producción el nivel se
configura con `LOGGER_LEVEL` (por ejemplo, `info`). El filtro del archivo sigue
siendo `error`.
Git ignora `node_modules`, `.env` y `logs`