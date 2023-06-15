"use strict";(self.webpackChunkGestorIncidentesFront=self.webpackChunkGestorIncidentesFront||[]).push([[906],{7906:(x,m,l)=>{l.r(m),l.d(m,{RolesModule:()=>y});var d=l(4755),i=l(9401),f=l(3440),b=l(4466),h=l(5503),u=l(2480),o=l(2223),g=l(3144),Z=l(2340);let _=(()=>{class t{constructor(){this.baseUrl=Z.N.baseUrl,this.http=(0,o.f3M)(g.eN),this.ApiUrl="api/roles"}getRoles(){return this.http.get(`${this.baseUrl}/${this.ApiUrl}`)}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275prov=o.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var v=l(430),C=l(7978);function A(t,r){if(1&t&&(o.TgZ(0,"h1",14),o._uU(1),o.qZA()),2&t){const e=o.oxw();o.xp6(1),o.hij(" Editar ",e.RoleInput.rol_nombre," ")}}let M=(()=>{class t{constructor(){this.fb=(0,o.f3M)(i.qu),this.validatorService=(0,o.f3M)(C.S),this.modalOff=new o.vpe,this.miFormulario=this.fb.group({id:[0],rol_nombre:["",[i.kI.required]],rol_descripcion:["",[i.kI.required]]})}ngOnChanges(e){if(0!==this.RoleInput.id){const{id:n,rol_nombre:a,rol_descripcion:s}=this.RoleInput;this.miFormulario.setValue({id:n,rol_nombre:a,rol_descripcion:s})}}onSubmit(){this.miFormulario.invalid?this.miFormulario.markAllAsTouched():console.log(this.miFormulario.value)}cerrarModal(){this.modalOff.emit(!1),this.miFormulario.reset()}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-roleModal"]],inputs:{RoleInput:"RoleInput"},outputs:{modalOff:"modalOff"},features:[o.TTD],decls:19,vars:2,consts:[["id","Modal","tabindex","-1","aria-labelledby","Modal","aria-hidden","true",1,"modal","fade"],[1,"modal-dialog"],[1,"modal-content"],[1,"modal-header"],["class","modal-title fs-5","id","exampleModalLabel",4,"ngIf"],["type","button","data-bs-dismiss","modal","aria-label","Close",1,"btn-close",3,"click"],[1,"modal-body"],["autocomplete","off",3,"formGroup","ngSubmit"],["for","nombre",1,"form-label"],["type","text","id","rol_nombre","formControlName","rol_nombre","required","",1,"form-control"],["for","descripcion",1,"form-label"],["type","text","id","rol_descripcion","formControlName","rol_descripcion","required","",1,"form-control"],[1,"modal-footer"],["type","submit",1,"btn","btn-primary",3,"click"],["id","exampleModalLabel",1,"modal-title","fs-5"]],template:function(e,n){1&e&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3),o.YNc(4,A,2,1,"h1",4),o.TgZ(5,"button",5),o.NdJ("click",function(){return n.cerrarModal()}),o.qZA()(),o.TgZ(6,"div",6)(7,"h2"),o._uU(8,"Formulario"),o.qZA(),o.TgZ(9,"form",7),o.NdJ("ngSubmit",function(){return n.onSubmit()}),o.TgZ(10,"label",8),o._uU(11,"Nombre Role:"),o.qZA(),o._UZ(12,"input",9),o.TgZ(13,"label",10),o._uU(14,"Descripcion:"),o.qZA(),o._UZ(15,"input",11),o.qZA()(),o.TgZ(16,"div",12)(17,"button",13),o.NdJ("click",function(){return n.onSubmit()}),o._uU(18," Enviar Solicitud "),o.qZA()()()()()),2&e&&(o.xp6(4),o.Q6J("ngIf",n.RoleInput),o.xp6(5),o.Q6J("formGroup",n.miFormulario))},dependencies:[d.O5,i._Y,i.Fj,i.JJ,i.JL,i.Q7,i.sg,i.u]}),t})();function T(t,r){if(1&t){const e=o.EpF();o.TgZ(0,"tr")(1,"th",9),o._uU(2),o.qZA(),o.TgZ(3,"td"),o._uU(4),o.ALo(5,"titlecase"),o.qZA(),o.TgZ(6,"td"),o._uU(7),o.qZA(),o.TgZ(8,"td"),o._uU(9),o.ALo(10,"date"),o.qZA(),o.TgZ(11,"td")(12,"div",10)(13,"button",11),o.NdJ("click",function(){const s=o.CHM(e).$implicit,c=o.oxw();return o.KtG(c.editarIncidente(s))}),o._UZ(14,"i",12),o._uU(15," Editar "),o.qZA(),o.TgZ(16,"button",13),o.NdJ("click",function(){const s=o.CHM(e).$implicit,c=o.oxw();return o.KtG(c.eliminarIncidente(s))}),o._UZ(17,"i",14),o._uU(18," Eliminar "),o.qZA()()()()}if(2&t){const e=r.$implicit;o.xp6(2),o.Oqu(e.id),o.xp6(2),o.Oqu(o.lcZ(5,4,e.rol_nombre)),o.xp6(3),o.Oqu(e.rol_descripcion),o.xp6(2),o.Oqu(o.lcZ(10,6,e.createdAt))}}let p=(()=>{class t{constructor(){this.roles=[],this.rolesMo=[],this.rolesService=(0,o.f3M)(_),this.roleSeleccionado={id:0,rol_nombre:"",rol_descripcion:"",rol_estado:!0,createdAt:new Date,updatedAt:new Date},this.modalOn=!1,this.obtenerRoles()}obtenerRoles(){this.rolesService.getRoles().subscribe(({rolesMy:e,rolesMo:n})=>{e?this.roles=e:this.rolesMo=n})}crearRole(){}editarIncidente(e){console.log("Clickeado editar",e.rol_nombre),this.roleSeleccionado=e}eliminarIncidente(e){console.log("Clickeado elimiar",e.rol_nombre),this.roleSeleccionado=e}onCloseModal(e){this.modalOn=e,this.roleSeleccionado={id:0,rol_nombre:"",rol_descripcion:"",rol_estado:!0,createdAt:new Date,updatedAt:new Date}}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=o.Xpm({type:t,selectors:[["app-listado"]],decls:23,vars:2,consts:[[1,"container-fluid","p-0","m-0"],[1,"row","d-flex","justify-content-around","m-0","p-0"],[1,"col","p-2"],["type","button","data-bs-toggle","modal","data-bs-target","#Modal",1,"btn","btn-primary","rounded-circle","btnCustom"],[1,"col","d-flex","justify-content-end","p-2"],[1,"table","table-bordered","table-hover","text-center"],["scope","col"],[4,"ngFor","ngForOf"],[3,"RoleInput","modalOff"],["scope","row"],[1,"d-flex","justify-content-center","align-content-center"],["type","button","data-bs-toggle","modal","data-bs-target","#Modal",1,"btn","btn-warning","btn-sm","me-1",3,"click"],["aria-hidden","true",1,"fa","fa-pencil"],["type","button",1,"btn","btn-danger","btn-sm","me-1",3,"click"],["aria-hidden","true",1,"fa","fa-trash-o"]],template:function(e,n){1&e&&(o.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"button",3)(4,"mat-icon"),o._uU(5,"add"),o.qZA()()(),o._UZ(6,"div",4),o.qZA(),o.TgZ(7,"table",5)(8,"thead")(9,"tr")(10,"th",6),o._uU(11,"#"),o.qZA(),o.TgZ(12,"th",6),o._uU(13,"rol_nombre"),o.qZA(),o.TgZ(14,"th",6),o._uU(15,"rol_descripcion"),o.qZA(),o.TgZ(16,"th",6),o._uU(17,"Fecha Creacion"),o.qZA(),o.TgZ(18,"th",6),o._uU(19,"Acciones"),o.qZA()()(),o.TgZ(20,"tbody"),o.YNc(21,T,19,8,"tr",7),o.qZA()(),o.TgZ(22,"app-roleModal",8),o.NdJ("modalOff",function(s){return n.onCloseModal(s)}),o.qZA()()),2&e&&(o.xp6(21),o.Q6J("ngForOf",n.roles),o.xp6(1),o.Q6J("RoleInput",n.roleSeleccionado))},dependencies:[d.sg,v.Hw,M,d.rS,d.uU],styles:[".btnCustom[_ngcontent-%COMP%]{margin-right:10px;display:flex;flex-direction:row;justify-content:center;align-items:center}"]}),t})();const R=[{path:"",component:p,children:[{path:"listado",component:p},{path:"**",redirectTo:"listado"}]}];let U=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[u.Bz.forChild(R),u.Bz]}),t})(),y=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=o.oAB({type:t}),t.\u0275inj=o.cJS({imports:[d.ez,U,b.m,f.q,i.UX,h.D]}),t})()}}]);