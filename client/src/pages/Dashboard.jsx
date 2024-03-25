import { useEffect, useState } from 'react';
import {useLocation} from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';

export default function Dashboard() {
  const location = useLocation(); //uselocation is used  to access the current URL of our application. 
  //It gives us an object with properties such as pathname
  const [tab,setTab] =useState('') //useState  hook is used to declare a state variable for tab and setTab which allows us to update that value, search and hash that we can utilize in
  
  useEffect(() => {
    const urlParams =new  URLSearchParams(location.search);//URLSearchParams allows you to work with query parameters in a URL.
    const tabFromUrl = urlParams.get('tab');// this will return the value of "?tab=orders" if it exists in the URL or null
    // if tab  is refreshed or opened directly then it will show
    if(tabFromUrl){
      setTab(tabFromUrl);//
    }
  }, [location.search]); //location search  will be called every time there's a change in the url after ? (question mark)

  return( 
  <div className='min-h-screen flex flex-col md:flex-row'>
    <div className='md:w-56'>
      {/* SideBar */}
        <DashSidebar />
    </div>
      {/* Profile and.... */}
      {/* make a condtion */}
      {tab === 'profile' && <DashProfile/> }
      {/* posts... */}
      {tab === 'posts' && <DashPosts />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* comments  */}
      {tab === 'comments' && <DashComments />}
  </div>
  );
}
