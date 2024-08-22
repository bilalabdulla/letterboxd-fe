import './App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Timeline from './pages/Timeline';
import SingleMovie from './components/SingleMovie';
import Logout from './components/Logout';
import Navbar from './components/Navbar';
import Favourites from './pages/Favourites';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import Review from './components/Review';
import Reviews from './pages/Reviews';
import UpdateProfile from './pages/UpdateProfile';
import Members from './pages/Members';
import Films from './pages/Films';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route index element={<Home />} />
      <Route path='login' element={<Login />} />
      <Route path='register' element={<Register />} />

      <Route path='/home' element={<Navbar />}>
      <Route path='timeline' element={<Timeline />} />
      <Route path=':imdbID' element={<SingleMovie />} />
      <Route path='members' element={<Members />} />
      <Route path='films' element={<Films />} />
      <Route path=':userId/favourites' element={<Favourites />} />
      <Route path=':userId/watchlist' element={<Watchlist />} />
      <Route path=':userId/profile' element={<Profile />} />
      <Route path=':userId/reviews' element={<Reviews />} />
      <Route path='updateprofile' element={<UpdateProfile />} />
      <Route path='logout' element={<Logout />} />
      </Route>
    </Route>
  )
)

function App() {

  return (
      <RouterProvider router={router}>
        </RouterProvider>
  );
}

export default App;
