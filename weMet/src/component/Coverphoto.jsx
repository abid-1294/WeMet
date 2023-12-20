import React from 'react'
import CoverPhoto from '../assets/CoverPic.jpg'
import { FiCamera } from "react-icons/fi";


const Coverphoto = () => {
    
    return (
        <>
            <div className='w-full h-[550px] overflow-hidden mt-10 relative'>
                <img src={CoverPhoto} alt="coverPhoto" className='w-full' />
                <div className='absolute w-[50px] h-[50px] bottom-0 right-[50px] rounded-full bg-[rgba(251,248,248,0.4)] pt-3 mb-5'>
                    <FiCamera className='w-[25px] h-[25px] text-white mx-auto' />
                </div>
            </div>
        </>
    )
}

export default Coverphoto
