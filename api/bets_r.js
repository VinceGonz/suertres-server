const express = require('express');
const router = express.Router();

const {Bets} = require('../db/models')

module.exports = router;


router.get('/', async (req, res) => {
    res.send({message: 'bets Routes Baby'});
})


router.get('/getAllBets', async (req, res) => {

    try {
        const allBets = await Bets.findAll();
        if(allBets.length){
            console.log(allBets)
            res.status(200).json({bets: allBets})
        }else{
            res.status(404).json({Message: "No bets found", bets:[]})
        }
        
    } catch (error) {
        res.status(500).json({Message: "Failed to fetch bets", bets:[], Error: error})
    }
    
})

router.post('/addBet', async (req, res) => {
    let totalInsertedRows = 0; 
    try {
        
        req.body.forEach(async bet => {
            const {cellNum, draw, date, number, amount} = bet;
            const User = Bets.create({cell_num:cellNum, date, draw, number,amount})
            if(User){
                totalInsertedRows += 1;
                console.log('totaInserted',totalInsertedRows)
            }
        });
        res.status(200).json({Messsage: "Successfully added new bet"});
    } catch (error) {
        res.status(500).json({Messsage: "Failed to add bet(s)"});
    }

});


router.delete('/deleteNumber/:id', async (req, res) => {
    let bets_id = req.params.id;

    try {
        const deletedBet = await Bets.destroy({where: {bets_id: bets_id}});
        res.status(200).json({Message: "Successfully deleted a number", id: bets_id, bet: deletedBet});
    } catch (error) {
        res.status(500).json({Message: "Failed to delete number", Error: error})
    }

})

router.put('/updateBet/:id', async (req, res) => {
    let bet_id = req.params.id;
    const {cell_num, date, draw, number, amount} = req.body;

    try {
        const updatedBet = await Bets.update({cell_num, date, draw, number, amount},{where: {bets_id: bet_id}})

        res.status(200).json({Message: `Successfully Updated bet`});
    } catch (error) {
        console.log('Error Updating a bet', error);
        res.status(500).json({Message: "Failed to update a bet"})
    }

});
