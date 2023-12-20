import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Navbar from '../component/Navbar.jsx'
import { userLoginInfo } from '../slices/userSlice.jsx';


const Home = () => {
  const auth = getAuth();
  const navigate = useNavigate()
  const data = useSelector(state => state.userLoginInfo.userInfo)
  const [verify, setVerify] = useState(false)
  const [loaded, setloaded] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!data) {
      navigate('/')
    }
  }, [])
  onAuthStateChanged(auth, (user) => {
    console.log(user, 'Weeeeee');
    if (user.emailVerified) {
      setVerify(true)
      dispatch(userLoginInfo(user))
      localStorage.setItem('userLoginInfo', JSON.stringify(userLoginInfo(user.user)))
    }
    setloaded(true)
  });

  console.log(verify);

  return (
    <div className='w-full bg-[#F0F2F5]'>
      {
        loaded && <div>
          {
            verify ?
              <>
                <Navbar />
              </>
              :
              <div className='h-screen w-full bg-gradient-to-b from-[rgb(0,165,217,100)] to-[rgb(0,165,217,0.15)] flex justify-center items-center'>
                <div className='bg-white rounded p-[20px] w-[800px]'>
                  <h1 className='text-center border-2 border-red-500 font-bold text-[26px] text-[#03014C] font-Osans mt-[10px]'><a href="https://mail.google.com/mail" target='_blank'>Please Verify your email</a></h1>
                  <button className='block mx-auto w-[200px] h-[40px] bg-[#76fff4] bg-opacity-60 hover:bg-opacity-100 mt-[55px] mb-[35px] font-Osans text-[16px] font-semibold rounded-lg px-[10px] py-[8px] cursor-pointer'>
                    <Link to="/">Back to Login</Link>
                  </button>
                </div>
              </div>
          }
        </div>
      }

    </div>
  )
}

export default Home
