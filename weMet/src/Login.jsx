import videobg from '../src/assets/wave-cafe-video-bg.mp4'
import Googlelogo from '../src/assets/GoogleLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'
import { ToastContainer, toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { userLoginInfo } from './slices/userSlice';
function Login() {
  const auth = getAuth();
  const dispatch = useDispatch()
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailerr, setEmailerr] = useState('');
  const [passworderr, setPassworderr] = useState('');
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
  }

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr('')
  }
  const handleSignin = () =>{
    if(!email){
      setEmailerr('Email is required*');
    }else{
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
        setEmailerr('Email is not valid!')
      }
    }
    if(!password){
      setPassworderr('Shame! You have no privacy*');
    }
    if(email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          toast.success('Login successfully done...!');
          console.log(user.user);
          dispatch(userLoginInfo(user.user));
          localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
          setEmail('')
          setPassword('')
          setError('')
          setTimeout(() =>{
            navigate('/home')
            },1000)          
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode);
          if(errorCode.includes('auth/invalid-login-credentials')){
            setError('Please give the correct mail & password...!');
            setPassword('')
          }
        });
          }
  }


  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(() => {
        toast.success('Login successfully done...!');
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      }).catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
      });
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
        <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.3)]'></div>
        <div className='w-full h-screen'>
          <video src={videobg} autoPlay loop muted className='w-full h-full object-cover' />
        </div>

        <div className='absolute w-[500px] h-[500px] top-[400px] left-[450px]'>
          <h1 className='text-white text-6xl font-normal font-Pacific tracking-widest'>We Met</h1>
          <p className='font-Osans text-white font-regular text-2xl mt-5 leading-[50px]'>Connect with friends, family and other people you know.<span className='block'> Share photos and videos and get updates.</span></p>
        </div>
        <div className='absolute w-[800px] h-[620px] top-[250px] left-[1050px]'>
          <div className='w-[500px] h-[600px] rounded bg-zinc-300 bg-opacity-40 py-5 px-5'>
            <h2 className='text-3xl text-white text-center font-semibold font-Osans'>Sign In</h2>
            <div onClick={handleGoogleSignIn} className='flex w-[221px] h-[62px] cursor-pointer border-opacity-50 rounded-lg border border-white py-[21px] px-[30px] mt-[30px] bg-white bg-opacity-50 hover:bg-opacity-80'>
              <img className='w-[19.26px] h-[19.26px]' src={Googlelogo} alt="" />
              <p className='ml-[10px] font-semibold tracking-[0.267px] text-[13.338px] text-[#000000] font-Osans'>Login with Google</p>
            </div>
            <p className='text-white mt-2'>Or,</p>

            {/* ******** For Email Input part in Login page************ */}
            <div className='relative mt-[10px] text-center'>
              <p className='mt-[20px] text-white tracking-[1.032px] font-semibold text-[15px] font-Osans'>Email Address</p>
              <input onChange={handleEmail} value={email} className='text-[#d8d7ff] text-[20px] font-Osans font-semibold w-[300px] bg-transparent border-white border-b border-opacity-50 outline-none py-[15px] pb-[16px] pr-[60px] placeholder-white placeholder-opacity-40' type="email" placeholder="Enter your mail" />
              {
                emailerr &&
                <p className='text-red-500 font-Nun font-black animate-pulse '>{emailerr}</p>
              }
            </div>
            {/* ******** For Password Input part in Login page************ */}
            <div className='relative mt-[20px] w-[468px] text-center'>
              <p className='mt-[20px] text-white tracking-[1.032px] font-semibold text-[15px] font-Osans'>Password</p>
              <input onChange={handlePassword} value={password} type={showPassword ? 'text' : 'password'} className='text-[#d8d7ff] text-[20px] font-Osans font-semibold w-[300px] placeholder-white placeholder-opacity-40 bg-transparent border-white border-b border-opacity-50 outline-none py-[15px] pb-[16px] pr-[60px]' placeholder="Enter your password" />
              {
                showPassword ?
                  <RiEyeFill onClick={() => setShowPassword(!showPassword)} className='absolute top-10 right-3' />
                  :
                  <RiEyeCloseFill onClick={() => setShowPassword(!showPassword)} className='absolute top-10 right-3' />
              }
              {
                passworderr &&
                <p className='text-red-500 w-[400px] font-Nun font-black animate-pulse '>{passworderr}</p>
              }
            </div>

            <div className='w-[300px] mx-auto mt-[55px] mb-[20px]'>
              <button onClick={handleSignin} className='w-[280px] h-[60px]  bg-[#76fff4] bg-opacity-80 hover:bg-opacity-100 font-Osans text-[20.90px] font-semibold rounded-lg px-[50px] py-[10px] cursor-pointer '><Link to='/home'>Login to Continue</Link></button>
              <p className='w-[220px] font-Osans font-normal text-[13.338px] text-white mt-5 mx-auto'>Don't have an account ? <span className='text-[#4afff0] font-bold'><Link to='/registration'>Sign up</Link></span></p>
              <p className='w-[220px] cursor-pointer font-Osans font-bold text-[13.338px] ml-[75px] text-[#ffffff]'><Link to='/forgotpassword'>Forgot password?</Link></p>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Login
