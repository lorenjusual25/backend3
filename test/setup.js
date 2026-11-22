import mongoose from "mongoose";
const uri = process.env.MONGO_URI;
before(async () => {
    if (!uri) {
        throw new Error("La URI de MongoDB no está definida")
    }
    await mongoose.connect(uri, { dbName: "shipnow_test" })
})
after(async () => {
    if (mongoose.connection.name !== "shipnow_test") {
        throw new Error("Se esperaba la base de datos shipnow_test");
    }
    await mongoose.connection.dropDatabase()
    await mongoose.disconnect()
})
