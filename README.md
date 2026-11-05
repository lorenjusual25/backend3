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