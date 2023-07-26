const db = require('./app/models');
//const { userController, projectController } = require('./app/controllers')
const userController = require('./app/controllers/user.controller');
const bootcampController = require('./app/controllers/bootcamp.controller')


const run = async () => {
    //Crear usuarios
    const user1 = await userController.createUser({
        firstName: 'Mateo',
        lastName: 'Díaz',
        email: 'mateo.diaz@correo.com'
    });

    const user2 = await userController.createUser({
        firstName: 'Santiago',
        lastName: 'Mejías',
        email: 'santiago.mejias@correo.com'
    });

    const user3 = await userController.createUser({
        firstName: 'Lucas',
        lastName: 'Rojas',
        email: 'lucas.rojas@correo.com'
    });

    const user4 = await userController.createUser({
        firstName: 'Facundo',
        lastName: 'Fernández',
        email: 'facundo.fernandez@correo.com'
    });

    //crear bootcamps
    const bootcamp1 = await bootcampController.createBootcamp({
        title: 'Introduciendo El Bootcamp De React.',
        cue: 10,
        description: 'React es la librería más usada en JavaScript ára el desarrollo de interfaces.'
    });

    const bootcamp2 = await bootcampController.createBootcamp({
        title: 'Bootcamp Desarrollo Web Full Stack.',
        cue: 12,
        description: 'Crearás aplicaciones we utilizando las tecnologías y lenguajes más actuales y populares como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS.'
    });

    const bootcamp3 = await bootcampController.createBootcamp({
        title: 'Bootcamp Big Data, Inteligencia Artificial & Machine Learning.',
        cue: 18,
        description: 'Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning.'
    });

    //Relacionar usuarios con bootcamps


    await bootcampController.addUser(bootcamp2.id, user1.id);
    await bootcampController.addUser(bootcamp1.id, user1.id);
    await bootcampController.addUser(bootcamp1.id, user2.id);
    await bootcampController.addUser(bootcamp3.id, user1.id);
    await bootcampController.addUser(bootcamp3.id, user2.id);
    await bootcampController.addUser(bootcamp3.id, user3.id);


    //Consulta bootcamp por id incluyendo usuarios
    await bootcampController.findBootcampById(bootcamp1.id);
    await bootcampController.findBootcampById(bootcamp2.id);
    await bootcampController.findBootcampById(bootcamp3.id);

    //consulta todos los bootcamps con sus usuarios
    const bootcamps = await bootcampController.findAll();
    console.log(`\nSe encontraron los siguientes bootcamps: ${JSON.stringify(bootcamps, null, 2)}\n`);

    //consultar usuario por id incluyendo bootcamps
    const user = await userController.findUserById(user1.id);
    console.log(`\nUsuario encontrado: ${JSON.stringify(user, null, 2)}\n`);

    //Actualizar usuario según su id; usuario id=1 por Pedro Sánchez
    const userUpdated = await userController.updateUserById(user1.id, {
        firstName: 'Pedro',
        lastName: 'Sánchez',
        email: 'pedro.sanchez@correo.com'
    });

    //Eliminar usuario por id; usuario con id = 1
    await userController.deleteUserById(user1.id);
};

//db.sequelize.sync()

db.sequelize.sync({
    force: true
})
    .then(() => {
        console.log('\nEliminando y resincronizando la base de datos\n');
        run();
    });
