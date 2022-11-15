import axios from 'axios';

const apiService = {
  getUserDetailInfo(userName: string): Promise<any>  {
    return axios.request({
      url: `https://api.github.com/users/${userName}`,
      method: "GET",
      headers: {
        "accept": "application/vnd.github+json"
      }
    });
  }

};

export default apiService;
