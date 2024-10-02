import { useImmer } from 'use-immer';

export function obj(){
    {/*Here we will create an object which will contain all the input value"*/}
    const [inputValues, setInputValues] = useImmer({
      About: {
        fname: 'John',       // First Name
        lname: 'Doe',        // Last Name
        email: 'john.doe@example.com',  
        add: '123 Main St, Springfield', 
        phone: '+1 555-555-5555', 
      },
      Education: {
        school: 'Springfield High School',  // School Name
        uni: 'Springfield University',  // University Name
        start: '2015',   // Start Year
        end: '2019',     // End Year
      },
      Experience: {
        job: 'Software Engineer',  // Job Title
        pos: 'Full Stack Developer',  // Position
        start: '2020-06-01',  // Start Date
        end: '2023-08-01',    // End Date
        des: 'Developed and maintained web applications using React and Node.js.',
      }   
  
  
  
  
    }
   
   
    );
    //Function to change the input as the user changes value
    function handleChange(e,n){
      setInputValues(draft=>{
        const [sec,nam]=n.split(' ');
        draft[sec][nam]=e.target.value;
        console.log("Re-render")
  
      })
      
    }
    return {inputValues,setInputValues,handleChange};
  }