import React from 'react';
//import useAuth from '../hooks/hooks';

const MainPage = () => {
 // const auth = useAuth();

  /*useEffect(() => {
    const fetchUserData = async () => {
      auth.getAuthHeader().catch((error) => {
        console.log(error);
      });
    };
    fetchUserData();
  }, []);*/

  return (
    <div className='h-100 my-4 overflow-hidden rounded shadow'>
      <div className='row h-100 bg-white flex-md-row'>
        <h1>Main Page</h1>
      </div>
    </div>
  );
};

export default MainPage;
