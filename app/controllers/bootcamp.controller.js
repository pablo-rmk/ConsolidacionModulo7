const { users, bootcamps, db } = require('../models')
//const { db } = require('../models')

const User = users;
const Bootcamp = bootcamps;

//Crear bootcamp
exports.createBootcamp = (bootcamp) => {
    return Bootcamp.create({
        title: bootcamp.title,
        cue: bootcamp.cue,
        description: bootcamp.description,
    })
        .then((bootcamp) => {
            console.log(`\nSe ha creado el bootcamp ${JSON.stringify(bootcamp, null, 4)}\n`);
            return bootcamp
        })
        .catch((e) => {
            console.log(`\nError al crear el proyecto: ${e.message}\n`);
        });
};

//Agregar usuario a bootcamp
exports.addUser = (bootcampId, userId) => {
    return Bootcamp.findByPk(bootcampId)
        .then((bootcamp) => {
            if (!bootcamp) {
                console.log('\nNo se encontró el bootcamp\n');
                return null;
            }
            return User.findByPk(userId)
                .then((user) => {
                    if (!user) {
                        console.log('\nUsuario no encontrado\n');
                        return null;
                    }
                    bootcamp.addUser(user);
                    console.log(`\nSe agregó el usuario ${user.id} al bootcamp con id ${bootcamp.id}\n`);
                    return bootcamp;
                })
        })
}

//Obtener los bootcamps por id 
exports.findBootcampById = (id) => {
    return Bootcamp.findByPk(id, {
        include: [{
            model: User,
            as: 'users',
            attributes: ['firstName', 'lastName', 'email'],
            through: {
                attributes: [],
            }
        }]
    })
        .then((bootcamp) => {
            return console.log(`\nBootcamp encontrado: ${JSON.stringify(bootcamp, null, 2)}\n`);;
        })
        .catch((e) => {
            console.log(`\nError al realizar la consulta: ${e.message}\n`);
        });
};

//Obtener todos los usuarios y sus proyectos
exports.findAll = () => {
    return Bootcamp.findAll({
        include:[{
            model: User,
            as: 'users',
            attributes: ['firstName', 'lastName', 'email'],
            through:{
                attributes: [],
            }
        }]
    })
    .then((bootcamps) => {
        return bootcamps
    })
    .catch((e) => {
        console.log(`\nError al realizar la consulta: ${e.message}\n`);
    });
};