import React from 'react'
import Navbar from '../component/Navbar.jsx'
import ProfileNBio from '../component/ProfileNBio.jsx';
import Coverphoto from '../component/Coverphoto.jsx'
import Friends from '../component/Friends.jsx';
const ProfileInfo = () => {
  return (
    <div>
      <Navbar />
                <div>
                  <div className='relative'>
                    <Coverphoto />
                  </div>
                  <div className='absolute top-[520px] left-[200px]'>
                    <ProfileNBio />
                  </div>
                </div>
                <Friends />
    </div>
  )
}

export default ProfileInfo
