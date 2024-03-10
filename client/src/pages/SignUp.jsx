import { Button, Label, TextInput } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function SignUp() {
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
          <form className='flex flex-col gap-4' action="#" method="post">
            <div className=''>
              <Label value='Username'></Label>
              <TextInput  type='text' placeholder='username' id='username' />
            </div>
            <div className=''>
              <Label value='Email'></Label>
              <TextInput  type='text' placeholder='xyz@gmail.com' id='email' />
            </div>
            <div className=''>
              <Label value='Password'></Label>
              <TextInput  type='text' placeholder='password' id='password' />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit'>
              Sign Up
            </Button>
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Have an Account ?</span>
            <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
          </div>
        </div>  
    </div>
    </div>
  )
}
