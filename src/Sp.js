import { useState, useEffect } from 'react';
let a = 0

const Sp = () => {

  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);

  const API_KEY = "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";
  const getMessages = async () =>{
    const options = {
      method: 'POST',
        headers: {
            "Access-Control-Allow-Origin": '*',
            "Content-Type": "application/json",
            "Authorization": "Bearer " + API_KEY
        },
        body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": "hi" }]
        })
    }
    try{
      // const response = await fetch('https://api.openai.com/v1/chat/completions', options);
      const response = await fetch('https://api.openai.com/v1/chat/completions', options);
      const data = await response.json();
      console.log(data);
    } catch (error){
      console.error(error);
    }
  }

  const turnpages = async () =>{
    try{
      if(value == '結束'){
        console.log('88888888')

      }else{
        a = 2
      }
    } catch (error){
      console.error(error);
    }
  }

  console.log(value)

  return (

    <div className="app">
        <section className = "main"> 
            <h1> Turing's Chatroom</h1>
            <ul className="feed">

            </ul>
            <div className="bottom-section">
                <div className="input-container">
                    <input value={value} onChange={(e) => setValue(e.target.value)}/>
                    <div id="submit" onClick={turnpages}>🫰</div>
                </div>
            </div>
      </section>
    </div>

  );
}

export default Sp;
