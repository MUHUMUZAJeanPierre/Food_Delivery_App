// import React from 'react'
import { assets } from '../../assets/assets';
import './AppDownload.css';

const AppDownload = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For better experience Download <br/> Tomato App</p>
      <div>
        <div className='app-download-platforms'>
            <img src={assets.play_store} alt='play store image' />
            <img src={assets.app_store} alt='' />
        </div>
      </div>
    </div>
  )
}

export default AppDownload
