import React, { Component, useEffect } from 'react'
import instance from '../../api/api';
import {Container} from '@chakra-ui/react';

const Callback = () => {

  useEffect(() => {
    console.log("callback" , window.location.href);
    const url = window.location.href;
    const urlWithoutFragment = url.split('#')[0];
    const urlWithoutPath = urlWithoutFragment.split('?')[1];
    const params = new URLSearchParams(urlWithoutPath);

    const code = params.get('code');
    const responseType = params.get('response_type');
    const state = params.get('state');

    console.log('Code:', code);
    console.log('Response Type:', responseType);
    console.log('State:', state);

    instance({
      url: 'oauth-callback/?code='+code+'&response_type='+responseType+'&state='+state,
      method: 'GET',
    })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem('square_token', res.data['BODY'].access_token);
        localStorage.setItem('square_token_expiry', res.data['BODY'].expires_at);
        localStorage.setItem('square_merchant_id', res.data['BODY'].merchant_id);
        localStorage.setItem('square_refresh_token', res.data['BODY'].refresh_token); 
        localStorage.setItem('square_company_name', res.data['BODY'].user.company_name);
        window.location.href="/"
      } 
      )
      .catch((err) => {
        console.log(err);
      }
      );

  }, [])

  return (
    <Container>
    Authorizing.... Dont close the tab you will be redirected
                </Container> 
  );
}
 

    // async componentDidMount() {
    //   // if (!this.state.mounted) {
    //   //   // fetch the access token from the url 
    //     const url = window.location.href; 
    //     const hasCode = url.includes("?code="); 
    //     const hasResponse = url.includes("&response="); 
    //     const hasState = url.includes("&state=");

    //     console.log(hasCode , hasResponse , hasState);
    //     if (hasCode) { 
    //         const newUrl = url.split("?code="); 
    //         window.history.pushState({}, null, newUrl[0]);
    //         const code = newUrl[1];
    //         console.log(code); 
    //     }
    //   //   // // fetch the access token from the backend
    //   //   try {
    //   //       await instance({
    //   //         url: '/callback-code?code='+code,
    //   //         method: 'GET',
    //   //         headers: {
    //   //           'Content-Type': 'application/json',
    //   //         },
    //   //       }).then(res => { 
    //   //         console.log(res.data);      
    //   //       localStorage.setItem('_zero_token', res.data['RESPONSE'].gh_token);
    //   //       localStorage.setItem('_zero_user', res.data['RESPONSE'].gh_user);
    //   //       this.setState({ mounted: true });
    //   //       window.location.href="/"
    //   //       });
    //   //     } catch (error) {
    //   //       console.log(error);
    //   //     }
    //   //   }
    //   // }
    // } 
 
export default Callback;