const db = require('../config/database');



const insertBet = (bet) => {
    const insertBetQuery = {
        text: `INSERT INTO tbl_bets (bets_id, cell_num, date, draw, number, amount) VALUES ($1,$2,$3,$4,$5,$6)`,
        values: [bet.bet_id, bet.cellNum, bet.date, bet.draw, bet.number, bet.amount]
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
        text: `SELECT * FROM tbl_bets`,
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

const deleteNumber = (id) => {
    const deleteNumberQuery = {
        text: `DELETE FROM tbl_bets WHERE bets_id = $1`,
        values: [id]
    }

    return new Promise(async(resolve,reject) => {
        try {
            const deleteNumberQuery_Result = await db.query(deleteNumberQuery);
            resolve(deleteNumberQuery_Result);
        }catch(error){
            console.log('Deleting number error');
            reject(error)
        }
    });
}


const updateBet = (bet) => {
    const updateBetQuery = `UPDATE tbl_bets SET cell_num = '${bet.cell_num}', date = '${bet.date}', draw = '${bet.draw}', number = '${bet.number}', amount = ${bet.amount} WHERE bets_id = '${bet.bet_id}'`
    return new Promise(async(resolve, reject) => {
        try {
            const updateBetQuery_Result = await db.query(updateBetQuery);
            resolve(updateBetQuery_Result)
        } catch (error) {
            reject(error)
            console.log('Error Updating Bet', error);
        }
    })
}


module.exports = {
    insertBet,
    insertNumber,
    getAllBets,
    deleteNumber,
    updateBet
}