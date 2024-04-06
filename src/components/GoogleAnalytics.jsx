import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from "react-ga4";

const GoogleAnalytics = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    if (process.env.REACT_APP_GOOGLE_ANALYTICS_ID) {
      ReactGA.initialize(process.env.REACT_APP_GOOGLE_ANALYTICS_ID);
    }
  }, []);

  useEffect(() => {
    ReactGA.set({page: location.pathname});
    ReactGA.send("pageview");
  }, [location]);
  
  return (
    <>
      { children }
    </>
  )
};

export default GoogleAnalytics;
