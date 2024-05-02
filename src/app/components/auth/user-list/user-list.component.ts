import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { AddCommentComponent } from '../../shared/add-comment/add-comment.component';
import { User } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,
    PrimeNgModule, MaterialModule, FormsModule, ReactiveFormsModule, AddCommentComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  public aUsers: User[] = []
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public estadoBan!:boolean

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {

  }
  public displayedColumns: string[] = ['id', 'name', 'email', 'acciones'];
  public dataSource = new MatTableDataSource<User>;

  ngOnInit(): void {

    //obtenemos los activos
    this.getBanned(true)

  }

  cargarUsuarios() {
    this._authService.listAllUsers().subscribe(
      res => {
        if (res.length > 0) {
          this.aUsers = res
          this.dataSource = new MatTableDataSource(res)

          //paginacion
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        } else {
          this.errorToast('No hay usuarios disponibles')
        }

        // console.log(this.aUsers);
      }
    )
  }

  getBanned(ban: boolean) {
    this.resetLists()
    this.estadoBan = ban
    this._authService.getUsersByBan(ban).subscribe(
      res => {
        console.log(res);
        if (res.length > 0) {
          
          this.aUsers = res
          this.dataSource = new MatTableDataSource(res)
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.estadoBan != ban
        } else {
          this.errorToast('No hay usuarios por este filtro')
          this.resetLists()
        }
      }
    )

  }

  banearUsuario(id: string,  event: Event) {
    if (id !== "") {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro que quieres banear al Usuario?',
        header: 'Accion Importante',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        acceptLabel: "Si",
        rejectLabel: "No",
        accept: () => {
          this._authService.banUser(id).subscribe(
            res => {
              if (res) {
                this.success('Usuario baneado correctamente')

              } else {
                this.errorToast('Error al banear el comentario')
              }

              this.resetLists()
              this.getBanned(true)
            }
          )
          
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Informacion', detail: 'No se ha podido banear al usuario', life: 3000 });
        }
      }); 
    }
  }

  desbanearUsuario(id: string,  event: Event) {
    
    if (id !== "") {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Seguro que quieres desbanear al Usuario?',
        header: 'Accion Importante',
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        acceptLabel: "Si",
        rejectLabel: "No",
        accept: () => {
          this._authService.unBanUser(id).subscribe(
            res => {
              if (res) {
                this.success('Usuario desbaneado correctamente')

              } else {
                this.errorToast('Error al desbanear el comentario')
              }

              this.resetLists()
              this.getBanned(true)
            }
          )
          
        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Informacion', detail: 'No se ha podido desbanear al usuario', life: 3000 });
        }
      }); 
    }
  }



  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
  resetLists(){
    this.aUsers = []
    this.dataSource = new MatTableDataSource(([] as User[]))
  }


}
