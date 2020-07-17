const express = require('express');
const router = express.Router();
const {v4: uuid} = require('uuid');

const {insertBet, insertNumber, getAllBets, deleteNumber,updateBet} = require('../models/betsModel');
const { json } = require('express');

const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: '2f0e3009',
    apiSecret: 'bzt8wx4ovcKA0ThP',
  });



router.get('/', async (req, res) => {
    res.send({message: 'bets Routes Baby'});
})

router.get('/getAllBets', async (req, res) => {
    
    try {
        const getAllBets_result = await getAllBets();
        const {rowCount, rows, command: action} = getAllBets_result;
        if(rowCount){
            res.status(200).json({Message: `Successfully Fetched All Bets`,action, Bets: rows, SuccessCode: 1})
        }
        if(!rowCount){
            res.status(200).json({Message: `No bets available in the database`,action, Bets: rows, SuccessCode: 1})
        }
        
    } catch (error) {
        console.log(`Fetching all bets error`, error)
        res.status(500).json({Message: `Failed fetching all bets`});
    }
})



router.post('/sendSMS', (req, res) => {
    const from = '19809850991';
    const to = '+639353142498';
    const text = `
        We have received your bets. This serves as a confirmation!

        1 Pesos WIN 500

        From: 09353142498
        Draw: 9PM
        Date: 07-1-2020 

        Bets:

        Number: 512 - Amount: 50
        Number: 616 - Amount: 25
        Number: 999 - Amount 30

        Total: 105 Pesos
    `;
    
    nexmo.message.sendSms(from, to, text, {type: 'unicode'}, (err, responseData) => {
        if(err){
            console.log(err);
        }else{
            console.log("Successfully Sent");
            console.dir(responseData);
            res.json({Message: `Successfully Sent Message to ${to}`})
        }
    });
})

router.post('/addBet', async (req, res) => {
    let totalInsertedRows = 0; 
    req.body.bets_id = uuid()

    const {bets_id} = req.body;
    try {
        req.body.forEach(async bet => {
            const {cellNum, draw, date, number, amount} = bet;
            const insertBet_result = await insertBet({bet_id: uuid(), cellNum, date, draw, number,amount})
            const {command: action, rowCount} = insertBet_result;
            if(rowCount){
                totalInsertedRows += 1;
                console.log('totaInserted',totalInsertedRows)
            }
        });
        res.status(200).json({Messsage: "Successfully added new bet"});
    } catch (error) {
        console.log('Adding newBet route error', error)
        res.status(500).json({Message: "Failed to add new bet"});
    }
});


router.delete('/deleteNumber/:id', async (req, res) => {
    let bets_id = req.params.id;
    try {
        const deleteNumber_Result = await deleteNumber(bets_id);
        const {rowCount, command: action} = deleteNumber_Result;
        if(rowCount){
            res.status(200).json({Message: "Successfully deleted number", action, id: bets_id,SuccessCode: 1})
        }else{
            res.status(500).json({Message: "Failed to delete number", action, SuccessCode: 0})
        }
        
    } catch (error) {
        console.log('Error Deleting number', error);
        res.status(500).json({Message: "Failed to delete number", action, SuccessCode: 0})
    }
})

router.put('/updateBet/:id', async (req, res) => {
    let bet_id = req.params.id;
    const {cell_num, date, draw, number, amount} = req.body;
    try {
        const updateBet_Result = await updateBet({cell_num,date,draw,number,amount,bet_id});
        const {rowCount} = updateBet_Result;
        if(rowCount){
            res.status(200).json({Message: "Successfully Updated bet"})
        }else{
            res.status(500).json({Message: "Failed to update a bet"})
        }
        
    } catch (error) {
        console.log('Error Updating a bet');
        res.status(500).json({Message: "Failed to update a bet", action, SuccessCode: 0})
    }
});

module.exports = router;