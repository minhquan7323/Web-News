import{a as e,u as t,b as s,j as a,B as i,G as r,c as n,L as l,I as o,S as c,T as d,V as h,R as x,H as p,D as u,r as j,d as m,e as g,f,g as y,h as b,i as v,k as w,l as C,m as S,n as k,o as _,U as L,p as F,M as z,q as E,s as A,t as O,v as q,w as D,x as N,y as I,O as W,z as T,A as U,C as K,E as P,F as B,J as $,K as H,N as M,P as R,Q as G,W as Y,X as Z,Y as V,Z as X,_ as J,$ as Q,a0 as ee,a1 as te,a2 as se,a3 as ae,a4 as ie,a5 as re,a6 as ne,a7 as le,a8 as oe,a9 as ce,aa as de,ab as he,ac as xe,ad as pe,ae as ue,af as je,ag as me,ah as ge,ai as fe,aj as ye}from"./vendor-h74zJyDn.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();{const e=document.createElement("meta");e.setAttribute("property","fb:admins"),e.setAttribute("content","1641768813350407"),document.head.appendChild(e)}const be=async(t,s,a,i,r)=>{let n={},l=[];(null==s?void 0:s.length)>0&&l.push(`filter=type&filter=${s.join(",")}`),i&&l.push(`page=${i}`),a&&l.push(`limit=${a}`);const o=l.length>0?`&${l.join("&")}`:"",c=t?`search=${t}`:"";return n=await e.get(`http://localhost:3001/api/article/getall?${c}${o}`),n.data},ve=async(t,s)=>(await e.put(`http://localhost:3001/api/article/update/${t}`,s)).data,we=async t=>(await e.get(`http://localhost:3001/api/article/details/${t}`)).data,Ce=()=>{const e=t(),j=s({queryKey:["articles"],queryFn:async()=>(await be()).data,retry:3,retryDelay:1e3}),{isLoading:m,data:g}=j;return a.jsx(i,{p:4,paddingTop:10,children:a.jsxs(r,{templateColumns:"2fr 1fr",gap:6,mt:6,children:[a.jsx(n,{children:null==g?void 0:g.slice(0,1).map((e=>a.jsxs(l,{href:e.url,_hover:{textDecoration:"none"},children:[a.jsx(o,{src:e.imageUrl||"https://via.placeholder.com/150",alt:e.title,borderRadius:"5px",objectFit:"cover",h:"100%",maxH:"500px",w:"100%",transition:"opacity 0.2s ease-in-out",_hover:{opacity:.7}}),a.jsxs(c,{spacing:3,children:[a.jsx(d,{fontSize:"3xl",children:e.title}),a.jsxs(d,{fontSize:"sm",color:"gray.400",children:[e.source," - ",new Date(e.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})]}),a.jsx(d,{noOfLines:2,children:e.description})]})]},e._id)))}),a.jsx(n,{children:a.jsx(h,{alignItems:"start",spacing:4,w:"100%",children:null==g?void 0:g.map(((t,s)=>a.jsxs(x.Fragment,{children:[a.jsx(i,{onClick:()=>{return s=t._id,void e(`/article/details/${s}`);var s},_hover:{textDecoration:"none"},cursor:"pointer",children:a.jsxs(p,{alignItems:"start",children:[a.jsx(o,{src:t.imageUrl,alt:t.title,borderRadius:"5px",objectFit:"cover",h:"100px",w:"100px",transition:"opacity 0.2s ease-in-out",_hover:{opacity:.7}}),a.jsxs(c,{spacing:1,children:[a.jsx(d,{fontSize:"lg",noOfLines:3,_hover:{textDecoration:"underline"},children:t.title}),a.jsxs(d,{fontSize:"sm",color:"gray.400",children:[t.source," - ",new Date(t.createdAt).toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})]})]})]})}),s<g.length-1&&a.jsx(i,{py:2,w:"100%",children:a.jsx(u,{borderColor:"gray.300"})})]},t._id)))})})]})})},Se=({logo:e="",fontSize:t="4xl"})=>{const s=e.toUpperCase().split("").map((e=>/\w/.test(e)?e:" ")),i=["#4db6ac","#009688","#00796b","#004d40"],[r,n]=j.useState(0);return j.useEffect((()=>{const e=setInterval((()=>{n((e=>(e+1)%s.length))}),400);return()=>clearInterval(e)}),[s.length]),a.jsx(d,{display:{base:"none",sm:"flex"},fontSize:t,fontWeight:"bold",textTransform:"uppercase",px:2,children:s.map(((e,t)=>{let s=(r-t+i.length)%i.length;return a.jsx(d,{as:"span",color:i[s],transition:"color 0.5s ease-in-out",children:e},t)}))})},ke=async t=>(await e.get(`http://localhost:3001/api/user/getdetailsuser/${t}`)).data,_e=async()=>(await e.get("http://localhost:3001/api/category/getall")).data,Le=()=>{const{isOpen:e,onClose:r,onOpen:n}=m(),[l,o]=j.useState(!1),[c,x]=j.useState(""),W=t(),{user:T}=g(),{signOut:U}=f(),[K,P]=j.useState(!1),B=y();j.useEffect((()=>{const e=()=>o(window.scrollY>0);return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)}),[]);const $=e=>W("admin"===e?"/system/admin":"/"),H=B.pathname.startsWith("/system/admin"),M=()=>{(null==c?void 0:c.trim())&&(W("/search",{state:{query:c}}),x(""),r())};j.useEffect((()=>{var e;T&&((async e=>{const t=await ke(e);P(t.data.isAdmin)})(T.id),T||null==(e=window.FB)||e.getLoginStatus((e=>{"connected"!==e.status&&window.FB.login()})))}),[T]),j.useEffect((()=>{window.scrollTo({top:0,behavior:"smooth"})}),[B.pathname]);const{data:R}=s({queryKey:["categories"],queryFn:async()=>(await _e()).data,retry:2,retryDelay:1e3}),G=b({base:2,sm:2,md:3,lg:5});return a.jsxs(a.Fragment,{children:[a.jsxs(i,{display:"flex",position:"fixed",justifyContent:"space-between",alignItems:"center",bg:"rgba(255, 255, 255, 0.3)",backdropFilter:"blur(20px)",w:"100%",p:"5px 10px",shadow:"0 0 10px 1px rgba(0, 0, 0, 0.2)",zIndex:"1002",children:[a.jsxs(i,{display:"flex",alignItems:"center",children:[a.jsx(v,{variant:"ghost",display:{base:"flex",sm:"none"},onClick:n,m:"7px",children:a.jsx(w,{boxSize:8,color:"teal"})}),a.jsx(C,{to:"/",children:a.jsx(Se,{logo:"news"})}),!H&&a.jsx(p,{children:null==R?void 0:R.slice(0,G).map((e=>a.jsx(C,{to:"/",children:a.jsx(d,{transition:"color 0.3s ease",_hover:{textDecoration:"none"},fontWeight:"bold",display:{base:"none",sm:"flex"},px:4,children:e.name})},e._id)))})]}),a.jsxs(i,{display:"flex",alignItems:"center",children:[H?a.jsx(v,{colorScheme:"teal",size:"md",marginRight:5,onClick:()=>$("home"),children:"Home"}):a.jsxs(a.Fragment,{children:[a.jsx(v,{colorScheme:"teal",size:"md",onClick:n,marginRight:5,children:a.jsx("i",{className:"fas fa-magnifying-glass"})}),K&&a.jsx(v,{colorScheme:"teal",size:"md",marginRight:5,onClick:()=>$("admin"),children:"Admin"})]}),a.jsxs(i,{p:2,children:[a.jsx(S,{onClick:async()=>{await U(),window.FB&&window.FB.getLoginStatus((e=>{"connected"===e.status&&window.FB.logout((()=>{localStorage.removeItem("fblo_:appId"),setTimeout((()=>window.FB.XFBML.parse()),1e3)}))})),setTimeout((()=>{window.location.reload()}),1500)},children:a.jsx(k,{})}),a.jsx(_,{children:a.jsx(L,{appearance:{elements:{avatarBox:{width:"40px",height:"40px"}}}})})]})]})]}),a.jsxs(F,{onClose:r,isOpen:e,size:"full",children:[a.jsx(z,{}),a.jsxs(E,{children:[a.jsx(A,{color:"teal"}),a.jsx(O,{children:a.jsx(C,{to:"/",children:a.jsx(d,{fontSize:"4xl",color:"teal",fontWeight:"bold",textTransform:"uppercase",px:4,onClick:r,children:"NEWS"})})}),a.jsx(u,{borderColor:"teal"}),a.jsxs(q,{children:[a.jsxs(i,{display:"flex",alignItems:"center",py:10,children:[a.jsx(D,{placeholder:"Search",mr:2,color:"teal",value:c,onChange:e=>x(e.target.value),onKeyDown:e=>"Enter"===e.key&&M()}),a.jsx(v,{colorScheme:"teal",size:"md",onClick:M,disabled:!(null==c?void 0:c.trim()),children:a.jsx("i",{className:"fas fa-magnifying-glass"})})]}),a.jsx(u,{borderColor:"teal"}),a.jsx(h,{as:"ul",spacing:4,align:"start",w:"full",p:10,children:a.jsx(N,{spacing:4,styleType:"disc",children:a.jsx(I,{children:a.jsx(C,{to:"/favorite",onClick:r,children:a.jsx(d,{_hover:{textDecoration:"none"},px:4,children:"Favorite List"})})})})})]})]})]})]})};function Fe(){return a.jsxs("div",{className:"App",children:[a.jsx(Le,{}),a.jsx("div",{className:"content",children:a.jsx(W,{})})]})}const ze=e=>T({mutationFn:e}),Ee=({moreFrom:e,news:t,templateColumnss:s="2fr 2fr"})=>a.jsxs(i,{children:[a.jsxs(d,{as:"b",borderLeft:"6px solid teal",p:1,textTransform:"uppercase",children:["More from ",a.jsx(i,{as:"span",color:"teal",children:e})]}),t.map(((e,c)=>a.jsxs(r,{templateColumns:s,gap:4,mt:6,children:[a.jsx(l,{href:e._id,transition:"opacity 0.1s ease-in-out",_hover:{opacity:.7},children:a.jsx(o,{src:e.imageUrl,alt:e.title,objectFit:"cover",h:"auto",maxH:"120px",w:"100%"})}),a.jsx(l,{href:e._id,children:a.jsx(d,{fontSize:"xs",maxW:"100%",lineHeight:"24px",height:"72px",overflow:"hidden",display:"-webkit-box",style:{WebkitLineClamp:3,WebkitBoxOrient:"vertical"},children:e.description})}),c<t.length-1&&a.jsx(n,{colSpan:2,children:a.jsx(i,{py:2,children:a.jsx(u,{borderColor:"gray.300"})})},c)]},c)))]}),Ae=()=>{const{id:e}=U(),[t,c]=j.useState(!1),x=ze((async e=>{const{id:t,...s}=e;return await ve(t,s)})),{data:p=[]}=s({queryKey:["allArticles"],queryFn:async()=>(await be()).data}),{data:m={}}=s({queryKey:["details",e],queryFn:()=>(async e=>{if(e)return(await we(e)).data})(e),enabled:!!e}),g=p.sort(((e,t)=>t.read-e.read)).slice(0,10),f=p.filter((e=>e.type.some((e=>"cc"===e.name)))).slice(0,3),y=p.filter((t=>t._id!==e)).sort((()=>Math.random()-.5)).slice(0,4);j.useEffect((()=>{(null==m?void 0:m._id)&&"number"==typeof m.read&&!t&&(x.mutate({id:m._id,read:m.read+1}),c(!0))}),[null==m?void 0:m._id]);const v=b({base:"1fr",sm:"1fr",md:"1fr",lg:"9fr 3fr"});return a.jsxs(i,{p:[4,6,8,12],pt:[12,12,12,12],children:[a.jsxs(K,{spacing:"8px",py:4,separator:a.jsx($,{color:"gray.500"}),children:[a.jsx(P,{children:a.jsx(B,{href:"/",children:a.jsx(d,{as:"b",children:"Home"})})}),a.jsx(P,{isCurrentPage:!0,children:a.jsx(B,{href:"#",children:"Details"})})]}),a.jsx(r,{templateColumns:v,gap:6,children:a.jsxs(i,{children:[a.jsx(d,{as:"b",fontSize:"5xl",children:m.title}),a.jsxs(i,{p:8,color:"gray",children:[a.jsx(i,{children:a.jsxs(d,{children:["By ",a.jsx("u",{children:m.author})]})}),a.jsxs(i,{children:["Updated at ",new Date(m.updatedAt).toLocaleString()]})]})]})}),a.jsxs(r,{templateColumns:v,gap:6,children:[a.jsx(n,{children:a.jsxs(i,{children:[a.jsxs(i,{children:[a.jsxs(i,{children:[a.jsx(o,{src:m.imageUrl,alt:m.title,objectFit:"cover",h:"auto",w:"100%"}),a.jsxs(i,{p:4,children:[a.jsxs(d,{opacity:"0.5  ",children:["👁️ ",m.read||0," views"]}),a.jsx(d,{fontSize:"24px",align:"center",children:m.description})]})]}),a.jsx(i,{py:2,children:a.jsx(u,{borderColor:"gray.300"})}),a.jsx(i,{p:6,children:a.jsx(i,{dangerouslySetInnerHTML:{__html:m.content}})})]}),a.jsx(i,{py:2,children:a.jsx(u,{borderColor:"gray.300"})}),a.jsx(i,{width:"100%",children:a.jsx(i,{border:"1px solid",borderColor:"teal",p:2,mt:10,children:a.jsx(d,{as:"b",fontSize:"xl",children:"Comment"})})}),a.jsxs(i,{px:[4,6,8,12],children:[a.jsxs(i,{pt:12,children:[a.jsx(d,{as:"b",fontSize:"2xl",textTransform:"uppercase",children:"Up Next"}),y.map(((e,t)=>a.jsxs(r,{templateColumns:"2fr 1fr",gap:4,mt:4,children:[a.jsx(l,{href:e._id,children:a.jsx(d,{fontSize:"lg",lineHeight:"24px",height:"72px",overflow:"hidden",display:"-webkit-box",style:{WebkitLineClamp:3,WebkitBoxOrient:"vertical"},children:e.description})}),a.jsx(l,{href:e._id,transition:"opacity 0.1s ease-in-out",_hover:{opacity:.7},children:a.jsx(o,{src:e.imageUrl,alt:e.title,objectFit:"cover",h:"auto",maxH:"120px",w:"100%"})}),t<y.length-1&&a.jsx(n,{colSpan:2,children:a.jsx(i,{py:2,children:a.jsx(u,{borderColor:"gray.300"})})},t)]},t)))]}),a.jsxs(i,{pt:12,children:[a.jsx(d,{as:"b",fontSize:"2xl",textTransform:"uppercase",children:"Most read"}),a.jsx(r,{templateColumns:"1fr 1fr",gap:4,mt:4,children:g.map(((e,t)=>a.jsxs(i,{display:"flex",alignItems:"flex-start",gap:2,children:[a.jsx(d,{fontSize:"2xl",color:"teal",fontWeight:"bold",minWidth:"30px",children:t+1}),a.jsxs(i,{flex:"1",children:[a.jsx(l,{href:e._id,children:a.jsx(d,{fontSize:"sm",lineHeight:"24px",height:"72px",overflow:"hidden",display:"-webkit-box",width:"100px",style:{WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:e.title})}),t<g.length-1&&a.jsx(u,{borderColor:"gray.300",pt:4})]})]},e._id)))})]})]})]})}),a.jsx(n,{children:a.jsxs(h,{spacing:12,children:[a.jsx(Ee,{moreFrom:"Most read",news:g.slice(0,3)}),a.jsx(Ee,{moreFrom:"Most cc",news:f})]})})]})]})},Oe=()=>a.jsxs(i,{position:"relative",height:"100vh",width:"100vw",bgColor:"blue.100",children:[a.jsx(d,{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",fontSize:"30vw",fontWeight:"bold",color:"gray.100",zIndex:0,userSelect:"none",children:"404"}),a.jsxs(h,{height:"100vh",align:"center",justify:"center",position:"relative",zIndex:1,children:[a.jsx(Se,{logo:"PAGE NOT FOUND",fontSize:"10vw"}),a.jsx(v,{colorScheme:"teal",variant:"outline",children:a.jsxs(C,{to:"/",children:["Go to ",a.jsx(d,{as:"span",color:"teal",fontWeight:"bold",children:"Home"})]})})]})]}),qe=({children:e,isLoading:t=!1})=>a.jsxs(i,{position:"relative",display:"inline-block",children:[t&&a.jsx(i,{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",zIndex:"1",children:a.jsx(H,{thickness:"4px",speed:"0.65s",emptyColor:"gray.200",color:"blue.500",size:"xl"})}),a.jsx(i,{opacity:t?.5:1,children:e})]}),De=e=>{const{selectionType:t="checkbox",data:s=[],isLoading:r=!1,columns:n=[],deleteMany:l,multiChoice:o=!1}=e,[c,d]=j.useState([]),{isOpen:h,onOpen:x,onClose:p}=m(),u={onChange:(e,t)=>{d(e)}};return a.jsxs(a.Fragment,{children:[a.jsxs(qe,{isLoading:r,children:[a.jsx(i,{py:4,children:o&&c.length>0&&a.jsx(v,{colorScheme:"red",onClick:x,children:"Delete all?"})}),a.jsx(M,{bordered:!0,rowSelection:o&&{type:t,...u},columns:n,dataSource:s,pagination:{position:["bottomCenter"]},onChange:()=>{window.scrollTo({top:0,behavior:"smooth"})},...e})]}),a.jsxs(R,{Modal:!0,onClose:p,isOpen:h,isCentered:!0,children:[a.jsx(z,{}),a.jsxs(G,{children:[a.jsx(O,{children:"Delete article"}),a.jsx(A,{}),a.jsx(q,{children:a.jsx(i,{children:"Are you sure you want to delete this article?"})}),a.jsxs(Y,{gap:4,children:[a.jsx(v,{colorScheme:"red",onClick:async()=>{await l(c),d([]),p()},children:"Delete"}),a.jsx(v,{onClick:p,children:"Close"})]})]})]})]})},Ne=async e=>{try{const t=new FormData;let s=e;if(e.type.startsWith("image/")){const t={maxSizeMB:1,maxWidthOrHeight:1024,useWebWorker:!0};s=await Z(e,t)}t.append("file",s),t.append("upload_preset","chat-app"),t.append("resource_type",e.type.startsWith("video/")?"video":"image");const a=await fetch("https://api.cloudinary.com/v1_1/minhquan73/upload",{method:"POST",body:t}),i=await a.json();if(!i.secure_url)throw new Error("No URL returned from Cloudinary");return e.type.startsWith("video/")?i.secure_url.replace("/upload/","/upload/f_mp4/"):i.secure_url}catch(t){throw t}},Ie=e=>Array.isArray(e)?e.sort(((e,t)=>new Date(t.createdAt)-new Date(e.createdAt))):[],We=()=>{const e=V();return{success:(t="Success")=>{e({title:t,status:"success",duration:3e3,isClosable:!0})},error:(t="Error")=>{e({title:t,status:"error",duration:3e3,isClosable:!0})}}},Te=()=>{const{success:r,error:n}=We(),l=t(),[c,h]=j.useState([]),[x,u]=j.useState(""),[g,f]=j.useState(""),y=j.useRef(null),{isOpen:b,onOpen:w,onClose:C}=m(),S=(e,t="")=>{"add-article"===e&&l("/system/admin/add-article"),"update-article"===e&&t&&l(`/system/admin/update-article/${t}`)},k=s({queryKey:["articles"],queryFn:async()=>(await be()).data,retry:2,retryDelay:1e3}),{isLoading:_,data:L}=k,F=ze((async t=>{const{id:s}=t,a=await(async t=>(await e.delete(`http://localhost:3001/api/article/delete/${t}`)).data)(s);return a})),{data:E,isSuccess:D,isError:N}=F,I=F.isPending,W=ze((async t=>{const{...s}=t,a=await(async t=>(await e.post("http://localhost:3001/api/article/deletemany",t)).data)(s);return a})),{data:T,isSuccess:U,isError:K}=W;W.isPending,j.useEffect((()=>{D&&"OK"===(null==E?void 0:E.status)?(r(),C()):N&&n()}),[E,D,N]),j.useEffect((()=>{U&&"OK"===(null==T?void 0:T.status)?r():K&&n()}),[T,U,K]);const P=(e,t,s)=>{t(),u(e[0]),f(s)},B=[{title:"Image",dataIndex:"imageUrl",render:e=>a.jsx(o,{src:e,alt:e}),width:200},{title:"Title",dataIndex:"title",searchable:!0,...($="title",{filterDropdown:({setSelectedKeys:e,selectedKeys:t,confirm:s,clearFilters:r})=>a.jsxs(i,{p:2,children:[a.jsx(Q,{ref:y,placeholder:`Search ${$}`,value:t[0],onChange:t=>e(t.target.value?[t.target.value]:[]),onPressEnter:()=>P(t,s,$),style:{marginBottom:8,display:"block"}}),a.jsx(v,{onClick:()=>P(t,s,$),mr:2,children:"Search"}),a.jsx(v,{onClick:()=>(e=>{u(""),e()})(r),children:"Reset"})]}),filterIcon:e=>a.jsx(J,{style:{color:e?"#1890ff":void 0}}),onFilter:(e,t)=>{var s;return null==(s=t[$])?void 0:s.toString().toLowerCase().includes(e.toLowerCase())},render:e=>g===$?a.jsx(X,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[x],autoEscape:!0,textToHighlight:e?e.toString():""}):e}),ellipsis:!0},{title:"Type",dataIndex:"type",width:150,render:e=>e.map((e=>e.name)).join(", ")},{title:"Action",dataIndex:"action",fixed:"right",align:"center",width:200,render:(e,t)=>a.jsxs(p,{spacing:2,justifyContent:"center",children:[a.jsx(v,{colorScheme:"blue",size:"sm",p:2,onClick:()=>S("update-article",t._id),children:a.jsx("i",{className:"fa-solid fa-pen-to-square"})}),a.jsx(v,{colorScheme:"orange",size:"sm",p:2,onClick:w,children:a.jsx("i",{className:"fa-solid fa-trash"})})]})}];var $;const H=(null==L?void 0:L.length)&&(null==L?void 0:L.map((e=>({...e,key:e._id}))));return a.jsxs(i,{children:[a.jsx(i,{children:a.jsxs(v,{colorScheme:"blue",onClick:()=>S("add-article"),children:[a.jsx("i",{className:"fa-solid fa-plus"}),a.jsx(d,{as:"span",paddingLeft:4,children:"Article"})]})}),a.jsx(De,{multiChoice:!0,deleteMany:e=>{W.mutate({ids:e},{onSettled:()=>{k.refetch()}})},columns:B,data:Ie(H),isLoading:_,onRow:e=>({onClick:()=>{h(e._id)}})}),a.jsxs(R,{Modal:!0,onClose:C,isOpen:b,isCentered:!0,children:[a.jsx(z,{}),a.jsxs(G,{children:[a.jsx(O,{children:"Delete article"}),a.jsx(A,{}),a.jsx(q,{children:a.jsx(i,{children:"Are you sure you want to delete this article?"})}),a.jsxs(Y,{gap:4,children:[a.jsx(qe,{isLoading:I,children:a.jsx(v,{colorScheme:"red",onClick:()=>{F.mutate({id:c},{onSettled:()=>{k.refetch()}})},children:"Delete"})}),a.jsx(v,{onClick:C,children:"Close"})]})]})]})]})},Ue=()=>{const[t,r]=j.useState(""),[n,l]=j.useState(""),[o,c]=j.useState(""),[h,x]=j.useState({name:""}),[p,u]=j.useState({name:""}),g=j.useRef(null),{isOpen:f,onOpen:y,onClose:b}=m(),{isOpen:w,onOpen:C,onClose:S}=m(),{success:k,error:_}=We(),[L,F]=j.useState(!1),E=async t=>{F(!0);const s=await(async t=>(await e.get(`http://localhost:3001/api/category/details/${t}`)).data)(t);(null==s?void 0:s.data)&&x({name:s.data.name}),F(!1)},D=s({queryKey:["categories"],queryFn:async()=>(await _e()).data,retry:2,retryDelay:1e3}),{isLoading:N,data:I}=D,W=(e,t,s)=>{t(),r(e[0]),l(s)},T=[{title:"Name",dataIndex:"name",searchable:!0,...(U="name",{filterDropdown:({setSelectedKeys:e,selectedKeys:t,confirm:s,clearFilters:n})=>a.jsxs(i,{p:2,children:[a.jsx(Q,{ref:g,placeholder:`Search ${U}`,value:t[0],onChange:t=>e(t.target.value?[t.target.value]:[]),onPressEnter:()=>W(t,s,U),style:{marginBottom:8,display:"block"}}),a.jsx(v,{onClick:()=>W(t,s,U),mr:2,children:"Search"}),a.jsx(v,{onClick:()=>(e=>{e(),r("")})(n),children:"Reset"})]}),filterIcon:e=>a.jsx(J,{style:{color:e?"#1890ff":void 0}}),onFilter:(e,t)=>{var s;return null==(s=t[U])?void 0:s.toString().toLowerCase().includes(e.toLowerCase())},render:e=>n===U?a.jsx(X,{highlightStyle:{backgroundColor:"#ffc069",padding:0},searchWords:[t],autoEscape:!0,textToHighlight:e?e.toString():""}):e}),ellipsis:!0},{title:"Action",dataIndex:"action",fixed:"right",align:"center",width:200,render:(e,t)=>a.jsx(v,{colorScheme:"blue",size:"sm",p:2,onClick:()=>{c(t._id),C()},children:a.jsx("i",{className:"fas fa-edit"})})}];var U;const K=(null==I?void 0:I.length)&&(null==I?void 0:I.map((e=>({...e,key:e._id})))),P=ze((async t=>{const{...s}=t,a=await(async t=>(await e.post("http://localhost:3001/api/category/create",t)).data)(s);return a})),{data:B,isSuccess:$,isError:H}=P,M=P.isPending,Z=ze((async t=>{const{id:s,...a}=t,i=await(async(t,s)=>(await e.put(`http://localhost:3001/api/category/update/${t}`,s)).data)(s,a);return i})),{data:V,isSuccess:ee,isError:te}=Z,se=Z.isPending;j.useEffect((()=>{$&&"OK"===(null==B?void 0:B.status)?(k("Category created successfully!"),u({name:""})):H&&_("Failed to create Category")}),[B,$,H]),j.useEffect((()=>{ee&&"OK"===(null==V?void 0:V.status)?(k("Category updated successfully!"),S()):te&&_("Failed to update Category")}),[V,ee,te]),j.useEffect((()=>{w&&o&&E(o)}),[w,o]);const ae=""!==p.name,ie=""!==h.name;return a.jsxs(a.Fragment,{children:[a.jsxs(i,{children:[a.jsxs(v,{colorScheme:"blue",onClick:y,children:[a.jsx("i",{className:"fa-solid fa-plus"}),a.jsx(d,{as:"span",paddingLeft:4,children:"Category"})]}),a.jsx(De,{columns:T,data:Ie(K),isLoading:N})]}),a.jsxs(R,{onClose:b,isOpen:f,isCentered:!0,children:[a.jsx(z,{}),a.jsxs(G,{children:[a.jsx(O,{children:"Add category"}),a.jsx(A,{}),a.jsx(q,{children:a.jsx(i,{children:a.jsx(Q,{addonBefore:"Category name",value:p.name,placeholder:"Category name here",onChange:e=>{u({...p,[e.target.name]:e.target.value})},name:"name"})})}),a.jsxs(Y,{gap:4,children:[a.jsx(qe,{isLoading:M,children:a.jsx(v,{colorScheme:"red",onClick:()=>{P.mutate({...p},{onSettled:()=>{D.refetch()}})},disabled:!ae,children:"Add"})}),a.jsx(v,{onClick:b,children:"Close"})]})]})]}),a.jsxs(R,{onClose:S,isOpen:w,isCentered:!0,children:[a.jsx(z,{}),a.jsx(G,{children:a.jsxs(qe,{isLoading:L,children:[a.jsx(O,{children:"Edit category"}),a.jsx(A,{}),a.jsx(q,{children:a.jsx(i,{children:a.jsx(Q,{addonBefore:"Category name",value:h.name,placeholder:"Category name here",onChange:e=>{x({...h,[e.target.name]:e.target.value})},name:"name"})})}),a.jsxs(Y,{gap:4,children:[a.jsx(qe,{isLoading:se,children:a.jsx(v,{colorScheme:"red",onClick:()=>{Z.mutate({id:o,...h},{onSettled:()=>{D.refetch()}})},disabled:!ie,children:"Edit"})}),a.jsx(v,{onClick:S,children:"Close"})]})]})})]})]})},Ke=()=>a.jsx(i,{pt:16,children:a.jsxs(ee,{isManual:!0,isFitted:!0,variant:"enclosed",children:[a.jsxs(te,{mb:"1em",children:[a.jsx(se,{children:a.jsx(d,{as:"b",children:"Article Management"})}),a.jsx(se,{children:a.jsx(d,{as:"b",children:"Category Management"})})]}),a.jsxs(ae,{children:[a.jsx(ie,{children:a.jsx(Te,{})}),a.jsx(ie,{children:a.jsx(Ue,{})})]})]})}),Pe=()=>{var n;const[l,h]=j.useState(""),[x,u]=j.useState({title:"",author:"",description:"",source:"",content:"",imageUrl:"",type:[]}),{success:m,error:g}=We(),[f,y]=j.useState(!1),w=t(),C=ze((async t=>{const{...s}=t,a=await(async t=>(await e.post("http://localhost:3001/api/article/create",t)).data)(s);return a})),{data:S,isSuccess:k,isError:_}=C;C.isPending,j.useEffect((()=>{k&&"OK"===(null==S?void 0:S.status)?(m("Article created successfully!"),u((e=>({...e,title:"",author:"",description:"",source:"",content:"",imageUrl:"",type:[]}))),h("")):_&&g("Failed to create article")}),[S,k,_]);const L=e=>{u({...x,[e.target.name]:e.target.value})},F=s({queryKey:["categories"],queryFn:async()=>await _e(),retry:3,retryDelay:1e3}),{isLoading:z,data:E}=F,A=""!==x.title&&""!==x.author&&""!==x.source&&""!==x.description&&""!==x.content&&""!==x.imageUrl&&x.type.length>0,O=b({base:"1fr 1fr",sm:"1fr 1fr",md:"1fr 1fr 1fr",lg:"1fr 1fr 1fr"});return a.jsxs(i,{pt:16,children:[a.jsxs(i,{children:[a.jsxs(i,{p:4,children:[a.jsx(i,{pb:4,children:a.jsxs(v,{colorScheme:"teal",onClick:()=>{w("/system/admin")},children:[a.jsx("i",{className:"fa-solid fa-arrow-left"}),a.jsx(d,{as:"span",pl:4,children:"Back"})]})}),a.jsxs(c,{spacing:4,children:[a.jsxs(re,{children:[a.jsx(ne,{children:"Title"}),a.jsx(D,{placeholder:"Title here",value:x.title,name:"title",onChange:L,required:!0})]}),a.jsxs(p,{children:[a.jsxs(re,{children:[a.jsx(ne,{children:"Author"}),a.jsx(D,{placeholder:"Author here",value:x.author,name:"author",onChange:L,required:!0})]}),a.jsxs(re,{children:[a.jsx(ne,{children:"Source"}),a.jsx(D,{placeholder:"Source here",value:x.source,name:"source",onChange:L,required:!0})]})]}),a.jsxs(i,{children:[a.jsx(d,{p:2,fontWeight:"bold",children:"Description"}),a.jsx(le,{placeholder:"Description here",value:x.description,name:"description",onChange:L,required:!0})]})]})]}),a.jsxs(i,{p:4,children:[a.jsx(d,{p:2,fontWeight:"bold",children:"Category"}),a.jsx(r,{templateColumns:O,gap:2,children:null==(n=null==E?void 0:E.data)?void 0:n.map((e=>a.jsxs(i,{display:"flex",alignItems:"center",gap:4,children:[a.jsx(oe,{id:`type-${e._id}`,name:"type",value:e._id,className:"form-check-input",isChecked:null==x?void 0:x.type.includes(e._id),onChange:()=>(e=>{u((t=>{const s=t.type.includes(e)?t.type.filter((t=>t!==e)):[...t.type,e];return{...t,type:s}}))})(e._id)}),a.jsx(d,{as:"span",htmlFor:`type-${e._id}`,children:e.name})]},e._id)))})]}),a.jsxs(p,{spacing:4,p:4,children:[a.jsxs(v,{as:"label",cursor:"pointer",colorScheme:"orange",children:[a.jsx("i",{className:"fa-solid fa-upload"}),a.jsx(d,{as:"span",paddingLeft:4,display:{base:"none",md:"flex"},children:"Display"}),a.jsx(D,{type:"file",accept:"image/*",onChange:async e=>{var t;const s=null==(t=e.target.files)?void 0:t[0];if(s){y(!0);const e=await Ne(s);u({...x,imageUrl:e}),h(e),y(!1)}},hidden:!0})]}),a.jsx(qe,{isLoading:f,children:a.jsx(o,{src:l,objectFit:"cover",h:"auto",w:"400px"})})]}),a.jsx(i,{p:4,children:a.jsx(ce,{apiKey:"5z186q6fbwvlsogmp3zjvdc5ztkwzadbgt49irrop6yj9pop",placeholder:"<p>Nhập nội dung tại đây...</p>",init:{height:500,menubar:!0,plugins:"advlist autolink lists link image charmap preview anchor media",toolbar:"undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media",image_uploadtab:!0,file_picker_types:"image media",file_picker_callback:async(e,t,s)=>{const a=document.createElement("input");a.setAttribute("type","file"),"image"===s.filetype?a.setAttribute("accept","image/*"):"media"===s.filetype&&a.setAttribute("accept","video/*"),a.onchange=async function(){const t=this.files[0];if(t){const s=await Ne(t);e(s,{title:t.name})}},a.click()}},value:x.content,onEditorChange:e=>u({...x,content:e})})})]}),a.jsx(de,{justify:"flex-end",p:4,children:a.jsxs(v,{colorScheme:"green",onClick:()=>{C.mutate({...x})},disabled:!A,children:[a.jsx("i",{className:"fa-solid fa-plus"}),a.jsx(d,{as:"span",paddingLeft:4,children:"Post"})]})})]})},Be=()=>{const{id:e}=U(),[s,r]=j.useState({title:"",author:"",description:"",source:"",content:"",imageUrl:""}),{success:n,error:l}=We(),[h,x]=j.useState(!1),u=t(),m=e=>{r({...s,[e.target.name]:e.target.value})},g=e=>{u("/system/admin")};j.useEffect((()=>{(async()=>{const t=await we(e);t.data&&r({title:t.data.title,author:t.data.author,description:t.data.description,source:t.data.source,content:t.data.content,imageUrl:t.data.imageUrl})})()}),[]);const f=ze((async e=>{const{id:t,...s}=e;return await ve(t,s)})),{data:y,isSuccess:b,isError:w}=f;f.isPending;j.useEffect((()=>{b&&"OK"===(null==y?void 0:y.status)?(n(),g()):w&&l()}),[y,b,w]);const C=""!==s.title&&""!==s.author&&""!==s.source&&""!==s.description&&""!==s.content&&""!==s.imageUrl;return a.jsxs(i,{pt:16,children:[a.jsxs(i,{children:[a.jsxs(i,{p:4,children:[a.jsx(i,{pb:4,children:a.jsxs(v,{colorScheme:"teal",onClick:()=>g(),children:[a.jsx("i",{className:"fa-solid fa-arrow-left"}),a.jsx(d,{as:"span",pl:4,children:"Back"})]})}),a.jsxs(c,{spacing:4,children:[a.jsxs(re,{children:[a.jsx(ne,{children:"Title"}),a.jsx(D,{placeholder:"Title here",value:s.title,name:"title",onChange:m,required:!0})]}),a.jsxs(p,{children:[a.jsxs(re,{children:[a.jsx(ne,{children:"Author"}),a.jsx(D,{placeholder:"Author here",value:s.author,name:"author",onChange:m,required:!0})]}),a.jsxs(re,{children:[a.jsx(ne,{children:"Source"}),a.jsx(D,{placeholder:"Source here",value:s.source,name:"source",onChange:m,required:!0})]})]}),a.jsxs(i,{children:[a.jsx(d,{p:2,children:"Description"}),a.jsx(le,{placeholder:"Description here",value:s.description,name:"description",onChange:m,required:!0})]})]})]}),a.jsxs(p,{spacing:4,p:4,children:[a.jsxs(v,{as:"label",cursor:"pointer",colorScheme:"orange",children:[a.jsx("i",{className:"fa-solid fa-upload"}),a.jsx(d,{as:"span",paddingLeft:4,display:{base:"none",md:"flex"},children:"Display"}),a.jsx(D,{type:"file",accept:"image/*",onChange:async e=>{var t;const a=null==(t=e.target.files)?void 0:t[0];if(a){x(!0);const e=await Ne(a);r({...s,imageUrl:e}),x(!1)}},hidden:!0})]}),a.jsx(qe,{isLoading:h,children:a.jsx(o,{src:s.imageUrl,objectFit:"cover",h:"auto",w:"400px"})})]}),a.jsx(i,{p:4,children:a.jsx(ce,{apiKey:"5z186q6fbwvlsogmp3zjvdc5ztkwzadbgt49irrop6yj9pop",placeholder:"<p>Nhập nội dung tại đây...</p>",init:{height:500,menubar:!0,plugins:"advlist autolink lists link image charmap preview anchor media",toolbar:"undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image media",image_uploadtab:!0,file_picker_types:"image media",file_picker_callback:async(e,t,s)=>{const a=document.createElement("input");a.setAttribute("type","file"),"image"===s.filetype?a.setAttribute("accept","image/*"):"media"===s.filetype&&a.setAttribute("accept","video/*"),a.onchange=async function(){const t=this.files[0];if(t){const s=await Ne(t);e(s,{title:t.name})}},a.click()}},value:s.content,onEditorChange:e=>r({...s,content:e})})})]}),a.jsx(de,{justify:"flex-end",p:4,children:a.jsxs(v,{colorScheme:"green",onClick:()=>{f.mutate({id:e,...s})},disabled:!C,children:[a.jsx("i",{className:"fa-solid fa-upload"}),a.jsx(d,{as:"span",paddingLeft:4,children:"Update"})]})})]})},$e=()=>{var e;const s=y(),n=j.useRef(),c=t(),x=j.useRef(),[p,m]=j.useState((null==(e=s.state)?void 0:e.query)||""),[g,f]=j.useState(""),{data:b,fetchNextPage:w,hasNextPage:C,isFetchingNextPage:S,isLoading:k,refetch:_}=he({queryKey:["articles",p],queryFn:async({pageParam:e=1})=>{const t=await be(p,[],1,e);return(null==t?void 0:t.data)||[]},initialPageParam:1,enabled:!!p,getNextPageParam:(e,t)=>e.length>0?t.length+1:void 0}),L=()=>{f(p),g.trim()&&(c("/search",{state:{query:g}}),f(""))};j.useEffect((()=>{if(!S)return n.current=new IntersectionObserver((e=>{e[0].isIntersecting&&C&&w()})),x.current&&n.current.observe(x.current),()=>{var e;return null==(e=n.current)?void 0:e.disconnect()}}),[S,C]),j.useEffect((()=>{var e;(null==(e=s.state)?void 0:e.query)&&m(s.state.query)}),[s.state]),j.useEffect((()=>{p&&_()}),[p,_]);const F=""!=g;return a.jsxs(i,{p:[4,6,8,12],pt:[12,12,12,12],children:[a.jsxs(K,{spacing:"8px",py:4,separator:a.jsx($,{color:"gray.500"}),children:[a.jsx(P,{children:a.jsx(B,{href:"/",children:a.jsx(d,{as:"b",children:"Home"})})}),a.jsx(P,{isCurrentPage:!0,children:a.jsx(B,{children:"Search"})})]}),a.jsxs(i,{children:[a.jsxs(i,{display:"flex",alignItems:"center",p:8,children:[a.jsx(D,{placeholder:"Search",mr:2,color:"teal",value:g,onChange:e=>f(e.target.value),onKeyDown:e=>{"Enter"===e.key&&L()}}),a.jsx(v,{colorScheme:"teal",size:"md",onClick:L,disabled:!F,children:a.jsx("i",{className:"fas fa-magnifying-glass"})})]}),a.jsx(u,{borderColor:"teal"})]}),k?a.jsx(H,{size:"xl"}):null==b?void 0:b.pages.map(((e,t)=>e.map(((s,n)=>{const c=t===b.pages.length-1&&n===e.length-1;return a.jsxs(i,{ref:c?x:null,children:[a.jsx(i,{py:4,children:a.jsx(l,{href:s.url,children:a.jsxs(r,{templateColumns:"2fr 3fr",gap:4,children:[a.jsx(o,{src:s.imageUrl,alt:s.title,objectFit:"cover",h:"auto",minH:"80px",maxH:"200px",w:"100%",minW:"100px",transition:"opacity 0.1s ease-in-out",_hover:{opacity:.7}}),a.jsxs(h,{align:"start",children:[a.jsx(d,{fontSize:"lg",fontWeight:"bold",lineHeight:"24px",height:"48px",overflow:"hidden",display:"-webkit-box",style:{WebkitLineClamp:2,WebkitBoxOrient:"vertical"},children:s.title}),a.jsx(d,{fontSize:"sm",color:"gray",children:new Date(s.updatedAt).toLocaleString()}),a.jsx(d,{children:s.description})]})]})})}),!c&&a.jsx(u,{borderColor:"gray.300"})]},s._id)})))),S&&a.jsx(H,{size:"md",mt:4})]})},He=()=>{const[e,t]=j.useState(""),{user:s}=g();return j.useEffect((()=>{s&&(async e=>{const s=await ke(e);t(s.data.isAdmin)})(s.id)}),[s]),a.jsxs(xe,{children:[a.jsxs(pe,{path:"/",element:a.jsx(Fe,{}),children:[a.jsx(pe,{index:!0,element:a.jsx(Ce,{})}),a.jsx(pe,{path:"article/details/:id",element:a.jsx(Ae,{})}),a.jsx(pe,{path:"search",element:a.jsx($e,{})}),e&&a.jsxs(a.Fragment,{children:[a.jsx(pe,{path:"system/admin",element:a.jsx(Ke,{})}),a.jsx(pe,{path:"system/admin/add-article",element:a.jsx(Pe,{})}),a.jsx(pe,{path:"system/admin/update-article/:id",element:a.jsx(Be,{})})]})]}),a.jsx(pe,{path:"*",element:a.jsx(Oe,{})})]})},Me=new ue,Re=document.getElementById("root");je.createRoot(Re).render(a.jsx(me,{client:Me,children:a.jsx(ge,{publishableKey:"pk_test_ZmxlZXQtc25ha2UtMTcuY2xlcmsuYWNjb3VudHMuZGV2JA",afterSignOutUrl:"/",children:a.jsx(fe,{children:a.jsx(ye,{children:a.jsx(He,{})})})})}));
