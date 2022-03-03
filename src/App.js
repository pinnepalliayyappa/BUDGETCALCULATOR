import React,{useState,useEffect} from 'react'
import './App.css'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import Alert from './components/Alert'
import {v4 as uuidv4} from 'uuid'

// const intialExpenses=[
//   {
//     id : uuidv4(),charge : 'rent',amount : 5000
//   },
//   {
//     id : uuidv4(),charge : 'car payment',amount : 6000
//   },
//   {
//     id : uuidv4(),charge : 'boat payment',amount : 7000
//   }
// ]
 const intialExpenses= localStorage.getItem('expenses')
 ?JSON.parse(localStorage.getItem('expenses'))
 :[]


function App() {
  const [expenses , setExpenses] = useState(intialExpenses)
  const [charge , setCharge] = useState("")
  const [amount , setAmount] = useState('')


//setEdit
const [edit,setEdit]=useState(false) 
//setId
const[id,setId]=useState(0)

  //const [count,setCount] = useState(3)
  //alert
  const [alert , setAlert] = useState({show:false})
  //onChange functionality
  const handleCharge = e=>{
    setCharge(e.target.value)
    //console.log(e.target.value)
  }
  const handleAmount = e=>{
    setAmount(e.target.value)
    //console.log(e.target.value)
  }
  //handle alert
  const handleAlert = ({type,text})=>{
    setAlert({show:true,type,text})
    setTimeout(()=>{
      setAlert({show:false})
    },3000)
  }
  const handleSubmit = e=>{
    e.preventDefault()
    if(charge !=='' && amount>0)
    {
      if(edit)
      {
        let tempExpenses=expenses.map(item => {
          return item.id===id?{...item,charge,amount}:item
        })
        setExpenses(tempExpenses)
        setEdit(false)
        handleAlert({type:'success',text :"item edited sucessfully"})
      }
      else{
        const singleExpense={id:uuidv4(),charge:charge,amount}
        setExpenses([...expenses,singleExpense])
        handleAlert({type:'success',text :"item added sucessfully"})

      }
      
      
      setAmount("")
      setCharge("")
      
    }
    else{
      handleAlert({type:"danger",text:" charge can't be empty and amount has to be greater than zero"})
    }

  } 
  //handle clear expenses
  const clearExpenses = e=>{
    setExpenses([])
    handleAlert({type:"danger",text:" All items deleted successfully"})
  }



  //handle delete item
  const handleDelete = id =>{
    let tempExpenses=expenses.filter(item=> item.id !==id)
    setExpenses(tempExpenses)
    handleAlert({type:'danger',text:'item deleted'})
    //console.log(`${id}`)
    
  }
  //handle edit item
  const handleEdit = id =>{
    let expense=expenses.find(item => item.id ===id)
    let {charge,amount}=expense
    setCharge(charge)
    setAmount(amount)
    setEdit(true)
    setId(id)
  }

  
//console.log(expenses)


//hadling local storage
useEffect(()=>{
  console.log("we called useEffect")
  localStorage.setItem("expenses",JSON.stringify(expenses))
},[expenses])

  return (
    <>
      { alert.show && <Alert type={alert.type} text={alert.text}/>}
      <h1>Monthly Budget Calculator</h1>
      <main className='App'>
      <ExpenseForm  
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
      />
      <ExpenseList 
          expenses={expenses} 
          clearExpenses={clearExpenses}
          handleDelete={handleDelete} 
          handleEdit={handleEdit} />
      </main>
      <h1>
        Total Spending :{""}
        <span className='total'>
          INR.
          {
            expenses.reduce((accu,curr)=>{
              return (accu+=parseInt(curr.amount))
            },0)
          }
        </span>
      </h1>
      
    </>
  )
}
export default App
