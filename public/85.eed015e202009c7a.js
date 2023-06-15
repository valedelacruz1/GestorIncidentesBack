"use strict";(self.webpackChunkGestorIncidentesFront=self.webpackChunkGestorIncidentesFront||[]).push([[85],{9085:(E,p,c)=>{c.r(p),c.d(p,{IncidentesModule:()=>S});var s=c(4755),r=c(9401),I=c(3440),h=c(4466),b=c(5503),m=c(2480),e=c(2223),Z=c(3144),_=c(2340),f=c(262),g=c(9646);let v=(()=>{class n{constructor(){this.baseUrl=_.N.baseUrl,this.http=(0,e.f3M)(Z.eN),this.ApiUrl="api/incidentes"}getIncidentes(){return this.http.get(`${this.baseUrl}/${this.ApiUrl}`).pipe((0,f.K)(i=>(0,g.of)(i.error.msg)))}getIncidentePorId(t){return this.http.get(`${this.baseUrl}/${this.ApiUrl}/${t}`).pipe((0,f.K)(i=>(0,g.of)(i.error.msg)))}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275prov=e.Yz7({token:n,factory:n.\u0275fac,providedIn:"root"}),n})();var T=c(430),A=c(3274),C=c(7978),U=c(1722);function M(n,o){if(1&n&&(e.TgZ(0,"option",18),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t.id),e.xp6(1),e.hij(" ",t.tinc_nombre," ")}}function q(n,o){if(1&n&&(e.TgZ(0,"option",18),e._uU(1),e.qZA()),2&n){const t=o.$implicit;e.Q6J("value",t.id),e.xp6(1),e.hij(" ",t.est_nombre," ")}}let O=(()=>{class n{constructor(){this.fb=(0,e.f3M)(r.qu),this.validatorService=(0,e.f3M)(C.S),this.TipoIncidentes=[],this.EstadoIncidentes=[],this.tipoIncidentesService=(0,e.f3M)(A.O),this.estadoIncidentesService=(0,e.f3M)(U.s),this.modalOff=new e.vpe,this.miFormulario=this.fb.group({nombre:["",[r.kI.required]],descripcion:["",[r.kI.required]],tipoIncidente:[0,[r.kI.required]],estadoIncidente:[0,[r.kI.required]],inc_usuario:[1,[r.kI.required]]})}ngOnInit(){this.obtenerIncidentes(),this.obtenerEstadoIncidentes()}ngOnChanges(t){if(0!==this.IncidenteInput.id){const{id:i,inc_nombre:d,inc_descripcion:a,inc_estadoIncidente:l,inc_tipoIncidente:J,inc_usuario:N}=this.IncidenteInput;this.miFormulario.setValue({id:i,nombre:d,descripcion:a,tipoIncidente:J,estadoIncidente:l,inc_usuario:N})}}obtenerIncidentes(){this.tipoIncidentesService.getTipoIncidentes().subscribe(({tipoIncidentesMy:t})=>{this.TipoIncidentes=t})}obtenerEstadoIncidentes(){this.estadoIncidentesService.getEstadoIncidentes().subscribe(({estadoIncidentesMy:t})=>{this.EstadoIncidentes=t})}onSubmit(){this.miFormulario.invalid?this.miFormulario.markAllAsTouched():console.log(this.miFormulario.value)}cerrarModal(){this.modalOff.emit(!1),this.miFormulario.reset()}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-incidenteModal"]],inputs:{IncidenteInput:"IncidenteInput"},outputs:{modalOff:"modalOff"},features:[e.TTD],decls:32,vars:4,consts:[["id","Modal","tabindex","-1","aria-labelledby","Modal","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["id","exampleModalLabel",1,"modal-title","fs-5"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close",3,"click"],[1,"modal-body"],["autocomplete","off",3,"formGroup","ngSubmit"],["for","nombre",1,"form-label"],["type","text","id","nombre","formControlName","nombre","required","",1,"form-control"],["for","correo",1,"form-label"],["type","text","id","descripcion","formControlName","descripcion","required","",1,"form-control"],["for","opciones"],["id","opciones","formControlName","tipoIncidente","required","",1,"form-select"],["value",""],[3,"value",4,"ngFor","ngForOf"],[1,"modal-footer"],["type","submit",1,"btn","btn-primary",3,"click"],[3,"value"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"h1",4),e._uU(5),e.qZA(),e.TgZ(6,"button",5),e.NdJ("click",function(){return i.cerrarModal()}),e.qZA()(),e.TgZ(7,"div",6)(8,"h2"),e._uU(9,"Formulario"),e.qZA(),e.TgZ(10,"form",7),e.NdJ("ngSubmit",function(){return i.onSubmit()}),e.TgZ(11,"label",8),e._uU(12,"Nombre Incidente:"),e.qZA(),e._UZ(13,"input",9),e.TgZ(14,"label",10),e._uU(15,"Descripcion:"),e.qZA(),e._UZ(16,"input",11),e.TgZ(17,"label",12),e._uU(18,"Tipo Incidente:"),e.qZA(),e.TgZ(19,"select",13)(20,"option",14),e._uU(21,"Seleccionar opci\xf3n"),e.qZA(),e.YNc(22,M,2,2,"option",15),e.qZA(),e.TgZ(23,"label",12),e._uU(24,"Estado Incidente:"),e.qZA(),e.TgZ(25,"select",13)(26,"option",14),e._uU(27,"Seleccionar opci\xf3n"),e.qZA(),e.YNc(28,q,2,2,"option",15),e.qZA()()(),e.TgZ(29,"div",16)(30,"button",17),e.NdJ("click",function(){return i.onSubmit()}),e._uU(31," Enviar Solicitud "),e.qZA()()()()()),2&t&&(e.xp6(5),e.hij(" ",i.IncidenteInput.inc_nombre," "),e.xp6(5),e.Q6J("formGroup",i.miFormulario),e.xp6(12),e.Q6J("ngForOf",i.TipoIncidentes),e.xp6(6),e.Q6J("ngForOf",i.EstadoIncidentes))},dependencies:[s.sg,r._Y,r.YN,r.Kr,r.Fj,r.EJ,r.JJ,r.JL,r.Q7,r.sg,r.u],styles:[".close-button[_ngcontent-%COMP%]{color:#aaa;float:right;font-size:28px;font-weight:700}.close-button[_ngcontent-%COMP%]:hover, .close-button[_ngcontent-%COMP%]:focus{color:#000;text-decoration:none;cursor:pointer}"]}),n})();function x(n,o){if(1&n){const t=e.EpF();e.TgZ(0,"tr")(1,"th",10),e._uU(2),e.qZA(),e.TgZ(3,"td"),e._uU(4),e.ALo(5,"titlecase"),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.qZA(),e.TgZ(8,"td"),e._uU(9),e.qZA(),e.TgZ(10,"td"),e._uU(11),e.qZA(),e.TgZ(12,"td"),e._uU(13),e.qZA(),e.TgZ(14,"td"),e._uU(15),e.ALo(16,"date"),e.qZA(),e.TgZ(17,"td")(18,"div",11)(19,"button",12),e.NdJ("click",function(){const a=e.CHM(t).$implicit,l=e.oxw();return e.KtG(l.editarIncidente(a))}),e._UZ(20,"i",13),e._uU(21," Editar "),e.qZA(),e.TgZ(22,"button",14),e.NdJ("click",function(){const a=e.CHM(t).$implicit,l=e.oxw();return e.KtG(l.eliminarIncidente(a))}),e._UZ(23,"i",15),e._uU(24," Eliminar "),e.qZA()()()()}if(2&n){const t=o.$implicit;e.xp6(2),e.Oqu(t.id),e.xp6(2),e.Oqu(e.lcZ(5,7,t.inc_nombre)),e.xp6(3),e.Oqu(t.inc_descripcion),e.xp6(2),e.Oqu(t.inc_usuarioId.nombre),e.xp6(2),e.Oqu(t.inc_tipoIncidenteId.tinc_nombre),e.xp6(2),e.Oqu(t.inc_estadoIncidenteId.est_nombre),e.xp6(2),e.Oqu(e.lcZ(16,9,t.createdAt))}}let u=(()=>{class n{constructor(){this.incidentes=[],this.incidentesMo=[],this.incidentesService=(0,e.f3M)(v),this.incidenteSeleccionado={id:0,inc_nombre:"",inc_descripcion:"",inc_estado:!1,inc_estadoIncidenteId:0,inc_usuarioId:0,inc_usuarioRevisionId:0,inc_tipoIncidenteId:0},this.modalOn=!1,this.obtenerIncidentes()}obtenerIncidentes(){this.incidentesService.getIncidentes().subscribe(({incidentesMy:t,incidentesMo:i})=>{t?this.incidentes=t:this.incidentesMo=i})}crearIncidente(){}editarIncidente(t){console.log("Clickeado editar",t.inc_descripcion),this.incidenteSeleccionado=t,this.modalOn=!0}eliminarIncidente(t){console.log("Clickeado editar",t.inc_descripcion)}onCloseModal(t){this.modalOn=t,this.incidenteSeleccionado={id:0,inc_nombre:"",inc_descripcion:"",inc_estado:!1,inc_estadoIncidente:0,inc_tipoIncidente:0,inc_usuario:0}}}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-listado"]],decls:29,vars:2,consts:[[1,"container-fluid","p-0","m-0"],[1,"row","d-flex","justify-content-around","m-0","p-0","animate__animated","animate__fadeIn"],[1,"col","p-2"],["type","button","data-bs-toggle","modal","data-bs-target","#Modal",1,"btn","btn-primary"],[1,"col","d-flex","justify-content-end","p-2"],[1,"table","table-bordered","table-hover","text-center","animate__animated","animate__fadeIn"],[1,"animate__animated","animate__fadeIn"],["scope","col"],[4,"ngFor","ngForOf"],[3,"IncidenteInput","modalOff"],["scope","row"],[1,"d-flex"],["type","button","data-bs-toggle","modal","data-bs-target","#Modal",1,"btn","btn-warning","btn-sm",3,"click"],["aria-hidden","true",1,"fa","fa-pencil"],["type","button",1,"btn","btn-danger","btn-sm",3,"click"],["aria-hidden","true",1,"fa","fa-trash-o"]],template:function(t,i){1&t&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"button",3)(4,"mat-icon"),e._uU(5,"add"),e.qZA()()(),e._UZ(6,"div",4),e.qZA(),e.TgZ(7,"table",5)(8,"thead")(9,"tr",6)(10,"th",7),e._uU(11,"#"),e.qZA(),e.TgZ(12,"th",7),e._uU(13,"inc_nombre"),e.qZA(),e.TgZ(14,"th",7),e._uU(15,"inc_descripcion"),e.qZA(),e.TgZ(16,"th",7),e._uU(17,"inc_usuario"),e.qZA(),e.TgZ(18,"th",7),e._uU(19,"inc_tipoIncidente"),e.qZA(),e.TgZ(20,"th",7),e._uU(21,"inc_estadoIncidente"),e.qZA(),e.TgZ(22,"th",7),e._uU(23,"Fecha Creacion"),e.qZA(),e.TgZ(24,"th",7),e._uU(25,"Acciones"),e.qZA()()(),e.TgZ(26,"tbody"),e.YNc(27,x,25,11,"tr",8),e.qZA()(),e.TgZ(28,"app-incidenteModal",9),e.NdJ("modalOff",function(a){return i.onCloseModal(a)}),e.qZA()()),2&t&&(e.xp6(27),e.Q6J("ngForOf",i.incidentes),e.xp6(1),e.Q6J("IncidenteInput",i.incidenteSeleccionado))},dependencies:[s.sg,T.Hw,O,s.rS,s.uU],styles:[".btn[_ngcontent-%COMP%]{margin-right:10px;display:flex;flex-direction:row;justify-content:center;align-items:center}.fa[_ngcontent-%COMP%]{margin-right:10px}"]}),n})();const y=[{path:"",component:u,children:[{path:"listado",component:u},{path:"agregar",component:(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275cmp=e.Xpm({type:n,selectors:[["app-agregar"]],decls:2,vars:0,template:function(t,i){1&t&&(e.TgZ(0,"p"),e._uU(1,"agregar works!"),e.qZA())}}),n})()},{path:"editar/:id",component:u},{path:"**",redirectTo:"listado"}]}];let F=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[m.Bz.forChild(y),m.Bz]}),n})(),S=(()=>{class n{}return n.\u0275fac=function(t){return new(t||n)},n.\u0275mod=e.oAB({type:n}),n.\u0275inj=e.cJS({imports:[s.ez,F,h.m,I.q,r.UX,b.D]}),n})()}}]);