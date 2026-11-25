import StoreModel from '../models/store.model.js';
export const storeRepository = {
    findAll: async () => {
        return StoreModel.find()
    },
    findById: async (id) => {
        return StoreModel.findById(id)
    },
    create: async (storeData) => {
        return StoreModel.create(storeData)
    },
    insertMany: async (stores) => {
        return StoreModel.insertMany(stores)
    },
    update: async (id, storeData) => {
        return StoreModel.findByIdAndUpdate(id, storeData, {
            new: true,
            runValidators: true,
        })
    },
    delete: async (id) => {
        return StoreModel.findByIdAndDelete(id)
    },
    findPaginate: async ({skip, filter = {}, limit = 10}) => {
        return StoreModel.find(filter)
        .populate('owner', "firstName lastName")
        .skip(skip)
        .limit(limit)
    }
}