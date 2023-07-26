module.exports = {
    HOST: 'localhost',
    USER: 'bootcamp_admin',
    PASSWORD: '12345',
    DB: 'db_bootcamp',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 10000,
        idle: 5000
    }
};