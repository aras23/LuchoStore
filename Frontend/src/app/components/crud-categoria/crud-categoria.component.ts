import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Categories } from 'src/app/api/models/categories';
import { CategoriesService } from 'src/app/service/categories.service';

@Component({
  selector: 'app-crud-categoria',
  providers: [MessageService, ConfirmationService],
  templateUrl: './crud-categoria.component.html'
})
export class CrudCategoriaComponent implements OnInit {

  categoriesDialog: boolean;

  deleteCategoriesDialog: boolean = false;

  deleteCategoriessDialog: boolean = false;

  categoriess: Categories[];

  categories: Categories;

  selectedCategoriess: Categories[];

  submitted: boolean;

  cols: any[];

  statuses: any[];

  rowsPerPageOptions = [5, 10, 20];

  uploadedFiles: any[] = [];

  constructor(private categoriesService: CategoriesService, private messageService: MessageService,
              private confirmationService: ConfirmationService) {}

  ngOnInit() {

      // NUEVO getProducts
      this.categoriesService.getAllCategories().subscribe((data: Categories[] )=>{
          this.categoriess = data;
          console.log(this.categoriess)
      },error => {
          console.log(error)
      })

      // this.cols = [
      //     {field: 'id', header: 'ID'},
      //     {field: 'nombre', header: 'Nombre'},
      //     {field: 'descipcion', header: 'Descripcion'},
      //     {field: 'precio', header: 'Precio'},
      //     {field: 'cantidad', header: 'Cantidad'},
      //     {field: 'imagen', header: 'Imagen'}
      // ];

      // Termina getProducts

      // this.productService.getProducts().then(data => this.products = data);

      // this.cols = [
      //     {field: 'name', header: 'Name'},
      //     {field: 'price', header: 'Price'},
      //     {field: 'category', header: 'Category'},
      //     {field: 'rating', header: 'Reviews'},
      //     {field: 'inventoryStatus', header: 'Status'}
      // ];

      // this.statuses = [
      //     {label: 'INSTOCK', value: 'instock'},
      //     {label: 'LOWSTOCK', value: 'lowstock'},
      //     {label: 'OUTOFSTOCK', value: 'outofstock'}
      // ];
  }

  onUpload(event) {
      for (const file of event.files) {
          this.uploadedFiles.push(file);
      }

      this.messageService.add({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
  }

  openNew() {
      this.categories = {};
      this.submitted = false;
      this.categoriesDialog = true;
  }

  deleteSelectedCategoriess() {
      this.deleteCategoriessDialog = true;
  }

  editCategories(categories: Categories) {
      this.categories = {...categories};
      this.categoriesDialog = true;
  }

  deleteCategories(categories: Categories) {
      this.deleteCategoriesDialog = true;
      this.categories = {...categories};
  }

  confirmDeleteSelected(){
      this.deleteCategoriessDialog = false;
      this.categoriess = this.categoriess.filter(val => !this.selectedCategoriess.includes(val));
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Categoriess Deleted', life: 3000});
      this.selectedCategoriess = null;
  }

  confirmDelete(){
      this.deleteCategoriesDialog = false;
      // this.products = this.products.filter(val => val._id !== this.product._id);

      // this.product = {};
      // console.log(this.product._id);
      this.categoriesService.deleteCategories(this.categories).subscribe(data =>{
          console.log(data)
      },error => {
          console.log(error)
      })
      this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Categories Deleted', life: 3000});
  }

  hideDialog() {
      this.categoriesDialog = false;
      this.submitted = false;
  }

  saveProduct() {
      this.submitted = true;

      if (this.categories.nombreCategoria.trim()) {
          if (this.categories._id) {
              // @ts-ignore
              // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
              // this.products[this.findIndexById(this.product._id)] = this.product;
              // this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
              console.log(this.categories)
              this.categoriesService.putCategories(this.categories).subscribe(data =>{
                  console.log(data)
              },error => {
                  console.log(error)
              })
          } else {
              this.categoriesService.postCategories(this.categories).subscribe(data =>{
                  console.log(data)
              },error => {
                  console.log(error)
              })
              // console.log(this.product)
              // this.product._id = this.createId();
              // // this.product.code = this.createId();
              // this.product.imagen = 'product-placeholder.svg';
              // // @ts-ignore
              // // this.product.inventoryStatus = this.product.inventoryStatus ? this.product.inventoryStatus.value : 'INSTOCK';
              // this.products.push(this.product);
              // this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});

          }

          this.categoriess = [...this.categoriess];
          this.categoriesDialog = false; 
          this.categories = {}; // para limpiar product
      }
  }

}
