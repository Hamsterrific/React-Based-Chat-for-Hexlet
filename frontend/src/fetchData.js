import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import routes from './routes.js';

const fetchData = createAsyncThunk(
  'channelsInfo/setInitialState',
  async (authHeader) => {
    const response = await axios.get(routes.dataPath(), { headers: authHeader });
    return response.data;
  },
);

export default fetchData;
