const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')
const User = require('../models/UserModel')

const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { id } = userLogin
        try {
            const checkUser = await User.findOne({
                id: id
            })

            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined'
                })
            }

            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            })
        }
        catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    loginUser
}