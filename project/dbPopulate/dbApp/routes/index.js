var express = require('express');
var router = express.Router();
const usrSrv = require("../services/userService");
const msgSrv = require("../services/msgService")
/* GET home page. */
router.get('/', async function (req, res, next) {
  // res.render('index', { title: 'Express' });
  try{

    let userdata = {
      name: "akhil", 
      place: "tvm", 
      state: "kerala"
    }
    console.log(userdata)
    let saveMsg = await usrSrv.createUser(userdata);
    if(saveMsg){

      // console.log()
      let messages={
        text:"hi",
        userId:saveMsg._id
      }
      console.log(messages)
      let msg = await msgSrv.createMsg(messages);
      if(msg){
        console.log("messages")
        res.json({status:"user saved successfully","result":saveMsg ,msg:msg})
  
        // res.json({status:"user and message saved successfully" })
      }

    }



   
  }
  catch(e){
    res.json({status:"error" })
  }
});

module.exports = router;
