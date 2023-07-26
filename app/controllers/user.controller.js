const { users, bootcamps } = require('../models')
const { db } = require('../models')

const User = users;
const Bootcamp = bootcamps;

//Crear usuario
exports.createUser = (user) => {
    return User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    })
        .then((user) => {
            console.log(`\nSe ha creado el usuario ${JSON.stringify(user, null, 4)}\n`);
            return user
        })
        .catch((e) => {
            console.log(`\nError al crear el usuario: ${e.message}\n`);
        });
};

//Obtener los proyectos de un usuario

exports.findUserById = (userId) => {
    return User.findByPk(userId, {
        include: [{
            model: Bootcamp,
            as: 'bootcamps',
            attributes: ['title', 'cue', 'description'],
            through: {
                attributes: [],
            }
        }]
    })
        .then((users) => {
            return users;
        })
        .catch((e) => {
            console.log(`\nError al realizar la consulta: ${e.message}\n`);
        });
};


//Obtener todos los usuarios incluyendo sus bootcamps

exports.findAll = () => {
    return User.findAll({
        include: [{
            model: Bootcamp,
            as: 'bootcamps',
            attributes: ['title', 'cue', 'dscription'],
            through: {
                attributes: [],
            }
        }]
    })
        .then((users) => {
            return users
        })
        .catch((e) => {
            console.log(`\nError al realizar la consulta: ${e.message}\n`);
        });
};

//Actualizar usuario
exports.updateUserById = (userId, updatedUser) => {
    return User.findByPk(userId)
        .then((user) => {
            if (!user) {
                console.log(`\nEl usuario con id ${userId} no existe en la base de datos\n`);
                return null
            }
            return user.update(updatedUser);
        })
        .then((updatedUser) => {
            console.log(`'\nSe actualizó el usuario con id ${userId}: ${JSON.stringify(updatedUser, null, 2)}\n`);
            return updatedUser;
        })
        .catch((e) => {
            console.log(`\nSe produjo un error al actualizar el usuario ${userId}: ${e.message}\n`)
        });
};

//Eliminar usuario

exports.deleteUserById = (userId) => {
    return User.findByPk(userId)
        .then((user) => {
            if (!user) {
                console.log(`\nEl usuario con id ${userId} no existe en la base de datos\n`);
                return null
            }

            return user.destroy();
        })
        .then(() => {
            console.log(`\nSe ha eliminado el usuario con ID ${userId}\n`);
        })
        .catch((e) => {
            console.log(`\nSe produjo un error al eliminar el usuario ${userId}: ${e.message}\n`)
        });
};





