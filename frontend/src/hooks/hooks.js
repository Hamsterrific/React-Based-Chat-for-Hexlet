import { useContext } from 'react';

import authContext from '../contexts/contexts.js';

const useAuth = () => useContext(authContext);

export default useAuth;