import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CreateAccommodation } from './pages/create-accommodation/create-accommodation';
import { EditUser } from './pages/edit-user/edit-user';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {path: 'create-accommodation', component: CreateAccommodation},
    {path: 'edit-user', component: EditUser},
    { path: "**", pathMatch: "full", redirectTo: "" }
];