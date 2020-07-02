const db = require('../config/database');



const insertBet = (bet) => {
    const insertBetQuery = {
        text: `INSERT INTO tbl_bets (bets_id, cell_num, date, draw) VALUES ($1,$2,$3,$4)`,
        values: [bet.bets_id, bet.cellNum, bet.date, bet.draw]
    }

    return new Promise(async(resolve, reject) => {
        try {
            const insertBetQuery_Result = await db.query(insertBetQuery);
            resolve(insertBetQuery_Result)
        }catch(error){
            console.log('Inserting Bet Error', error);
            reject(error)
        }
    })
}

module.exports = {
    insertBet
}


const insertNumber = (bet) => {
    const insertNumberQuery = {
        text: `INSERT INTO tbl_list (list_id, bets_id, number, amount) VALUES ($1,$2,$3,$4)`,
        values: [bet.list_id, bet.bets_id, bet.number, bet.amount]
    }

    return new Promise(async(resolve, reject) => {
        try {
            const insertNumberQuery_Result = await db.query(insertNumberQuery);
            resolve(insertNumberQuery_Result)
        }catch(error){
            console.log('Inserting Number Error', error);
            reject(error)
        }
    })
}

const getAllBets = () => {
    const getAllBetsQuery = {
        text: `SELECT b.bets_id, l.list_id, b.cell_num, b.date, b.draw, l.number, l.amount FROM tbl_bets b INNER JOIN tbl_list l on b.bets_id = l.bets_id`,
    }

    return new Promise(async(resolve, reject) => {
        try {
            const getAllBetsQuery_Result = await db.query(getAllBetsQuery);
            resolve(getAllBetsQuery_Result)
        }catch(error){
            console.log('Fetching all bets Error', error);
            reject(error)
        }
    })
}

module.exports = {
    insertBet,
    insertNumber,
    getAllBets
}