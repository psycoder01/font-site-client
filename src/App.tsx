import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from 'react-router-dom';

import './App.css';
import { Routes } from './interfaces';

import { Home } from './pages/Home';
import { Font } from './pages/Font';
import NavBar from './components/NavBar';
import { TopFonts } from './pages/TopFonts';


const childrenRoutes: Routes[] = [{
    name: "Home",
    path: '/',
    element: <Home />,
},
{
    name: 'Top Fonts',
    path: '/top',
    element: <TopFonts />
}]

const Layout = ({ routes }: { routes: Routes[] }) => <>
    <NavBar routes={routes} logo="Fonts" />
    <Outlet />
</>

const navRoutes = [{
    path: '/',
    element: <Layout routes={childrenRoutes} />,
    children: childrenRoutes,
}]

const routes = [
    {
        name: "Font",
        path: '/font/:fontId',
        element: <Font />,
    },
]

const router = createBrowserRouter([...navRoutes, ...routes]);
function App() {
    return <RouterProvider router={router} />;
}

export default App;
