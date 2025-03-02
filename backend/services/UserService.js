const User = require('../models/UserModel')

const loginUser = async (UserId) => {
    return new Promise(async (resolve, reject) => {
        const { userId } = UserId

        try {
            let user = await User.findOne({
                userId: userId
            })

            if (!user) {
                user = new User({ userId })
                await user.save()
                resolve({
                    status: 'OK',
                    message: 'New user created',
                    user
                })
            } else {
                resolve({
                    status: 'OK',
                    // message: 'User already exists',
                    user
                })
            }
        } catch (e) {
            reject({
                status: 'ERR',
                message: 'Server error',
                error: e.message
            })
        }
    })
}

const getDetailsUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({ userId: userId });

            if (user === null) {
                return resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                });
            }

            resolve({
                status: 'OK',
                message: 'Success',
                data: user
            });
        } catch (e) {
            reject(e);
        }
    });
}
module.exports = {
    loginUser,
    getDetailsUser
}