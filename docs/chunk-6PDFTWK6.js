import{b as A}from"./chunk-JJSDBTMF.js";import{A as T,F as k,b as c}from"./chunk-LNHBMWTA.js";import"./chunk-7B4WEPGY.js";import"./chunk-VK4RGVHF.js";import{g as C,i as S}from"./chunk-ROIV5QGY.js";import{$b as f,Cb as o,Db as n,Eb as v,Tc as g,Vb as s,Ya as d,Za as r,ac as p,ja as u,pb as l,xb as h}from"./chunk-VZFTKLKS.js";function y(a,i){a&1&&(o(0,"h1"),s(1,"Tu cuenta se acaba de activar"),n(),o(2,"h3"),s(3,"Redirigiendo al login..."),n())}function E(a,i){a&1&&(o(0,"h1"),s(1,"Tu cuenta se est\xE1 activando..."),n(),o(2,"h3"),s(3,"Espera unos segundos"),n())}var F=(()=>{let i=class i{constructor(e,t,m,x){this.router=e,this.activeRouter=t,this.authService=m,this.messageService=x,this.accActivated=!1,this.goodCheck="Cuenta activada exitosamente",this.badCheck="Error al activar la cuenta",this.token=""}ngOnInit(){this.activeRouter.params.subscribe(e=>{this.token=e.token,this.token&&this.activateAccount()})}activateAccount(){this.authService.activateAccount(this.token).subscribe({next:e=>{let t=e.message;console.log(t),t===this.goodCheck?(this.success("Cuenta activada correctamente."),this.accActivated=!0,setTimeout(()=>{this.router.navigateByUrl("/login")},3e3)):t===this.badCheck&&(this.errorToast(t),this.errorToast("No modifiques el token de la url..."),setTimeout(()=>{this.router.navigateByUrl("/login")},3e3))},error:e=>{this.errorToast(e)}})}success(e){this.messageService.add({severity:"success",summary:"Success",detail:e,life:3e3})}errorToast(e){this.messageService.add({severity:"error",summary:"Error",detail:e,life:3e3})}};i.\u0275fac=function(t){return new(t||i)(r(S),r(C),r(A),r(c))},i.\u0275cmp=u({type:i,selectors:[["app-activate-account"]],standalone:!0,features:[f([c]),p],decls:4,vars:1,consts:[[1,"container"]],template:function(t,m){t&1&&(o(0,"div",0),v(1,"p-toast"),l(2,y,4,0)(3,E,4,0),n()),t&2&&(d(2),h(2,m.accActivated?2:3))},dependencies:[k,T,g],styles:[".container[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%], h3[_ngcontent-%COMP%]{text-align:center}"]});let a=i;return a})();export{F as ActivateAccountComponent};
