import { useEffect, useState } from 'react';
import './index.css'
import { useImmer } from 'use-immer';
import { getpoke } from './Api';



export function Game() {
  console.log("Home Page...");
  const [new_score,setNewscore]=useState(0);
  const [max_score,setMax_core]=useState(0);
  const [check,setCheck]=useState([0,0,0,0,0,0,0,0]);
  var x=0;
  const [images,setImages]=useState([]);
  const [data,setData]=useState([]);
  useEffect(() =>{
    async function fetchpoke(){
      try{
        const {images,data} =await getpoke();
        setImages(images);
        setData(data);

      }
      catch(error){
        console.log("Error fetching data",error);
      }
     
    }
    fetchpoke();
  },[]);

  //Event handler function on clicking card
  const handleEvent= () =>{
  alert("Clicked!!");
 };
 

 //console.log(images);
 //console.log(data.results);
 var count=-1;
  
 //Making list of names and passing them through props
  const final=images.map((image,index)=>{
  const obj=data.results[index];

  count++;
  console.log(obj);
  return{
    "key":count,
    "name": obj.name.toUpperCase(),
    "url":image
  }

 
}
);
//Premature return statement:
//The return statement in JavaScript should be on the same line as the object you're returning, or it will result in an implicit undefined return. In your current code, the return is on a line by itself, so nothing is returned from the function.
 console.log(final);
 


  const cards=final.map((poke)=>
    
    <div key={poke.count} onClick={handleEvent} className="p">
      <div className="icon">
      <img src={poke.url}></img>

      </div>
      <div className='name'>
        {poke.name}  
      </div>  
    

    </div>

    




    )

  


  
    return (
        <>
        <div className="header">
        <h1>Pokecard</h1>
        
        
        <div className='score'>
        <a>New Score: <span>{new_score}</span></a>
        <a>High Score: <span>{max_score}</span></a>
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



//How to display the cards in random order each time the react rerenders?
//1)Need to take the final array in useState and make a function to generate array(will see)
//2)Need to amek a function to shuffle array

//Function to shuffle(Fisher–Yates Shuffle-https://bost.ocks.org/mike/shuffle/)
/*function shuffle(array) {
  var m = array.length, t, i;

  // While there remain elements to shuffle…
  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  return array;
}

*/

//Scoring System- If all 8 cards are clicked only once Player wins (Reset scores) 
//Else calc score and max score(that can be 8 max)