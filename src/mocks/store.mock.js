import mongoose from 'mongoose';
import { faker } from '@faker-js/faker';
export const generateMockStore = (ownerId) => ({
    name: faker.company.name(),
    address: faker.location.streetAddress(),
    owner: ownerId,
    isActive: true
})
export const generateMockStores = (cant, ownerIds) => {
    return Array.from({ length: cant }, () =>
        generateMockStore(faker.helpers.arrayElement(ownerIds))
    )
}