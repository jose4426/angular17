import { Component, OnInit, numberAttribute } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { productoInterface } from '../interface/product.interface';
import { AuthService } from '../register/AuthService';
import { Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import Swal from 'sweetalert2';
import { EmailService } from '../email/email';
import { ChatService } from '../chat/ChatService';
import { DollarService } from '../scraping/scrapingServices';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, CommonModule, FormsModule, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  lista: any[] = [];
  productoSeleccionado: productoInterface | null = null;
  inserts: productoInterface | null = null;
  nuevoProducto: Partial<productoInterface> = {
    nombre: '',
    tasa: 0,
  };
  productoAEliminar: productoInterface | null = null;
  confirmDeleteModal: boolean = false;
  token: string = "";

  tasaTotal: number | null = null;
  total: number | null = null;
  tasaResta: number | null = null;
  index1: number = 0;
  index2: number = 0;
  index33: number | null = null;
  totalBs: number | null = null;
  totalBss: number | null = null;
  imageUrl: string = 'https://cdn.litemarkets.com/cache/uploads/blog_post/blog_posts/liteforex-blog-cryptocurrency-rates_1000x545.jpg?q=75&w=1000&s=a725cbc2beb49334383d6c1069b804f0'; // URL de la imagen
  isAuthenticated: boolean = false;  // Variable de estado de autenticación
  email: string | null = null;
  message: string = '';
  tasaRapi: number | null = null;
  messages: string[] = [];
  bcv: number  | null = null ;
  zelle: number =56.00;
  panama: number =57.00;
  promedio: number = 0 ;

  selectedTasa: number = this.zelle; // Inicialmente seleccionamos BCV
  index3: number | null = null;
  totaltasa = this.selectedTasa;

  valorDolar: number | null = null;  // Asegúrate de que sea un número
  dollarData: number | null = null;
  dollarParalelo: number | null = null;


  https: any;

  constructor( private scrapingServices: DollarService, private http: HttpClient, private apiService: ApiService, private authService: AuthService, private router: Router, private emailService: EmailService, private chatService: ChatService) {

  }

  async ngOnInit(): Promise<void> {
    this.checkAuthentication();
    //this.llenarData();

    await this.fetchDollarData();
    await this.fetchDollarParalelo();

    this.promedios(); 

  }

  async fetchDollarData(): Promise<void> {
    try {
      const data = await this.scrapingServices.getDollarData().toPromise();
      this.dollarData = data.monitors.usd.price;
      console.log('Datos del dólar BCV:', this.dollarData);
    } catch (err) {
      console.error('Error al obtener datos del dólar BCV:', err);
    }
  }
  async fetchDollarParalelo(): Promise<void> {
    try {
      const data = await this.scrapingServices.getDollarParalelo().toPromise();
      this.dollarParalelo = data.monitors.enparalelovzla.price;
      console.log('Datos del dólar paralelo:', this.dollarParalelo);
    } catch (err) {
      console.error('Error al obtener datos del dólar paralelo:', err);
    }

  /*  this.scrapingServices.getDollarParalelo().subscribe({
      const data = await this.scrapingServices.getDollarData().toPromise();

      next: (data) => {
        this.dollarParalelo = data.monitors.enparalelovzla.price;
        console.log('Datos del dólar paralelo:', this.dollarParalelo);
      },
      error: (err) => {
        console.error('Error al obtener datos del dólar:', err);
      },
    });*/
  }
  promedios(): void {
    if (this.dollarData && this.dollarParalelo) {
      this.promedio = (this.dollarParalelo + this.dollarData) / 2;
    }
    console.log('Promedio:', this.promedio);
  }

  updateTotal() {
    this.totaltasa = this.selectedTasa;
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
        this.calculoTasa();

      },
      error: (err: any) => {
        console.log(err);
      },

    })
    this.calculoTasa();

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
            timer: 2000,
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
            timer: 1200,
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

  updateBcv() {

    this.apiService.updateBcv().subscribe(
    );

  }
  updateBtc() {

    this.apiService.updateBtc().subscribe(

    );

  }

  cancelarEdicion() {
    this.refreshPage()
  }
  refreshPage() {
    window.location.reload();
  }

  calculoTasa() {
    if(this.selectedTasa == this.zelle) {
      this.total =(this.zelle);
    }
    else if  (this.selectedTasa == this.panama) {
      this.total = this.panama ;
    }
    else if  (this.selectedTasa == this.dollarData) {
      this.total = this.dollarData ;
    }
    else if  (this.selectedTasa == this.dollarParalelo) {
      this.total = this.dollarParalelo ;
    }
  }

  restarTasas(index1: number, index2: number) {

    if (index1 >= 0 && index2 >= 0 && this.index3 !== null && this.total !== null) {
      this.tasaResta = Number(((this.lista[1].tasa - this.total) * this.index3).toFixed(2));
      this.totalBs = Number((this.tasaResta / this.total).toFixed(2))
    } else {
      this.tasaResta = 0;
    }
  }

  calculoBs() {
    if (this.index3  && this.selectedTasa > 0) {
      this.tasaTotal = this.selectedTasa * this.index3; // Multiplica la tasa por la cantidad en USD
      console.log(`Tasa seleccionada: ${this.selectedTasa}, Cantidad USD: ${this.index3}, Bs calculados: ${this.tasaTotal}`);
    } else {
      this.tasaTotal = 0; // Si falta algún dato, resetea el resultado
    }
  

   /* if (this.index3  && this.selectedTasa > 0 ) {
      this.tasaTotal = Number((this.totaltasa * this.index3).toFixed(2));
    }*/
  }
 
  sendEmail() {
    const to = "gonzalezjar231@gmail.com";
    const subject = 'Datos Calculados';
    if (this.email !== null) {
      const text = `Tasa: ${this.total}\nCantidad a Cambiar: ${this.index3}\nTotal en Bs: ${this.tasaTotal}\nEmail: ${this.email}`;

      this.emailService.sendEmail(to, subject, text).subscribe(response => {
        console.log('Email sent successfully', response);

      }
        , error => {
          console.log('Error sending email', error);
        });
      Swal.fire({
        title: '¡Su orden fue creado con oc con éxito!',
        text: 'Serás redirigido en breve...',
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        willClose: () => {
          this.refreshPage();
        }
      });

    } else

      window.alert('!Tiene que agregar un correo electronico');

  }

  sendMessage() {
    if (this.message.trim()) {
      this.messages.push(this.message);
      this.message = '';
    }
  }
  autoResize(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto'; // Restablecer la altura
    textarea.style.height = `${textarea.scrollHeight}px`; // Establecer la altura según la altura de desplazamiento
  }
  validarSoloNumeros(event: any): void {
    const input = event.target.value;
  
    // Expresión regular para permitir solo números (incluyendo decimales)
    const numerosValidos = /^[0-9]*\.?[0-9]*$/;
  
    if (!numerosValidos.test(input)) {
      // Si el valor ingresado no cumple con la regex, remueve el último carácter
      event.target.value = input.slice(0, -1);
    }
  
    // Actualiza el valor de `index3` después de validar
    this.index3 = parseFloat(event.target.value) || 0;
  }
  

}
