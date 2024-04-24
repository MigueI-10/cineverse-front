import{a as ne}from"./chunk-NO5I7SPA.js";import{b as Y,c as $,d as ee,e as te,f as ie,g as re,h as oe,z as ae}from"./chunk-MG4W3XTZ.js";import{A as J,F as Q,b as A,e as P,f as m,h as z,i as j,k as E,m as G,o as B,p as R,q as O,r as W,v as K,w as U,x as X,y as Z,z as H}from"./chunk-LNHBMWTA.js";import"./chunk-7B4WEPGY.js";import"./chunk-VK4RGVHF.js";import{g as k,i as L}from"./chunk-ROIV5QGY.js";import{$b as I,Cb as o,Db as i,Eb as d,Ib as x,Kb as C,Lb as S,Mc as V,Rc as _,Sc as D,Tc as w,Vb as a,Ya as c,Za as f,ac as M,hc as q,ic as T,ja as F,pb as s,rb as h,sa as y,ta as N,xb as u}from"./chunk-VZFTKLKS.js";function le(r,n){r&1&&a(0," A\xF1adir Actor ")}function me(r,n){r&1&&a(0," Actualizar Actor ")}function ce(r,n){r&1&&(o(0,"mat-error",6),a(1,"El nombre es obligatorio"),i())}function de(r,n){r&1&&(o(0,"mat-error",6),a(1,"Minimo 7 letras"),i())}function se(r,n){r&1&&(o(0,"mat-error",6),a(1,"La biografia es obligatoria"),i())}function ue(r,n){r&1&&(o(0,"mat-error",6),a(1,"Minimo 20 caracteres"),i())}function fe(r,n){r&1&&(o(0,"mat-error",6),a(1,"La imagen es obligatoria"),i())}function pe(r,n){r&1&&(o(0,"mat-error",6),a(1,"La nacionalidad es requerida"),i())}function he(r,n){r&1&&(o(0,"span",23),a(1,"Este campo es requerido"),i())}function ge(r,n){if(r&1){let g=x();o(0,"div",13)(1,"div",14),d(2,"input",21),o(3,"button",22),C("click",function(){let l=y(g).index,t=S();return N(t.onDeleteMovie(l))}),a(4,"Eliminar"),i()(),s(5,he,2,0,"span",23),i()}if(r&2){let g=n.index,e=S();c(2),h("formControlName",g)("disabled",!0),c(3),u(5,e.isValidFieldInArray(e.actuaciones,g)?5:-1)}}function be(r,n){r&1&&(o(0,"mat-error",6),a(1,"La fecha de nacimiento es obligatoria"),i())}function ve(r,n){r&1&&(o(0,"mat-error",6),a(1,"Formato invalido"),i())}var Le=(()=>{let n=class n{constructor(e,l,t,b,p,v){this.fb=e,this._actorService=l,this._router=t,this._activeRouter=b,this.messageService=p,this.datePipe=v,this.moviesActor=new E("",[m.required])}ngOnInit(){this.frmCrud=this.fb.group({id:new E({value:"",disabled:!0}),nombre:["Bryan Cranston",[m.required,m.minLength(7)]],biografia:["Lorem ipsum es el texto que se usa habitualmente en dise\xF1o gr\xE1fico en demostraciones de tipograf\xEDas o de borradores de dise\xF1o para probar el dise\xF1o visual antes de insertar el texto final",[m.required,m.minLength(20)]],imagen:["https://image.tmdb.org/t/p/w500//kNyTXGkiSP8W4Gs60hF7UoxZnWN.jpg",[m.required]],nacionalidad:["Inglaterra",m.required],fechaNacimiento:["1982-09-19",[m.required,this.fechaNacimientoValidator]],actuaciones:this.fb.array([],[m.required,m.minLength(3)])}),this._activeRouter.params.subscribe(e=>{this.idActor=e.id,this.idActor&&this.cargarActor()})}minSelectedCheckboxes(e=1){return t=>{if(!(t instanceof U))throw new Error("minSelectedCheckboxes expects a FormArray");return t.controls.map(p=>p.value).reduce((p,v)=>v?p+v:p,0)>=e?null:{required:!0}}}onAddMovie(){if(this.moviesActor.invalid)return;let e=this.moviesActor.value;this.actuaciones.push(this.fb.control(e,m.required)),this.moviesActor.reset()}onDeleteMovie(e){this.actuaciones.removeAt(e)}isValidFieldInArray(e,l){return e.controls[l].errors&&e.controls[l].touched}grabarDatos(){this.id.value==""?this.a\u00F1adirActor():this.actualizarActor()}fechaNacimientoValidator(e){return new Date(e.value)>new Date?{fechaNacimientoFutura:!0}:null}a\u00F1adirActor(){this.frmCrud.valid&&this._actorService.addActor(this.frmCrud.value).subscribe(e=>{e?this.success("Actor a\xF1adido correctamente"):this.errorToast("Fallo al a\xF1adir el actor"),setTimeout(()=>{this.frmCrud.reset(),this._router.navigate(["/actores-crud"])},2500)})}cargarActor(){this._actorService.getActorById(this.idActor).subscribe(e=>{if(e){console.log(e),this.frmCrud.controls.id.setValue(e._id),this.frmCrud.controls.nombre.setValue(e.nombre),this.frmCrud.controls.biografia.setValue(e.biografia),this.frmCrud.controls.imagen.setValue(e.imagen),this.frmCrud.controls.nacionalidad.setValue(e.nacionalidad);let l=this.datePipe.transform(e.fechaNacimiento,"yyyy-MM-dd");this.frmCrud.controls.fechaNacimiento.setValue(l),this.actuaciones.clear(),e.actuaciones.forEach(t=>{this.actuaciones.push(this.fb.control(t,m.required))})}else this.errorToast("El actor no existe"),this._router.navigate(["/actores-crud"])})}actualizarActor(){let e=this.frmCrud.controls.id.value;this._actorService.updateActor(this.frmCrud.value,e).subscribe(l=>{console.log(l),l?this.success("El cliente ha sido actualizado"):this.errorToast("El cliente no ha sido actualizado"),setTimeout(()=>{this.frmCrud.reset(),this._router.navigate(["/actores-crud"])},1500)})}addActuacion(){this.actuaciones.push(this.fb.control("",m.required))}get id(){return this.frmCrud.get("id")}get nombre(){return this.frmCrud.get("nombre")}get biografia(){return this.frmCrud.get("biografia")}get imagen(){return this.frmCrud.get("imagen")}get nacionalidad(){return this.frmCrud.get("nacionalidad")}get fechaNacimiento(){return this.frmCrud.get("fechaNacimiento")}get actuaciones(){return this.frmCrud.get("actuaciones")}success(e){this.messageService.add({severity:"success",summary:"Success",detail:e})}errorToast(e){this.messageService.add({severity:"error",summary:"Error",detail:e})}};n.\u0275fac=function(l){return new(l||n)(f(X),f(ne),f(L),f(k),f(A),f(_))},n.\u0275cmp=F({type:n,selectors:[["app-act-form"]],standalone:!0,features:[I([A,_]),M],decls:59,vars:12,consts:[[1,"grid"],[1,"col-12","sm:col-6"],[3,"submit","formGroup"],[1,"m-2","col-12"],["matInput","","formControlName","id"],["type","text","matInput","","placeholder","Introduzca nombre y apellidos","formControlName","nombre","required",""],[1,"text-danger","font-italic"],["type","text","matInput","","placeholder","Introduzca su biografia","formControlName","biografia","required",""],["type","text","matInput","","placeholder","Imagen del Actor","formControlName","imagen","required",""],["type","text","matInput","","placeholder","Nacionalidad","formControlName","nacionalidad","required",""],[1,"mb-3","row"],[1,"col-sm-3","col-form-label"],[1,"col-sm-9"],[1,"mb-1"],[1,"input-group"],["placeholder","Agregar pel\xEDcula",1,"form-control",3,"formControl"],["type","button",1,"btn","btn-outline-primary",3,"click"],["formArrayName","actuaciones",1,"col-sm-9"],["class","mb-1",4,"ngFor","ngForOf"],["type","date","matInput","","placeholder","fechaNacimiento","formControlName","fechaNacimiento","required",""],["mat-flat-button","","color","primary",3,"disabled"],[1,"form-control",3,"formControlName","disabled"],["type","button",1,"btn","btn-outline-danger",3,"click"],[1,"form-text","text-danger"]],template:function(l,t){l&1&&(o(0,"h1"),s(1,le,1,0)(2,me,1,0),i(),o(3,"div",0)(4,"div",1)(5,"mat-card-content"),d(6,"p-toast"),o(7,"form",2),C("submit",function(){return t.grabarDatos()}),o(8,"mat-form-field",3)(9,"mat-label"),a(10,"Id"),i(),d(11,"input",4),i(),o(12,"mat-form-field",3)(13,"mat-label"),a(14,"Nombre y Apellidos"),i(),d(15,"input",5),s(16,ce,2,0,"mat-error",6)(17,de,2,0),i(),o(18,"mat-form-field",3)(19,"mat-label"),a(20,"Biografia"),i(),d(21,"input",7),s(22,se,2,0,"mat-error",6)(23,ue,2,0),i(),o(24,"mat-form-field",3)(25,"mat-label"),a(26,"Introduzca la imagen"),i(),d(27,"input",8),s(28,fe,2,0,"mat-error",6),i(),o(29,"mat-form-field",3)(30,"mat-label"),a(31,"Introduce la nacionalidad"),i(),d(32,"input",9),s(33,pe,2,0,"mat-error",6),i(),o(34,"div",10)(35,"label",11),a(36,"Agrega 3 pel\xEDculas"),i(),o(37,"div",12)(38,"div",13)(39,"div",14),d(40,"input",15),o(41,"button",16),C("click",function(){return t.onAddMovie()}),a(42,"Agregar pel\xEDcula"),i()()()()(),o(43,"div",10)(44,"label",11),a(45,"Pel\xEDculas"),i(),o(46,"div",17),s(47,ge,6,3,"div",18),q(48,"keyvalue"),i()(),o(49,"mat-form-field",3)(50,"mat-label"),a(51,"Introduce la fecha de nacimiento"),i(),d(52,"input",19),s(53,be,2,0,"mat-error",6)(54,ve,2,0),i(),o(55,"button",20)(56,"mat-icon"),a(57,"save"),i(),a(58," Grabar "),i()()()()()),l&2&&(c(),u(1,t.idActor?2:1),c(6),h("formGroup",t.frmCrud),c(9),u(16,t.nombre.errors!=null&&t.nombre.errors.required?16:t.nombre.errors!=null&&t.nombre.errors.minlength?17:-1),c(6),u(22,t.biografia.errors!=null&&t.biografia.errors.required?22:t.biografia.errors!=null&&t.biografia.errors.minlength?23:-1),c(6),u(28,t.imagen.errors!=null&&t.imagen.errors.required&&t.imagen.dirty?28:-1),c(5),u(33,t.nacionalidad.errors!=null&&t.nacionalidad.errors.required&&t.nacionalidad.dirty?33:-1),c(7),h("formControl",t.moviesActor),c(7),h("ngForOf",T(48,10,t.actuaciones.controls)),c(6),u(53,t.fechaNacimiento.errors!=null&&t.fechaNacimiento.errors.required?53:t.fechaNacimiento.errors!=null&&t.fechaNacimiento.errors.fechaNacimientoFutura?54:-1),c(2),h("disabled",t.frmCrud.invalid))},dependencies:[Z,G,P,z,j,K,H,B,R,W,O,ae,ee,Y,$,te,ie,re,oe,w,V,D,Q,J]});let r=n;return r})();export{Le as ActFormComponent};
