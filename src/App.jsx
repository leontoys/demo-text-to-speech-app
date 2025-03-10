import { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  //copied from model page
  //https://huggingface.co/facebook/mms-tts-eng
  async function query(data) {

    const endpoint =
    import.meta.env.MODE === 'development'
      ? "/api/hf-inference/models/facebook/mms-tts-eng"
      : "https://router.huggingface.co/hf-inference/models/facebook/mms-tts-eng"   

    const response = await fetch( endpoint, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to generate speech");
    }
  
    const result = await response.blob();
    return result;
  }
  
/*   // Example usage
  query({ inputs: "The answer to the universe is 42" }).then((response) => {
    const audioUrl = URL.createObjectURL(response);
    console.log("Audio URL:", audioUrl);
    // Play the audio or set it in your state
  });  */ 

  const handleConvert = async () => {
    if (!text) {
      alert('Please enter some text');
      return;
    }

    try {
      const audioBlob = await query({ inputs: text });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
    } catch (error) {
      console.error(error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="App">
      <h1>Text to Speech</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text here..."
      ></textarea>
      <button onClick={handleConvert}>Convert to Speech</button>
      {audioUrl && (
        <div>
          <h2>Generated Speech</h2>
          <audio controls src={audioUrl}></audio>
        </div>
      )}
    </div>
  );
}

export default App;