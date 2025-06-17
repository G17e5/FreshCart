import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { logedGuard } from './core/guards/loged.guard';
import { DetailsComponent } from './components/details/details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: AuthLayoutComponent,canActivate:[logedGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then((m) => m.RegisterComponent),
        title: 'Register',
      },
      {
        path: 'forgetpassword',
        loadComponent: () =>
          import('./components/forgetpassword/forgetpassword.component').then((m) => m.ForgetpasswordComponent),
        title: 'Register',
      }
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,canActivate:[authGuard],
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
        title: 'Home',canActivate:[authGuard]
      },
      {
        path: 'carts',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
        title: 'Carts',canActivate:[authGuard]
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then((m) => m.ProductsComponent),
        title: 'Products',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./pages/allorders/allorders.component').then((m) => m.AllordersComponent),
        title: 'Products',
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then((m) => m.CategoriesComponent),
        title: 'Categories',
      },
      {
        path:'details/:id',component:DetailsComponent
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then((m) => m.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then((m) => m.CheckoutComponent),
        title: 'Checkout',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/notfound/notfound.component').then((m) => m.NotfoundComponent),
        title: 'Not Found',
      },
    ],
  },
];
