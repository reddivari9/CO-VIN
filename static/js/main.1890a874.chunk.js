(this.webpackJsonpcovid_slots=this.webpackJsonpcovid_slots||[]).push([[0],{139:function(e,t,c){},142:function(e,t){},144:function(e,t){},151:function(e,t,c){},152:function(e,t,c){},160:function(e,t){},162:function(e,t){},189:function(e,t){},191:function(e,t){},192:function(e,t){},197:function(e,t){},199:function(e,t){},218:function(e,t){},230:function(e,t){},233:function(e,t){},263:function(e,t,c){"use strict";c.r(t);var n=c(1),a=c.n(n),i=c(132),s=c.n(i),l=(c(139),c(20)),r=c(50),o=c(5),j=c(42),d=c(6),b=c(32),u=c.n(b),h=c(18),O=c.n(h),v=c(0),f=function(e){return Object(v.jsxs)("div",{className:"row border-line",children:[Object(v.jsx)("div",{className:"updated-time",children:O()().format("HH:MM:SS")}),Object(v.jsxs)("div",{className:"column",children:[Object(v.jsxs)("div",{className:"row",children:[Object(v.jsx)("div",{children:e.date}),Object(v.jsx)("div",{children:e.vaccine}),Object(v.jsxs)("div",{children:["Dose 1:"," ",Object(v.jsx)("span",{className:e.available_capacity_dose1>0?"green":"red",children:e.available_capacity_dose1})]}),Object(v.jsxs)("div",{children:["Dose 2:"," ",Object(v.jsx)("span",{className:e.available_capacity_dose2>0?"green":"red",children:e.available_capacity_dose2})]})]}),Object(v.jsxs)("div",{className:"row",children:[Object(v.jsx)("div",{children:e.name}),Object(v.jsx)("div",{children:e.pincode}),Object(v.jsx)("div",{children:e.district_name})]})]})]})};var x=function(e){var t=e.loading,c=e.slotsList18,n=e.slotsList45,a=e.availableSlots18,i=e.availableSlots45,s=e.age,l=e.dose;return Object(v.jsxs)("div",{style:{display:"flex",flexDirection:45===s?"column-reverse":"column"},children:[Object(v.jsxs)("div",{className:"App-header",children:[Object(v.jsxs)("div",{className:"available-container",children:[Object(v.jsxs)("h2",{className:"title",children:["Slots Available (18+) Dose ",l]}),0===a.length?Object(v.jsx)("div",{className:"loader",children:"No slots available"}):Object(v.jsx)("div",{children:a.map(f)})]}),Object(v.jsxs)("div",{className:"all-centers-container",children:[Object(v.jsx)("h2",{className:"title",children:"Centers (18+)"}),t?Object(v.jsx)("div",{className:"loader",children:"Fetching data..."}):0===c.length?Object(v.jsx)("div",{className:"loader",children:"No Centers available"}):Object(v.jsx)("div",{children:c.map(f)})]})]}),Object(v.jsxs)("div",{className:"App-header",children:[Object(v.jsxs)("div",{className:"available-container",children:[Object(v.jsx)("h2",{className:"title",children:"Slots Available (45+)"}),0===i.length?Object(v.jsx)("div",{className:"loader",children:"No slots available"}):Object(v.jsx)("div",{children:i.map(f)})]}),Object(v.jsxs)("div",{className:"all-centers-container",children:[Object(v.jsx)("h2",{className:"title",children:"Centers (45+)"}),t?Object(v.jsx)("div",{className:"loader",children:"Fetching data..."}):0===n.length?Object(v.jsx)("div",{className:"loader",children:"No Centers available"}):Object(v.jsx)("div",{children:n.map(f)})]})]})]})},p=c(134),m=c(51);c(151);var g=function(e){var t=e.className,c=void 0===t?"":t,n=e.varient,a=void 0===n?"regular":n,i=e.children,s=e.label,o=Object(r.a)(e,["className","varient","children","label"]);return Object(v.jsx)("button",Object(l.a)(Object(l.a)({class:"button -".concat(a," center ").concat(c)},o),{},{children:i||s}))},N=function(e){return Object(v.jsxs)("div",{className:"row border-line",children:[Object(v.jsx)("div",{className:"updated-time",children:O()().format("HH:MM:SS")}),Object(v.jsxs)("div",{className:"column",children:[Object(v.jsxs)("div",{className:"row",children:[Object(v.jsx)("div",{children:e.date}),Object(v.jsx)("div",{children:e.vaccine}),Object(v.jsxs)("div",{children:["Dose 1:"," ",Object(v.jsx)("span",{className:e.available_capacity_dose1>0?"green":"red",children:e.available_capacity_dose1})]}),Object(v.jsxs)("div",{children:["Dose 2:"," ",Object(v.jsx)("span",{className:e.available_capacity_dose2>0?"green":"red",children:e.available_capacity_dose2})]})]}),Object(v.jsxs)("div",{className:"row",children:[Object(v.jsx)("div",{children:e.name}),Object(v.jsx)("div",{children:e.pincode}),Object(v.jsx)("div",{children:e.district_name})]})]})]})},S=function(e){var t=u.a.getVoiceByName("Alex"),c=new u.a({voice:t,pitch:1,rate:1});c.cancel(),c.write(e)};var y=function(e){var t=e.availableSlots18,c=e.availableSlots45,a=e.token,i=e.setToken,s=e.age,l=e.dose,r=Object(n.useState)([]),j=Object(o.a)(r,2),d=j[0],b=j[1],u=Object(n.useState)([]),h=Object(o.a)(u,2),f=h[0],x=h[1],y=Object(n.useState)(!1),_=Object(o.a)(y,2),k=_[0],w=_[1],C=Object(n.useState)(!1),I=Object(o.a)(C,2),A=(I[0],I[1]),D=Object(n.useState)(null),L=Object(o.a)(D,2),E=(L[0],L[1]),B=Object(n.useState)(null),Y=Object(o.a)(B,2),T=Y[0],M=Y[1],H=Object(n.useState)(""),P=Object(o.a)(H,2),V=P[0],F=P[1],J=Object(n.useState)({}),z=Object(o.a)(J,2),R=z[0],U=z[1],X=Object(n.useState)(!1),q=Object(o.a)(X,2),G=q[0],K=q[1],Q=Object(n.useState)([]),W=Object(o.a)(Q,2),Z=W[0],$=W[1];Object(n.useEffect)((function(){te();var e=setInterval((function(){te()}),6e5);return function(){clearTimeout(e)}}),[]),Object(n.useEffect)((function(){x([]),w(!1)}),[s]),Object(n.useEffect)((function(){18===s&&$(t),45===s&&$(c)}),[t,c]),Object(n.useEffect)((function(){if(Z.length>0&&f.length&&k){var e=!1;Z.forEach((function(t){t.available_capacity>=f.length&&!e&&!G&&(e=!0,U(t),ee(t),K(!0))}))}}),[Z]),Object(n.useEffect)((function(){te()}),[a]);var ee=function(){fetch("https://cdn-api.co-vin.in/api/v2/auth/getRecaptcha",{headers:{authorization:"Bearer "+a},mode:"cors",method:"POST"}).then((function(e){return e.json()})).then((function(e){if(e.captcha){var t=e.captcha.replace(/\\/gi);document.querySelector(".captcha-svg").innerHTML=t}})).catch((function(e){console.log(e)}))},te=function(){a&&fetch("https://cdn-api.co-vin.in/api/v2/appointment/beneficiaries",{headers:{authorization:"Bearer "+a}}).then((function(e){return e.json()})).then((function(e){M(null),b(e.beneficiaries)})).catch((function(e){console.log(e),i(null),S("Session expired")}))},ce=function(e){if(a||0!==f.length){var t=O()().format("DD-MM-YYYY"),c=O()(t).isSame(e.date,"day"),n=0;c&&(n=function(){var e=parseInt(O()().format("HH")),t=0;return e<=7?t=0:e<=9?t=1:e<=11?t=2:e<=12&&(t=3),t}()),A(!0),fetch("https://cdn-api.co-vin.in/api/v2/appointment/schedule",{method:"POST",headers:{"content-type":"application/json",Authorization:"Bearer "+a},mode:"cors",body:JSON.stringify({dose:l,session_id:e.session_id,center_id:e.center_id,slot:e.slots[n],beneficiaries:f,captcha:V})}).then((function(e){return e.json()})).then((function(t){t.error?("Please enter valid security code"===t.error&&(ee(),F("")),S(t.error||"Oops! Something went wrong. Please try again."),M({type:"error",msg:t.error})):(E(t),x([]),M({type:"success",msg:"Your booking is successfully completed"}),S("Your booking is successfully completed for "+e.date+" on "+e.slots[n]),document.querySelector(".captcha-svg").innerHTML="",F(""))})).catch((function(e){return console.log(e)})).finally((function(){M({type:"error",msg:"Oops!! Something went wrong please try again"}),F(""),A(!1),te(),w(!1),K(!1)}))}},ne=function(e){0!==f.length?w(e):w(!1)};return Object(v.jsxs)(v.Fragment,{children:[T&&Object(v.jsx)("div",{className:"banner ".concat(T.type),children:T.msg}),Object(v.jsxs)("div",{className:"App-header",children:[Object(v.jsxs)("div",{className:"available-container",children:[Object(v.jsxs)("h2",{className:"title",children:["Slots Available (",s,"+)"]}),0===Z.length?Object(v.jsx)("div",{className:"loader",children:"No slots available"}):Object(v.jsx)("div",{children:Z.map(N)})]}),Object(v.jsxs)("div",{className:"all-centers-container",children:[Object(v.jsx)("h2",{className:"title",children:"Beneficiary Details"}),a?Object(v.jsxs)("div",{style:{padding:10},children:[Object(v.jsxs)("div",{children:[f.length," Selected"," "]}),d.map((function(e){var t=parseInt(O()().format("YYYY"))-parseInt(e.birth_year);return 18===s&&t>=45||45===s&&t<45?null:Object(v.jsxs)("div",{className:"row border-line be-info",children:[Object(v.jsx)("div",{children:Object(v.jsx)("input",{disabled:k,type:"checkbox",onChange:function(t){return function(e,t){var c=Object(m.a)(f);e.target.checked?(c.push(t.beneficiary_reference_id),c=Object(m.a)(Object(p.a)(Array,Object(m.a)(new Set(c))))):c=c.filter((function(e){return t.beneficiary_reference_id!==e})),x(c)}(t,e)},checked:-1!==f.indexOf(e.beneficiary_reference_id)})}),Object(v.jsx)("div",{children:e.name}),Object(v.jsx)("div",{children:t}),Object(v.jsxs)("div",{children:[e.appointments.length," ","appointments"]})]})})),Object(v.jsxs)("div",{className:"row",children:[Object(v.jsx)(g,{label:"Start Auto Book",onClick:function(){ne(!0)}}),Object(v.jsx)(g,{label:"cancel",onClick:function(){ne(!1)}})]}),Object(v.jsx)("div",{children:k?"Please wait until you receive Captcha ones slots available.":"Please select Beneficiary's and click on 'Start Auto Book' Button"}),Object(v.jsxs)("div",{className:"captcha",children:[Object(v.jsxs)("div",{className:"black",children:["Enter captcha ones you receive it",Object(v.jsx)("br",{}),"Note: Captcha will be available if you select Beneficiary's and click on 'Start Auto Book' Button and ones slots are available"]}),Object(v.jsxs)("div",{className:"row",children:[Object(v.jsx)("div",{className:"captcha-svg"}),Object(v.jsx)("input",{onChange:function(e){F(e.target.value)},value:V}),Object(v.jsx)(g,{label:"Submit & book now",onClick:function(){ce(R)}})]})]})]}):Object(v.jsx)("div",{className:"loader error",children:"Please Login"})]})]})]})};c(152);var _=function(e){var t=e.token,c=e.setDistrictId,a=Object(n.useState)(16),i=Object(o.a)(a,2),s=i[0],l=i[1],r=Object(n.useState)(null),j=Object(o.a)(r,2),d=j[0],b=j[1],u=Object(n.useState)([]),h=Object(o.a)(u,2),O=h[0],f=h[1],x=Object(n.useState)([]),p=Object(o.a)(x,2),m=p[0],g=p[1];Object(n.useEffect)((function(){N()}),[]),Object(n.useEffect)((function(){S()}),[s]),Object(n.useEffect)((function(){d?c(d):(l(16),b(194))}),[d]);var N=function(){fetch("https://cdn-api.co-vin.in/api/v2/admin/location/states").then((function(e){return e.json()})).then((function(e){e.states&&(f(e.states),16!==s||d||b(294))})).catch((function(e){return console.log(e)}))},S=function(){s&&fetch("https://cdn-api.co-vin.in/api/v2/admin/location/districts/"+s,{headers:{"content-type":"application/json",Authorization:"Bearer "+t},mode:"cors"}).then((function(e){return e.json()})).then((function(e){e.districts&&(g(e.districts),b(16!==s||d?e.districts[0].district_id:294))})).catch((function(e){return console.log(e)}))};return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("div",{children:[Object(v.jsx)("label",{className:"input-label",children:"State"}),Object(v.jsx)("select",{value:s,onChange:function(e){return l(e.target.value)},children:O.map((function(e){return Object(v.jsx)("option",{value:e.state_id,children:e.state_name})}))})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("label",{className:"input-label",children:"District"}),Object(v.jsx)("select",{value:d,onChange:function(e){b(e.target.value)},children:m.map((function(e){return Object(v.jsx)("option",{value:e.district_id,children:e.district_name})}))})]})]})},k=c(78),w=c.n(k);var C=function(e){var t=e.setToken,c=Object(n.useState)(null),a=Object(o.a)(c,2),i=a[0],s=a[1],r=Object(n.useState)(null),j=Object(o.a)(r,2),d=j[0],b=j[1],u=Object(n.useState)({}),h=Object(o.a)(u,2),O=h[0],f=h[1];return Object(v.jsxs)("div",{children:[!O.txnId&&Object(v.jsxs)("div",{className:"row login",children:[Object(v.jsx)("div",{className:"input-label black",children:"Mobile No. "}),Object(v.jsx)("div",{children:Object(v.jsx)("input",{type:"tel",value:i,name:"mobile",onChange:function(e){return s(e.target.value)}})}),Object(v.jsx)("div",{children:Object(v.jsx)(g,{label:"Submit",onClick:function(){i&&fetch("https://cdn-api.co-vin.in/api/v2/auth/generateMobileOTP",{body:JSON.stringify({mobile:i,secret:"U2FsdGVkX1/3I5UgN1RozGJtexc1kfsaCKPadSux9LY+cVUADlIDuKn0wCN+Y8iB4ceu6gFxNQ5cCfjm1BsmRQ=="}),headers:{"content-type":"application/json"},method:"POST",mode:"cors",credentials:"omit"}).then((function(e){return e.json()})).then((function(e){f({txnId:e.txnId})})).catch((function(e){return console.log(e)}))}})})]}),O.txnId&&Object(v.jsxs)("div",{className:"row otp",children:[Object(v.jsx)("div",{className:"input-label black",children:"Enter OTP "}),Object(v.jsx)("div",{children:Object(v.jsx)("input",{type:"number",value:d,name:"mobile",onChange:function(e){return b(e.target.value)}})}),Object(v.jsx)("div",{children:Object(v.jsx)(g,{label:"Submit",onClick:function(){return function(){if(d){var e=w.a.SHA256(d).toString(w.a.enc.Hex);fetch("https://cdn-api.co-vin.in/api/v2/auth/validateMobileOtp",{body:JSON.stringify({otp:e,txnId:O.txnId}),headers:{"content-type":"application/json"},method:"POST",mode:"cors",credentials:"omit"}).then((function(e){return e.json()})).then((function(e){f(Object(l.a)(Object(l.a)({},O),{},{token:e.token})),t&&t(e.token)})).catch((function(e){return console.log(e)}))}}()}})})]})]})};var I=function(){var e=Object(n.useState)(null),t=Object(o.a)(e,2),c=t[0],a=t[1],i=Object(n.useState)(!0),s=Object(o.a)(i,2),b=s[0],h=s[1],f=Object(n.useState)([]),p=Object(o.a)(f,2),m=p[0],N=p[1],S=Object(n.useState)([]),k=Object(o.a)(S,2),w=k[0],I=k[1],A=Object(n.useState)([]),D=Object(o.a)(A,2),L=D[0],E=D[1],B=Object(n.useState)([]),Y=Object(o.a)(B,2),T=Y[0],M=Y[1],H=Object(n.useState)(!0),P=Object(o.a)(H,2),V=P[0],F=P[1],J=Object(n.useState)(!1),z=Object(o.a)(J,2),R=z[0],U=z[1],X=Object(n.useState)(294),q=Object(o.a)(X,2),G=q[0],K=q[1],Q=Object(n.useState)("ALL"),W=Object(o.a)(Q,2),Z=W[0],$=W[1],ee=Object(n.useState)(18),te=Object(o.a)(ee,2),ce=te[0],ne=te[1],ae=Object(n.useState)(1),ie=Object(o.a)(ae,2),se=ie[0],le=ie[1];Object(n.useEffect)((function(){18===ce&&(F(!0),U(!1)),45===ce&&(F(!1),U(!0))}),[ce]);var re=function(){h(!0);var e=O()().format("DD-MM-YYYY"),t="https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict";t+="?district_id="+G+"&date="+e,"ALL"!==Z&&(t+="&vaccine="+Z),fetch(t).then((function(e){return e.json()})).then((function(e){var t=[],c=[],n=[],a=[];e.centers.forEach((function(e){var i=e.sessions,s=Object(r.a)(e,["sessions"]);i.forEach((function(e){var i=e.min_age_limit,r=(e.available_capacity,e.available_capacity_dose2),o=e.available_capacity_dose1,j=Object(l.a)(Object(l.a)({},s),e);i<45?(t.push(j),1===se&&o&&c.push(j),2===se&&r&&c.push(j)):(n.push(j),1===se&&o&&a.push(j),2===se&&r&&a.push(j))}))})),N(t),I(c),E(n),M(a)})).catch((function(e){return console.log(e)})).finally((function(){return h(!1)}))};Object(n.useEffect)((function(){w.length>0&&V&&oe("18+")}),[w]),Object(n.useEffect)((function(){T.length>0&&R&&oe("45+")}),[T]),Object(n.useEffect)((function(){try{var e=sessionStorage.getItem("token");a(e)}catch(c){console.log(c)}re();var t=setInterval((function(){return re()}),2e3);return function(){clearTimeout(t)}}),[G,Z,se]);var oe=function(e){var t=u.a.getVoiceByName("Alex"),c=new u.a({voice:t,pitch:1,rate:1});c.cancel(),c.write("vaccines are available for "+e)},je=function(e){a(e),sessionStorage.setItem("token",e)};return Object(v.jsx)(j.a,{children:Object(v.jsxs)("div",{children:[Object(v.jsxs)("header",{children:[Object(v.jsx)("nav",{children:Object(v.jsxs)("ul",{className:"nav-area",children:[Object(v.jsx)("li",{children:Object(v.jsx)(j.b,{to:"/",children:"Home"})}),Object(v.jsx)("li",{children:Object(v.jsx)(j.b,{to:"/slots_available",children:"Slots available"})}),Object(v.jsx)("li",{children:Object(v.jsx)(j.b,{to:"/automatic_booking",children:"Booking"})})]})}),Object(v.jsx)("div",{children:!c&&Object(v.jsx)(C,{setToken:je})}),Object(v.jsxs)("div",{className:"volume-controll",children:[Object(v.jsxs)(g,{onClick:function(){return F(!V)},className:"icon-button",children:[Object(v.jsx)("span",{children:"18+"}),Object(v.jsx)("i",{className:"fa fa-volume-".concat(V?"up":"off")})]}),Object(v.jsxs)(g,{onClick:function(){return U(!R)},className:"icon-button",children:[Object(v.jsx)("span",{children:"45+"}),Object(v.jsx)("i",{className:"fa fa-volume-".concat(R?"up":"off")})]})]})]}),Object(v.jsxs)("div",{className:"row header-baner",children:[Object(v.jsxs)("div",{className:"row",children:[Object(v.jsx)(_,{token:c,setDistrictId:K}),Object(v.jsxs)("div",{children:[Object(v.jsx)("label",{className:"input-label",children:"Vaccine Type"}),Object(v.jsxs)("select",{value:Z,onChange:function(e){return $(e.target.value)},children:[Object(v.jsx)("option",{value:"ALL",children:"ALL"}),Object(v.jsx)("option",{value:"COVAXIN",children:"COVAXIN"}),Object(v.jsx)("option",{value:"COVISHIELD",children:"COVISHIELD"})]})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("label",{className:"input-label",children:"Age Limit"}),Object(v.jsxs)("select",{value:ce,onChange:function(e){return ne(parseInt(e.target.value))},children:[Object(v.jsx)("option",{value:18,children:"18+"}),Object(v.jsx)("option",{value:45,children:"45+"})]})]}),Object(v.jsxs)("div",{children:[Object(v.jsx)("label",{className:"input-label",children:"Dose"}),Object(v.jsxs)("select",{value:se,onChange:function(e){return le(parseInt(e.target.value))},children:[Object(v.jsx)("option",{value:1,children:"Dose 1"}),Object(v.jsx)("option",{value:2,children:"Dose 2"})]})]})]}),Object(v.jsxs)("div",{className:"row right-align my-info",children:["@ Praveen Reddy Reddivari | praveen.reddivari@gmail.com",Object(v.jsxs)("div",{className:"contact-icons",style:{width:100},children:[Object(v.jsx)("a",{href:"https://www.linkedin.com/in/praveen-reddy-b8481b77/",target:"_blank",class:"fa fa-linkedin"}),Object(v.jsx)("a",{href:"https://www.facebook.com/praveen.reddivari",target:"_blank",class:"fa fa-facebook"}),Object(v.jsx)("a",{href:"https://twitter.com/reddivari_9",target:"_blank",class:"fa fa-twitter"})]})]})]}),Object(v.jsxs)(d.c,{children:[Object(v.jsx)(d.a,{path:"/slots_available",children:Object(v.jsx)(x,{age:ce,dose:se,loading:b,slotsList18:m,slotsList45:L,availableSlots18:w,availableSlots45:T})}),Object(v.jsx)(d.a,{path:"/automatic_booking",children:Object(v.jsx)(y,{age:ce,dose:se,availableSlots18:w,availableSlots45:T,token:c,setToken:je})}),Object(v.jsx)(d.a,{path:"/",children:Object(v.jsx)(x,{age:ce,dose:se,loading:b,slotsList18:m,slotsList45:L,availableSlots18:w,availableSlots45:T})})]})]})})};s.a.render(Object(v.jsx)(a.a.StrictMode,{children:Object(v.jsx)(I,{})}),document.getElementById("root"))}},[[263,1,2]]]);
//# sourceMappingURL=main.1890a874.chunk.js.map