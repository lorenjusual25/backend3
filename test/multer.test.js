import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import { userFixture } from "./helpers/userFixture.js";
import { orderFixture } from "./helpers/orderFixture.js";
import { unlink } from "fs/promises";
describe("Multer Upload Tests", () => {
    it("un usuario sube un archivo",async() => {
        const user = userFixture()
        const created = await request(app).post("/api/users").send(user)
        expect(created.status).to.equal(200)
        const id = created.body.payload._id
        const png = Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/aX8AAAAASUVORK5CYII=",
            "base64"
        )
        const res = await request(app)
            .post(`/api/users/${id}/documents`)
            .field("type","user_document")
            .attach("document",png,{
                filename:"doc.png",
                contentType: "image/png"
            })
        const document = res.body.payload?.documents?.[0]
        try {
            expect(res.status).to.equal(200)
            expect(document).to.exist
            expect(document.originalName).to.equal("doc.png")
            expect(document.mimeType).to.equal("image/png")
            expect(document.size).to.equal(png.length)
            expect(document.type).to.equal("user_document")
        } finally {
            if (document?.path) await unlink(document.path)
        }
    })
    it("se sube una orden con comprobante", async () => {
        const order = await orderFixture()
        const created = await request(app).post("/api/orders").send(order)
        expect(created.status).to.equal(200)
        const id = created.body.payload._id
        const png = Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/aX8AAAAASUVORK5CYII=",
            "base64"
        )
        const res = await request(app)
            .post(`/api/orders/${id}/proof`)
            .field("type","order_proof")
            .attach("document",png,{
                filename:"doc.png",
                contentType: "image/png"
            })
        const document = res.body.payload?.proofs?.[0]
        try {
            expect(res.status).to.equal(200)
            expect(document).to.exist
            expect(document.originalName).to.equal("doc.png")
            expect(document.mimeType).to.equal("image/png")
            expect(document.size).to.equal(png.length)
            expect(document.type).to.equal("order_proof")
        } finally {
            if (document?.path) await unlink(document.path)
        }
    })
    it("responde 400 cuando no se sube un archivo", async () => {
        const user = await userFixture()
        const created = await request(app).post("/api/users").send(user)
        expect(created.status).to.equal(200)
        const id = created.body.payload._id
        const res = await request(app)
            .post(`/api/users/${id}/documents`)
            .field("type","user_document")
        expect(res.status).to.equal(400)
        expect(res.body.status).to.equal("error")
        expect(res.body.message).to.equal("Archivo requerido")
        expect(res.body.code).to.equal("FILE_REQUIRED")
    })
    it("responde 400 cuando hay un tipo de documento inválido", async () => {
        const user = await userFixture()
        const created = await request(app).post("/api/users").send(user)
        expect(created.status).to.equal(200)
        const id = created.body.payload._id
        const png = Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/aX8AAAAASUVORK5CYII=",
            "base64"
        )
        const res = await request(app)
            .post(`/api/users/${id}/documents`)
            .field("type","tipo_invalido")
            .attach("document",png,{
                filename:"doc.png",
                contentType: "image/png"
            })
        expect(res.status).to.equal(400)
        expect(res.body.status).to.equal("error")
        expect(res.body.message).to.equal("Tipo de documento inválido")
        expect(res.body.code).to.equal("INVALID_DOCUMENT_TYPE")
    })
    it("responde 404 cuando el usuario no existe", async () => {
        const id = "000000000000000000000000"
        const png = Buffer.from(
            "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/aX8AAAAASUVORK5CYII=",
            "base64"
        )
        const res = await request(app)
            .post(`/api/users/${id}/documents`)
            .field("type","user_document")
            .attach("document",png,{
                filename:"doc.png",
                contentType: "image/png"
            })
        expect(res.status).to.equal(404)
        expect(res.body.status).to.equal("error")
        expect(res.body.message).to.equal("Usuario no encontrado")
        expect(res.body.code).to.equal("USER_NOT_FOUND")
    })
})