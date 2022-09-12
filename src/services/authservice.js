const bcrypt = require("bcryptjs")
const Service = require("./index")
const { user, sequelize } = require("../lib/sequelize")
const { generateToken } = require("../lib/jwt");

class AuthService extends Service {
    static register = async (req) => {
        const t = await sequelize.transaction()
        try {
            const { username, email, password } = req.body

            const duplicateChecked = await user.findOne({
                where: {
                    email
                }
            })

            if (duplicateChecked) {
                return this.handleError({
                    message: "this email address has been registered, try another email address",
                    statusCode: 400
                })
            }

            const hashedPassword = bcrypt.hashSync(password, 5);

            const createAccount = await user.create({
                username,
                email,
                password: hashedPassword,
                role: "user",
                balance_account:0
            })

            await t.commit()
            return this.handleSuccess({
                message: "You'r account created successfully",
                statusCode: 201,
                data: createAccount
            })
        } catch (err) {
            console.log(err)
            await t.rollback()
            return this.handleError({})
        }
    }
    static login = async (req) => {
        try {
            const { email, password } = req.body

            const findUser = await user.findOne({
                where: {
                    email
                }
            })

            if (!findUser) {
                return this.handleError({
                    message: "wrong email address",
                    statusCode: 400
                })
            }

            const isPasswordCorrect = bcrypt.compareSync(password, findUser.password);

            if (!isPasswordCorrect) {
                return this.handleError({
                    message: "Wrong Password",
                    statusCode: 400
                })
            }

            delete findUser.dataValues.password

            const token = generateToken({
                id: findUser.id,
            });

            return this.handleSuccess({
                message: "login success",
                statusCode: 200,
                data: {
                    user: findUser,
                    token,
                },
            })

        } catch (err) {
            console.log(err)
            return this.handleError({})
        }
    }

    static infoUser = async (req) => {
        try {
            const userInfo = await user.findOne({
                where: {
                    id: req.token.id
                },
            })

            return this.handleSuccess({
                message: "get user info success",
                data: userInfo,
                statusCode: 200
            })
        } catch (err) {
            return this.handleError({})
        }
    }
}

module.exports = AuthService