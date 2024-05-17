import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService : ApiService){
    
  }

  ngOnInit(): void {
    this.llenarData();
  }

  llenarData(){
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



}
