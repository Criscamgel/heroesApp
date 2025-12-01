import { createBrowserRouter } from "react-router";
import { AdminLayout } from "@/admin/layouts/AdminLayout";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
// import { AdminPage } from "@/admin/pages/AdminPage";
// import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { lazy } from "react";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
const AdminPage = lazy(() => import('@/admin/pages/AdminPage'));

export const appRouter = createBrowserRouter([
    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: '/heroes/:idSlug',
                element: <HeroPage />
            },
            {
                path: '/search',
                element: <SearchPage />
            },
            {
                path: '*',
                element: <h1>404</h1>
            }
        ]
    },

    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            },
        ]
    },
])
