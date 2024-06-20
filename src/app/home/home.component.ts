import { Component, OnInit, numberAttribute } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';
import { ProductComponent } from '../product/product.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { productoInterface } from '../interface/product.interface';
import { AuthService } from '../register/AuthService';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductComponent, CommonModule, FormsModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  lista: any[] = [];
  productoSeleccionado: productoInterface | null = null;
  inserts: productoInterface | null = null;
  nuevoProducto: Partial<productoInterface> = {
    nombre: '',
    tasa: 0
  };
  productoAEliminar: productoInterface | null = null;
  confirmDeleteModal: boolean = false;
  token: string = "";

  tasaTotal: number | null = null;
  total: number  | null = null;
  tasaResta: number |null = null;
  index1: number = 0;
  index2: number = 0;
  index3: number = 0;
  totalBs: number |null = null;
  totalBss: number |null = null;
  imageUrl: string = 'https://cdn.litemarkets.com/cache/uploads/blog_post/blog_posts/liteforex-blog-cryptocurrency-rates_1000x545.jpg?q=75&w=1000&s=a725cbc2beb49334383d6c1069b804f0'; // URL de la imagen
  isAuthenticated: boolean = false;  // Variable de estado de autenticación

  https: any;

  constructor(private apiService: ApiService, private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.checkAuthentication();
    this.llenarData();
    this.calculoTasa();

  }
  checkAuthentication() {
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token; 
  }
  logout() {
    this.authService.logout();
    this.isAuthenticated = false;
    this.router.navigate(['/login']); 
  }

  llenarData() {

    this.apiService.getProducts().subscribe({
      next: (data) => {
        this.lista = data;
      },
      
      error: (err: any) => {
        console.log(err);
      },
    })

  }

  insertarProducto() {
    const data: Partial<productoInterface> = {
      nombre: this.nuevoProducto.nombre,
      tasa: this.nuevoProducto.tasa
    };
    if (data.nombre && data.tasa !== undefined) {
      this.apiService.insertarProducto(data as productoInterface).subscribe(
        (response) => {
          console.log('Producto insertado exitosamente', response);
          Swal.fire({
            title: '¡Los datos fueron actualizados con éxito!',
            text: 'Serás redirigido en breve...',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            willClose: () => {
              this.refreshPage(); 
            }
          });
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
  resetForm() {
    this.nuevoProducto = {
      id: 0,
      nombre: '',
      tasa: 0
    };
  }
  confirmarEliminar(id: string): void {
    this.apiService.delete(id).subscribe(
      () => {
        console.log('Elemento eliminado exitosamente');
        this.llenarData();
      },
      (error) => {
        console.error('Error al eliminar el elemento:', error);
      }
    );
  }
  mostrarModalEliminar(producto: productoInterface) {
    console.log("entro en el boton eliminar ")
    this.productoAEliminar = producto;
    window.alert('decea eliminar el cambio');
    

    this.confirmarEliminar(producto.toString())
    this.refreshPage();
  }

  seleccionarProducto(producto: productoInterface) {
    this.productoSeleccionado = { ...producto };  
  }
  editarProducto(producto: productoInterface) {
    this.productoSeleccionado = { ...producto };  
  }
  guardarCambios() {
    if (this.productoSeleccionado) {
      this.apiService.update(this.productoSeleccionado).subscribe(
        () => {
          console.log('Elemento actualizado exitosamente');
          this.productoSeleccionado;
          Swal.fire({
            title: '¡Los datos fueron actualizados con éxito!',
            text: 'Serás redirigido en breve...',
            icon: 'success',
            timer: 3000,
            timerProgressBar: true,
            willClose: () => {
              this.refreshPage(); 
            }
          });
        },
        (error) => {
          console.error('Error al actualizar el elemento:', error);
        }
      );
    }

  }

  cancelarEdicion() {
    this.refreshPage()
  }
  refreshPage() {
    window.location.reload();
  }
  calcularTasaTotal() {
    this.tasaTotal = this.lista.reduce((acc, item) => acc + item.tasa, 0);
  }

  restarTasas(index1: number, index2: number) {
    if (index1 >= 0 && index2 >= 0) {


      this.tasaResta = Number(((this.lista[1].tasa - this.lista[0].tasa) * this.index3).toFixed(2));
      this.totalBs = Number((this.tasaResta / this.lista[0].tasa).toFixed(2))
    } else {
      this.tasaResta = 0;  
    }
  }
  calculoTasa() {
    if (this.lista && this.lista.length > 0){
      this.total = Number((this.lista[0].tasa * 1.02).toFixed(2));

    }
  }
  calculoBs() {
    if (this.total !== null) {
      this.tasaTotal = this.total * this.index3; // Ejemplo de cálculo
    }
  }
}
//this.totalBss = Number((this.total * this.index3).toFixed(2));
