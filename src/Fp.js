import { useState, useEffect } from 'react';
let a = 0

// Headers : "Access-Control-Allow-Origin" : "*";

const Fp = () => {
  
  const [value, setValue] = useState(null);
  const [message, setMessage] = useState(null);
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [userName, setUserName] = useState(null);
  const API_KEY = "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";

  //-----------------------------------------------------

  const getMessages = async () =>{
    if(userName){
        const options = {
        method: 'POST',
          headers: {
              "Access-Control-Allow-Origin": '*',
              "Content-Type": "application/json",
              "Authorization": "Bearer " + API_KEY
          },
          body: JSON.stringify({
              "model": "gpt-3.5-turbo",
              "messages": [{ "role": "user", "content": value }]
          })
      }
      try{
        // const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const response = await fetch('https://api.openai.com/v1/chat/completions', options);
        const data = await response.json();
        console.log(data);
        setMessage(data.choices[0].message);
      } catch (error){
        console.error(error);
      }
    }else{
      try{
        setUserName(value);
        console.log("name set : "+value);
      }catch (error){
        console.error(error);
      }
    }
  }
//----------------------------------------------------

const createNewChat = () => {
  setCurrentTitle(null);
  setValue("");
  setMessage(null);
  setUserName(null);
}

//----------------------------------------------------

  useEffect(() => {
    console.log(currentTitle, value, message);
    if(!userName && value && message){
      setUserName(value);
    }
    if(!currentTitle && value && message && userName){
      setCurrentTitle(value);
    }
    if(currentTitle && value && message){
      setPreviousChats(previousChats => ([...previousChats, 
      {
        title: currentTitle,
        role: userName,
        content: value,
      }, {
        title: currentTitle,
        role: "我還沒做好呀",
        content: message.content,
      }]));
    }
  }, [message, currentTitle]);

  console.log(previousChats);

  const currentChat = previousChats.filter(previousChats => previousChats.title === currentTitle);
  // const uniquTitles = Array.from( new Set(previousChats.map(previousChat => previousChat.title)));
  // console.log(uniquTitles);
//----------------------------------------------------------------

  return (
    <div className="app">
        <section className = "main"> 
            {!currentTitle && <h1> Turing's Chatroom</h1>}
            <ul className="feed">
              
              {currentChat?.map((chatMessage, index) => <li key={index} className={chatMessage.role === userName ? 'li1' : 'li2'}>
                <p className={chatMessage.role === userName ? 'role' : 'role1'}>{chatMessage.role}</p>
                <p>{chatMessage.content}</p>
                
              </li>)}
            </ul>
            <div className="bottom-section">
                <div className="input-container">
                    {/* <button onClick={createNewChat}>👋</button> */}
                    <input value={value} onChange={(e) => setValue(e.target.value)}/>
                    <div id="submit" onClick={getMessages}>🫰</div>
                    
                </div>
            </div>
      </section>
    </div>

  );
}

export default Fp;

  // const turnpages = async () =>{
  //   try{
  //     if(value == '結束'){
  //       console.log('88888888')
  //       // a = 1
  //     }else{
  //       a = 2
  //     }
  //   } catch (error){
  //     console.error(error);
  //   }
  // }
