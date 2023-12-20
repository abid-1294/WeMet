import React, { useEffect, useState } from 'react'
import { TiHome } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoTriangle } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { userLoginInfo } from '../slices/userSlice';

const Navbar = () => {
    const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;
            const isScrollingDown = currentScrollPos > prevScrollPos;

            setVisible(isScrollingDown);

            setPrevScrollPos(currentScrollPos);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos]);

    const db = getDatabase();
    const data = useSelector(state => state.userLoginInfo.userInfo)
    const dispatch = useDispatch()
    const auth = getAuth();
    const navigate = useNavigate()

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setTimeout(() => {
                navigate('/')
            })
            dispatch(userLoginInfo(null));
            localStorage.removeItem('userLoginInfo');
            localStorage.clear();   //after signout local storage will be cleared
            console.clear();        ////after signout console will be cleared

        }).catch((error) => {
            console.log(error.code)
        });
    }

    const handleProfileInfoSet = () => {
        setTimeout(() => {
            navigate('/profileinfo')
        })
            .catch((error) => {
                console.log(error.code)
            });
    }

    const [sigoutPopup, setSigoutPopup] = useState(false)
    const handleSigoutPopup = () => {
        setSigoutPopup(true)
    }


    return (
        <>
            <div className="relative z-[1000]">
                <div className={`fixed top-0 left-0 h-[60px] py-2 rounded-bl-[20px] rounded-br-[20px] w-${visible ? '0' : 'full'} bg-${visible ? 'white' : '[#00A5D9]'} transition-all duration-300 p-4 ${visible ? 'shadow-md' : ''}`}>
                    {
                        visible
                            ?
                            <></>
                            :
                            <div className='container mx-auto flex '>
                                <h1 className='text-white text-3xl font-normal font-Pacific mt-[2px] border-none'>We Met</h1>
                                <div className='ml-[215px] w-[50px] h-[40px] pl-[4px] pt-[4px] px-[4px] hover:border-b hover:border-white hover:shadow-xl'><Link to='/home'><TiHome className='w-[40px] h-[35px] text-white' /></Link></div>
                                <div className='ml-[125px] w-[50px] h-[40px] pl-[4px] pt-[6px] px-[4px] hover:border-b hover:border-white hover:shadow-xl  '><FaUserFriends className='w-[40px] h-[30px] text-white' /></div>

                                <div className='ml-[440px] relative'>
                                    <input type="text" className=' py-[6px] pl-12 px-[15px] w-[275px] h-[40px] bg-white bg-opacity-50 rounded-[50px] outline-none border border-white text-[18px]' />
                                    <FaSearch className='w-[25px] h-[25px] ml-2 text-white absolute top-2 left-0.5' />
                                </div>

                                <div onClick={handleSigoutPopup} className='ml-[125px] rounded-full'><CgProfile className='w-[40px] h-[40px] text-white relative' />
                                    {
                                        sigoutPopup &&
                                        <div className='w-[10%] h-[150%] rounded-xl border bg-gradient-to-b from-[rgb(0,165,217,100)] to-[rgba(228,237,239,0.6)] absolute top-[110%] right-[10.6%] z-[1] '>
                                            <IoTriangle className='text-[rgb(168,235,255)] text-xl absolute top-[-18px] left-[42%]' />
                                            <div>
                                                <div onClick={handleProfileInfoSet} className='flex items-center px-2 pt-2 cursor-pointer'>
                                                    <CgProfile className='text-2xl text-white ' />
                                                    <p className='ml-4 font-Osans text-xl font-semibold'>Profile</p>
                                                </div>
                                                <div onClick={handleSignOut} className='flex items-center px-2 pt-2 cursor-pointer'>
                                                    <VscSignOut className='text-2xl text-white ' />
                                                    <p className='ml-4 font-Osans text-xl font-semibold'>Signout</p>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                    }
                </div>
            </div>




        </>
    )
}

export default Navbar
