import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './routes/home';
import Profile from './routes/profile';
import Login from './routes/login';
import CreatAccount from './routes/create-account';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';
import { auth } from './firebase';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/create-account',
    element: <CreatAccount />,
  },
]);

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const init = async () => {
    await auth.authStateReady();
    setIsLoading(true);
  };

  useEffect(() => {
    init();
  }, []);
  return <>{isLoading ? <Loader /> : <RouterProvider router={router} />}</>;
}

export default App;
