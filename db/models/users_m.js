
const Sequelize = require('sequelize');
const db = require('../../config/database');

module.exports = db.define('tbl_users', {
    user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },

    fname: {
        type:Sequelize.STRING,
        allowNull: false
    },

    lname: {
        type:Sequelize.STRING,
        allowNull: false
    },

    username: {
        type:Sequelize.STRING,
        allowNull: false
    },

    password: {
        type:Sequelize.STRING,
        allowNull: false
    },

    createdAt: {
        type:Sequelize.DATE,
        defaultValue: new Date(),
    },

    updatedAt: {
        type:Sequelize.DATE,
        defaultValue: new Date(),
    },

    is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },

    is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },

})