const express = require('express')
const app = express()
app.use(express.json())
const port = 5000;
const cors = require('cors');

app.use(cors());
const controller = require("./Controller/ExpenseController");

app.get("/exp/callUser", function (req, res) {
  const data = controller.fetchUser();
  res.send(data);
})

app.post("/exp/updateExpense", function (req, res) {
  controller.updateExpense(req)
  res.sendStatus(200);
});

app.post("/exp/addUser", function (req, res) {
  const user = req.body;
  controller.addUser(user);
  res.sendStatus(200)
});

app.get("/exp/overAllBalance",function(req,res){
  const balances = controller.owes()
  res.send(balances);
})


app.get("/exp/individualBalance",function(req,res){
  const balances = controller.fetchBalance();
  res.send(balances);
})

app.get("/exp/settleUp/:flag", function(req,res){
  const flag = req.params.flag;
  if(flag == "settle")
  controller.settleUp();
  else if (flag == 'reset')
  controller.resetAll();
  res.sendStatus(200)

})



app.listen(port, () => console.log(`Node JS Server started at port ${port}!`))