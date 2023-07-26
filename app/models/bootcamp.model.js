module.exports = (sequelize, DataTypes) => {
    //Crea tabla bootcamps
    const Bootcamp = sequelize.define('bootcamps', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cue: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 5,
                //En el drilling dice que el maximo debe ser 10, sin embargo, en la respuesta que entregan al correr server.js, se ve que ingresan ambos bootcamp 2 y 3 con cue 12 y 12, respectivamente.
                //Se cambia valor máximo a 20.
                max: 20,
                isInt: true,
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return Bootcamp;
};