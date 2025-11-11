import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CreateAccommodation } from './pages/create-accommodation/create-accommodation';
import { EditUser } from './pages/edit-user/edit-user';
import { RecoverPassword } from './pages/recover-password/recover-password';
import { ResetPassword } from './pages/reset-password/reset-password';
import { MyPlaces } from './pages/my-places/my-places';
import { Accommodation } from './pages/accommodation/accommodation';
import { EditPlace } from './pages/edit-place/edit-place';
import { UserProfile } from './pages/user-profile/user-profile';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    {path: 'create-accommodation', component: CreateAccommodation},
    {path: 'edit-user', component: EditUser},
    {path: 'recover-password', component: RecoverPassword},
    {path: 'reset-password', component: ResetPassword},
    { path: 'my-places', component: MyPlaces },
    { path: 'accommodation/:id', component: Accommodation },
    { path: 'edit-place/:id', component: EditPlace },
    { path: 'user-profile', component: UserProfile },
    { path: "**", pathMatch: "full", redirectTo: "" }
];