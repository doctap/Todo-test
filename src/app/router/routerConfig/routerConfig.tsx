import { RouteProps } from "react-router";
import { AddPage, MainPage, TodoPage } from "../../../pages";

export enum AppRoutes {
    MAIN = 'main',
    TODO = 'todo',
    ADD = 'add'
};

export const RouterPaths: Record<AppRoutes, string> = {
    [AppRoutes.MAIN]: '/',
    [AppRoutes.TODO]: '/todo/:slug',
    [AppRoutes.ADD]: '/add',
};

export const routerConfig: RouteProps[] = [
    {
        path: RouterPaths[AppRoutes.MAIN],
        element: <MainPage />
    },
    {
        path: RouterPaths[AppRoutes.TODO],
        element: <TodoPage />
    },
    {
        path: RouterPaths[AppRoutes.ADD],
        element: <AddPage />
    }
];
