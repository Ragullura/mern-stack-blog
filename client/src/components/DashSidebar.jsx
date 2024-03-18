import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import {HiArrowSmRight,HiChartPie,HiDocumentText , HiUser,HiOutlineUserGroup,} from  'react-icons/hi';
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';



export default function DashSidebar() {
    const location = useLocation(); //uselocation is used  to access the current URL of our application. 
    //It gives us an object with properties such as pathname
    const dispatch = useDispatch();
    const [tab,setTab] =useState('') //useState  hook is used to declare a state variable for tab and setTab which allows us to update that value, search and hash that we can utilize in
    const { currentUser } = useSelector((state) => state.user); 

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
    <Sidebar className='w-full md:w-56'>
      <Sidebar.Items>
        <Sidebar.ItemGroup className='flex flex-col gap-1'>
          {/* Dashboard */}
          {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie }
                as='div'
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item
              active={tab === 'profile'}
              icon={HiUser}
              label={currentUser.isAdmin ? 'Admin' : 'User'}
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          {/* Post */}
          {currentUser.isAdmin && (
            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item
                active={tab === 'posts'}
                icon={HiDocumentText}
                as='div'
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {/* user */}
          {currentUser.isAdmin && (
            <>
              <Link to='/dashboard?tab=users'>
                <Sidebar.Item
                  active={tab === 'users'}
                  icon={HiOutlineUserGroup}
                  as='div'
                >
                  Users
                </Sidebar.Item>
              </Link>
              {/* <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link> */}
            </>
          )}
          
          <Sidebar.Item
            icon={HiArrowSmRight}
            className='cursor-pointer'
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  )
}
