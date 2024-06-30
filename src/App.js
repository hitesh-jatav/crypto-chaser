import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Hero from './components/Hero';
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Details from './components/Details';

function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Hero />
      },
      {
        path: '/coins/:id',
        element: <Details />
      }
    ]
  }
]);

function App() {

  return (
    <div className="App">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;