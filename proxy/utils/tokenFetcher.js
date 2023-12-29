const axios = require('axios');
const qs = require('qs');

const urlKey = `${process.env.CURRENT_ENV}_URL`;
const clientIdKey = `${process.env.CURRENT_ENV}_CLIENT_ID`;
const grantTypeKey = `${process.env.CURRENT_ENV}_GRANT_TYPE`;
const usernameKey = `${process.env.CURRENT_ENV}_USERNAME`;
const passwordKey = `${process.env.CURRENT_ENV}_PASSWORD`;
const hostKey = `${process.env.CURRENT_ENV}_HOST_TOKEN`;


const getToken = async () => {
  const url = process.env[urlKey];
  const data = new URLSearchParams();

  /*const data = qs.stringify({
    'client_id': process.env[clientIdKey],
    'grant_type': process.env[grantTypeKey],
    'username': process.env[usernameKey],
    'password': process.env[passwordKey] 
  });*/

  data.append('client_id', process.env[clientIdKey]);
  data.append('grant_type', process.env[grantTypeKey]);
  data.append('username', process.env[usernameKey]);
  data.append('password', process.env[passwordKey]);

  try {
    /*let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: url,
      headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Cookie': 'e70ad1798b0f2e85151ec3d16dd5c24b=f32cfc5fcbbb9ecfb867c60c0742503f'
      },
      data : data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        return response.data.access_token;
      })
      .catch((error) => {
       
      });*/

    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': '88',
        'Host': process.env[hostKey]
        
      },
        // Adding this to avoid SSL issues, only use in a trusted network!
        httpsAgent: new (require('https').Agent)({  
            rejectUnauthorized: false
        })
    });

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching token:', error);
    throw error;
  }
};

module.exports = getToken;