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
    } catch (error: any) {
      throw error;
    }
  };

  export const registerGoogle = async (code: string, scope: string) => {
    try {
      const payload = {
        code: code,
        scope: scope,
      };
      const response = await axios.post('https://drugaksiazka.pl/api/auth/v1/google_register/', payload);
      return response.data
    } catch (error: any) {
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
  }
};

export const requestResetPassword = async (email: string) => {
  try {
    const payload = {
      email: email
    };
    const response = await axios.post("https://drugaksiazka.pl/api/auth/v1/request_reset_password/", payload);
    return response.data;
  } catch (error) {
  }
};

export const resetPassword = async (uid: string, token: string, newPassword: string) => {
  try {
    const payload = {
      uid: uid,
      token: token,
      new_password: newPassword
    };
    const response = await axios.post("https://drugaksiazka.pl/api/auth/v1/request_reset_password/", payload);
    return response.data;
  } catch (error) {
  }
};

export const getUserOffers = async (username: string) => {
  try {
    const response = await axios.get(
      `https://drugaksiazka.pl/api/books/v1/get_user_offers/${username}/`);
    return response.data;
  } catch (error) {
  }
};

export const getUserData = async (username: string) => {
  try {
    const response = await axios.get(
      `https://drugaksiazka.pl/api/auth/v1/get_user_data/${username}/`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user oferty:", error);
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
    });
    return response.data;
  } catch (error) {
    console.error('Search failed', error);
    return null;
  }
}

export const getLastAddedOffers = async () => {
  try {
    const url = `https://drugaksiazka.pl/api/books/v1/get_last_added_offers`;
    const response = await axios.get(url);
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

export const exportUserOffers = async (token: string) => {
  try {
    const response = await axios.get(
      `https://drugaksiazka.pl/api/books/v1/export_user_offers/`,
      {
        responseType: 'blob',
        headers: {
          Authorization: `Token ${token}`
        }
      }
    );

    const blob = new Blob([response.data], { type: 'text/plain' });
    return blob;
  } catch (error) {
    console.error('Error exporting user oferty:', error);
    throw error;
  }
};

export const updateUserPhoneNumber = async (phoneNumber: string, token: string) => {
  try {
    const payload = {
      phoneNumber: phoneNumber,
    };

    const response = await axios.patch(
      'https://drugaksiazka.pl/api/auth/v1/update_user_phone_number/',
      payload,
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (token: string) => {
  try {
    const response = await axios.delete(
      'https://drugaksiazka.pl/api/auth/v1/delete_user/',
      {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log(response)
    return response.data;
  } catch (error) {
    return null;
  }
};