"use strict";(self.webpackChunkGestorIncidentesFront=self.webpackChunkGestorIncidentesFront||[]).push([[592],{1722:(l,o,e)=>{e.d(o,{s:()=>c});var i=e(3144),a=e(2223),r=e(2340);let c=(()=>{class t{constructor(){this.baseUrl=r.N.baseUrl,this.http=(0,a.f3M)(i.eN),this.ApiUrl="api/estadoIncidentes"}getEstadoIncidentes(){return this.http.get(`${this.baseUrl}/${this.ApiUrl}`)}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},7978:(l,o,e)=>{e.d(o,{S:()=>a});var i=e(2223);let a=(()=>{class r{constructor(){this.firstNameAndLastnamePattern="([a-zA-Z]+) ([a-zA-Z]+)",this.emailPattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",this.cantBeUsed=t=>"strider"===t.value.trim().toLowerCase()?{noStrider:!0}:null}isValidField(t,n){return t.controls[n].errors&&t.controls[n].touched}isFieldOneEqualFieldTwo(t,n){return s=>{const _=s.get(t)?.value,u=s.get(n)?.value;return _!==u?(s.get(n)?.setErrors({notEqual:!0}),{notEqual:!0}):(s.get(n)?.setErrors(null),null)}}}return r.\u0275fac=function(t){return new(t||r)},r.\u0275prov=i.Yz7({token:r,factory:r.\u0275fac,providedIn:"root"}),r})()},3274:(l,o,e)=>{e.d(o,{O:()=>c});var i=e(3144),a=e(2223),r=e(2340);let c=(()=>{class t{constructor(){this.baseUrl=r.N.baseUrl,this.http=(0,a.f3M)(i.eN),this.ApiUrl="api/tipoIncidentes"}getTipoIncidentes(){return this.http.get(`${this.baseUrl}/${this.ApiUrl}`)}}return t.\u0275fac=function(s){return new(s||t)},t.\u0275prov=a.Yz7({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()}}]);