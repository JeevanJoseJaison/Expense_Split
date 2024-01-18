

const fs = require('fs');
const path = require('path')
const jsonFilePathExp = path.join(__dirname, '..', 'files', 'data.json');
const jsonFilePathDetail = path.join(__dirname, '..', 'files', 'detail.json');
const jsonFilePathHistory = path.join(__dirname, '..', 'files', 'history.json');


const readJsonFile = (filePath) => {
    try {
      const data = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist or there's an error, return an empty object
      return {};
    }
  };
  
  // Function to write the updated JSON file
  const writeJsonFile = (data, filePath) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
  };

 const updateExpense = (req) =>{
  const expense = req.body;
  if (expense === undefined) {
    res.status(400).json({ error: 'Expense is required.' });
    return;
  }
  else{
    const {expenseType, paidBy , amount , splitType} = expense;
    const jsonData = readJsonFile(jsonFilePathExp);
    userNO = Object.keys(jsonData).length
    if (!fs.existsSync(jsonFilePathHistory) ) {
      writeJsonFile([],jsonFilePathHistory);
    }
    
    const historyData = readJsonFile(jsonFilePathHistory);
    historyData.push(`${paidBy} paid ₹${amount} for ${expenseType}`)

    if(expense.splitType == "Equally")
    {
    const splitAmt = amount/userNO;
    Object.keys(jsonData).map((name)=>{
     if (name === paidBy)
     jsonData[name].gets += amount - splitAmt
    else
    jsonData[name].owes += splitAmt
    })
    }
   else if(Object.keys(splitType)[0] == "Percentage")
    { 
Object.entries(splitType.Percentage).map(([person,value])=>{
    Object.keys(jsonData).map((name)=>{
        
        if(name === paidBy && name === person){
            jsonData[name].gets += amount -(amount*(value/100))
        }
        else if(name !== paidBy && name === person)
        jsonData[name].owes += (amount*(Number(value)/100))
    })
})
}
else{
    Object.entries(splitType.Exact).map(([person,value])=>{
        Object.keys(jsonData).map((name)=>{
            if(name === paidBy && name === person){
                jsonData[name].gets += amount - value
            }
            else if(name !== paidBy && name === person)
            jsonData[name].owes += Number(value)
        })
    })
}
writeJsonFile(historyData,jsonFilePathHistory)
writeJsonFile(jsonData,jsonFilePathExp);
  }
}

 const addUser = (detail) => {
    const {name ,email , mobile} =detail;
    if (!fs.existsSync(jsonFilePathExp) || !fs.existsSync(jsonFilePathDetail)) {
        writeJsonFile({},jsonFilePathExp);
        writeJsonFile({},jsonFilePathDetail)
      }
  
    const jsonData = readJsonFile(jsonFilePathExp);
    const jsonDetail = readJsonFile(jsonFilePathDetail)

   
    // If the name doesn't exist in the JSON data, add it with default values
    if (!jsonData[name] || !jsonDetail[name]) {
      jsonData[name] = { gets: 0, owes: 0 };
      jsonDetail[name] = { email: email, mobileNumber: mobile };
    }

   
   

    // Write the updated JSON data back to the file
    writeJsonFile(jsonData,jsonFilePathExp);
    writeJsonFile(jsonDetail,jsonFilePathDetail)
  
  };

 const owes =() =>{
    const balances = readJsonFile(jsonFilePathExp);
    
        const result = [];
      
        // Calculate net balances for each person
        const netBalances = {};
        for (const person in balances) {
          const { gets, owes } = balances[person];
          netBalances[person] = gets - owes;
        }
      
        // Find pairs of people who owe and are owed
        for (const debtor in netBalances) {
          for (const creditor in netBalances) {
            if (debtor !== creditor) {
              const amount = netBalances[debtor];
              if (amount < 0) {
                if (netBalances[creditor] > 0) {
                  const minAmount = Math.min(-amount, netBalances[creditor]);
                  result.push(`${debtor} owes ${creditor} ₹${minAmount.toFixed(2)}`);
                  netBalances[debtor] += minAmount;
                  netBalances[creditor] -= minAmount;
                }
              }
            }
          }
        }
      
        return result;
      

 } 
  const fetchUser =() =>{
    const data = readJsonFile(jsonFilePathExp);
    const history = readJsonFile(jsonFilePathHistory)
    const user = readJsonFile(jsonFilePathDetail)
    const name = Object.keys(data).map((item) => item)
    const detail = Object.keys(user).map(name => {
      const { email, mobileNumber } = user[name];
      return { name, email, mobile: mobileNumber };
    });
    const Data ={
      name : name,
      history : history,
      detail : detail
    }
    return Data;
  }

  const fetchBalance =() =>{
    const jsonData = readJsonFile(jsonFilePathExp);
    const resultArray = Object.entries(jsonData).map(([person, values]) => {
      const difference = values.gets - values.owes;
  
      if (difference > 0) {
          return `${person} gets back ₹${difference}`;
      } else if (difference < 0) {
          return `${person} owes ₹${-difference}`;
      }
  });
 return resultArray;
  }

  const settleUp =() =>{
    const jsonData = readJsonFile(jsonFilePathExp);
    Object.keys(jsonData).forEach(name => {
      jsonData[name].gets = 0;
      jsonData[name].owes = 0;
    });
    writeJsonFile(jsonData,jsonFilePathExp);

  }

  const resetAll =() =>{
    writeJsonFile({},jsonFilePathExp);
    writeJsonFile({},jsonFilePathDetail);
    writeJsonFile([],jsonFilePathHistory);
  }

  module.exports ={
    addUser,
    updateExpense,
    owes,
    fetchUser,
    fetchBalance ,
    settleUp,
    resetAll
  }