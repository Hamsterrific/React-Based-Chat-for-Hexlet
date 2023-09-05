import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/hooks';
import fetchData from '../fetchData.js';
import ChannelsBox from './ChannelsBox.jsx';
import MessagesBox from './MessagesBox.jsx';
import { channelsInfoSelector } from '../selectors.js';

const MainPage = () => {
  const { logOut, userData } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const getAuthHeader = (data) => (
    data?.token ? { Authorization: `Bearer ${data.token}` } : {}
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        dispatch(fetchData(getAuthHeader(userData)));
      } catch (error) {
        if (!error.isAxiosError) {
          toast.error(t('toast.unknownError'));
          return;
        }
        if (error.response?.status === 401) {
          toast.error(t('toast.authError'));
          logOut();
        } else {
          toast.error(t('toast.connectionError'));
        }
      }
    };
    fetchUserData();
  }, [dispatch, logOut, userData, t]);

  if (channelsInfoSelector.loading) {
    return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <h1>{t('loading')}</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
          <ChannelsBox />
        </div>
        <div className="col p-0 h-100">
          <MessagesBox />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
