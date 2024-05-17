import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { from } from 'rxjs';
import { LoginComponent } from '../login/login.component';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
