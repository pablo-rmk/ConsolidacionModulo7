module.exports = (sequelize, DataTypes) => {
    //creacion de tabla users
    const User = sequelize.define('users', {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: 'El formato del email no es válido (Ej: user@servidor.com)'
                },
            },
        },

    });
    return User;
};