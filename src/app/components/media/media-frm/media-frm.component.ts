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

@Component({
  selector: 'app-media-frm',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, CommonModule, PrimeNgModule, MatSelectModule],
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


    this.frmMedia = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      titulo: ['Uncharted', [Validators.required, Validators.minLength(3)]],
      tipo: ['', Validators.required],
      imagen: ['https://image.tmdb.org/t/p/w500//6hlI9Ea1O4IeJ2cj7OiNinqg8Qd.jpg', [Validators.required]],
      director: ['Ridley Scott', [Validators.required, Validators.minLength(5)]],
      anyo: ['2024', [Validators.required, Validators.min(1920), Validators.max(2028)]],
      genero: ['Accion', [Validators.required]],
      descripcion: ['La saga se enfoca en un personaje llamado Nathan Drake un aventurero caza tesoros que, a lo largo de los juegos, se embarca en diferentes aventuras junto a su fiel amigo y socio Victor Sullivan y sus intereses amorosos Elena Fisher y Chloe Frazer.', [Validators.required, Validators.minLength(30)]],
      puntuacion: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
      actores: this.fb.array([], [Validators.required, Validators.minLength(3)]),
    })


    this._activeRouter.params.subscribe(
      params => {
        this.idMedia = params['id'];
        if (this.idMedia) {
          console.log(this.idMedia);
          this.cargarMedia();
        }
      }
    );
  }

  cargarMedia() {
    this._mediaService.getMediaById(this.idMedia).subscribe(
      res => {

        if (res) {
          console.log(res);
          // //seteamos los campos del form que vengan del objeto
          this.frmMedia.controls['id'].setValue(res._id);
          this.frmMedia.controls['titulo'].setValue(res.titulo);
          this.frmMedia.controls['tipo'].setValue(res.tipo);
          this.frmMedia.controls['imagen'].setValue(res.imagen);
          this.frmMedia.controls['director'].setValue(res.director);
          this.frmMedia.controls['anyo'].setValue(res.anyo);
          this.frmMedia.controls['genero'].setValue(res.genero);
          this.frmMedia.controls['puntuacion'].setValue(res.puntuacion);

          console.log(res.duracion);

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
          this.errorToast('El actor no existe')
          this._router.navigate(['/actores-crud']);
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

    console.log(cadena);
    if (cadena == "serie") {
      this.isPelicula = false
      this.isSerie = true

      if (this.frmMedia.contains('duracion')) {
        this.frmMedia.removeControl('duracion');
      }

      this.frmMedia.addControl('episodios', new FormControl('', [Validators.required, Validators.min(0), Validators.max(5000)]));

    } else if (cadena == "pelicula") {
      this.isSerie = false
      this.isPelicula = true

      if (this.frmMedia.contains('episodios')) {
        this.frmMedia.removeControl('episodios');
      }
      this.frmMedia.addControl('duracion', new FormControl('', [Validators.required, Validators.min(0), Validators.max(500)]));

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

        console.log(formData);
        this._mediaService.addMedia(formData).subscribe(
          res => {
            if (res) {
              this.success(`${formData.tipo} añadida correctamente`)
            } else {
              this.errorToast(`Fallo al añadir ${formData.tipo}`)
            }

            setTimeout(() => {
              this.frmMedia.reset(); //se resetea el formulario
              this._router.navigate(['/media-crud']);//cargar el crud
            }, 2500);
          }
        )



      } else {
        this.errorToast('Debes seleccionar minimo 3 actores')
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

        console.log(formData);

        const id = this.frmMedia.controls['id'].value;

        this._mediaService.updateMedia(formData, id).subscribe(
          res => {
            if (res) {
              this.success(`${formData.tipo} actualizada correctamente`)
            } else {
              this.errorToast(`Fallo al actualizar ${formData.tipo}`)
            }

            setTimeout(() => {
              this.frmMedia.reset(); //se resetea el formulario
              this._router.navigate(['/media-crud']);//cargar el crud
            }, 2500);
          }
        )
      } else {
        this.errorToast('Debes seleccionar minimo 3 actores')
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
