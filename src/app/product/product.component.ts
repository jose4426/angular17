import { Component, OnInit } from '@angular/core';
import { ApiService } from '../service/api.service';
import { productoInterface } from '../interface/product.interface';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
lista?: productoInterface[];

  constructor(private productServise: ApiService){}
productList: productoInterface[]= [];
  ngOnInit(): void {
    this.getProduct();
  }
getProduct(): void{
  this.productServise.getProducts().subscribe({
    next: (data)=>{
      this.lista = data;
    },
    error: (err:any) =>{
      console.log(err);
    },
    
  })
}

}
