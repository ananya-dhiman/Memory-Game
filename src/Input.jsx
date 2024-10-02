import './styles/input.css'
import { useImmer } from 'use-immer';
import {obj} from './Obj';


export function Input() {
  console.log("Input component rendered");
  
  
  const {inputValues, handleChange}=obj();
  
    return (
        <>
        <div className="header">
          <p className='h1'>RESUME-BUILDER</p>
        </div>
        <div className="body">
         <div className="inputs">
          <div className="f1">
            <p>About</p>
            <label>First Name</label>
            <input type="text"
          
             value={inputValues.About.fname}
             onChange={(e)=>(handleChange(e,"About fname"))}
            
            />
            <label>Last Name</label>
            <input type="text" 
     
            value={inputValues.About.lname}
            onChange={(e)=>(handleChange(e,"About lname"))}
            />
            <label>Email</label>
            <input type="email"
      
            value={inputValues.About.email}
            onChange={(e)=>(handleChange(e,"About email"))}
            />
            <label>Phone Number</label>
            <input type="tel"  
           
            value={inputValues.About.phone}
            onChange={(e)=>(handleChange(e,"About phone"))}
            />
            <label>Address</label>
            <input type="text" 
           
            value={inputValues.About.add}
            onChange={(e)=>(handleChange(e,"About add"))}
            />
          </div>
          <div className="f2">
            <p>Education</p>
            <label>School</label>
            <input type="text" 
            n="Education school"
            value={inputValues.Education.school}
            onChange={(e)=>(handleChange(e,"Education school"))}
            />
            <label>University</label>
            <input type="text"  
        
            value={inputValues.Education.uni}
            onChange={(e)=>(handleChange(e,"Education uni"))}
            />
            <label>Start Year</label>
            <input  
      
            value={inputValues.Education.start}
            onChange={(e)=>(handleChange(e,"Education start"))} 
            />
            <label>End Year</label>
            <input   
     
            value={inputValues.Education.end}
            onChange={(e)=>(handleChange(e,"Education end"))}
            />
          </div>
          <div className="f3">
            <p>Experience</p>
            <label>Company</label>
            <input type="text" 
       
            value={inputValues.Experience.job}
            onChange={(e)=>(handleChange(e,"Experience job"))}
            />
            <label>Position</label>
            <input type="text" 

            value={inputValues.Experience.pos}
            onChange={(e)=>(handleChange(e,"Experience pos"))}
            />
            <label>Start Date</label>
            <input type="date" 
       
            value={inputValues.Experience.start}
            onChange={(e)=>(handleChange(e,"Experience start"))}
            />
            <label>End Date</label>
            <input type="date" 
          
            value={inputValues.Experience.end}
            onChange={(e)=>(handleChange(e,"Experience end"))}
            />
            <label>Description</label>
            <textarea
           
            value={inputValues.Experience.des}
            onChange={(e)=>(handleChange(e,"Experience des"))}
            />
          </div>
         
        </div> 
        <div className="cvdisplay">
        <div className="o1">
          <div id="color">
          <div id='name'>
          <p>{inputValues.About.fname}<span></span> {inputValues.About.lname}</p> 
         
          </div>

            <div id='head'>
            <p>{inputValues.About.email}</p>
            
            <p>{inputValues.About.phone}</p>          

            <p>{inputValues.About.add}</p>
        </div>   

        </div>
         
         
        </div> 
        <div className="o2">
            <h3>Education</h3>
          
            
            <p>{inputValues.Education.school}</p>          

            <p>{inputValues.Education.uni}</p>

            <p>{inputValues.Education.start}</p>     
            <p>{inputValues.Education.end}</p>    
         
        </div> 
        <div className="o3">
          <h3>Experience</h3>
            
            <p>{inputValues.Experience.job}</p>
            
            <p>{inputValues.Experience.pos}</p>          

            <p>{inputValues.Experience.start}</p>

            <p>{inputValues.Experience.end}</p>     
            <p>{inputValues.Experience.des}</p>    
         
        </div> 
        


        </div>
      </div>
        </>
      );
}
