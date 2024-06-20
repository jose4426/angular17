import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../register/AuthService';





@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;  

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication() {

    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;  

  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);  
  }

  iniciarSesion() {
    this.router.navigate(['/login']);  

  }
}
