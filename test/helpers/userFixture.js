import { randomUUID } from "node:crypto"
export function userFixture () {
    return {
        firstName: "Un nombre",
        lastName: "y un apellido",
        email: `${randomUUID()}@example.com`,
        password: "123"
    }
}