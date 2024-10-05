import { useEffect,useState } from 'react';
import './index.css'
import { useImmer } from 'use-immer';
import { getpoke } from './Api';




export function Game() {
  console.log("Home Page...");
  var [new_score,setNew_score]=useState(0); 
  var [max_score,setMax_score]=useState(0);
  const [check,setCheck]=useImmer([0,0,0,0,0,0,0,0]);
  const [final,setFinal]=useImmer([]);
  var x=0;
  var count=-1;
  var status=0;
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

 
 

 //console.log(images);
 //console.log(data.results);

  
 //Making list of names and passing them through props
 

  if (images.length && data.results.length && final.length==0) {
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





//Premature return statement:
//The return statement in JavaScript should be on the same line as the object you're returning, or it will result in an implicit undefined return. In your current code, the return is on a line by itself, so nothing is returned from the function.
 console.log(final);
 
 //To shuffle
 function shuffle(draft) {
    
  var m = draft.length, t, i;

  while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = draft[m];
    draft[m] = draft[i];
    draft[i] = t;
  }

  return draft;
}
  

   //Event handler function on clicking card
   const handleEvent= (id) =>{
    alert("Clicked!!"+id);
    // update scoreboard using Immer
    setCheck(draft=>{
      draft[id]+=1;

    });



   

    /*
     setCheck(check[id]++); Wrong!!!!
    How to do it using useState
     const [check, setCheck] = useState([0, 0, 0, 0, 0, 0, 0, 0]);

    const handleEvent = (id) => {
  
    const newCheck = [...check];  
    newCheck[id] += 1;
    setCheck(newCheck);
  */
    max_score=Math.max(new_score,max_score);
    setMax_score(max_score);
    
    setCheck(check);
    for(var i=0;i<check.length;i++){
      if(check[i]>1){
        setCheck([0,0,0,0,0,0,0,0]);
        status=1;

        alert("You lost");
        
        break;

      }

    }
    //Game goes on
    if(status==0){
     
      setNew_score(new_score+1);


    }
    //Wrong card click
    else if(status==1){
      setNew_score(0);
      status=0;

    }


    //Win condition
    if(new_score==8){
      alert("Congratulations,you won!");
      setCheck([0,0,0,0,0,0,0,0]);
      status=0;
      setNew_score(0);
    }
  

    
    setFinal(draft => {
      shuffle(draft); // Mutate the draft directly to shuffle
    });

   };


  const cards=final.map((poke)=>
    
    <div key={poke.count} onClick={()=>handleEvent(poke.key)} className="p">
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

