const bCrypt = require('bcrypt-nodejs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models').users;

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            (user) ?
                done(null, user.get()) :
                done(user.errors, null);
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password',
            //repeatPasswordFiled: 'repeatPassword',
            passReqToCallback: true
        },
        (req, login, password, done) => {
            //Не менее 3 символов, один из которых буква
            const usernameRegEx = new RegExp('(?=.*[a-zA-Z])[a-zA-Z0-9]{3,}');
            console.log('lol');
            if(!usernameRegEx.test(login)) {
                return done(null, false, {
                    message: 'Логин должен содержать более 3 сиволов(латинских букв и цифр), один из которых - буква.'
                });
            }
            if(password.length < 3) {
                return done(null, false, {
                    message: 'Ваш пароль не может быть короче 3 символов.'
                });
            }
            // if(password !== req.body.repeatPassword) {
            //     return done(null, false, {
            //         message: 'Введённые пароли не совпадают.'
            //     });
            // }
            console.log('test');
            const generateHash = (password) => {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            User.findOne({
                where: {
                    login: login
                }
            }).then((user) => {
                if (user) {
                    return done(null, false, {
                        message: 'Пользователь с таким логином уже существует.'
                    })
                }
                else {
                    const userPassword = generateHash(password);
                    const data = {
                        login: login,
                        password: userPassword
                    };

                    User.create(data).then((newUser, created) => {
                        return (!newUser) ? done(null, false) : done(null, newUser);
                    });
                }
            })
        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'login',
            passwordField: 'password',
            passReqToCallback: true
        },
        (req, login, password, done) => {
            console.log('lol');
            const isValidPassword = function (realPassword, inputPassword) {
                return bCrypt.compareSync(inputPassword, realPassword);
            };
            User.findOne({
                where: {
                    login: login
                }
            }).then((user) => {
                if (!user || !isValidPassword(user.password, password)) {
                    return done(null, false, {
                        message: 'Указаны неверные данные.'
                    });
                }
                return done(null, user.dataValues);
            }).catch(function (err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Что-то пошло не так.'
                });
            });
        }
    ));
};

