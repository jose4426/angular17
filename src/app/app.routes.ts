import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';

export const routes: Routes = [
    {
        path:'home',
        component: RegisterComponent
    },{
        path:'register231',
        component: RegisterComponent
    },{
        path:'login',
        component: LoginComponent
    } ,{
        path:'',
        component: HomeComponent
    },{
        path:'lista',
        component: ProductComponent
    }
 
];
