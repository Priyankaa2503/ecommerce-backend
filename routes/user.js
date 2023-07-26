const router = require('express').Router();
router.get('/usertest',(req,res)=>{
    res.send("test sucess");
})

// router.post('')

module.exports = router;