import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { CommentService } from '../../../services/comment.service';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, 
    PrimeNgModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent {

  @Input() idUsuario !:string 
  @Input() userName !:string 



  constructor(
              private _commentService: CommentService
  ){
    
  }

  addComentario(){

    // if (this.comentarioControl.valid) {
    //   // Agrega tu lógica aquí
    //   console.log('Comentario válido:', this.inputComentario);
    // } else {
    //   // El formulario no es válido, puedes mostrar un mensaje de error o hacer algo más
    //   console.log('Formulario inválido');
    // }
  }


}
