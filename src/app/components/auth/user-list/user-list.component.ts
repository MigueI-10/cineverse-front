import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MessageService } from 'primeng/api';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { AddCommentComponent } from '../../shared/add-comment/add-comment.component';
import { User } from '../../../interfaces';
import { AuthService } from '../../../services/auth.service';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,
    PrimeNgModule, MaterialModule, FormsModule, ReactiveFormsModule, AddCommentComponent],
  providers: [MessageService],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  public aUsers: User[] = []

  constructor(
    private _activatedRouter: ActivatedRoute,
    private _authService: AuthService,
    private messageService: MessageService
  ) {

  }


  ngOnInit(): void {

    this.cargarUsuarios()
    


  }

  cargarUsuarios() {
    this._authService.listAllUsers().subscribe(
      res => {
        if (res.length > 0) {
          this.aUsers = res
        } else {
          this.errorToast('No hay usuarios disponibles')
        }

        console.log(this.aUsers);
      }
    )
  }

  getBanned(ban: boolean) {
    this.aUsers = []


    this._authService.getUsersByBan(ban).subscribe(
      res => {
        if (res.length > 0) {
          this.aUsers = res
        } else {
          this.errorToast('No hay usuarios por este filtro')
        }
      }
    )

    console.log(this.aUsers);


  }

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }


}
