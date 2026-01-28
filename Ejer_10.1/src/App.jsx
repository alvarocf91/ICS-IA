import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import RootLayout from './layouts/RootLayout.jsx';
import WelcomePage from './pages/WelcomePage.jsx';
import CountryDetails from './pages/CountryDetails.jsx';
import ErrorPage from './pages/ErrorPage.jsx';
import { countriesLoader } from './loaders/countriesLoader.js';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      id: 'root',
      loader: countriesLoader,
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <WelcomePage /> },
        { path: 'country/:countryName', element: <CountryDetails /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}