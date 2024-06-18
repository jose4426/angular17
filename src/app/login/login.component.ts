import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';
import { AuthService } from '../register/AuthService'; 
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { FooterComponent } from '../footer/footer.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HeaderComponent,FormsModule,FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  credentials = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.credentials).subscribe(
      response => {
        localStorage.setItem('token', response.token)
        console.log('User logged in', response);
     // Mostrar alerta con SweetAlert2 y cerrarla después de 5 segundos
     Swal.fire({
      title: '¡Inicio de sesión exitoso!',
      text: 'Serás redirigido en breve...',
      icon: 'success',
      timer: 2000,
      timerProgressBar: true,
      willClose: () => {
        this.router.navigate(['/']); // Redirige a la página principal o donde desees
      }
    });
  },
  error => {
    Swal.fire({
      title: 'Error en credenciales',
      text: 'Por favor, intenta de nuevo.',
      icon: 'error',
      timer: 2000,
      timerProgressBar: true
    });

        console.error('Error logging in', error);
        // Manejar el error de login
      }
    );
  }
}
