import React, { useState } from 'react';
import axios from 'axios';

// MY IMPORTS
import './style.css';


function App() {

  const [texto, setTexto] = useState('');
  const [resposta, setResposta] = useState('');

  function generateText() {
    const prompt = texto;
    const model = 'text-davinci-002';
    const maxTokens = 2048;

    const REACT_APP_OPENAI_API_KEY = "Coloque aqui sua chave key do chatGPT";
    
    axios.post('https://api.openai.com/v1/completions', {
      prompt: prompt,
      model: model,
      max_tokens: maxTokens
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${REACT_APP_OPENAI_API_KEY}`
      }
    })
    .then(response => {
      console.log(response.data.choices[0].text);
      setResposta(response.data.choices[0].text);
      setTexto('');
    })
    .catch(error => {
      console.error(error);
      setResposta(error);
    });
  }

  const captureAudioClick = () => {
    const reconhecimento = new window.webkitSpeechRecognition();

    reconhecimento.onresult = (event) => {
      const resultado = event.results[event.resultIndex];
      setTexto(resultado[0].transcript);
    };

    reconhecimento.start();
  };

  

  return (
    <div className="container">
        <div className='textos-container'>
          <input type="text" placeholder='Escreva...' className='pergunta' onChange={((e) => setTexto(e.target.value))} value={texto}/>

          <textarea value={resposta} rows="10" disabled placeholder='Resposta da IA' className='resposta'/>
        </div>

        <div className='btn-container'>
          <button onClick={captureAudioClick}>Transformar em Texto</button>
          <button type='button' onClick={generateText}>Perguta</button>
        </div>
    </div>
  );
}

export default App;

