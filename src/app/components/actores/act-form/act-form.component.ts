import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MaterialModule } from '../../../material/material/material.module';
import { ActorService } from '../../../services/actor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { CommonModule, DatePipe } from '@angular/common';
import { Actor } from '../../../interfaces';
import { PrimeNgModule } from '../../../prime-ng/prime-ng/prime-ng.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-act-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MaterialModule, CommonModule, PrimeNgModule, DatePipe, TranslateModule],
  providers: [MessageService, DatePipe],
  templateUrl: './act-form.component.html',
  styleUrl: './act-form.component.css'
})
export class ActFormComponent implements OnInit {

  public frmCrud!: FormGroup
  public idActor!: string

  public mensajeBienAdd = "Actor añadido correctamente"
  public mensajeMalAdd = "Fallo al añadir al actor"
  public mensajeBienUpd = "Actor actualizado correctamente"
  public mensajeMalUpd = "Fallo al actualizar al actor"
  public mensajeNo = "Este actor no existe"

  constructor(private fb: FormBuilder,
    public _actorService: ActorService,
    private _router: Router,
    private _activeRouter: ActivatedRoute,
    private messageService: MessageService,
   private datePipe: DatePipe
  ) { }

  public moviesActor: FormControl = new FormControl('', [Validators.required])

  ngOnInit(): void {

    this.frmCrud = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      nombre: ['Bryan Cranston', [Validators.required, Validators.minLength(7)]],
      biografia: ['Lorem ipsum es el texto que se usa habitualmente en diseño gráfico en demostraciones de tipografías o de borradores de diseño para probar el diseño visual antes de insertar el texto final', [Validators.required, Validators.minLength(20)]],
      imagen: ['https://image.tmdb.org/t/p/w500//kNyTXGkiSP8W4Gs60hF7UoxZnWN.jpg', [Validators.required]],
      nacionalidad: ['Inglaterra', Validators.required],
      fechaNacimiento: ['1982-09-19', [Validators.required, this.fechaNacimientoValidator]],
      actuaciones: this.fb.array([], [Validators.required, Validators.minLength(3)]),
    })

    this._activeRouter.params.subscribe(
      params => {
        this.idActor = params['id'];
        if (this.idActor) {
          this.cargarActor();
        }
      }
    );

    let lang = localStorage.getItem('selectedLang')
    if(lang === "en"){
      this.mensajeBienAdd = "Actor added correctly"
      this.mensajeMalAdd = "Failed to add actor"
      this.mensajeBienUpd = "Actor updated correctly"
      this.mensajeMalUpd = "Failed to update actor"
      this.mensajeNo = "This actor does not exists"
    }
  }

  minSelectedCheckboxes(min = 1) {

    //creamos un validador de tipo Abstract control
    const validator: ValidatorFn = (formArray: AbstractControl) => {
      
      if (!(formArray instanceof FormArray)) {
        throw new Error('minSelectedCheckboxes expects a FormArray');
      }
  
      const totalSelected = formArray.controls
        .map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }

  onAddMovie(): void {
    if (this.moviesActor.invalid) return
  
    const newMovie = this.moviesActor.value;
    this.actuaciones.push(this.fb.control(newMovie, Validators.required));
  
    this.moviesActor.reset()
  }
  
  onDeleteMovie(index: number): void {
    this.actuaciones.removeAt(index);
  }
  isValidFieldInArray(formArray: FormArray, index: number) {
    return formArray.controls[index].errors
      && formArray.controls[index].touched
  }


  /**
     * Grabar los datos que vienen del formulario
     */
  grabarDatos(): void {
    if (this.id.value == "") { //con el get this.frmCrud.controls['id']
      this.añadirActor();
    } else {
      this.actualizarActor();
    }

  }

  fechaNacimientoValidator(control: any) {
    const fechaNacimiento = new Date(control.value);
    const hoy = new Date();
    if (fechaNacimiento > hoy) {
      return { fechaNacimientoFutura: true };
    }
    return null;
  }

  añadirActor() {
    if(this.frmCrud.valid){
    
      this._actorService.addActor(this.frmCrud.value).subscribe(
        res => {
          if(res){
            this.success(this.mensajeBienAdd)
          }else{
            this.errorToast(this.mensajeMalAdd)
          }

          setTimeout(() => {
            this.frmCrud.reset(); //se resetea el formulario
           this._router.navigate(['/actores-crud']);//cargar el crud
          }, 2500);

          
        }
      )
    }
  }
  cargarActor() {
    this._actorService.getActorById(this.idActor).subscribe(
      res => {

        if (Object.keys(res).length > 0) {
          console.log(res);
          //seteamos los campos del form que vengan del objeto
          this.frmCrud.controls['id'].setValue(res._id);
           this.frmCrud.controls['nombre'].setValue(res.nombre);
           this.frmCrud.controls['biografia'].setValue(res.biografia);
           this.frmCrud.controls['imagen'].setValue(res.imagen);
           this.frmCrud.controls['nacionalidad'].setValue(res.nacionalidad);
            // this.frmCrud.controls['actuaciones'].setValue(res.actuaciones);
          let newFecha = this.datePipe.transform(res.fechaNacimiento, 'yyyy-MM-dd');
          this.frmCrud.controls['fechaNacimiento'].setValue(newFecha);


          this.actuaciones.clear();

          // cogemos la peliculas del actor y las vamos poniendo
          res.actuaciones.forEach(pelicula => {
            this.actuaciones.push(this.fb.control(pelicula, Validators.required));
          });

        } else {
          this.errorToast(this.mensajeNo)
          this._router.navigate(['/actores-crud']);
        }
      }
    )
  }

  actualizarActor() {
    
    const id = this.frmCrud.controls['id'].value;

    this._actorService.updateActor(this.frmCrud.value, id).subscribe(
      res => {

      
        if (res) {
          this.success(this.mensajeBienUpd);
          
        } else {
          this.errorToast(this.mensajeMalUpd);
        }

        setTimeout(() => {
          this.frmCrud.reset(); //se resetea el formulario
         this._router.navigate(['/actores-crud']);//cargar el crud
        }, 1500);
      }
    );
    
   
  }

  addActuacion() {
    this.actuaciones.push(this.fb.control('', Validators.required));
  }


  get id() {
    return this.frmCrud.get('id') as FormControl
  }
  get nombre() {
    return this.frmCrud.get('nombre') as FormControl
  }
  get biografia() {
    return this.frmCrud.get('biografia') as FormControl
  }
  get imagen() {
    return this.frmCrud.get('imagen') as FormControl
  }
  get nacionalidad() {
    return this.frmCrud.get('nacionalidad') as FormControl
  }
  get fechaNacimiento() {
    return this.frmCrud.get('fechaNacimiento') as FormControl
  }
  get actuaciones() {
    return this.frmCrud.get('actuaciones') as FormArray
  }

  success(message: string) {
    this.messageService.add({ severity: 'success', summary: 'Success', detail: message });
  }

  errorToast(message: string) {
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message });
  }
}
