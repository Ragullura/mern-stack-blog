import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import  { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom'
import OAuth from '../components/OAuth';

export default function SignUp() {
  //get  user input values ,store updated value in a state variable
  const [formData,setFormData] =useState({});

  // errormessage  is used to display any error message if there are
  const  [errorMessage, setErrorMessage]= useState(null);

  //successmessage  is used to show the success message after successful submission
  const [loading, setLoading] = useState(false);

  //useNavigate for navigate to sign in page
  const navigate =useNavigate();

  const handleChange = (e) => {
      setFormData({...formData,[e.target.id]:e.target.value.trim() })//who trims whitespaces at beginning and end of values
  }

  /* console.log(formData); */
  //handlesubmit and using async for handling promise
  // because it take  time to submit data to the server
  const handleSubmit =async (e) => {
    e.preventDefault();

    if(!formData.username || !formData.email || !formData.password){
      return  setErrorMessage("Please fill all fields!");
    }
    try {
      //we try set loading is true
      setLoading(true);

      //set error also null
      setErrorMessage(null);

      //here have some problem front end run in localhost 5173
      //and back end run in localhost 3000 
      //so add proxy in vite config 
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData),
      }) 
    
      //convert the data 
      const  data=await res.json();

      //check same name  or email already exist
      if(data.success===false){
        return setErrorMessage(data.message);
      }

      //after successfully fetching data we set loading false
      setLoading(false);

      //once all done successfully then navigate in sign-in page
      if(res.ok){
        navigate('/sign-in');
      }
      
    } catch (error) {
      //This error for client side network issue 
      setErrorMessage(error.message);
      setLoading(false);
    }

  }
  return (
    <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto  flex-col md:flex-row md:items-center gap-5'>
      {/* left side */}
      <div className='flex-1'>
        <Link to='/' className=' font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-t from-indigo-500 
              via-purple-500 to-pink-500 rounded-lg text-white '>Lura's</span>
              Blog
          </Link>
        <p className='text-sm mt-5'>
          This is my first  Gatsby site.You  can sign up here.
        </p>
      </div>
      {/* right side */} 

      <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} method="post">
            <div className=''>
              <Label value='Username'></Label>
              <TextInput  type='text' placeholder='username' id='username'onChange={handleChange} />
            </div>
            <div className=''>
              <Label value='Email'></Label>
              <TextInput  type='email' placeholder='xyz@gmail.com' id='email'onChange={handleChange}  />
            </div> 
            <div className=''>
              <Label value='Password'></Label>
              <TextInput  type='password' placeholder='password' id='password'onChange={handleChange}  />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>{/* disabled-- to avoid lot submision in signup */}
             {
               loading ? 
               (
                  <>
                    <Spinner />
                  <span className='pl-3'>Loading...</span>
                  </>
               ) :('Sign Up')
               }
             
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Account ?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
          }
        </div>  
    </div>
    </div>
  )
}
