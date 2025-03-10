import { useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState("")
  const [audioUrl,setAudioUrl] = useState("")

/*   const handleConvert = async () => {
    console.log(import.meta.env.VITE_HUGGING_FACE_API_KEY)
    if (!text) {
      alert("Please enter some text");
      return; 
    }
  
    try {
      const response = await fetch(
        '/api/models/espnet/kan-bayashi_ljspeech_vits', // TTS model
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: text }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Failed to do text to speech');
      }
  
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);

    } 
    catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again");
    }
  }; */

  const handleConvert = async() => {
    try {
      const response = await fetch(
        "/api/hf-inference/models/espnet/kan-bayashi_ljspeech_vits",
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(text),
        }
      );
    
      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      setAudioUrl(audioUrl)     
    } 
    catch (error) 
    {
      console.error(error)
    }
  }
  

  return (
    <div className='App'>
      <h1>Text to Speech</h1>
      <textarea value={text}
      onChange={(e)=>setText(e.target.value)}
      placeholder='Enter your text here...'
      ></textarea>
      <button onClick={handleConvert}>Convert to Speech</button>
      {audioUrl && (
        <div>
          <h2>Generated Speech</h2>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  )
}

export default App
