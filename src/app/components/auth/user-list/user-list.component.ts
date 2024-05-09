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
import { TranslateModule } from '@ngx-translate/core';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, TranslateModule,
    PrimeNgModule, MaterialModule, FormsModule, ReactiveFormsModule, AddCommentComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  public aUsers: User[] = []
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public estadoBan!: boolean

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _authService: AuthService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
  ) {

  }
  public displayedColumns: string[] = ['id', 'name', 'email', 'acciones'];
  public dataSource = new MatTableDataSource<User>;

  public noUsers = "No hay usuarios disponibles"
  public noUsersFilter = "No hay usuarios por este filtro"
  public title = "¿Seguro que quieres banear al Usuario?"
  public accion = "Acción Importante"
  public banBien = "Usuario baneado correctamente"
  public banMal = "Error al banear al usuario"
  public yes = "Si"
  public no = "No"
  public unbanBien = "Usuario desbaneado correctamente"
  public unbanMal = "Error al desbanear al usuario"
  public noBan = "No se ha baneado al usuario"
  public nounBan = "No se ha desbaneado al usuario"
  public titleUn = "¿Seguro que quieres desbanear al Usuario?"

  ngOnInit(): void {
    let lang = localStorage.getItem('selectedLang')

    if (lang === "en") {
      this.noUsers = "No users available"
      this.noUsersFilter = "No users by this filter"
      this.title = "Are you sure you want to ban the User?";
      this.accion = "Important Action";
      this.banBien = "User banned successfully";
      this.banMal = "Error banning the user";
      this.yes = "Yes";
      this.no = "No";
      this.unbanBien = "User unbanned successfully";
      this.unbanMal = "Error unbanning the user";
      this.noBan = "User has not been banned";
      this.nounBan = "User has not been unbanned";
      this.titleUn = "Are you sure you want to unban the User?";
    }


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
          this.errorToast(this.noUsers)
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
          this.errorToast(this.noUsersFilter)
          this.resetLists()
        }
      }
    )

  }

  banearUsuario(id: string, event: Event) {
    if (id !== "") {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: this.title,
        header: this.accion,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        acceptLabel: this.yes,
        rejectLabel: this.no,
        accept: () => {
          this._authService.banUser(id).subscribe(
            res => {
              if (res) {
                this.success(this.banBien)

              } else {
                this.errorToast(this.banMal)
              }

              this.resetLists()
              this.getBanned(true)
            }
          )

        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Informacion', detail: this.noBan, life: 3000 });
        }
      });
    }
  }

  desbanearUsuario(id: string, event: Event) {

    if (id !== "") {
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: this.titleUn,
        header: this.accion,
        icon: 'pi pi-exclamation-triangle',
        acceptIcon: "none",
        rejectIcon: "none",
        rejectButtonStyleClass: "p-button-text",
        acceptLabel: this.yes,
        rejectLabel: this.no,
        accept: () => {
          this._authService.unBanUser(id).subscribe(
            res => {
              if (res) {
                this.success(this.unbanBien)

              } else {
                this.errorToast(this.unbanMal)
              }

              this.resetLists()
              this.getBanned(true)
            }
          )

        },
        reject: () => {
          this.messageService.add({ severity: 'info', summary: 'Informacion', detail: this.nounBan, life: 3000 });
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
  resetLists() {
    this.aUsers = []
    this.dataSource = new MatTableDataSource(([] as User[]))
  }


}
