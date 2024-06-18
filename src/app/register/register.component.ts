import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { userInterface } from '../interface/userInterface';
import { AuthService } from './AuthService';
import { Router } from '@angular/router'; // Importa el enrutador
import { FooterComponent } from '../footer/footer.component';



@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent,FormsModule,CommonModule, FooterComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent   {

register: Partial<userInterface> = {
  firstName:'',
  lastName:'',
  email:'',
  password:'',
  newsletter: false
}

constructor (private authserv : AuthService, private routes: Router){}

onSubmit() {
  const data: Partial<userInterface> = {
    firstName: this.register.firstName,
    lastName: this.register.lastName,
    email: this.register.email,
    password: this.register.password,
    newsletter: this.register.newsletter


  };
  if (data.email && data.password !== undefined) {
    this.authserv.register(data as userInterface).subscribe(
      (response) => {
        console.log('Producto insertado exitosamente', response);

        window.alert('El producto fue insertado con éxito');
        this.routes.navigate(['/login']);

      },
      (error) => {
        console.error('Error al insertar el producto', error);
        window.alert('Ocurrió un error al insertar el producto');
      }
    );
  } else {
    window.alert('Por favor, completa todos los campos');
  }
}
refreshPage() {
  window.location.reload();
}
}
