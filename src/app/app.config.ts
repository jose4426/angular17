import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors} from '@angular/common/http';
import { routes } from './app.routes';
import { AuthService } from './register/AuthService';
import { authInterceptor } from './register/AuthInterceptor';


import { ApiService } from './service/api.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),provideHttpClient(withInterceptors([authInterceptor])),
  AuthService,
  ApiService
]
};
