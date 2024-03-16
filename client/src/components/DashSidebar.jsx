import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {HiArrowSmRight, HiUser} from  'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
export default function DashSidebar() {
    const location = useLocation(); //uselocation is used  to access the current URL of our application. 
    //It gives us an object with properties such as pathname
    const dispatch = useDispatch();
    const [tab,setTab] =useState('') //useState  hook is used to declare a state variable for tab and setTab which allows us to update that value, search and hash that we can utilize in
    useEffect(() => {
      const urlParams =new  URLSearchParams(location.search);//URLSearchParams allows you to work with query parameters in a URL.
      const tabFromUrl = urlParams.get('tab');// this will return the value of "?tab=orders" if it exists in the URL or null
      // if tab  is refreshed or opened directly then it will show
      if(tabFromUrl){
        setTab(tabFromUrl);//
      }
    }, [location.search]); //location search  will be called every time there's a change in the url after ? (question mark)
    
    const handleSignout = async () => {
      try {
        const res = await fetch('/api/user/signout', {
          method: 'POST',
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
        } else {
          dispatch(signoutSuccess());
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  return (
    <Sidebar className="w-full md:w-56">
        <Sidebar.Items>
            <Sidebar.ItemGroup>
                <Link to='/dashboard?tab=profile'>
                <Sidebar.Item  
                active={tab === 'profile'} 
                icon={HiUser} 
                label={"User"} 
                labelColor='dark' as='div' >
                    Profile
                </Sidebar.Item>
                </Link>
                <Sidebar.Item  icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout} >
                    Sign Out
                </Sidebar.Item>
                
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}
