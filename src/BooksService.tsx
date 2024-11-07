import axios from 'axios';

export const registerUser = async (email: string, username: string, password: string) => {
    try {
      const payload = {
        email: email,
        username: username,
        password: password
      };
      const response = await axios.post("http://192.168.100.9:8000/auth/v1/register/", payload);
      return response.data
    } catch (error) {
      console.error('Registration failed', error);
      return null;
    }
  };
  
export const loginUser = async (username: string, password: string) => {
  try {
    const payload = {
      username: username,
      password: password
    };
    const response = await axios.post("http://192.168.100.9:8000/auth/v1/login/", payload);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error('Invalid login to the service', error);
    return null;
  }
};

export const getUserOffers = async (token: string) => {
  try {
    const response = await axios.get(
      "http://192.168.100.9:8000/books/v1/get_user_offers/",
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
  }
};

export const deleteOffer = async (token: string, offerId: string) => {
  try {
    const response = await axios.delete(
      `http://192.168.100.9:8000/books/v1/delete_offer/${offerId}/`,
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.status === 204 ? "Offer deleted successfully" : response.data;
  } catch (error) {  }
};
