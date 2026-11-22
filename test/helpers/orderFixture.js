import User from "../../src/models/user.model.js";
import { USER_ROLES } from "../../src/constants/user.constants.js";
import { randomUUID } from "node:crypto"
export async function orderFixture() {
    const customer = await User.create({
        firstName: "Nombre",
        lastName: "Apellido",
        email: `test-${randomUUID()}@example.com`,
        password: "123",
        role: USER_ROLES.CUSTOMER
    })
    return {
        customer: customer._id,
        items: [
            {
                name: "Producto",
                quantity: 2,
                price: 100
            }
        ],
        deliveryAddress: "Calle 123"
    }
}