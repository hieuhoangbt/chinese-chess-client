import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const initFacebookSDK = async () => {
  try {
    await window.FBInstant.initializeAsync();
    window.FBInstant.setLoadingProgress(100);
    console.log('Facebook Instant Games SDK initialized.');
    await window.FBInstant.startGameAsync();
    console.log('Game started.');
  } catch (error) {
    console.error('Error initializing Facebook Instant Games SDK:', error);
  }
};

const RootComponent = () => {
  useEffect(() => {
    initFacebookSDK();
  }, []);

  return <App />;
};

ReactDOM.render(<RootComponent />, document.getElementById('root'));
