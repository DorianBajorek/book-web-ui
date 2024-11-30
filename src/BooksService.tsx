import axios from 'axios';

export const registerUser = async (email: string, username: string, password: string, phoneNumber: string) => {
    try {
      const payload = {
        email: email,
        username: username,
        password: password,
        phoneNumber: phoneNumber,
      };
      const response = await axios.post("https://drugaksiazka.pl/api/auth/v1/register/", payload);
      return response.data
    } catch (error) {
      throw error;
    }
  };
  
export const loginUser = async (username: string, password: string) => {
  try {
    const payload = {
      username: username,
      password: password
    };
    const response = await axios.post("https://drugaksiazka.pl/api/auth/v1/login/", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyEmail = async (token: string) => {
  try {
    const payload = {
      token: token
    };
    const response = await axios.post("https://drugaksiazka.pl/api/auth/v1/verify_email/", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserOffers = async (token: string, username: string) => {
  try {
    const response = await axios.get(
      `https://drugaksiazka.pl/api/books/v1/get_user_offers/${username}/`,
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error) {
  }
};

export const getUserData = async (token: string, username: string) => {
  try {
    const response = await axios.get(
      `https://drugaksiazka.pl/api/auth/v1/get_user_data/${username}/`,
      {
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user offers:", error);
  }
};

export const deleteOffer = async (token: string, offerId?: string) => {
  if(!offerId) return ;
  try {
    const response = await axios.delete(
      `https://drugaksiazka.pl/api/books/v1/delete_offer/${offerId}/`,
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

export const getOffersByQuery = async (token: string, searchQuery: string) => {
  try {
    const url = `https://drugaksiazka.pl/api/books/v1/search_users_with_title/?searchQuery=${encodeURIComponent(searchQuery)}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Token ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Search failed', error);
    return null;
  }
}

export const getLastAddedOffers = async (token: string) => {
  try {
    const url = `https://drugaksiazka.pl/api/books/v1/get_last_added_offers`;
    const response = await axios.get(url);
    console.log(response)
    return response.data;
  } catch (error) {
    return null;
  }
}

export const getOfferById = async (token: string, offerId: string) => {
  try {
    const url = `https://drugaksiazka.pl/api/books/v1/get_offer/${offerId}/`;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};