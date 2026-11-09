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
## Por qué separar Service y Repository 
Repository es la capa que se encarga de acceder a la base de datos o realizar consultas. Service es la capa que se encarga de la logica de negocio como pueden ser validaciones de campos y demas. Separar responsabilidades hace que el codigo sea mas facil de mantener y entender.

## Cómo usar los endpoints

### Generar usuarios sin guardarlos

**GET** `http://localhost:8080/api/mocks/getMockUsers?cant=2`

Genera usuarios simulados, pero no los guarda en MongoDB. El parámetro
`cant` indica cuántos usuarios generar; si se omite, se generan 10.

Los usuarios incluyen nombre, apellido, email, contraseña de prueba y un rol
aleatorio de cliente o conductor.

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
  "status": "ok",
  "payload": {
    "users": 20,
    "orders": 5,
    "deliveries": 5
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
- Los roles de los usuarios generados son aleatorios, por lo que una carga
  puede no incluir ambos roles. Si falta alguno, genera más usuarios.
- Si ocurre un error durante la carga, los registros insertados antes del
  error no se revierten automáticamente.

Los pedidos insertados por el seed no pasan por el servicio de pedidos; sus
campos de importes conservan los valores por defecto del modelo.