import { Component, OnInit, numberAttribute } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { ApiService } from '../service/api.service';
import { ProductComponent } from '../product/product.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { productoInterface } from '../interface/product.interface';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, ProductComponent,CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent  implements OnInit{
lista: any[]=[];
productoSeleccionado: productoInterface | null = null;
inserts: productoInterface | null=null;
  nuevoProducto: Partial<productoInterface> = {
    nombre: '',
    tasa: 0
  };
  productoAEliminar: productoInterface | null = null;
  confirmDeleteModal: boolean = false;
  token: string= "";

  tasaTotal: number = 0;
  total: number = 0
  tasaResta: number = 0;
  index1: number = 0;
  index2: number= 0;
  index3: number= 0;
  totalBs: number= 0;
  totalBss: number= 0;
  imageUrl: string = 'https://cdn.litemarkets.com/cache/uploads/blog_post/blog_posts/liteforex-blog-cryptocurrency-rates_1000x545.jpg?q=75&w=1000&s=a725cbc2beb49334383d6c1069b804f0'; // URL de la imagen
  isAuthenticated: boolean = false;  // Variable de estado de autenticación

https: any;

  constructor(private apiService : ApiService){
    
  }

  ngOnInit(): void {
    this.checkAuthentication(); 
    this.llenarData();

  }
  checkAuthentication() {
    // Lógica para verificar si el usuario está autenticado
    // Esto puede ser una llamada a un servicio de autenticación o verificación del token almacenado
    const token = localStorage.getItem('token');
    this.isAuthenticated = !!token;  // Ejemplo simple: verifica si hay un token
  }

  llenarData (){
  
    this.apiService.getProducts().subscribe( {
      next: (data)=>{
        this.lista = data;
    },
    error: (err:any) =>{
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
        window.alert('El producto fue insertado con éxito');
        this.refreshPage();
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
     // this.lista = this.lista.filter(item => item.id)
     this.llenarData();
    },
    (error) => {
      console.error('Error al eliminar el elemento:', error);
      // Aquí podrías manejar el error de alguna manera
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
  this.productoSeleccionado = { ...producto };  // Crear una copia del producto seleccionado
}
editarProducto(producto: productoInterface) {
  this.productoSeleccionado = { ...producto };  // Crear una copia del producto seleccionado
}
guardarCambios() {
  if (this.productoSeleccionado) {
    this.apiService.update(this.productoSeleccionado).subscribe(
      () => {
        console.log('Elemento actualizado exitosamente');
        this.productoSeleccionado ;
        window.alert('Los datos fueron actualizados con éxito');
        this.refreshPage();  // Recarga la lista después de actualizar un elemento
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
  if (index1 >= 0 && index2 >= 0)  {
     

    this.tasaResta = Number(((this.lista[1].tasa - this.lista[0].tasa )*this.index3).toFixed(2));
    this.totalBs   = Number((this.tasaResta/this.lista[0].tasa).toFixed(2))
  } else {
    this.tasaResta = 0;  // O cualquier valor por defecto o mensaje de error
  }
}
calculoTasa(){
  this.total = Number((this.lista[1].tasa/1.05).toFixed(2));
}
calculoBs(){
this.totalBss =Number(( this.total*this.index3).toFixed(2));
}

}
