import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
    const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailerr, setEmailerr] = useState('');
  const [error, setError] = useState('')

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
  }

  const handleSubmit = () =>{
    if(!email){
      setEmailerr('Email is required*');
    }else{
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailerr('Email is not valid!')
      }
    }

    if(email && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      sendPasswordResetEmail(auth, email)
        .then(() => {
          if(auth.email){
            toast.success('Go to your mail and set a password...!');
          setEmail('')
          setError('')
          }else{
            setError('This email is not registered...!');
          }
          
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
        });
      
    }


  }
  return (
    <div className='h-screen w-full bg-gradient-to-b from-[rgb(0,165,217,100)] to-[rgb(0,165,217,0.15)] flex justify-center items-center'>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='bg-white w-1/2 rounded p-[30px]'>
      <h1 className='text-center font-bold text-[34px] text-[#03014C] font-Osans '>Forgot Password</h1>
          <div className='relative mt-[40px] pl-[30px]'>
                <p className='mt-[32px] text-[#03014C] tracking-[1.032px] font-normal text-[13.76px] font-Osans'>Email Address</p>
                <input onChange={handleEmail} value={email} className='text-[#03014C] text-[20px] font-Osans font-semibold w-[487px] border-b border-opacity-50 outline-none border-[#808080] py-[15px] pb-[16px] pr-[60px]' type="email" placeholder="Enter your mail" />
                {
                  emailerr &&
                  <p className='text-red-500 font-Nun font-black animate-pulse '>{emailerr}</p>
                }
                <p className='text-red-500 font-Nun font-black animate-pulse mt-[40px] '>{error}</p>
                <div className='mt-[20px] flex'>
                <button onClick={handleSubmit} className='w-[100px] h-[60px] mr-[20px] text-white font-Osans text-[16px] font-semibold bg-[#0066FF] rounded-lg px-[5px] py-[5px] cursor-pointer'>Reset</button>

                <button className='w-[180px] h-[60px] text-white font-Osans text-[16px] font-semibold bg-[#0066FF] rounded-lg px-[5px] py-[5px] cursor-pointer'><Link to='/'>Back To Login</Link></button>
                </div>
                
          </div>
      </div>
      
    </div>
  )
}

export default ForgotPassword
