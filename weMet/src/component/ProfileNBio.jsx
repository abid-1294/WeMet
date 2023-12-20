import React, { useState, createRef } from 'react'
import { getAuth, updateProfile } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import "cropperjs/dist/cropper.css";
import { getDownloadURL, getStorage, ref, uploadString } from "firebase/storage";
import { useDispatch, useSelector } from 'react-redux';
import { getDatabase, update, ref as refprofileImg } from 'firebase/database';
import DefaultProfile from '../assets/ProfilePicture/DefaultProfilePic.png'
import { FiCamera } from 'react-icons/fi'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

const ProfileNBio = () => {
  const db = getDatabase();
  const data = useSelector(state=> state.userLoginInfo.userInfo)
  const dispatch = useDispatch()
  
  console.log(data, 'daaaaaataaaaaaaaa');
  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("");
  const cropperRef = createRef();
  
  
  let [profileModal, setprofileModal] = useState(false)
  const auth = getAuth();
  const navigate = useNavigate()
   //profile img cropper
   const onChanger = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  let handleProfileModal=()=>{
    setprofileModal(true)
  }
  console.log(profileModal);

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const storage = getStorage();
      const storageRef = ref(storage, auth.currentUser.uid);
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
        getDownloadURL(storageRef).then((downloadURL) => {
          // setprofilePhoto(downloadURL)
          console.log(downloadURL,'DOWNLOADURL');
          updateProfile(auth.currentUser, {
            photoURL: downloadURL
          }).then(()=>{
            update(refprofileImg(db, 'users/' + data.uid),{
              profileImg: downloadURL,
            })
            setprofileModal(false)
            setImage('');
            setCropData('')
          })
        });
      });
    }
  };

  return (
    <>
    <div className='container mx-auto flex'>
      <div className='w-[200px] h-[200px] rounded-full overflow-hidden group relative'>
        <img src={data.photoURL} alt="Profilepic" className='w-full h-full'/>
        <div onClick={handleProfileModal} className='absolute w-[40px] h-[40px] bottom-0 right-[3px] rounded-full bg-[rgba(251,248,248,0.4)] pt-3 mb-5'>
        <FiCamera className='w-[20px] h-[20px] text-white mx-auto'/>
      </div>
      </div>
      <div className='w-[400px] mt-[100px] ml-5'>
        <h2 className='text-3xl font-bold font-Osans leading-9'>{data.displayName}</h2>
        <p className='w-[200px] font-normal text-[15px]'>Bio Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, debitis?</p>
      </div> 
    </div>
     {
      profileModal &&
      <div className='w-[2020px] h-screen bg-[rgba(0,0,0,0.4)] absolute flex justify-center items-center top-[-500px] left-[-300px] z-[1]'>
      <div className='w-[500px] px-[10px] py-[10px] rounded bg-black  text-center'>
        <h1 className='text-xl mt-5 w-[400px] pb-2 mx-auto text-white font-Pops font-semibold border-b'>Upload your Profile Picture</h1>

        {
          image ?
        <div className='w-[150px] h-[150px] rounded-full overflow-hidden mx-auto my-4'>
        <div
        className="img-preview"
        style={{ width: "100%", float: "left", height: "300px" }}
        />
        </div>
        :
        <div className='w-[150px] h-[150px] rounded-full overflow-hidden mx-auto my-4'>
        <img src={data.photoURL} alt="" />
        </div>

        }
       
        {
          image &&
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
            src={image}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
            />
          }
          <input onChange={onChanger} type="file" className='block mx-auto mt-[50px] w-[300px] py-3 px-2 bg-white rounded-full font-Nun'/>

        <button onClick={getCropData} className='bg-primary_color mt-10 mb-5 text-white py-3 px-4 rounded'>Upload</button>
        <button onClick={()=>setprofileModal(false)} className='bg-white mt-10 mb-5 ml-5 text-black py-3 px-4 rounded'>Cancel</button>
      </div>
    </div>
    }
    </>
  )
}

export default ProfileNBio
