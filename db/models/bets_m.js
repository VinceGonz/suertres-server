const Sequalize = require('sequelize');
const db = require('../../config/database');



module.exports =  db.define('tbl_bets', {
    bets_id: {
        type:Sequalize.UUID,
        defaultValue: Sequalize.UUIDV4,
        primaryKey: true,
        allowNull: false
        
    },
    cell_num: {
        type:Sequalize.STRING,
        allowNull: false
    },
    date: {
        type:Sequalize.STRING,
        allowNull: false
    },
    draw: {
        type:Sequalize.INTEGER,
        allowNull: false
    },
    number: {
        type:Sequalize.STRING,
        allowNull: false
    },
    amount: {
        type:Sequalize.INTEGER,
        allowNull: false
    },

    createdAt: {
        type:Sequalize.DATE,
        defaultValue: new Date(),
    },

    updatedAt: {
        type:Sequalize.DATE,
        defaultValue: new Date(),
    }

})


