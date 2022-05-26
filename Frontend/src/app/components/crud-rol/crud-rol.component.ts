import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/api/models/rol';
import { ConfirmationService, MessageService } from 'primeng/api';
import { RolService } from 'src/app/service/rol.service';

@Component({
  selector: 'app-crud-rol',
  templateUrl: './crud-rol.component.html',
  providers: [MessageService, ConfirmationService]
})
export class CrudRolComponent implements OnInit {

  rolDialog: boolean;

    deleteRolDialog: boolean = false;

    deleteRolesDialog: boolean = false;

    roles: Rol[];

    rol: Rol;

    selectedRoles: Rol[];

    submitted: boolean;

    cols: any[];

    statuses: any[];

    rowsPerPageOptions = [5, 10, 20];

    uploadedFiles: any[] = [];

    constructor(private rolService: RolService, private messageService: MessageService,
                private confirmationService: ConfirmationService) {}

    ngOnInit() {

        // NUEVO getProducts
        this.rolService.getAllRoles().subscribe((data: Rol[] )=>{
            this.roles = data;
            console.log(this.roles)
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
        this.rol = {};
        this.submitted = false;
        this.rolDialog = true;
    }

    deleteSelectedRoles() {
        this.deleteRolesDialog = true;
    }

    editProduct(rol: Rol) {
        this.rol = {...rol};
        this.rolDialog = true;
    }

    deleteProduct(rol: Rol) {
        this.deleteRolDialog = true;
        this.rol = {...rol};
    }

    confirmDeleteSelected(){
        this.deleteRolesDialog = false;
        this.roles = this.roles.filter(val => !this.selectedRoles.includes(val));
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Roles Deleted', life: 3000});
        this.selectedRoles = null;
    }

    confirmDelete(){
        this.deleteRolDialog = false;
        // this.products = this.products.filter(val => val._id !== this.product._id);

        // this.product = {};
        // console.log(this.product._id);
        this.rolService.deleteRol(this.rol).subscribe(data =>{
            console.log(data)
        },error => {
            console.log(error)
        })
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Rol Deleted', life: 3000});
    }

    hideDialog() {
        this.rolDialog = false;
        this.submitted = false;
    }

    saveRol() {
        this.submitted = true;

        if (this.rol.nombreRol.trim()) {
            if (this.rol._id) {
                // @ts-ignore
                // this.product.inventoryStatus = this.product.inventoryStatus.value ? this.product.inventoryStatus.value: this.product.inventoryStatus;
                // this.products[this.findIndexById(this.product._id)] = this.product;
                // this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
                console.log(this.rol)
                this.rolService.putRol(this.rol).subscribe(data =>{
                    console.log(data)
                },error => {
                    console.log(error)
                })
            } else {
                this.rolService.postRol(this.rol).subscribe(data =>{
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

            this.roles = [...this.roles];
            this.rolDialog = false; 
            this.rol = {}; // para limpiar rol
        }
    }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.products.length; i++) {
    //         if (this.products[i]._id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    // createId(): string {
    //     let id = '';
    //     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for (let i = 0; i < 5; i++) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }
}
