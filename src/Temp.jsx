
import { useEffect, useState } from 'react';
import './index.css';
import { useImmer } from 'use-immer';
import { getpoke } from './Api';

export function Game() {
  console.log("Home Page...");
  const [new_score, setNew_score] = useState(0); 
  const [max_score, setMax_score] = useState(0);
  const [check, setCheck] = useImmer([0, 0, 0, 0, 0, 0, 0, 0]);
  const [images, setImages] = useState([]);
  const [data, setData] = useState([]);
  
  useEffect(() => {
    async function fetchpoke() {
      try {
        const { images, data } = await getpoke();
        setImages(images);
        setData(data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    }
    fetchpoke();
  }, []);

  // Creating list of names and URLs from fetched data
  const [final, setFinal] = useImmer([]);

  useEffect(() => {
    if (images.length && data.results.length) {
      setFinal(draft => {
        draft.push(
          ...images.map((image, index) => ({
            key: index,
            name: data.results[index].name.toUpperCase(),
            url: image,
          }))
        );
      });
    }
  }, [images, data]);

  // Shuffle function that mutates the draft directly
  const shuffle = (draft) => {
    let m = draft.length, t, i;

    while (m) {
      i = Math.floor(Math.random() * m--);
      t = draft[m];
      draft[m] = draft[i];
      draft[i] = t;
    }
  };

  const handleEvent = (id) => {
    alert("Clicked!! " + id);
    
    // Update scoreboard using Immer
    setCheck(draft => {
      draft[id] += 1; // Mutate the draft directly
    });

    let status = 0;

    for (let i = 0; i < check.length; i++) {
      if (check[i] > 1) {
        setCheck([0, 0, 0, 0, 0, 0, 0, 0]); // Reset check
        status = 1;
        alert("You lost");
        break;
      }
    }

    // Game goes on
    if (status === 0) {
      setNew_score(prev => prev + 1);
    } else {
      setNew_score(0);
    }

    // Win condition
    if (new_score === 8) {
      alert("Congratulations, you won!");
      setCheck([0, 0, 0, 0, 0, 0, 0, 0]);
      setNew_score(0);
    }

    // Shuffle the cards
    setFinal(draft => {
      shuffle(draft); // Mutate the draft directly to shuffle
    });
  };

  const cards = final.map((poke) => (
    <div key={poke.key} onClick={() => handleEvent(poke.key)} className="p">
      <div className="icon">
        <img src={poke.url} alt={poke.name} />
      </div>
      <div className='name'>
        {poke.name}  
      </div>  
    </div>
  ));

  return (
    <>
      <div className="header">
        <h1>Pokecard</h1>
        <div className='score'>
          <span>New Score: <strong>{new_score}</strong></span>
          <span>High Score: <strong>{max_score}</strong></span>
        </div>
      </div>
      <div className='center'>
        <div className='table'>
          {cards}
        </div>
      </div>
    </>
  );
}
