import {useState, useRef} from 'react';
export default function Player() {

  const emptyName = 'unknown entity';

  const playerName = useRef(emptyName);
  const [name, setName] = useState(emptyName);
  
  
  function handleNameSubmit() {
    setName(playerName.current.value);
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {name ?? emptyName}</h2>
      <p>
        <input ref={playerName} type="text" placeholder="Please enter your name" />
        <button onClick={handleNameSubmit}>Set Name</button>
      </p>
    </section>
  );
}
