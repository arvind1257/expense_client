import React from 'react'
import "./Loading.css" 
const Loading = () => {
  return (
    <div className='loadingMainPage'>
      <div className="row justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className="animation2">
        <div className="animation3">Loading...</div>
        <div><img src="coin.png" id="img1" alt="no" /><img id="move" src="coin.png" alt="no" /><img id="move1" src="coin.png" alt="no" /><img id="move2" src="coin.png" alt="no" /><img src="icon1.png" id="img2" alt="no" /> </div>
      </div>
      </div>
    </div>
  )
}

export default Loading
