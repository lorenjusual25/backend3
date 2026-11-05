import User from '../models/user.model.js'
export const userRepository = {
    findAll: () => {
        return User.find()
    },
    findById:(id) => {
        return User.findById(id)
    },
    findByEmail:(email) => {
        return User.findOne({email})
    },
    create:(user) => {
        return User.create(user)
    },
    update: (id, updates) => {
        return User.findByIdAndUpdate(id, updates, {new:true})
    },
    delete: (id) => {
        return User.findByIdAndDelete(id)
    }
}