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
import { loginGuard } from './services/login-service';
import { CreateBooking } from './pages/create-booking/create-booking';
import { roleGuard } from './guards/role-service';
import { MyBookings } from './pages/my-bookings/my-bookings';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'create-accommodation', component: CreateAccommodation, canActivate: [roleGuard], data: { expectedRole: ["ROLE_HOST"] } },
    { path: 'edit-user', component: EditUser },
    { path: 'recover-password', component: RecoverPassword },
    { path: 'reset-password', component: ResetPassword },
    { path: 'my-places', component: MyPlaces, canActivate: [roleGuard], data: { expectedRole: ["ROLE_HOST"] } },
    { path: 'accommodation/:id', component: Accommodation },
    { path: 'edit-place/:id', component: EditPlace, canActivate: [roleGuard], data: { expectedRole: ["ROLE_HOST"] } },
    { path: 'user-profile', component: UserProfile },
    { path: 'create-booking', component: CreateBooking, canActivate: [roleGuard], data: { expectedRole: ["ROLE_USER"] } },
    { path: 'my-bookings', component: MyBookings },
    { path: 'login', component: Login, canActivate: [loginGuard] },
    { path: 'register', component: Register, canActivate: [loginGuard] },
    { path: "**", pathMatch: "full", redirectTo: "" }
];