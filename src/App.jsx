import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [lenght, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(null);
  const [ message, setMessage] = useState('hidden')

  const passwordGeneratore = useCallback(() => {
    let pass = "";
    let alpha = "abcdefghijklmnopqrstuvABCEFGHIJKLKNLM";
    if (charAllowed) alpha += "!@#$$%$^&^&";
    if (numberAllowed) alpha += "0123456789";
    for (let i = 0; i < lenght; i++) {
      pass += alpha[Math.floor(Math.random() * alpha.length)];
    }
    setPassword(pass);
  }, [lenght, numberAllowed, charAllowed]);

  useEffect(() => {
    passwordGeneratore();
  }, [lenght, numberAllowed, charAllowed]);

  //ref 
  const passwordRef = useRef(null)

  const showMesage = ()=>{

  }

  const handleCopy = useCallback((e)=>{
    window.navigator.clipboard.writeText(password)
    // passwordRef.current?.select()
    // window.getselection.removeAllRange()
    setMessage("visible")

    const showmessage = () => {
      setMessage('hidden');
    };
    
    const timer = setInterval(showmessage, 500);
    
    // Clear the interval after 1 second
    setTimeout(() => {
      clearInterval(timer);
    }, 500);


    showMesage()

  
  },[password])


  return (
      
      <div className="w-full max-w-md mx-auto shadow-md relative rounded-lg px-4 mt-5 py-8 text-orange-500 bg-gray-700">
       <h1 className="text-center mb-2 text-white" > Password Generator</h1>
       <div className="flex shadow rounded-lg overflow-hidden mb-4">

        <div className={`absolute top-6 w-20 bg-gray-500 rounded text-white text-center animation ${message}`}>
          Copied
        </div>

        <input type="text"
        value={password}
        readOnly
        ref={passwordRef}
        className="outline-none w-full py-1 px-3 rounded-xl"
        />
        <button onClick={(e)=>handleCopy(e)} className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0" >
          copy
        </button>
        </div>

        <div className="flex text-sm gap-x-2" >
          <div className="flex itemc-center gap-x-1" >
            <input type="range" id="range"
            value={lenght}
            min={6}
            max={25}
            onChange={(e)=>setLength(e.target.value)}
            
            />
            <label htmlFor="range">
              {lenght}
            </label>


          </div>
            <input onChange={(e)=>setNumberAllowed(prev=>!prev)} type="checkbox" id="number" />
            <label htmlFor="number"> Numberallowd </label>

          <div>
          </div>
            <input onChange={(e)=>setCharAllowed(prev=>!prev)} type="checkbox" id="char" />
            <label htmlFor="char"> Char Allowed </label>

          <div>

          </div>

        </div>

      </div>

  );
}

export default App;
