import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom'; 
import SignIn from './pages/Authentication/SignIn';  
import Subscription from './pages/Subscription/Subscription'; 
import Settings from './pages/Settings';  
import { ChakraProvider } from '@chakra-ui/react';
import SubscriptionGroup from './pages/Subscription/SubscriptionGroup';
import GroupDetails from './pages/Subscription/GroupDetails';
import Subscribers from './pages/Subscribers/Subscribers'; 
import Callback from './pages/Authentication/callback';
import Plans from './pages/Plans/plans';
import Loyality from './pages/Loyality/loyality';

function App() {
  const [loading, setLoading] = useState(true);
  // const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (localStorage.getItem('square_token') === null) {
    return (
      <ChakraProvider>
        <Routes>
          <Route path="*" element={<SignIn />} />
          <Route path="callback/" element={<Callback />} />
        </Routes>
      </ChakraProvider>
    );
  }
  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <ChakraProvider>
      <Routes> 
        <Route path="*" element={<Subscription />} />
        <Route path="/subscription/:id" element={<SubscriptionGroup />} />
        <Route path="/groups/:id" element={<GroupDetails />} /> 
        <Route path="/plans" element={<Plans />} />   
        <Route path="/subscribers" element={<Subscribers />} />   
        <Route path="/settings" element={<Settings />} />  
        <Route path="/auth/signin" element={<SignIn />} /> 
        <Route path="/loyality" element={<Loyality />} /> 
      </Routes>
    </ChakraProvider>
  );
}

export default App;
