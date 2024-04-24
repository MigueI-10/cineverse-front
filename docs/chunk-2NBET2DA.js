import{a as h}from"./chunk-VK4RGVHF.js";import{a as s,b as d}from"./chunk-ROIV5QGY.js";import{D as o,_ as p,da as u,n as r,r as i}from"./chunk-VZFTKLKS.js";var $=(()=>{let a=class a{constructor(e){this.http=e,this.urlBackEnd=h.baseUrl}getAllMedia(){return this.http.get(this.urlBackEnd+"/media").pipe(o(e=>(console.log("Error al obtener la lista de peliculas. "+e),r([]))))}getPeliculas(){return this.http.get(this.urlBackEnd+"/media/films").pipe(o(e=>(console.log("Error al obtener la lista de peliculas. "+e),r([]))))}getSeries(){return this.http.get(this.urlBackEnd+"/media/series").pipe(o(e=>(console.log("Error al obtener la lista de series. "+e),r([]))))}addMedia(e){let t=localStorage.getItem("token"),n=new s().set("Authorization",`Bearer ${t}`);return this.http.post(`${this.urlBackEnd}/media`,e,{headers:n}).pipe(i(()=>!0),o(l=>(console.log(l),r(!1))))}delMedia(e){let t=localStorage.getItem("token"),n=new s().set("Authorization",`Bearer ${t}`);return this.http.delete(`${this.urlBackEnd}/media/${e}`,{headers:n}).pipe(i(()=>!0),o(l=>(console.log("Error al eliminar media. "+l),r(!1))))}updateMedia(e,t){let n=localStorage.getItem("token"),l=new s().set("Authorization",`Bearer ${n}`);return this.http.patch(`${this.urlBackEnd}/media/${t}`,e,{headers:l}).pipe(i(()=>!0),o(m=>(console.log("Error al hacer update a la media. "+m),r(!1))))}getMediaById(e){return this.http.get(this.urlBackEnd+"/media/"+e).pipe(i(t=>t),o(t=>(console.log("Error al obtener el objeto media. "+t),r({}))))}getCommentsOfAFilm(e){return this.http.get(`${this.urlBackEnd}/media/${e}/comments`).pipe(i(t=>t),o(t=>(console.log("Error al obtener los comentarios. "+t),r([]))))}getSearchResults(e){return this.http.get(`${this.urlBackEnd}/media/search`,{params:e}).pipe(o(t=>(console.log("Error al obtener la lista de peliculas. "+t),r([]))))}};a.\u0275fac=function(t){return new(t||a)(u(d))},a.\u0275prov=p({token:a,factory:a.\u0275fac,providedIn:"root"});let c=a;return c})();export{$ as a};
