import React from 'react'
import "./Amount.css"
const Amount = () => {
  const [ani,setAni]  = React.useState(true);
    const delay = async (ms) => {
        return new Promise((resolve) => 
            setTimeout(resolve, ms));
    };
    const add = async () => {
      console.log(ani);
        document.getElementById("test").classList.add("ani1");
        if(ani){
          document.getElementById("test1").classList.remove("ani22");
          document.getElementById("test1").classList.add("ani21");
          
          document.getElementById("test2").classList.remove("ani32");
          document.getElementById("test2").classList.add("ani31");
        }
        else{
          document.getElementById("test1").classList.remove("ani21");
          document.getElementById("test1").classList.add("ani22");
          document.getElementById("test2").classList.remove("ani31");
          document.getElementById("test2").classList.add("ani32");
        }
        await delay(600);
        document.getElementById("test").classList.remove("ani1");
        
        
    }
    
  return (
    <>
    <div id="test" className='add'>
      <button  className='abtn' onClick={()=>{
        setAni(!ani);add();}}><i className="bx bx-plus"></i></button>
    </div>
      <div id="test1" className='add1'>
      <button  className='abtn'><i className="bx bx-plus"></i></button>
    </div>
    <div id="test2" className='add2'>
      <button  className='abtn'><i className="bx bx-plus"></i></button>
    </div>
  </>
  )
}

export default Amount
