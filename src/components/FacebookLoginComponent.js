import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginComponent = () => {
    const [userData, setUserData] = useState(null);

    const responseFacebook = (response) => {
        console.log(response);
        setUserData({
            name: response.name,
            email: response.email,
            picture: response.picture.data.url,
        });
    };

    return (
        <div>
            {!userData ? (
                <FacebookLogin
                    appId="3877604899139474" // Thay YOUR_APP_ID bằng App ID của bạn
                    autoLoad={true}
                    fields="name,email,picture"
                    callback={responseFacebook}
                    icon="fa-facebook"
                />
            ) : (
                <div>
                    <h2>Welcome, {userData.name}</h2>
                    <img src={userData.picture} alt="Profile" />
                    <p>Email: {userData.email}</p>
                </div>
            )}
        </div>
    );
};

export default FacebookLoginComponent;
