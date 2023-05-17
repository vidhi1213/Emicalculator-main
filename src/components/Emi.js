import React, { useState } from 'react'
import TextField from './TextField';
import axios from 'axios';
const API = "https://homexp.in/service/emicalculator"
function Emi() {
    const [data, setdata] = useState({amount:'', tenure:'', rate:''})
    const [emaidata, setemidata] = useState()
    const [loader, setloader] = useState(false)
    const InputChange = (e) => {
        const {name, value} = e?.target
        setdata({...data,[name]:value})
    }

    const SubmitEmi = (e) => {
        e.preventDefault()
        setloader(true)
        const form = new FormData();
        form.append('amount', data?.amount);
        form.append('tenure', data?.tenure);
        form.append('rate', data?.rate);

        axios.post(API, form).then(function (res) {
            console.log(JSON.stringify(res.data));
            setemidata(res?.data)
            setloader(false)
            // setdata({amount:'', tenure:'', rate:''})
          })
          .catch(function (error) {
            console.log(error);
            setloader(false)

        });
          
    }
  return (
      <div className='container'>
          <div className='main_content'>
     <div className='main_emi'>
        <button type='button'>Emi Calculator</button>
        <h1>Emi Calculator</h1>
        <p>Calculate Your Emi Per Month  Quickly</p>
    </div>
    <div className='form_section'>
        <form onSubmit={(e) => SubmitEmi(e)} className='d_flex'>
            <div className='formdata'>
            <TextField name="amount" type="number" required label="Loan Amount:" value={data?.amount} handleChange={InputChange} placeholder="Enter Loan Amount " />
            
            <div className='d_flex'>
                <TextField name="tenure" type="number" required label="Tenure:" value={data?.tenure} handleChange={InputChange} placeholder="Enter Number Of Year " />
                <TextField name="rate" type="number" required  label="Interest Rate:" value={data?.rate} handleChange={InputChange} placeholder="Enter Rate of Interest %" />
            </div>
            <div>
            <button type='submit'>Calculate</button>
            </div>
            </div>
            <div>
                <div className='emirate'>
                    <div className='emirate_top'>
                        <h1>Your Emi Per Month Will Be</h1>
                        <h3>{emaidata?.emi}</h3>
                    </div>
                 <div className='interet_content'>
                   <div >
                       <h4>Total rate</h4>
                       <span>₹ {emaidata?.interest}</span>
                   </div>
                   <div>
                       <h4>Amount With rate</h4>
                       <span>₹ {emaidata?.totalamt}</span>
                   </div>
                </div>
                </div>
            </div>
        </form>
    </div>
    </div>
    {
         loader && <span className='overlay'> <img src='/loader.gif' alt='loader' width="80" height="80" /> </span>
    }
    </div>
  )
}

export default Emi