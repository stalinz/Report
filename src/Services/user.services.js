import { ErrorCode } from '../Constants/errorCodes';
import { Config } from '../Configs';

const fakeUsername = 'admin';
const fakePassword = '1';

// async function login(username, password) {
//     // let response = await fetch('https://api.postcodes.io/random/postcodes');
//     // let responseJson = await response.json();
//     // console.log(responseJson)
//     try {
//         // let response = await fetch('https://api.postcodes.io/random/postcodes');
//         let response = await fetch('http://10.0.2.2:58381/api/Account/LoginGet');
//         let responseJson = await response.json();
//         console.log(responseJson)
//     }
//     catch (ex) {
//         console.log(ex);
//     }
// }
function login(username, password) {
    let code = ErrorCode.SYSTEM_EXCEPTION;
    if (username.length == 0 || password.length == 0)
        return {
            responseCode: ErrorCode.USERNAME_PASSWORD_EMPTY
        }


    if (username.toLowerCase() == fakeUsername && password.toLowerCase() == fakePassword) {
        let account = {
            accountid: 1,
            username: 'admin',
            nickname: 'admin',
            birthday: '10/03/1981',
            sex: 'male',
            mobile: '01656292870',
            address: 'Ha Noi',
            responseCode: ErrorCode.SUCCESS
        }

        // save to localstoreage
        return account;
    }
    return { responseCode: ErrorCode.USERNAME_PASSWORD_INVALID };
}


async function checkAuthen() {
    try {
      let response = await fetch(Config.ACCOUNT_API + 'api/User/CheckAuthenticated');
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
  }
 
 async function Authen(username, password) {

    let code = ErrorCode.SYSTEM_EXCEPTION;
    if (username.length == 0 || password.length == 0)
        return {
            ResponseStatus: ErrorCode.USERNAME_PASSWORD_EMPTY
    }

    try {
      let response = await fetch(Config.ACCOUNT_API + 'api/User/Login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            UserName: username,
            Password: password,
        })
      });
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
      //return responseJson;
    } catch(error) {
      console.error(error);
    }
  }
  
  async function Logout() {
    try {
      let response = await fetch(Config.ACCOUNT_API + 'api/User/Logout');
      let responseJson = await response.json();
      return Promise.resolve(responseJson);
    } catch(error) {
      console.error(error);
    }
  } 


export const userService = {
    login,
    checkAuthen,
    Authen,
    Logout
}