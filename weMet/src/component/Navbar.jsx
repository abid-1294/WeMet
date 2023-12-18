import React, { useState } from 'react'
import { TiHome } from "react-icons/ti";
import { FaUserFriends } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoTriangle } from "react-icons/io5";
import { VscSignOut } from "react-icons/vsc";

const Navbar = () => {
    const [sigoutPopup, setSigoutPopup] = useState(false)
    const handleSigoutPopup = () => {
        setSigoutPopup(true)
    }
    return (
        <>
            <div className='bg-[#00A5D9] w-full h-[60px] py-2 rounded-bl-[20px] rounded-br-[20px] shadow-lg'>
                <div className='container mx-auto flex '>
                    <h1 className='text-white text-3xl font-normal font-Pacific mt-[2px] border-none'>We Met</h1>
                    <div className='ml-[215px] w-[50px] h-[40px] pl-[4px] pt-[4px] px-[4px] hover:border-b hover:border-white hover:shadow-xl'><TiHome className='w-[40px] h-[35px] text-white' /></div>
                    <div className='ml-[125px] w-[50px] h-[40px] pl-[4px] pt-[6px] px-[4px] hover:border-b hover:border-white hover:shadow-xl  '><FaUserFriends className='w-[40px] h-[30px] text-white' /></div>

                    <div className='ml-[440px] relative'>
                        <input type="text" className=' py-[6px] pl-12 px-[15px] w-[275px] h-[40px] bg-white bg-opacity-50 rounded-[50px] outline-none border border-white text-[18px]' />
                        <FaSearch className='w-[25px] h-[25px] ml-2 text-white absolute top-2 left-0.5' />
                    </div>

                    <div onClick={handleSigoutPopup} className='ml-[125px] rounded-full'><CgProfile className='w-[40px] h-[40px] text-white relative' />
                        {
                            sigoutPopup &&
                            <div className='w-[15%] h-[10%] rounded-xl border bg-gradient-to-b from-[rgb(0,165,217,100)] to-[rgba(228,237,239,0.6)] absolute top-[6.5%] right-[8%] z-[1] '>
                                <IoTriangle className='text-[rgb(168,235,255)] text-xl absolute top-[-18px] left-[42%]' />
                                <div>
                                    <div className='flex items-center px-2 pt-2'>
                                    <CgProfile className='text-2xl text-white '/>
                                    <p className='ml-4 font-Osans text-xl font-semibold'>Profile</p>
                                    </div>
                                    <div className='flex items-center px-2 pt-2'>
                                    <VscSignOut className='text-2xl text-white '/>
                                    <p className='ml-4 font-Osans text-xl font-semibold'>Signout</p>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>


        </>
    )
}

export default Navbar
