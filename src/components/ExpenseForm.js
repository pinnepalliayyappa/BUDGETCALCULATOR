import React from 'react'
import {MdSend} from "react-icons/md"

function ExpenseForm({charge,amount,handleCharge,handleAmount,handleSubmit,edit}) {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
          <label htmlFor='charge'>charge</label>
          <input className='form-control' 
                type='text' 
                id='charge' 
                name='charge'
                placeholder='e.g rent'
                value={charge}
                onChange={handleCharge}/>
        </div>
        <div>
        <label htmlFor='amount'>amount</label>
          <input className='form-control' 
                type='number' 
                id='amount' 
                name='amount'
                placeholder='e.g 5000'
                value= {amount}
                onChange={handleAmount}/>
        </div>

      </div>
      <button type="submit" className='btn' >
        {edit?'EDIT':'SUBMIT'}
        <MdSend className='btn-icon'/>
      </button>
    </form>
  )
}
export default ExpenseForm