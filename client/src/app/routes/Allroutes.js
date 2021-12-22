import React, { lazy } from 'react'
import Loadable from 'app/components/Loadable/Loadable';

//system routes 
const Menu = Loadable(lazy(() => import("../views/menu")));
const Company = Loadable(lazy(() => import("../views/company")));
const Category = Loadable(lazy(() => import("../views/category")));
const User = Loadable(lazy(() => import("../views/user")));

const dashboardRoutes = [
    {
        path: '/menu',
        element: <Menu />,
    },
    {
        path: '/company',
        element: <Company />,
    },
    {
        path: '/category',
        element: <Category />,
    },
    {
        path: '/user',
        element: <User />,
    },
]

export default dashboardRoutes