import React, { useRef,useState } from 'react'
import './StudyBot.css';
import right from '../assets/arrow-right-solid.svg'
import icon from '../assets/headset-solid.svg'



function StudyBot() {
  
    const ipRef=useRef()
    const bot="from bot"
    const person= "from human"
    const [qna,setQna]= useState([]);
    const [loading,setLoading]= useState(false);

// const API = axios.create({ baseURL: 'http://localhost:5000'})


    
const renderContent = (qna) => {
  const value = qna.value;

  if (Array.isArray(value)) {
    return value.map((val, i) => <p key={i}>{val}</p>);
  } else if (typeof value === 'object') {
    // Handle object case here
    return (
      <div>
        {Object.entries(value).map(([key, val]) => (
          <div key={key}>
            <strong>{key}: </strong>
            <span>{val}</span>
          </div>
        ))}
      </div>
    );
  } else {
    return <p>{value}</p>;
  }
};
    const updateQna=(from,value)=>{
        setQna((qna)=>[...qna, {from , value}])
    }


const handleSend=async()=>{
      const question = ipRef.current.value+" and aslo provide useful links";
      updateQna(person, question)

const options={
  method:"POST",
  body:JSON.stringify({
    message:question
  }),
  headers:{
    "Content-type":"application/json"
  }
}


 try{
  const response = await fetch('http://localhost:8000/completion',options)
  const data= await response.json()
  console.log("data is ", data);
  updateQna(bot,data?.choices[0]?.message)
  ipRef.current.value='';
}

 catch(error){
  console.error(error);
 }

    }


  return (
    <div className='chatBot'>
    <div className="mobile">
      <div className="head">
        <div className="notch"></div>
        <div className="profilebox">
          <div className="left">
            <i className="fa fa-angle-left" aria-hidden="true"></i>
            <div className="profile">
              <img src={icon} alt="dp" />
              <div className="pdetail">
                <h3>Mr Clever</h3>
                <p>Online</p>
              </div>
            </div>
          </div>
          <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
        </div>
      </div>
      <div className="chatbox">
      {
        qna.map(qna=>{
            if(qna.from===person){
                return <div className="eachmessage sent animated">{renderContent(qna)}</div>
            }
        return <div className="eachmessage received animated">
          <p>{renderContent(qna)}</p>
        </div>
            
      
        })
    }

 {loading  && <div className="eachmessage received animated">
          <p>Loading...</p>
        </div> }
       
    </div>
    <div className="sendbox">
      <input type="text" ref={ipRef} placeholder="Type a message…" />
      <button type="submit" disabled={loading} className="submit" onClick={handleSend} ><img src={right} /></button>
    </div>
   </div>

</div>

  )
}


export default StudyBot;

