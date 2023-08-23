import React, { useEffect } from 'react';
import { useAuth } from '../hooks/hooks';
import { useDispatch } from 'react-redux';
import fetchData from '../fetchData.js';
import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';
import { channelsInfo } from '../selectors.js';

const MainPage = () => {
  const auth = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(fetchData(auth.getAuthHeader()));
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserData();
  }, [dispatch, auth]);

  if (channelsInfo.loading) {
    return (
      <div className='container h-100 my-4 overflow-hidden rounded shadow'>
        <div className='row h-100 bg-white flex-md-row'>
          <h1>loading</h1>
        </div>
      </div>
    );
  }
  return (
    <div className='container h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
          <ChannelsBox />
        </div>
        <div className='col p-0 h-100'>
          <MessagesBox />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
