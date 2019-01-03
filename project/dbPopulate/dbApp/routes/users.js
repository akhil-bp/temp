var express = require('express');
var router = express.Router();
const msgSrv = require("../services/msgService")

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    let filter={
      text:"hi"
    }
  let getmsg = await msgSrv.getMessages(filter);
  res.json({success:true,response:getmsg})
  }
  catch(err){
    res.json({success:false,response:err})
  }
});

module.exports = router;
