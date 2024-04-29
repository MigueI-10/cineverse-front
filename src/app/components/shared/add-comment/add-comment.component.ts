import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../interfaces/comment.interface';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule,
    PrimeNgModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-comment.component.html',
  styleUrl: './add-comment.component.css'
})
export class AddCommentComponent implements OnInit{

  @Input() idUsuario !: string
  @Input() userName !: string
  @Input() idPelicula !: string

  @Output() addedComment = new EventEmitter<boolean>()

  public formComment!: FormGroup
  public objComentario !: Comment

  constructor(
    private _commentService: CommentService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.formComment = this.fb.group({
      contenido: ['', Validators.required],
    })
  }

  addComentario() {

    if(this.formComment.valid){


      this.objComentario = {
        idUsuario: this.idUsuario,
        idPelicula: this.idPelicula,
        contenido: this.contenido.value,
        fecha: new Date()
      };

      this._commentService.addComment(this.objComentario).subscribe(
        res => {
          if(res){
            this.addedComment.emit(true)
          }else{
            this.addedComment.emit(false)
          }
          this.contenido.setValue(' ')
        }
      )



    }
  }

  get contenido() {
    return this.formComment.get('contenido') as FormControl
  }


}
