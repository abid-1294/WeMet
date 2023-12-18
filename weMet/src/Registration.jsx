import React, { useState } from 'react'
import videobg from '../src/assets/wave-cafe-video-bg.mp4'
import Googlelogo from '../src/assets/GoogleLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";


const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');

  const [emailerr, setEmailerr] = useState('');
  const [fullNameerr, setFullNameerr] = useState('');
  const [passworderr, setPassworderr] = useState('');

  const [showPassword, setShowPassword] = useState(false)


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
  }
  const handleFullName = (e) => {
    setFullName(e.target.value);
    setFullNameerr('')
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr('')
  }
  const handleSubmit = () => {
    if (!email) {
      setEmailerr('Email is required*');
    } else {
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        setEmailerr('Email is not valid!')
      }
    }
    if (!fullName) {
      setFullNameerr('Your Name is required*');
    }
    if (!password) {
      setPassworderr('Shame! You have no privacy*');
    } else if (!/^(?=.*[a-z])/.test(password)) {
      setPassworderr('The string must contain at least 1 lowercase alphabetical character')
    } else if (!/^(?=.*[A-Z])/.test(password)) {
      setPassworderr('The string must contain at least 1 uppercase alphabetical character')
    } else if (!/^(?=.*[0-9])/.test(password)) {
      setPassworderr('The string must contain at least 1 numeric character')
    } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
      setPassworderr('The string must contain at least one special character')
    } else if (!/^(?=.{8,})/.test(password)) {
      setPassworderr('The string must be eight characters or longe')
    }
    if (email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && /^(?=.*[a-z])/.test(password) && /^(?=.*[A-Z])/.test(password) && /^(?=.*[0-9])/.test(password) && /^(?=.*[!@#$%^&*])/.test(password) && /^(?=.{8,})/.test(password)) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((user) => {
          updateProfile(auth.currentUser, {
            displayName: fullName,
            photoURL: DefaultProfile
          }).then(() => {
            sendEmailVerification(auth.currentUser)
            console.log(user, 'user');
            toast.success('Registration is done & verify your account by your gmail');
            setEmail('')
            setFullName('')
            setPassword('')
            setTimeout(() => {
              navigate('/')
            }, 1000)

          }).then(() => {
            set(ref(db, 'users/' + user.user.uid), {
              username: user.user.displayName,
              email: user.user.email,
            });
          })
        })

        .catch((error) => {
          const errorCode = error.code;
          if (errorCode.includes('auth/email-already-in-use')) {
            setEmailerr('This email has already registered');
            setPassword('')
          }
        });
    }
  }
  return (
    <>
      <div className='relative w-full h-[100vh]'>

        <div className='w-[250px] h-[25px] absolute top-0 left-0'>
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
        </div>

        <div className='absolute top-0 left-0 w-full h-full bg-[rgba(43,105,108,0.6)]'></div>
        <div className='w-full h-screen'>
          <video src={videobg} autoPlay loop muted className='w-full h-full object-cover' />
        </div>
        <div className='absolute w-[500px] h-[500px] top-[380px] left-[450px]'>
          <h1 className='text-white text-6xl font-normal font-Pacific tracking-widest'>We Met</h1>
          <p className='font-Osans text-white font-regular text-2xl mt-5 leading-[50px]'>Connect with friends, family and other people you know.<span className='block'> Share photos and videos and get updates.</span></p>
        </div>
        <div className='absolute px-[20px] py-[20px] top-[200px] left-[1000px]'>
          <div className='rounded bg-zinc-400 bg-opacity-40 py-5 px-5'>
            <h2 className='text-3xl text-white text-center font-semibold font-Osans'>Sign Up</h2>
            <div className='flex w-[221px] h-[62px] cursor-pointer border-opacity-50 rounded-lg border border-white py-[21px] px-[30px] mt-[30px] bg-white bg-opacity-50 hover:bg-opacity-80'>
              <img className='w-[19.26px] h-[19.26px]' src={Googlelogo} alt="" />
              <p className='ml-[10px] font-semibold tracking-[0.267px] text-[13.338px] text-[#000000] font-Osans'>Login with Google</p>
            </div>
            <p className='text-white mt-2'>Or,</p>

            {/* ******** For Email Input part in Login page************ */}
            <div className='relative mt-[10px] text-center'>
              <p className='mt-[20px] text-white tracking-[1.032px] font-semibold text-[15px] font-Osans'>Email Address</p>
              <input onChange={handleEmail} value={email} className='text-[#d8d7ff] text-[20px] font-Osans font-semibold w-[300px] bg-transparent border-white border-b border-opacity-50 outline-none py-[15px] pb-[16px] pr-[30px] placeholder-white placeholder-opacity-40' type="email" placeholder="Enter your mail" />
              {
                emailerr &&
                <p className='text-red-500 font-Nun font-black animate-pulse '>{emailerr}</p>
              }
            </div>
            {/* ******** For Name Input part in Login page************ */}
            <div className='relative mt-[10px] text-center'>
              <p className='mt-[20px] text-white tracking-[1.032px] font-semibold text-[15px] font-Osans'>Name</p>
              <input onChange={handleFullName} value={fullName} className='text-[#d8d7ff] text-[20px] font-Osans font-semibold w-[300px] bg-transparent border-white border-b border-opacity-50 outline-none py-[15px] pb-[16px] pr-[30px] placeholder-white placeholder-tc placeholder-opacity-40' type="text" placeholder="Enter your full name" />
              {
                fullNameerr &&
                <p className='text-red-500 font-Nun font-black animate-pulse '>{fullNameerr}</p>
              }
            </div>
            {/* ******** For Password Input part in Login page************ */}
            <div className='relative mt-[20px] w-[468px] text-center'>
              <p className='mt-[20px] text-white tracking-[1.032px] font-semibold text-[15px] font-Osans'>Password</p>
              <input onChange={handlePassword} value={password} className='text-[#d8d7ff] text-[20px] font-Osans font-semibold w-[300px] placeholder-white placeholder-opacity-40 bg-transparent border-white border-b border-opacity-50 outline-none py-[15px] pb-[16px] pr-[30px]' type={showPassword ? 'text' : 'password'} placeholder="Enter your password" />
              {
                showPassword ?
                  <RiEyeFill onClick={() => setShowPassword(!showPassword)} className='text-xl absolute top-11 right-20 text-white' />
                  :
                  <RiEyeCloseFill onClick={() => setShowPassword(!showPassword)} className='text-xl absolute top-12 right-20' />
              }
              {
                passworderr &&
                <p className='text-red-500 w-[400px] font-Nun font-black animate-pulse '>{passworderr}</p>
              }
            </div>

            <div className='w-[300px] mx-auto text-center mt-[25px] mb-[20px]'>
              <button onClick={handleSubmit} className='w-[150px] h-[60px] bg-[#76fff4] bg-opacity-80 hover:bg-opacity-100 font-Osans text-[20.90px] font-semibold rounded-lg px-[20px] py-[10px] cursor-pointer outline-none'>Continue</button>
              <p className='w-[250px] font-Osans font-normal text-[13.338px] text-white mt-5 mx-auto'>Already have an account ? <span className='text-[#ffffff] font-bold'><Link to='/'>Sign in</Link></span>, here</p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Registration
