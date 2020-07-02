const express = require('express');
const router = express.Router();
const {v4: uuid} = require('uuid');

const {insertBet, insertNumber, getAllBets} = require('../models/betsModel');
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
        console.log(getAllBets_result)
        const {rowCount, rows, command: action} = getAllBets_result;
        if(rowCount){
            res.status(200).json({Message: `Successfully Fetched All Bets`,action, Bets: rows, SuccessCode: 1})
        }else{
            res.status(500),json({Message: `Failed to Fetch All Bets`, SuccessCode: 0})
        }
        
    } catch (error) {
        console.log(`Fetching all bets error`, error)
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
    // delete req.body.bets
    req.body.bets_id = uuid()
    
    console.log(req.body);
    const {bets_id} = req.body;

    // ! This try catch is use to insert new bet in tbl_bets

    try {
        const insertBet_result = await insertBet(req.body)
        const {command: action, rowCount} = insertBet_result;
        if(rowCount){
            res.status(200).json({Message: `Successfully Inserted a New Bet`, action, Body: req.body, SuccessCode: 1},)
        }else{
            res.status(500).json({Message: `Failed to Insert New Bet`, SuccessCode: 0})
        }

    } catch (error) {
        console.log('Adding newBet route error', error)
    }

    // ! This try catch is use to insert new Number in tbl_list

    try {
        
        req.body.bets.forEach(async bet => {
            const insertNumber_Result = await insertNumber({list_id: uuid(), bets_id, number: bet.number, amount: bet.amount});
            const {rowCount} = insertNumber_Result;
            if(rowCount){
                console.log("New Number Inserted", {number: bet.number, amount: bet.amount})
            }else{
                res.status(500).json({Message: `Failed to Insert New Number`, SuccessCode: 0})
            }
        });
    } catch (error) {
        console.log('Error inserting new number', error)
    }



});








module.exports = router;