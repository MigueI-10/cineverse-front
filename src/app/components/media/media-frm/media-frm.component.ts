import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { MaterialModule } from '../../../material/material/material.module';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaService } from '../../../services/media.service';
import { of, switchMap } from 'rxjs';
import { MatSelectModule } from '@angular/material/select';
import { Actor } from '../../../interfaces';
import { ActorService } from '../../../services/actor.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-media-frm',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, CommonModule, PrimeNgModule, MatSelectModule, TranslateModule],
  providers: [MessageService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './media-frm.component.html',
  styleUrl: './media-frm.component.css'
})
export class MediaFrmComponent implements OnInit {

  public tipos: string[] = ['pelicula', 'serie']
  public frmMedia!: FormGroup
  public idMedia!: string
  public isSerie: boolean = false
  public isPelicula: boolean = false

  public actLocal!: Actor[]

  public mensajeBienAdd = "Película/Serie añadida correctamente"
  public mensajeMalAdd = "Fallo al añadir la película/serie"
  public mensajeBienUpd = "Película/Serie actualizada correctamente"
  public mensajeMalUpd = "Fallo al actualizar la película/serie"
  public mensajeNoExiste = "Esta película/serie no existe"
  public mensajeMin3 = "Debes seleccionar minimo 3 actores"



  constructor(private fb: FormBuilder,
    private _mediaService: MediaService,
    private _router: Router,
    private _activeRouter: ActivatedRoute,
    private messageService: MessageService,
    private _actorService: ActorService,
  ) { }


  public actorList: FormControl = new FormControl('', [Validators.required])

  ngOnInit(): void {

    this.cargarActoresBD()
    let lang = this._mediaService.getSelectedLanguage()
    if(lang === "en") {
      this.mensajeBienAdd = "Media added successfully";
      this.mensajeMalAdd = "Failed to add the media";
      this.mensajeBienUpd = "Media updated successfully";
      this.mensajeMalUpd = "Failed to update the media";
      this.mensajeNoExiste = "This media does not exist";
      this.mensajeMin3 = "You must select at least 3 actors";
  }

    this.frmMedia = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      imagen: ['', [Validators.required]],
      director: ['', [Validators.required, Validators.minLength(5)]],
      anyo: ['', [Validators.required, Validators.min(1920), Validators.max(2028)]],
      genero: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.minLength(30)]],
      puntuacion: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      actores: this.fb.array([], [Validators.required, Validators.minLength(3)]),
    })


    this._activeRouter.params.subscribe(
      params => {
        this.idMedia = params['id'];
        if (this.idMedia) {
          this.cargarMedia();
        }
      }
    );
  }

  cargarMedia() {
    this._mediaService.getMediaById(this.idMedia).subscribe(
      res => {
        if (Object.keys(res).length > 0) {
          // //seteamos los campos del form que vengan del objeto
          this.frmMedia.controls['id'].setValue(res._id);
          this.frmMedia.controls['titulo'].setValue(res.titulo);
          this.frmMedia.controls['tipo'].setValue(res.tipo);
          this.frmMedia.controls['imagen'].setValue(res.imagen);
          this.frmMedia.controls['director'].setValue(res.director);
          this.frmMedia.controls['anyo'].setValue(res.anyo);
          this.frmMedia.controls['genero'].setValue(res.genero);
          this.frmMedia.controls['puntuacion'].setValue(res.puntuacion);
          this.frmMedia.controls['descripcion'].setValue(res.descripcion);


          if (res.duracion) {

            this.clickTipo('pelicula')
            this.frmMedia.controls['duracion'].setValue(res.duracion);
          } else if (res.episodios) {
            this.clickTipo('serie')
            this.frmMedia.controls['episodios'].setValue(res.episodios);
          }

          this.actores.clear()

          res.actores.forEach(actor => {
            const actorControl = this.fb.control(actor._id, Validators.required);
            actorControl.disable();
            this.actores.push(actorControl);
            
          });

        } else {
          this.errorToast(this.mensajeNoExiste)
          this._router.navigate(['/media-crud']);
        }
      }
    )
  }

  onAddMovie(): void {
    if (this.actorList.invalid) return

    const newMovie = this.actorList.value;
    const actControl = this.fb.control(newMovie, Validators.required);
    actControl.disable();
    this.actores.push(actControl)

    this.actLocal = this.actLocal.filter(actor => actor._id !== newMovie);

    this.actorList.reset()
  }

  onDeleteMovie(index: number): void {
    this.actores.removeAt(index);
  }
  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched
  }

  clickTipo(cadena: string) {

    if (cadena == "serie") {
      this.isPelicula = false
      this.isSerie = true

      if (this.frmMedia.contains('duracion')) {
        this.frmMedia.removeControl('duracion');
      }

      this.frmMedia.addControl('episodios', new FormControl('', [Validators.required, Validators.min(1), Validators.max(5000)]));

    } else if (cadena == "pelicula") {
      this.isSerie = false
      this.isPelicula = true

      if (this.frmMedia.contains('episodios')) {
        this.frmMedia.removeControl('episodios');
      }
      this.frmMedia.addControl('duracion', new FormControl('', [Validators.required, Validators.min(1), Validators.max(500)]));

    }
  }

  cargarActoresBD() {
    const actRecover = localStorage.getItem('actores')
    if (actRecover !== null) {
      this.actLocal = JSON.parse(actRecover);
    } else {
      this._actorService.getAllActors().subscribe(
        res => {
          if (res.length <= 0) return
          this.actLocal = res
        }
      )
    }
  }

  saveMedia() {

    if (this.id.value == "") {
      this.añadirMedia();
    } else {
      this.updateMedia();
    }
  }

  añadirMedia() {

    if (this.frmMedia.valid) {

      const lista = this.actores.value;

      if (lista.length >= 3) {
        const formData = this.frmMedia.value;

        formData.anyo = Number.parseInt(formData.anyo)
        formData.puntuacion = Number.parseInt(formData.puntuacion);
        formData.actores = this.actores.value;

        this._mediaService.addMedia(formData).subscribe(
          res => {
            if (res) {
              this.success(this.mensajeBienAdd)
            } else {
              this.errorToast(this.mensajeMalAdd)
            }

            setTimeout(() => {
              this.frmMedia.reset(); //se resetea el formulario
              this._router.navigate(['/media-crud']);//cargar el crud
            }, 1000);
          }
        )



      } else {
        this.errorToast(this.mensajeMin3)
      }


    }
  }

  updateMedia() {

    if (this.frmMedia.valid) {

      const lista = this.actores.value;

      if (lista.length >= 3) {
        const formData = this.frmMedia.value;

        formData.anyo = Number.parseInt(formData.anyo)
        formData.puntuacion = Number.parseInt(formData.puntuacion);
        formData.actores = this.actores.value;

        const id = this.frmMedia.controls['id'].value;

        this._mediaService.updateMedia(formData, id).subscribe(
          res => {
            if (res) {
              this.success(this.mensajeBienUpd)
            } else {
              this.errorToast(this.mensajeMalUpd)
            }

            setTimeout(() => {
              this.frmMedia.reset(); //se resetea el formulario
              this._router.navigate(['/media-crud']);//cargar el crud
            }, 1000);
          }
        )
      } else {
        this.errorToast(this.mensajeMin3)
      }


    }



  }
  get id() {
    return this.frmMedia.get('id') as FormControl
  }
  get titulo() {
    return this.frmMedia.get('titulo') as FormControl
  }

  get imagen() {
    return this.frmMedia.get('imagen') as FormControl
  }
  get tipo() {
    return this.frmMedia.get('tipo') as FormControl
  }

  get director() {
    return this.frmMedia.get('director') as FormControl
  }

  get anyo() {
    return this.frmMedia.get('anyo') as FormControl
  }

  get genero() {
    return this.frmMedia.get('genero') as FormControl
  }

  get descripcion() {
    return this.frmMedia.get('descripcion') as FormControl
  }

  get duracion() {
    return this.frmMedia.get('duracion') as FormControl
  }

  get episodios() {
    return this.frmMedia.get('episodios') as FormControl
  }

  get puntuacion() {
    return this.frmMedia.get('puntuacion') as FormControl
  }

  get actores() {
    return this.frmMedia.get('actores') as FormArray
  }

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
