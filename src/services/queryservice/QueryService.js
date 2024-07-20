import axios from 'axios';
import { Constants } from '../../constant/Constant';
import { environment } from '../../environments/environment';

const sendQuery = async (queryObj) => {
  try {
    const url = `${environment.API_URL}${Constants.API_GENERAL_ENDPOINT.SEND_QUERY}`;
    const response = await axios.post(url, queryObj);
    console.log('Query sent');
    return response.data;
  } catch (error) {
    console.error('Error sending query:', error);
    throw new Error('Error sending query');
  }
};

export default { sendQuery };
