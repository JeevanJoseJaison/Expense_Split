import "./HomeStyles.css";
import React, { useState } from 'react';
import axios from "axios";
import { useSelector } from 'react-redux';

const Home = React.memo(({ switchs, setSwitch, setCalc, calc }) => {
  const userName = useSelector((state) => state.userName);
  const owes = useSelector((state) => state.owes);
  const individual = useSelector((state) => state.individual)
  const history = useSelector((state) =>state.history)
  const expensetype = ["Food", "Groceries", "Beverages", "Medical"]
  const [expenseType, setExpenseType] = useState('');
  const splitType = ["Equally", "Percentage", "Exact"]
  const [splitT, setSplitT] = useState('Split Type')
  const [paidBy, setPaidby] = useState("Paid By")
  const [amount, setAmount] = useState(0)
  const [values, setValues] = useState({})
  const [valid, setValid] = useState(true)
  
  const handleExpenseDataChange = (e) => {
    if (e.target.name === "paidBy")
      setPaidby(e.target.value)
    else if (e.target.name === "amount")
      setAmount(e.target.value)
    else {
      setSplitT(e.target.value)

    }
  };

  const updateValue = (e) => {
    setValues((prevValues) => ({
      ...prevValues, // retain previous values
      [e.target.name]: e.target.value, // update the specific property
    }));
  };
  const fetchData = async () => {
    try {

      // Make a POST request without waiting for the response
      await axios.post('http://localhost:5000/exp/updateExpense', {expenseType:expenseType, paidBy: paidBy, amount: amount, splitType: (splitT === "Equally") ? splitT : { [splitT]: values } });
    } catch (error) {
      console.error('Error making request:', error);
    }
  };


  const handleCalculate = () => {
    if (isSumValid()) {
      setValid(true)
      fetchData();
      setCalc(!calc)
      window.location.reload()
    }
    else {
      setValid(false)
      setTimeout(() => {
        setValid(true)
      }, 1000);
    }
  };

  const isSumValid = () => {
    let sum;
    if(splitT !== "Equally"){
    sum = Object.values(values).reduce((acc, value) => acc + Number(value), 0);
    return splitT === 'Percentage' ? sum == 100 : sum == amount;}
    else
    return true
  };

  return (
    <>
      <div class="container center">
        <div class="bill-divider-wrapper">
          <div class="title">
            <h1>Bill Divide</h1>
          </div>

          <div class="bill-inputs">
            <form id="bill-divider-form">
              <div class="form-group">
                <select name="paidBy"  onChange={(e) => setExpenseType(e.target.value)}>
                  <option value="">Expense Type</option>
                  {expensetype.map((expense, index) => (
                    <option key={index} value={expense}>
                      {expense}
                    </option>
                  ))}
                </select>

              </div>

              <div class="form-group">
                <label for="tip">Expense</label>
                <input type="number" value={amount} name="amount" id="tip" class="form-control" min="0" step="any" required onChange={handleExpenseDataChange} />
              </div>

              <div class="form-group">
                <select name="paidBy" value={splitT} onChange={handleExpenseDataChange}>
                  <option value="">{paidBy}</option>
                  {(userName)?.map((expense, index) => (
                    <option key={index} value={expense}>
                      {expense}
                    </option>
                  ))}
                </select>
              </div>
              <div class="form-group">
                <select name="splitType" value={splitT} onChange={handleExpenseDataChange}>
                  <option value="">Split Type</option>
                  {splitType.map((expense, index) => (
                    <option key={index} value={expense}>
                      {expense}
                    </option>
                  ))}
                </select>
              </div>


              {(splitT === "Exact" || splitT === "Percentage") &&
                <div>
                  <h3>{splitT}</h3>

                  <form className="userlist">
                    {userName.map((user, index) => (
                      <div key={index} style={{ marginBottom: '10px' }}>
                        <label>
                          <div className="users">
                            <h5 className=" userName">{user}: </h5>
                            <input type="number" id="tip" name={user} className="split" min="0" step="any" required onChange={updateValue} />
                          </div>


                        </label>
                      </div>
                    ))}
                  </form>
                </div>}
              {(!valid) && <h5 className="invalid">Invalid input</h5>}
              <input id="calc-btn" value="calculate" onClick={handleCalculate} />
            </form>
          </div>



        </div>{(history.length > 0)&&(
        <div class="bill-divider-wrapper">
          <div class="title">
            <h1>Expense History</h1>
          </div>

          <ol>
            {history.map((item)=> (
              <li>{item}</li>
            ))}
           
          </ol>
        </div>)}
        <div >
          {
            ((switchs) ? owes : individual)?.map(owe => (
              <h4 className="owes">{owe}</h4>
            ))}
          <input type="submit" id="calc-btn" style={{ background: "red" }} value={(switchs) ? "Individual" : "Overall"} onClick={() => { setSwitch(!switchs) }} />

        </div>
      </div>

    </>
  );
})

export default Home;
{/* <div  className="Expense">
<div>
 <h2>Users</h2>

 <ul>
   {users.map((user, index) => (
     <li key={index}>{user}</li>
   ))}
 </ul>
</div>
<div>
 <h2>Expenses</h2>
 <label>
   Paid by:
   <select name="paidBy" value={expenseData.paidBy} onChange={handleExpenseDataChange}>
     <option value="">Select User</option>
     {users.map((user, index) => (
       <option key={index} value={user}>
         {user}
       </option>
     ))}
   </select>
 </label>
 <label>
   Amount:
   <input type="number" name="amount" value={expenseData.amount} onChange={handleExpenseDataChange} />
 </label>
 <label>
   Split Type:
   <select name="splitType" value={expenseData.splitType} onChange={handleExpenseDataChange}>
     <option value="equally">Equally</option>
     <option value="unequally">Unequally</option>
   </select>
 </label>
 <button className= "btn" onClick={addExpense}>Add Expense</button>
 <h3>Expenses List</h3>
 <ul>
   {expenses.map((expense, index) => (
     <li key={index}>
       {expense.paidBy} paid ${expense.amount} ({expense.splitType})
     </li>
   ))}
 </ul>
</div>
<div>
 <h2>Summary</h2>
 <button className= "btn"  onClick={calculateOwes}>Calculate Owes</button>
 {/* Display the result of who owes whom */}
// </div>
// </div> */}