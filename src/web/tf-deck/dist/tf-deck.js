(()=>{var Yu=Object.create;var ll=Object.defineProperty;var $u=Object.getOwnPropertyDescriptor;var Zu=Object.getOwnPropertyNames;var Ju=Object.getPrototypeOf,Ku=Object.prototype.hasOwnProperty;var Qu=(i,t)=>()=>(t||i((t={exports:{}}).exports,t),t.exports);var ju=(i,t,e,n)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of Zu(t))!Ku.call(i,s)&&s!==e&&ll(i,s,{get:()=>t[s],enumerable:!(n=$u(t,s))||n.enumerable});return i};var td=(i,t,e)=>(e=i!=null?Yu(Ju(i)):{},ju(t||!i||!i.__esModule?ll(e,"default",{value:i,enumerable:!0}):e,i));var Cl=Qu((jx,Rl)=>{function gl(i){return i instanceof Map?i.clear=i.delete=i.set=function(){throw new Error("map is read-only")}:i instanceof Set&&(i.add=i.clear=i.delete=function(){throw new Error("set is read-only")}),Object.freeze(i),Object.getOwnPropertyNames(i).forEach(t=>{let e=i[t],n=typeof e;(n==="object"||n==="function")&&!Object.isFrozen(e)&&gl(e)}),i}var Bs=class{constructor(t){t.data===void 0&&(t.data={}),this.data=t.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function _l(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Rn(i,...t){let e=Object.create(null);for(let n in i)e[n]=i[n];return t.forEach(function(n){for(let s in n)e[s]=n[s]}),e}var ed="</span>",hl=i=>!!i.scope,nd=(i,{prefix:t})=>{if(i.startsWith("language:"))return i.replace("language:","language-");if(i.includes(".")){let e=i.split(".");return[`${t}${e.shift()}`,...e.map((n,s)=>`${n}${"_".repeat(s+1)}`)].join(" ")}return`${t}${i}`},wa=class{constructor(t,e){this.buffer="",this.classPrefix=e.classPrefix,t.walk(this)}addText(t){this.buffer+=_l(t)}openNode(t){if(!hl(t))return;let e=nd(t.scope,{prefix:this.classPrefix});this.span(e)}closeNode(t){hl(t)&&(this.buffer+=ed)}value(){return this.buffer}span(t){this.buffer+=`<span class="${t}">`}},ul=(i={})=>{let t={children:[]};return Object.assign(t,i),t},Ta=class i{constructor(){this.rootNode=ul(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(t){this.top.children.push(t)}openNode(t){let e=ul({scope:t});this.add(e),this.stack.push(e)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(t){return this.constructor._walk(t,this.rootNode)}static _walk(t,e){return typeof e=="string"?t.addText(e):e.children&&(t.openNode(e),e.children.forEach(n=>this._walk(t,n)),t.closeNode(e)),t}static _collapse(t){typeof t!="string"&&t.children&&(t.children.every(e=>typeof e=="string")?t.children=[t.children.join("")]:t.children.forEach(e=>{i._collapse(e)}))}},Aa=class extends Ta{constructor(t){super(),this.options=t}addText(t){t!==""&&this.add(t)}startScope(t){this.openNode(t)}endScope(){this.closeNode()}__addSublanguage(t,e){let n=t.root;e&&(n.scope=`language:${e}`),this.add(n)}toHTML(){return new wa(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function rs(i){return i?typeof i=="string"?i:i.source:null}function xl(i){return Zn("(?=",i,")")}function id(i){return Zn("(?:",i,")*")}function sd(i){return Zn("(?:",i,")?")}function Zn(...i){return i.map(e=>rs(e)).join("")}function rd(i){let t=i[i.length-1];return typeof t=="object"&&t.constructor===Object?(i.splice(i.length-1,1),t):{}}function Ca(...i){return"("+(rd(i).capture?"":"?:")+i.map(n=>rs(n)).join("|")+")"}function yl(i){return new RegExp(i.toString()+"|").exec("").length-1}function ad(i,t){let e=i&&i.exec(t);return e&&e.index===0}var od=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Ia(i,{joinWith:t}){let e=0;return i.map(n=>{e+=1;let s=e,r=rs(n),a="";for(;r.length>0;){let o=od.exec(r);if(!o){a+=r;break}a+=r.substring(0,o.index),r=r.substring(o.index+o[0].length),o[0][0]==="\\"&&o[1]?a+="\\"+String(Number(o[1])+s):(a+=o[0],o[0]==="("&&e++)}return a}).map(n=>`(${n})`).join(t)}var cd=/\b\B/,vl="[a-zA-Z]\\w*",Pa="[a-zA-Z_]\\w*",Ml="\\b\\d+(\\.\\d+)?",bl="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",Sl="\\b(0b[01]+)",ld="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",hd=(i={})=>{let t=/^#![ ]*\//;return i.binary&&(i.begin=Zn(t,/.*\b/,i.binary,/\b.*/)),Rn({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,n)=>{e.index!==0&&n.ignoreMatch()}},i)},as={begin:"\\\\[\\s\\S]",relevance:0},ud={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[as]},dd={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[as]},fd={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},ks=function(i,t,e={}){let n=Rn({scope:"comment",begin:i,end:t,contains:[]},e);n.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let s=Ca("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return n.contains.push({begin:Zn(/[ ]+/,"(",s,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),n},pd=ks("//","$"),md=ks("/\\*","\\*/"),gd=ks("#","$"),_d={scope:"number",begin:Ml,relevance:0},xd={scope:"number",begin:bl,relevance:0},yd={scope:"number",begin:Sl,relevance:0},vd={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[as,{begin:/\[/,end:/\]/,relevance:0,contains:[as]}]},Md={scope:"title",begin:vl,relevance:0},bd={scope:"title",begin:Pa,relevance:0},Sd={begin:"\\.\\s*"+Pa,relevance:0},Ed=function(i){return Object.assign(i,{"on:begin":(t,e)=>{e.data._beginMatch=t[1]},"on:end":(t,e)=>{e.data._beginMatch!==t[1]&&e.ignoreMatch()}})},Fs=Object.freeze({__proto__:null,APOS_STRING_MODE:ud,BACKSLASH_ESCAPE:as,BINARY_NUMBER_MODE:yd,BINARY_NUMBER_RE:Sl,COMMENT:ks,C_BLOCK_COMMENT_MODE:md,C_LINE_COMMENT_MODE:pd,C_NUMBER_MODE:xd,C_NUMBER_RE:bl,END_SAME_AS_BEGIN:Ed,HASH_COMMENT_MODE:gd,IDENT_RE:vl,MATCH_NOTHING_RE:cd,METHOD_GUARD:Sd,NUMBER_MODE:_d,NUMBER_RE:Ml,PHRASAL_WORDS_MODE:fd,QUOTE_STRING_MODE:dd,REGEXP_MODE:vd,RE_STARTERS_RE:ld,SHEBANG:hd,TITLE_MODE:Md,UNDERSCORE_IDENT_RE:Pa,UNDERSCORE_TITLE_MODE:bd});function wd(i,t){i.input[i.index-1]==="."&&t.ignoreMatch()}function Td(i,t){i.className!==void 0&&(i.scope=i.className,delete i.className)}function Ad(i,t){t&&i.beginKeywords&&(i.begin="\\b("+i.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",i.__beforeBegin=wd,i.keywords=i.keywords||i.beginKeywords,delete i.beginKeywords,i.relevance===void 0&&(i.relevance=0))}function Rd(i,t){Array.isArray(i.illegal)&&(i.illegal=Ca(...i.illegal))}function Cd(i,t){if(i.match){if(i.begin||i.end)throw new Error("begin & end are not supported with match");i.begin=i.match,delete i.match}}function Id(i,t){i.relevance===void 0&&(i.relevance=1)}var Pd=(i,t)=>{if(!i.beforeMatch)return;if(i.starts)throw new Error("beforeMatch cannot be used with starts");let e=Object.assign({},i);Object.keys(i).forEach(n=>{delete i[n]}),i.keywords=e.keywords,i.begin=Zn(e.beforeMatch,xl(e.begin)),i.starts={relevance:0,contains:[Object.assign(e,{endsParent:!0})]},i.relevance=0,delete e.beforeMatch},Ld=["of","and","for","in","not","or","if","then","parent","list","value"],Nd="keyword";function El(i,t,e=Nd){let n=Object.create(null);return typeof i=="string"?s(e,i.split(" ")):Array.isArray(i)?s(e,i):Object.keys(i).forEach(function(r){Object.assign(n,El(i[r],t,r))}),n;function s(r,a){t&&(a=a.map(o=>o.toLowerCase())),a.forEach(function(o){let c=o.split("|");n[c[0]]=[r,Dd(c[0],c[1])]})}}function Dd(i,t){return t?Number(t):Ud(i)?0:1}function Ud(i){return Ld.includes(i.toLowerCase())}var dl={},$n=i=>{console.error(i)},fl=(i,...t)=>{console.log(`WARN: ${i}`,...t)},gi=(i,t)=>{dl[`${i}/${t}`]||(console.log(`Deprecated as of ${i}. ${t}`),dl[`${i}/${t}`]=!0)},zs=new Error;function wl(i,t,{key:e}){let n=0,s=i[e],r={},a={};for(let o=1;o<=t.length;o++)a[o+n]=s[o],r[o+n]=!0,n+=yl(t[o-1]);i[e]=a,i[e]._emit=r,i[e]._multi=!0}function Od(i){if(Array.isArray(i.begin)){if(i.skip||i.excludeBegin||i.returnBegin)throw $n("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),zs;if(typeof i.beginScope!="object"||i.beginScope===null)throw $n("beginScope must be object"),zs;wl(i,i.begin,{key:"beginScope"}),i.begin=Ia(i.begin,{joinWith:""})}}function Fd(i){if(Array.isArray(i.end)){if(i.skip||i.excludeEnd||i.returnEnd)throw $n("skip, excludeEnd, returnEnd not compatible with endScope: {}"),zs;if(typeof i.endScope!="object"||i.endScope===null)throw $n("endScope must be object"),zs;wl(i,i.end,{key:"endScope"}),i.end=Ia(i.end,{joinWith:""})}}function Bd(i){i.scope&&typeof i.scope=="object"&&i.scope!==null&&(i.beginScope=i.scope,delete i.scope)}function zd(i){Bd(i),typeof i.beginScope=="string"&&(i.beginScope={_wrap:i.beginScope}),typeof i.endScope=="string"&&(i.endScope={_wrap:i.endScope}),Od(i),Fd(i)}function kd(i){function t(a,o){return new RegExp(rs(a),"m"+(i.case_insensitive?"i":"")+(i.unicodeRegex?"u":"")+(o?"g":""))}class e{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(o,c){c.position=this.position++,this.matchIndexes[this.matchAt]=c,this.regexes.push([c,o]),this.matchAt+=yl(o)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let o=this.regexes.map(c=>c[1]);this.matcherRe=t(Ia(o,{joinWith:"|"}),!0),this.lastIndex=0}exec(o){this.matcherRe.lastIndex=this.lastIndex;let c=this.matcherRe.exec(o);if(!c)return null;let l=c.findIndex((d,f)=>f>0&&d!==void 0),u=this.matchIndexes[l];return c.splice(0,l),Object.assign(c,u)}}class n{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(o){if(this.multiRegexes[o])return this.multiRegexes[o];let c=new e;return this.rules.slice(o).forEach(([l,u])=>c.addRule(l,u)),c.compile(),this.multiRegexes[o]=c,c}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(o,c){this.rules.push([o,c]),c.type==="begin"&&this.count++}exec(o){let c=this.getMatcher(this.regexIndex);c.lastIndex=this.lastIndex;let l=c.exec(o);if(this.resumingScanAtSamePosition()&&!(l&&l.index===this.lastIndex)){let u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,l=u.exec(o)}return l&&(this.regexIndex+=l.position+1,this.regexIndex===this.count&&this.considerAll()),l}}function s(a){let o=new n;return a.contains.forEach(c=>o.addRule(c.begin,{rule:c,type:"begin"})),a.terminatorEnd&&o.addRule(a.terminatorEnd,{type:"end"}),a.illegal&&o.addRule(a.illegal,{type:"illegal"}),o}function r(a,o){let c=a;if(a.isCompiled)return c;[Td,Cd,zd,Pd].forEach(u=>u(a,o)),i.compilerExtensions.forEach(u=>u(a,o)),a.__beforeBegin=null,[Ad,Rd,Id].forEach(u=>u(a,o)),a.isCompiled=!0;let l=null;return typeof a.keywords=="object"&&a.keywords.$pattern&&(a.keywords=Object.assign({},a.keywords),l=a.keywords.$pattern,delete a.keywords.$pattern),l=l||/\w+/,a.keywords&&(a.keywords=El(a.keywords,i.case_insensitive)),c.keywordPatternRe=t(l,!0),o&&(a.begin||(a.begin=/\B|\b/),c.beginRe=t(c.begin),!a.end&&!a.endsWithParent&&(a.end=/\B|\b/),a.end&&(c.endRe=t(c.end)),c.terminatorEnd=rs(c.end)||"",a.endsWithParent&&o.terminatorEnd&&(c.terminatorEnd+=(a.end?"|":"")+o.terminatorEnd)),a.illegal&&(c.illegalRe=t(a.illegal)),a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map(function(u){return Hd(u==="self"?a:u)})),a.contains.forEach(function(u){r(u,c)}),a.starts&&r(a.starts,o),c.matcher=s(c),c}if(i.compilerExtensions||(i.compilerExtensions=[]),i.contains&&i.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return i.classNameAliases=Rn(i.classNameAliases||{}),r(i)}function Tl(i){return i?i.endsWithParent||Tl(i.starts):!1}function Hd(i){return i.variants&&!i.cachedVariants&&(i.cachedVariants=i.variants.map(function(t){return Rn(i,{variants:null},t)})),i.cachedVariants?i.cachedVariants:Tl(i)?Rn(i,{starts:i.starts?Rn(i.starts):null}):Object.isFrozen(i)?Rn(i):i}var Vd="11.11.1",Ra=class extends Error{constructor(t,e){super(t),this.name="HTMLInjectionError",this.html=e}},Ea=_l,pl=Rn,ml=Symbol("nomatch"),Gd=7,Al=function(i){let t=Object.create(null),e=Object.create(null),n=[],s=!0,r="Could not find the language '{}', did you forget to load/include a language module?",a={disableAutodetect:!0,name:"Plain text",contains:[]},o={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:Aa};function c(F){return o.noHighlightRe.test(F)}function l(F){let V=F.className+" ";V+=F.parentNode?F.parentNode.className:"";let O=o.languageDetectRe.exec(V);if(O){let lt=U(O[1]);return lt||(fl(r.replace("{}",O[1])),fl("Falling back to no-highlight mode for this block.",F)),lt?O[1]:"no-highlight"}return V.split(/\s+/).find(lt=>c(lt)||U(lt))}function u(F,V,O){let lt="",mt="";typeof V=="object"?(lt=F,O=V.ignoreIllegals,mt=V.language):(gi("10.7.0","highlight(lang, code, ...args) has been deprecated."),gi("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),mt=F,lt=V),O===void 0&&(O=!0);let vt={code:lt,language:mt};K("before:highlight",vt);let Ct=vt.result?vt.result:d(vt.language,vt.code,O);return Ct.code=vt.code,K("after:highlight",Ct),Ct}function d(F,V,O,lt){let mt=Object.create(null);function vt(H,ut){return H.keywords[ut]}function Ct(){if(!I.keywords){it.addText(E);return}let H=0;I.keywordPatternRe.lastIndex=0;let ut=I.keywordPatternRe.exec(E),dt="";for(;ut;){dt+=E.substring(H,ut.index);let yt=et.case_insensitive?ut[0].toLowerCase():ut[0],It=vt(I,yt);if(It){let[xt,At]=It;if(it.addText(dt),dt="",mt[yt]=(mt[yt]||0)+1,mt[yt]<=Gd&&(v+=At),xt.startsWith("_"))dt+=ut[0];else{let Ut=et.classNameAliases[xt]||xt;P(ut[0],Ut)}}else dt+=ut[0];H=I.keywordPatternRe.lastIndex,ut=I.keywordPatternRe.exec(E)}dt+=E.substring(H),it.addText(dt)}function Xt(){if(E==="")return;let H=null;if(typeof I.subLanguage=="string"){if(!t[I.subLanguage]){it.addText(E);return}H=d(I.subLanguage,E,!0,L[I.subLanguage]),L[I.subLanguage]=H._top}else H=m(E,I.subLanguage.length?I.subLanguage:null);I.relevance>0&&(v+=H.relevance),it.__addSublanguage(H._emitter,H.language)}function D(){I.subLanguage!=null?Xt():Ct(),E=""}function P(H,ut){H!==""&&(it.startScope(ut),it.addText(H),it.endScope())}function R(H,ut){let dt=1,yt=ut.length-1;for(;dt<=yt;){if(!H._emit[dt]){dt++;continue}let It=et.classNameAliases[H[dt]]||H[dt],xt=ut[dt];It?P(xt,It):(E=xt,Ct(),E=""),dt++}}function S(H,ut){return H.scope&&typeof H.scope=="string"&&it.openNode(et.classNameAliases[H.scope]||H.scope),H.beginScope&&(H.beginScope._wrap?(P(E,et.classNameAliases[H.beginScope._wrap]||H.beginScope._wrap),E=""):H.beginScope._multi&&(R(H.beginScope,ut),E="")),I=Object.create(H,{parent:{value:I}}),I}function Q(H,ut,dt){let yt=ad(H.endRe,dt);if(yt){if(H["on:end"]){let It=new Bs(H);H["on:end"](ut,It),It.isMatchIgnored&&(yt=!1)}if(yt){for(;H.endsParent&&H.parent;)H=H.parent;return H}}if(H.endsWithParent)return Q(H.parent,ut,dt)}function ht(H){return I.matcher.regexIndex===0?(E+=H[0],1):(pt=!0,0)}function J(H){let ut=H[0],dt=H.rule,yt=new Bs(dt),It=[dt.__beforeBegin,dt["on:begin"]];for(let xt of It)if(xt&&(xt(H,yt),yt.isMatchIgnored))return ht(ut);return dt.skip?E+=ut:(dt.excludeBegin&&(E+=ut),D(),!dt.returnBegin&&!dt.excludeBegin&&(E=ut)),S(dt,H),dt.returnBegin?0:ut.length}function gt(H){let ut=H[0],dt=V.substring(H.index),yt=Q(I,H,dt);if(!yt)return ml;let It=I;I.endScope&&I.endScope._wrap?(D(),P(ut,I.endScope._wrap)):I.endScope&&I.endScope._multi?(D(),R(I.endScope,H)):It.skip?E+=ut:(It.returnEnd||It.excludeEnd||(E+=ut),D(),It.excludeEnd&&(E=ut));do I.scope&&it.closeNode(),!I.skip&&!I.subLanguage&&(v+=I.relevance),I=I.parent;while(I!==yt.parent);return yt.starts&&S(yt.starts,H),It.returnEnd?0:ut.length}function Z(){let H=[];for(let ut=I;ut!==et;ut=ut.parent)ut.scope&&H.unshift(ut.scope);H.forEach(ut=>it.openNode(ut))}let j={};function b(H,ut){let dt=ut&&ut[0];if(E+=H,dt==null)return D(),0;if(j.type==="begin"&&ut.type==="end"&&j.index===ut.index&&dt===""){if(E+=V.slice(ut.index,ut.index+1),!s){let yt=new Error(`0 width match regex (${F})`);throw yt.languageName=F,yt.badRule=j.rule,yt}return 1}if(j=ut,ut.type==="begin")return J(ut);if(ut.type==="illegal"&&!O){let yt=new Error('Illegal lexeme "'+dt+'" for mode "'+(I.scope||"<unnamed>")+'"');throw yt.mode=I,yt}else if(ut.type==="end"){let yt=gt(ut);if(yt!==ml)return yt}if(ut.type==="illegal"&&dt==="")return E+=`
`,1;if(rt>1e5&&rt>ut.index*3)throw new Error("potential infinite loop, way more iterations than matches");return E+=dt,dt.length}let et=U(F);if(!et)throw $n(r.replace("{}",F)),new Error('Unknown language: "'+F+'"');let tt=kd(et),at="",I=lt||tt,L={},it=new o.__emitter(o);Z();let E="",v=0,Y=0,rt=0,pt=!1;try{if(et.__emitTokens)et.__emitTokens(V,it);else{for(I.matcher.considerAll();;){rt++,pt?pt=!1:I.matcher.considerAll(),I.matcher.lastIndex=Y;let H=I.matcher.exec(V);if(!H)break;let ut=V.substring(Y,H.index),dt=b(ut,H);Y=H.index+dt}b(V.substring(Y))}return it.finalize(),at=it.toHTML(),{language:F,value:at,relevance:v,illegal:!1,_emitter:it,_top:I}}catch(H){if(H.message&&H.message.includes("Illegal"))return{language:F,value:Ea(V),illegal:!0,relevance:0,_illegalBy:{message:H.message,index:Y,context:V.slice(Y-100,Y+100),mode:H.mode,resultSoFar:at},_emitter:it};if(s)return{language:F,value:Ea(V),illegal:!1,relevance:0,errorRaised:H,_emitter:it,_top:I};throw H}}function f(F){let V={value:Ea(F),illegal:!1,relevance:0,_top:a,_emitter:new o.__emitter(o)};return V._emitter.addText(F),V}function m(F,V){V=V||o.languages||Object.keys(t);let O=f(F),lt=V.filter(U).filter(M).map(D=>d(D,F,!1));lt.unshift(O);let mt=lt.sort((D,P)=>{if(D.relevance!==P.relevance)return P.relevance-D.relevance;if(D.language&&P.language){if(U(D.language).supersetOf===P.language)return 1;if(U(P.language).supersetOf===D.language)return-1}return 0}),[vt,Ct]=mt,Xt=vt;return Xt.secondBest=Ct,Xt}function g(F,V,O){let lt=V&&e[V]||O;F.classList.add("hljs"),F.classList.add(`language-${lt}`)}function _(F){let V=null,O=l(F);if(c(O))return;if(K("before:highlightElement",{el:F,language:O}),F.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",F);return}if(F.children.length>0&&(o.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(F)),o.throwUnescapedHTML))throw new Ra("One of your code blocks includes unescaped HTML.",F.innerHTML);V=F;let lt=V.textContent,mt=O?u(lt,{language:O,ignoreIllegals:!0}):m(lt);F.innerHTML=mt.value,F.dataset.highlighted="yes",g(F,O,mt.language),F.result={language:mt.language,re:mt.relevance,relevance:mt.relevance},mt.secondBest&&(F.secondBest={language:mt.secondBest.language,relevance:mt.secondBest.relevance}),K("after:highlightElement",{el:F,result:mt,text:lt})}function p(F){o=pl(o,F)}let h=()=>{x(),gi("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function T(){x(),gi("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let y=!1;function x(){function F(){x()}if(document.readyState==="loading"){y||window.addEventListener("DOMContentLoaded",F,!1),y=!0;return}document.querySelectorAll(o.cssSelector).forEach(_)}function B(F,V){let O=null;try{O=V(i)}catch(lt){if($n("Language definition for '{}' could not be registered.".replace("{}",F)),s)$n(lt);else throw lt;O=a}O.name||(O.name=F),t[F]=O,O.rawDefinition=V.bind(null,i),O.aliases&&w(O.aliases,{languageName:F})}function C(F){delete t[F];for(let V of Object.keys(e))e[V]===F&&delete e[V]}function N(){return Object.keys(t)}function U(F){return F=(F||"").toLowerCase(),t[F]||t[e[F]]}function w(F,{languageName:V}){typeof F=="string"&&(F=[F]),F.forEach(O=>{e[O.toLowerCase()]=V})}function M(F){let V=U(F);return V&&!V.disableAutodetect}function z(F){F["before:highlightBlock"]&&!F["before:highlightElement"]&&(F["before:highlightElement"]=V=>{F["before:highlightBlock"](Object.assign({block:V.el},V))}),F["after:highlightBlock"]&&!F["after:highlightElement"]&&(F["after:highlightElement"]=V=>{F["after:highlightBlock"](Object.assign({block:V.el},V))})}function G(F){z(F),n.push(F)}function $(F){let V=n.indexOf(F);V!==-1&&n.splice(V,1)}function K(F,V){let O=F;n.forEach(function(lt){lt[O]&&lt[O](V)})}function ct(F){return gi("10.7.0","highlightBlock will be removed entirely in v12.0"),gi("10.7.0","Please use highlightElement now."),_(F)}Object.assign(i,{highlight:u,highlightAuto:m,highlightAll:x,highlightElement:_,highlightBlock:ct,configure:p,initHighlighting:h,initHighlightingOnLoad:T,registerLanguage:B,unregisterLanguage:C,listLanguages:N,getLanguage:U,registerAliases:w,autoDetection:M,inherit:pl,addPlugin:G,removePlugin:$}),i.debugMode=function(){s=!1},i.safeMode=function(){s=!0},i.versionString=Vd,i.regex={concat:Zn,lookahead:xl,either:Ca,optional:sd,anyNumberOfTimes:id};for(let F in Fs)typeof Fs[F]=="object"&&gl(Fs[F]);return Object.assign(i,Fs),i},_i=Al({});_i.newInstance=()=>Al({});Rl.exports=_i;_i.HighlightJS=_i;_i.default=_i});var Il=td(Cl(),1);var We=Il.default;var xi="[0-9](_*[0-9])*",Hs=`\\.(${xi})`,Vs="[0-9a-fA-F](_*[0-9a-fA-F])*",Pl={className:"number",variants:[{begin:`(\\b(${xi})((${Hs})|\\.)?|(${Hs}))[eE][+-]?(${xi})[fFdD]?\\b`},{begin:`\\b(${xi})((${Hs})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${Hs})[fFdD]?\\b`},{begin:`\\b(${xi})[fFdD]\\b`},{begin:`\\b0[xX]((${Vs})\\.?|(${Vs})?\\.(${Vs}))[pP][+-]?(${xi})[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${Vs})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};function Ll(i,t,e){return e===-1?"":i.replace(t,n=>Ll(i,t,e-1))}function Nl(i){let t=i.regex,e="[\xC0-\u02B8a-zA-Z_$][\xC0-\u02B8a-zA-Z_$0-9]*",n=e+Ll("(?:<"+e+"~~~(?:\\s*,\\s*"+e+"~~~)*>)?",/~~~/g,2),c={keyword:["synchronized","abstract","private","var","static","if","const ","for","while","strictfp","finally","protected","import","native","final","void","enum","else","break","transient","catch","instanceof","volatile","case","assert","package","default","public","try","switch","continue","throws","protected","public","private","module","requires","exports","do","sealed","yield","permits","goto","when"],literal:["false","true","null"],type:["char","boolean","long","float","int","byte","short","double"],built_in:["super","this"]},l={className:"meta",begin:"@"+e,contains:[{begin:/\(/,end:/\)/,contains:["self"]}]},u={className:"params",begin:/\(/,end:/\)/,keywords:c,relevance:0,contains:[i.C_BLOCK_COMMENT_MODE],endsParent:!0};return{name:"Java",aliases:["jsp"],keywords:c,illegal:/<\/|#/,contains:[i.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{begin:/\w+@/,relevance:0},{className:"doctag",begin:"@[A-Za-z]+"}]}),{begin:/import java\.[a-z]+\./,keywords:"import",relevance:2},i.C_LINE_COMMENT_MODE,i.C_BLOCK_COMMENT_MODE,{begin:/"""/,end:/"""/,className:"string",contains:[i.BACKSLASH_ESCAPE]},i.APOS_STRING_MODE,i.QUOTE_STRING_MODE,{match:[/\b(?:class|interface|enum|extends|implements|new)/,/\s+/,e],className:{1:"keyword",3:"title.class"}},{match:/non-sealed/,scope:"keyword"},{begin:[t.concat(/(?!else)/,e),/\s+/,e,/\s+/,/=(?!=)/],className:{1:"type",3:"variable",5:"operator"}},{begin:[/record/,/\s+/,e],className:{1:"keyword",3:"title.class"},contains:[u,i.C_LINE_COMMENT_MODE,i.C_BLOCK_COMMENT_MODE]},{beginKeywords:"new throw return else",relevance:0},{begin:["(?:"+n+"\\s+)",i.UNDERSCORE_IDENT_RE,/\s*(?=\()/],className:{2:"title.function"},keywords:c,contains:[{className:"params",begin:/\(/,end:/\)/,keywords:c,relevance:0,contains:[l,i.APOS_STRING_MODE,i.QUOTE_STRING_MODE,Pl,i.C_BLOCK_COMMENT_MODE]},i.C_LINE_COMMENT_MODE,i.C_BLOCK_COMMENT_MODE]},Pl,l]}}var yi="[0-9](_*[0-9])*",Gs=`\\.(${yi})`,Ws="[0-9a-fA-F](_*[0-9a-fA-F])*",Wd={className:"number",variants:[{begin:`(\\b(${yi})((${Gs})|\\.)?|(${Gs}))[eE][+-]?(${yi})[fFdD]?\\b`},{begin:`\\b(${yi})((${Gs})[fFdD]?\\b|\\.([fFdD]\\b)?)`},{begin:`(${Gs})[fFdD]?\\b`},{begin:`\\b(${yi})[fFdD]\\b`},{begin:`\\b0[xX]((${Ws})\\.?|(${Ws})?\\.(${Ws}))[pP][+-]?(${yi})[fFdD]?\\b`},{begin:"\\b(0|[1-9](_*[0-9])*)[lL]?\\b"},{begin:`\\b0[xX](${Ws})[lL]?\\b`},{begin:"\\b0(_*[0-7])*[lL]?\\b"},{begin:"\\b0[bB][01](_*[01])*[lL]?\\b"}],relevance:0};function Dl(i){let t={keyword:"abstract as val var vararg get set class object open private protected public noinline crossinline dynamic final enum if else do while for when throw try catch finally import package is in fun override companion reified inline lateinit init interface annotation data sealed internal infix operator out by constructor super tailrec where const inner suspend typealias external expect actual",built_in:"Byte Short Char Int Long Boolean Float Double Void Unit Nothing",literal:"true false null"},e={className:"keyword",begin:/\b(break|continue|return|this)\b/,starts:{contains:[{className:"symbol",begin:/@\w+/}]}},n={className:"symbol",begin:i.UNDERSCORE_IDENT_RE+"@"},s={className:"subst",begin:/\$\{/,end:/\}/,contains:[i.C_NUMBER_MODE]},r={className:"variable",begin:"\\$"+i.UNDERSCORE_IDENT_RE},a={className:"string",variants:[{begin:'"""',end:'"""(?=[^"])',contains:[r,s]},{begin:"'",end:"'",illegal:/\n/,contains:[i.BACKSLASH_ESCAPE]},{begin:'"',end:'"',illegal:/\n/,contains:[i.BACKSLASH_ESCAPE,r,s]}]};s.contains.push(a);let o={className:"meta",begin:"@(?:file|property|field|get|set|receiver|param|setparam|delegate)\\s*:(?:\\s*"+i.UNDERSCORE_IDENT_RE+")?"},c={className:"meta",begin:"@"+i.UNDERSCORE_IDENT_RE,contains:[{begin:/\(/,end:/\)/,contains:[i.inherit(a,{className:"string"}),"self"]}]},l=Wd,u=i.COMMENT("/\\*","\\*/",{contains:[i.C_BLOCK_COMMENT_MODE]}),d={variants:[{className:"type",begin:i.UNDERSCORE_IDENT_RE},{begin:/\(/,end:/\)/,contains:[]}]},f=d;return f.variants[1].contains=[d],d.variants[1].contains=[f],{name:"Kotlin",aliases:["kt","kts"],keywords:t,contains:[i.COMMENT("/\\*\\*","\\*/",{relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"}]}),i.C_LINE_COMMENT_MODE,u,e,n,o,c,{className:"function",beginKeywords:"fun",end:"[(]|$",returnBegin:!0,excludeEnd:!0,keywords:t,relevance:5,contains:[{begin:i.UNDERSCORE_IDENT_RE+"\\s*\\(",returnBegin:!0,relevance:0,contains:[i.UNDERSCORE_TITLE_MODE]},{className:"type",begin:/</,end:/>/,keywords:"reified",relevance:0},{className:"params",begin:/\(/,end:/\)/,endsParent:!0,keywords:t,relevance:0,contains:[{begin:/:/,end:/[=,\/]/,endsWithParent:!0,contains:[d,i.C_LINE_COMMENT_MODE,u],relevance:0},i.C_LINE_COMMENT_MODE,u,o,c,a,i.C_NUMBER_MODE]},u]},{begin:[/class|interface|trait/,/\s+/,i.UNDERSCORE_IDENT_RE],beginScope:{3:"title.class"},keywords:"class interface trait",end:/[:\{(]|$/,excludeEnd:!0,illegal:"extends implements",contains:[{beginKeywords:"public protected internal private constructor"},i.UNDERSCORE_TITLE_MODE,{className:"type",begin:/</,end:/>/,excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:/[,:]\s*/,end:/[<\(,){\s]|$/,excludeBegin:!0,returnEnd:!0},o,c]},a,{className:"meta",begin:"^#!/usr/bin/env",end:"$",illegal:`
`},l]}}function Ul(i){let t=i.regex,e=/[\p{XID_Start}_]\p{XID_Continue}*/u,n=["and","as","assert","async","await","break","case","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","match","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],o={$pattern:/[A-Za-z]\w+|__\w+__/,keyword:n,built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]},c={className:"meta",begin:/^(>>>|\.\.\.) /},l={className:"subst",begin:/\{/,end:/\}/,keywords:o,illegal:/#/},u={begin:/\{\{/,relevance:0},d={className:"string",contains:[i.BACKSLASH_ESCAPE],variants:[{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,contains:[i.BACKSLASH_ESCAPE,c],relevance:10},{begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,contains:[i.BACKSLASH_ESCAPE,c],relevance:10},{begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,contains:[i.BACKSLASH_ESCAPE,c,u,l]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,end:/"""/,contains:[i.BACKSLASH_ESCAPE,c,u,l]},{begin:/([uU]|[rR])'/,end:/'/,relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,contains:[i.BACKSLASH_ESCAPE,u,l]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,contains:[i.BACKSLASH_ESCAPE,u,l]},i.APOS_STRING_MODE,i.QUOTE_STRING_MODE]},f="[0-9](_?[0-9])*",m=`(\\b(${f}))?\\.(${f})|\\b(${f})\\.`,g=`\\b|${n.join("|")}`,_={className:"number",relevance:0,variants:[{begin:`(\\b(${f})|(${m}))[eE][+-]?(${f})[jJ]?(?=${g})`},{begin:`(${m})[jJ]?`},{begin:`\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?(?=${g})`},{begin:`\\b0[bB](_?[01])+[lL]?(?=${g})`},{begin:`\\b0[oO](_?[0-7])+[lL]?(?=${g})`},{begin:`\\b0[xX](_?[0-9a-fA-F])+[lL]?(?=${g})`},{begin:`\\b(${f})[jJ](?=${g})`}]},p={className:"comment",begin:t.lookahead(/# type:/),end:/$/,keywords:o,contains:[{begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},h={className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:["self",c,_,d,i.HASH_COMMENT_MODE]}]};return l.contains=[d,_,c],{name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:o,illegal:/(<\/|\?)|=>/,contains:[c,_,{scope:"variable.language",match:/\bself\b/},{beginKeywords:"if",relevance:0},{match:/\bor\b/,scope:"keyword"},d,p,i.HASH_COMMENT_MODE,{match:[/\bdef/,/\s+/,e],scope:{1:"keyword",3:"title.function"},contains:[h]},{variants:[{match:[/\bclass/,/\s+/,e,/\s*/,/\(\s*/,e,/\s*\)/]},{match:[/\bclass/,/\s+/,e]}],scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[_,h,d]}]}}function Ol(i){let t=i.regex,e={},n={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[e]}]};Object.assign(e,{className:"variable",variants:[{begin:t.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},n]});let s={className:"subst",begin:/\$\(/,end:/\)/,contains:[i.BACKSLASH_ESCAPE]},r=i.inherit(i.COMMENT(),{match:[/(^|\s)/,/#.*$/],scope:{2:"comment"}}),a={begin:/<<-?\s*(?=\w+)/,starts:{contains:[i.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},o={className:"string",begin:/"/,end:/"/,contains:[i.BACKSLASH_ESCAPE,e,s]};s.contains.push(o);let c={match:/\\"/},l={className:"string",begin:/'/,end:/'/},u={match:/\\'/},d={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},i.NUMBER_MODE,e]},f=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],m=i.SHEBANG({binary:`(${f.join("|")})`,relevance:10}),g={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[i.inherit(i.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},_=["if","then","else","elif","fi","time","for","while","until","in","do","done","case","esac","coproc","function","select"],p=["true","false"],h={match:/(\/[a-z._-]+)+/},T=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],y=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","sudo","type","typeset","ulimit","unalias"],x=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],B=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh","zsh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:_,literal:p,built_in:[...T,...y,"set","shopt",...x,...B]},contains:[m,i.SHEBANG(),g,d,r,a,h,o,c,l,u,e]}}function Fl(i){let t={className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},e={match:/[{}[\],:]/,className:"punctuation",relevance:0},n=["true","false","null"],s={scope:"literal",beginKeywords:n.join(" ")};return{name:"JSON",aliases:["jsonc"],keywords:{literal:n},contains:[t,e,i.QUOTE_STRING_MODE,s,i.C_NUMBER_MODE,i.C_LINE_COMMENT_MODE,i.C_BLOCK_COMMENT_MODE],illegal:"\\S"}}function Bl(i){let t=i.regex,e=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),n=/[\p{L}0-9._:-]+/u,s={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},r={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},a=i.inherit(r,{begin:/\(/,end:/\)/}),o=i.inherit(i.APOS_STRING_MODE,{className:"string"}),c=i.inherit(i.QUOTE_STRING_MODE,{className:"string"}),l={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:n,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[s]},{begin:/'/,end:/'/,contains:[s]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[r,c,o,a,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[r,a,c,o]}]}]},i.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},s,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[c]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[l],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[l],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(e,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:e,relevance:0,starts:l}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(e,/>/))),contains:[{className:"name",begin:e,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}function zl(i){let t="true false yes no null",e="[\\w#;/?:@&=+$,.~*'()[\\]]+",n={className:"attr",variants:[{begin:/[\w*@][\w*@ :()\./-]*:(?=[ \t]|$)/},{begin:/"[\w*@][\w*@ :()\./-]*":(?=[ \t]|$)/},{begin:/'[\w*@][\w*@ :()\./-]*':(?=[ \t]|$)/}]},s={className:"template-variable",variants:[{begin:/\{\{/,end:/\}\}/},{begin:/%\{/,end:/\}/}]},r={className:"string",relevance:0,begin:/'/,end:/'/,contains:[{match:/''/,scope:"char.escape",relevance:0}]},a={className:"string",relevance:0,variants:[{begin:/"/,end:/"/},{begin:/\S+/}],contains:[i.BACKSLASH_ESCAPE,s]},o=i.inherit(a,{variants:[{begin:/'/,end:/'/,contains:[{begin:/''/,relevance:0}]},{begin:/"/,end:/"/},{begin:/[^\s,{}[\]]+/}]}),f={className:"number",begin:"\\b"+"[0-9]{4}(-[0-9][0-9]){0,2}"+"([Tt \\t][0-9][0-9]?(:[0-9][0-9]){2})?"+"(\\.[0-9]*)?"+"([ \\t])*(Z|[-+][0-9][0-9]?(:[0-9][0-9])?)?"+"\\b"},m={end:",",endsWithParent:!0,excludeEnd:!0,keywords:t,relevance:0},g={begin:/\{/,end:/\}/,contains:[m],illegal:"\\n",relevance:0},_={begin:"\\[",end:"\\]",contains:[m],illegal:"\\n",relevance:0},p=[n,{className:"meta",begin:"^---\\s*$",relevance:10},{className:"string",begin:"[\\|>]([1-9]?[+-])?[ ]*\\n( +)[^ ][^\\n]*\\n(\\2[^\\n]+\\n?)*"},{begin:"<%[%=-]?",end:"[%-]?%>",subLanguage:"ruby",excludeBegin:!0,excludeEnd:!0,relevance:0},{className:"type",begin:"!\\w+!"+e},{className:"type",begin:"!<"+e+">"},{className:"type",begin:"!"+e},{className:"type",begin:"!!"+e},{className:"meta",begin:"&"+i.UNDERSCORE_IDENT_RE+"$"},{className:"meta",begin:"\\*"+i.UNDERSCORE_IDENT_RE+"$"},{className:"bullet",begin:"-(?=[ ]|$)",relevance:0},i.HASH_COMMENT_MODE,{beginKeywords:t,keywords:{literal:t}},f,{className:"number",begin:i.C_NUMBER_RE+"\\b",relevance:0},g,_,r,a],h=[...p];return h.pop(),h.push(o),m.contains=h,{name:"YAML",case_insensitive:!0,aliases:["yml"],contains:p}}function kl(i){let t="[ \\t\\f]*",e="[ \\t\\f]+",n=t+"[:=]"+t,s=e,r="("+n+"|"+s+")",a="([^\\\\:= \\t\\f\\n]|\\\\.)+",o={end:r,relevance:0,starts:{className:"string",end:/$/,relevance:0,contains:[{begin:"\\\\\\\\"},{begin:"\\\\\\n"}]}};return{name:".properties",disableAutodetect:!0,case_insensitive:!0,illegal:/\S/,contains:[i.COMMENT("^\\s*[!#]","$"),{returnBegin:!0,variants:[{begin:a+n},{begin:a+s}],contains:[{className:"attr",begin:a,endsParent:!0}],starts:o},{className:"attr",begin:a+t+"$"}]}}function Hl(i){return{name:"Plain text",aliases:["text","txt"],disableAutodetect:!0}}var Bc="170";var Xd=0,Vl=1,qd=2;var nu=1,zc=2,_n=3,Hn=0,Ie=1,yn=2,Fn=0,Fi=1,Gl=2,Wl=3,Xl=4,Yd=5,ii=100,$d=101,Zd=102,Jd=103,Kd=104,Qd=200,jd=201,tf=202,ef=203,fo=204,po=205,nf=206,sf=207,rf=208,af=209,of=210,cf=211,lf=212,hf=213,uf=214,mo=0,go=1,_o=2,Vi=3,xo=4,yo=5,vo=6,Mo=7,iu=0,df=1,ff=2,Bn=0,pf=1,mf=2,gf=3,_f=4,xf=5,yf=6,vf=7;var su=300,Gi=301,Wi=302,bo=303,So=304,ra=306,Eo=1e3,ri=1001,wo=1002,Ze=1003,Mf=1004;var Xs=1005;var tn=1006,La=1007;var ai=1008;var Sn=1009,ru=1010,au=1011,xs=1012,kc=1013,oi=1014,vn=1015,Ps=1016,Hc=1017,Vc=1018,Xi=1020,ou=35902,cu=1021,lu=1022,$e=1023,hu=1024,uu=1025,Bi=1026,qi=1027,du=1028,Gc=1029,fu=1030,Wc=1031;var Xc=1033,Mr=33776,br=33777,Sr=33778,Er=33779,To=35840,Ao=35841,Ro=35842,Co=35843,Io=36196,Po=37492,Lo=37496,No=37808,Do=37809,Uo=37810,Oo=37811,Fo=37812,Bo=37813,zo=37814,ko=37815,Ho=37816,Vo=37817,Go=37818,Wo=37819,Xo=37820,qo=37821,wr=36492,Yo=36494,$o=36495,pu=36283,Zo=36284,Jo=36285,Ko=36286;var Tr=2300,Qo=2301,Na=2302,ql=2400,Yl=2401,$l=2402;var bf=3200,Sf=3201;var mu=0,Ef=1,Un="",Ee="srgb",ji="srgb-linear",aa="linear",jt="srgb";var vi=7680;var Zl=519,wf=512,Tf=513,Af=514,gu=515,Rf=516,Cf=517,If=518,Pf=519,Jl=35044;var Kl="300 es",Mn=2e3,Ar=2001,Vn=class{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;let n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;let s=this._listeners[t];if(s!==void 0){let r=s.indexOf(e);r!==-1&&s.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;let n=this._listeners[t.type];if(n!==void 0){t.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,t);t.target=null}}},be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ql=1234567,zi=Math.PI/180,ys=180/Math.PI;function fi(){let i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(be[i&255]+be[i>>8&255]+be[i>>16&255]+be[i>>24&255]+"-"+be[t&255]+be[t>>8&255]+"-"+be[t>>16&15|64]+be[t>>24&255]+"-"+be[e&63|128]+be[e>>8&255]+"-"+be[e>>16&255]+be[e>>24&255]+be[n&255]+be[n>>8&255]+be[n>>16&255]+be[n>>24&255]).toLowerCase()}function de(i,t,e){return Math.max(t,Math.min(e,i))}function qc(i,t){return(i%t+t)%t}function Lf(i,t,e,n,s){return n+(i-t)*(s-n)/(e-t)}function Nf(i,t,e){return i!==t?(e-i)/(t-i):0}function ps(i,t,e){return(1-e)*i+e*t}function Df(i,t,e,n){return ps(i,t,1-Math.exp(-e*n))}function Uf(i,t=1){return t-Math.abs(qc(i,t*2)-t)}function Of(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*(3-2*i))}function Ff(i,t,e){return i<=t?0:i>=e?1:(i=(i-t)/(e-t),i*i*i*(i*(i*6-15)+10))}function Bf(i,t){return i+Math.floor(Math.random()*(t-i+1))}function zf(i,t){return i+Math.random()*(t-i)}function kf(i){return i*(.5-Math.random())}function Hf(i){i!==void 0&&(Ql=i);let t=Ql+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Vf(i){return i*zi}function Gf(i){return i*ys}function Wf(i){return(i&i-1)===0&&i!==0}function Xf(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function qf(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Yf(i,t,e,n,s){let r=Math.cos,a=Math.sin,o=r(e/2),c=a(e/2),l=r((t+n)/2),u=a((t+n)/2),d=r((t-n)/2),f=a((t-n)/2),m=r((n-t)/2),g=a((n-t)/2);switch(s){case"XYX":i.set(o*u,c*d,c*f,o*l);break;case"YZY":i.set(c*f,o*u,c*d,o*l);break;case"ZXZ":i.set(c*d,c*f,o*u,o*l);break;case"XZX":i.set(o*u,c*g,c*m,o*l);break;case"YXY":i.set(c*m,o*u,c*g,o*l);break;case"ZYZ":i.set(c*g,c*m,o*u,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Di(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Te(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var He={DEG2RAD:zi,RAD2DEG:ys,generateUUID:fi,clamp:de,euclideanModulo:qc,mapLinear:Lf,inverseLerp:Nf,lerp:ps,damp:Df,pingpong:Uf,smoothstep:Of,smootherstep:Ff,randInt:Bf,randFloat:zf,randFloatSpread:kf,seededRandom:Hf,degToRad:Vf,radToDeg:Gf,isPowerOfTwo:Wf,ceilPowerOfTwo:Xf,floorPowerOfTwo:qf,setQuaternionFromProperEuler:Yf,normalize:Te,denormalize:Di},ft=class i{constructor(t=0,e=0){i.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){let e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(de(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){let n=Math.cos(e),s=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*s+t.x,this.y=r*s+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Ot=class i{constructor(t,e,n,s,r,a,o,c,l){i.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l)}set(t,e,n,s,r,a,o,c,l){let u=this.elements;return u[0]=t,u[1]=s,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){let e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],d=n[7],f=n[2],m=n[5],g=n[8],_=s[0],p=s[3],h=s[6],T=s[1],y=s[4],x=s[7],B=s[2],C=s[5],N=s[8];return r[0]=a*_+o*T+c*B,r[3]=a*p+o*y+c*C,r[6]=a*h+o*x+c*N,r[1]=l*_+u*T+d*B,r[4]=l*p+u*y+d*C,r[7]=l*h+u*x+d*N,r[2]=f*_+m*T+g*B,r[5]=f*p+m*y+g*C,r[8]=f*h+m*x+g*N,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+s*r*l-s*a*c}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],d=u*a-o*l,f=o*c-u*r,m=l*r-a*c,g=e*d+n*f+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let _=1/g;return t[0]=d*_,t[1]=(s*l-u*n)*_,t[2]=(o*n-s*a)*_,t[3]=f*_,t[4]=(u*e-s*c)*_,t[5]=(s*r-o*e)*_,t[6]=m*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t,e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){let e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,r,a,o){let c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-s*l,s*c,-s*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Da.makeScale(t,e)),this}rotate(t){return this.premultiply(Da.makeRotation(-t)),this}translate(t,e){return this.premultiply(Da.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}},Da=new Ot;function _u(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function Rr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function $f(){let i=Rr("canvas");return i.style.display="block",i}var jl={};function ds(i){i in jl||(jl[i]=!0,console.warn(i))}function Zf(i,t,e){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function Jf(i){let t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Kf(i){let t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}var $t={enabled:!0,workingColorSpace:ji,spaces:{},convert:function(i,t,e){return this.enabled===!1||t===e||!t||!e||(this.spaces[t].transfer===jt&&(i.r=bn(i.r),i.g=bn(i.g),i.b=bn(i.b)),this.spaces[t].primaries!==this.spaces[e].primaries&&(i.applyMatrix3(this.spaces[t].toXYZ),i.applyMatrix3(this.spaces[e].fromXYZ)),this.spaces[e].transfer===jt&&(i.r=ki(i.r),i.g=ki(i.g),i.b=ki(i.b))),i},fromWorkingColorSpace:function(i,t){return this.convert(i,this.workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Un?aa:this.spaces[i].transfer},getLuminanceCoefficients:function(i,t=this.workingColorSpace){return i.fromArray(this.spaces[t].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,t,e){return i.copy(this.spaces[t].toXYZ).multiply(this.spaces[e].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}};function bn(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ki(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var th=[.64,.33,.3,.6,.15,.06],eh=[.2126,.7152,.0722],nh=[.3127,.329],ih=new Ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),sh=new Ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);$t.define({[ji]:{primaries:th,whitePoint:nh,transfer:aa,toXYZ:ih,fromXYZ:sh,luminanceCoefficients:eh,workingColorSpaceConfig:{unpackColorSpace:Ee},outputColorSpaceConfig:{drawingBufferColorSpace:Ee}},[Ee]:{primaries:th,whitePoint:nh,transfer:jt,toXYZ:ih,fromXYZ:sh,luminanceCoefficients:eh,outputColorSpaceConfig:{drawingBufferColorSpace:Ee}}});var Mi,jo=class{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Mi===void 0&&(Mi=Rr("canvas")),Mi.width=t.width,Mi.height=t.height;let n=Mi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Mi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){let e=Rr("canvas");e.width=t.width,e.height=t.height;let n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);let s=n.getImageData(0,0,t.width,t.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=bn(r[a]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){let e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(bn(e[n]/255)*255):e[n]=bn(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}},Qf=0,Cr=class{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Qf++}),this.uuid=fi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ua(s[a].image)):r.push(Ua(s[a]))}else r=Ua(s);n.url=r}return e||(t.images[this.uuid]=n),n}};function Ua(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?jo.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var jf=0,Oe=class i extends Vn{constructor(t=i.DEFAULT_IMAGE,e=i.DEFAULT_MAPPING,n=ri,s=ri,r=tn,a=ai,o=$e,c=Sn,l=i.DEFAULT_ANISOTROPY,u=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jf++}),this.uuid=fi(),this.name="",this.source=new Cr(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){let e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==su)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Eo:t.x=t.x-Math.floor(t.x);break;case ri:t.x=t.x<0?0:1;break;case wo:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Eo:t.y=t.y-Math.floor(t.y);break;case ri:t.y=t.y<0?0:1;break;case wo:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}};Oe.DEFAULT_IMAGE=null;Oe.DEFAULT_MAPPING=su;Oe.DEFAULT_ANISOTROPY=1;var le=class i{constructor(t=0,e=0,n=0,s=1){i.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*s+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);let e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,r,c=t.elements,l=c[0],u=c[4],d=c[8],f=c[1],m=c[5],g=c[9],_=c[2],p=c[6],h=c[10];if(Math.abs(u-f)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(u+f)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(l+m+h-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;let y=(l+1)/2,x=(m+1)/2,B=(h+1)/2,C=(u+f)/4,N=(d+_)/4,U=(g+p)/4;return y>x&&y>B?y<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(y),s=C/n,r=N/n):x>B?x<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(x),n=C/s,r=U/s):B<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(B),n=N/r,s=U/r),this.set(n,s,r,e),this}let T=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(f-u)*(f-u));return Math.abs(T)<.001&&(T=1),this.x=(p-g)/T,this.y=(d-_)/T,this.z=(f-u)/T,this.w=Math.acos((l+m+h-1)/2),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},tc=class extends Vn{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new le(0,0,t,e),this.scissorTest=!1,this.viewport=new le(0,0,t,e);let s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:tn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new Oe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let e=Object.assign({},t.texture.image);return this.texture.source=new Cr(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},En=class extends tc{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}},Ir=class extends Oe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}};var ec=class extends Oe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var en=class{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,r,a,o){let c=n[s+0],l=n[s+1],u=n[s+2],d=n[s+3],f=r[a+0],m=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d;return}if(o===1){t[e+0]=f,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(d!==_||c!==f||l!==m||u!==g){let p=1-o,h=c*f+l*m+u*g+d*_,T=h>=0?1:-1,y=1-h*h;if(y>Number.EPSILON){let B=Math.sqrt(y),C=Math.atan2(B,h*T);p=Math.sin(p*C)/B,o=Math.sin(o*C)/B}let x=o*T;if(c=c*p+f*x,l=l*p+m*x,u=u*p+g*x,d=d*p+_*x,p===1-o){let B=1/Math.sqrt(c*c+l*l+u*u+d*d);c*=B,l*=B,u*=B,d*=B}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,r,a){let o=n[s],c=n[s+1],l=n[s+2],u=n[s+3],d=r[a],f=r[a+1],m=r[a+2],g=r[a+3];return t[e]=o*g+u*d+c*m-l*f,t[e+1]=c*g+u*f+l*d-o*m,t[e+2]=l*g+u*m+o*f-c*d,t[e+3]=u*g-o*d-c*f-l*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){let n=t._x,s=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(s/2),d=o(r/2),f=c(n/2),m=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=f*u*d+l*m*g,this._y=l*m*d-f*u*g,this._z=l*u*g+f*m*d,this._w=l*u*d-f*m*g;break;case"YXZ":this._x=f*u*d+l*m*g,this._y=l*m*d-f*u*g,this._z=l*u*g-f*m*d,this._w=l*u*d+f*m*g;break;case"ZXY":this._x=f*u*d-l*m*g,this._y=l*m*d+f*u*g,this._z=l*u*g+f*m*d,this._w=l*u*d-f*m*g;break;case"ZYX":this._x=f*u*d-l*m*g,this._y=l*m*d+f*u*g,this._z=l*u*g-f*m*d,this._w=l*u*d+f*m*g;break;case"YZX":this._x=f*u*d+l*m*g,this._y=l*m*d+f*u*g,this._z=l*u*g-f*m*d,this._w=l*u*d-f*m*g;break;case"XZY":this._x=f*u*d-l*m*g,this._y=l*m*d-f*u*g,this._z=l*u*g+f*m*d,this._w=l*u*d+f*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){let n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){let e=t.elements,n=e[0],s=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],d=e[10],f=n+o+d;if(f>0){let m=.5/Math.sqrt(f+1);this._w=.25/m,this._x=(u-c)*m,this._y=(r-l)*m,this._z=(a-s)*m}else if(n>o&&n>d){let m=2*Math.sqrt(1+n-o-d);this._w=(u-c)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+l)/m}else if(o>d){let m=2*Math.sqrt(1+o-n-d);this._w=(r-l)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(c+u)/m}else{let m=2*Math.sqrt(1+d-n-o);this._w=(a-s)/m,this._x=(r+l)/m,this._y=(c+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(de(this.dot(t),-1,1)))}rotateTowards(t,e){let n=this.angleTo(t);if(n===0)return this;let s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){let n=t._x,s=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+s*l-r*c,this._y=s*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-s*o,this._w=a*u-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*t._w+n*t._x+s*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let c=1-o*o;if(c<=Number.EPSILON){let m=1-e;return this._w=m*a+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*r+e*this._z,this.normalize(),this}let l=Math.sqrt(c),u=Math.atan2(l,o),d=Math.sin((1-e)*u)/l,f=Math.sin(e*u)/l;return this._w=a*d+this._w*f,this._x=n*d+this._x*f,this._y=s*d+this._y*f,this._z=r*d+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){let t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class i{constructor(t=0,e=0,n=0){i.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(rh.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(rh.setFromAxisAngle(t,e))}applyMatrix3(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*s,this.y=r[1]*e+r[4]*n+r[7]*s,this.z=r[2]*e+r[5]*n+r[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){let e=this.x,n=this.y,s=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(t){let e=this.x,n=this.y,s=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=2*(a*s-o*n),u=2*(o*e-r*s),d=2*(r*n-a*e);return this.x=e+c*l+a*d-o*u,this.y=n+c*u+o*l-r*d,this.z=s+c*d+r*u-a*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){let e=this.x,n=this.y,s=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s,this.y=r[1]*e+r[5]*n+r[9]*s,this.z=r[2]*e+r[6]*n+r[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){let n=t.x,s=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(t){let e=t.lengthSq();if(e===0)return this.set(0,0,0);let n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Oa.copy(this).projectOnVector(t),this.sub(Oa)}reflect(t){return this.sub(Oa.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){let e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;let n=this.dot(t)/e;return Math.acos(de(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){let e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){let s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){let e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){let e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Oa=new k,rh=new en,ci=class{constructor(t=new k(1/0,1/0,1/0),e=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Xe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Xe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=Xe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);let n=t.geometry;if(n!==void 0){let r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,Xe):Xe.fromBufferAttribute(r,a),Xe.applyMatrix4(t.matrixWorld),this.expandByPoint(Xe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),qs.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),qs.copy(n.boundingBox)),qs.applyMatrix4(t.matrixWorld),this.union(qs)}let s=t.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Xe),Xe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(os),Ys.subVectors(this.max,os),bi.subVectors(t.a,os),Si.subVectors(t.b,os),Ei.subVectors(t.c,os),Cn.subVectors(Si,bi),In.subVectors(Ei,Si),Jn.subVectors(bi,Ei);let e=[0,-Cn.z,Cn.y,0,-In.z,In.y,0,-Jn.z,Jn.y,Cn.z,0,-Cn.x,In.z,0,-In.x,Jn.z,0,-Jn.x,-Cn.y,Cn.x,0,-In.y,In.x,0,-Jn.y,Jn.x,0];return!Fa(e,bi,Si,Ei,Ys)||(e=[1,0,0,0,1,0,0,0,1],!Fa(e,bi,Si,Ei,Ys))?!1:($s.crossVectors(Cn,In),e=[$s.x,$s.y,$s.z],Fa(e,bi,Si,Ei,Ys))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Xe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Xe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}},un=[new k,new k,new k,new k,new k,new k,new k,new k],Xe=new k,qs=new ci,bi=new k,Si=new k,Ei=new k,Cn=new k,In=new k,Jn=new k,os=new k,Ys=new k,$s=new k,Kn=new k;function Fa(i,t,e,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Kn.fromArray(i,r);let o=s.x*Math.abs(Kn.x)+s.y*Math.abs(Kn.y)+s.z*Math.abs(Kn.z),c=t.dot(Kn),l=e.dot(Kn),u=n.dot(Kn);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}var tp=new ci,cs=new k,Ba=new k,Yi=class{constructor(t=new k,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){let n=this.center;e!==void 0?n.copy(e):tp.setFromPoints(t).getCenter(n);let s=0;for(let r=0,a=t.length;r<a;r++)s=Math.max(s,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){let e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){let n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;cs.subVectors(t,this.center);let e=cs.lengthSq();if(e>this.radius*this.radius){let n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(cs,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ba.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(cs.copy(t.center).add(Ba)),this.expandByPoint(cs.copy(t.center).sub(Ba))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}},dn=new k,za=new k,Zs=new k,Pn=new k,ka=new k,Js=new k,Ha=new k,Pr=class{constructor(t=new k,e=new k(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,dn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);let n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){let e=dn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(dn.copy(this.origin).addScaledVector(this.direction,e),dn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){za.copy(t).add(e).multiplyScalar(.5),Zs.copy(e).sub(t).normalize(),Pn.copy(this.origin).sub(za);let r=t.distanceTo(e)*.5,a=-this.direction.dot(Zs),o=Pn.dot(this.direction),c=-Pn.dot(Zs),l=Pn.lengthSq(),u=Math.abs(1-a*a),d,f,m,g;if(u>0)if(d=a*c-o,f=a*o-c,g=r*u,d>=0)if(f>=-g)if(f<=g){let _=1/u;d*=_,f*=_,m=d*(d+a*f+2*o)+f*(a*d+f+2*c)+l}else f=r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;else f=-r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;else f<=-g?(d=Math.max(0,-(-a*r+o)),f=d>0?-r:Math.min(Math.max(-r,-c),r),m=-d*d+f*(f+2*c)+l):f<=g?(d=0,f=Math.min(Math.max(-r,-c),r),m=f*(f+2*c)+l):(d=Math.max(0,-(a*r+o)),f=d>0?r:Math.min(Math.max(-r,-c),r),m=-d*d+f*(f+2*c)+l);else f=a>0?-r:r,d=Math.max(0,-(a*f+o)),m=-d*d+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(za).addScaledVector(Zs,f),m}intersectSphere(t,e){dn.subVectors(t.center,this.origin);let n=dn.dot(this.direction),s=dn.dot(dn)-n*n,r=t.radius*t.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){let e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){let n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){let e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,r,a,o,c,l=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,s=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,s=(t.min.x-f.x)*l),u>=0?(r=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(t.min.z-f.z)*d,c=(t.max.z-f.z)*d):(o=(t.max.z-f.z)*d,c=(t.min.z-f.z)*d),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,dn)!==null}intersectTriangle(t,e,n,s,r){ka.subVectors(e,t),Js.subVectors(n,t),Ha.crossVectors(ka,Js);let a=this.direction.dot(Ha),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;Pn.subVectors(this.origin,t);let c=o*this.direction.dot(Js.crossVectors(Pn,Js));if(c<0)return null;let l=o*this.direction.dot(ka.cross(Pn));if(l<0||c+l>a)return null;let u=-o*Pn.dot(Ha);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ie=class i{constructor(t,e,n,s,r,a,o,c,l,u,d,f,m,g,_,p){i.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,r,a,o,c,l,u,d,f,m,g,_,p)}set(t,e,n,s,r,a,o,c,l,u,d,f,m,g,_,p){let h=this.elements;return h[0]=t,h[4]=e,h[8]=n,h[12]=s,h[1]=r,h[5]=a,h[9]=o,h[13]=c,h[2]=l,h[6]=u,h[10]=d,h[14]=f,h[3]=m,h[7]=g,h[11]=_,h[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new i().fromArray(this.elements)}copy(t){let e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){let e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){let e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){let e=this.elements,n=t.elements,s=1/wi.setFromMatrixColumn(t,0).length(),r=1/wi.setFromMatrixColumn(t,1).length(),a=1/wi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){let e=this.elements,n=t.x,s=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){let f=a*u,m=a*d,g=o*u,_=o*d;e[0]=c*u,e[4]=-c*d,e[8]=l,e[1]=m+g*l,e[5]=f-_*l,e[9]=-o*c,e[2]=_-f*l,e[6]=g+m*l,e[10]=a*c}else if(t.order==="YXZ"){let f=c*u,m=c*d,g=l*u,_=l*d;e[0]=f+_*o,e[4]=g*o-m,e[8]=a*l,e[1]=a*d,e[5]=a*u,e[9]=-o,e[2]=m*o-g,e[6]=_+f*o,e[10]=a*c}else if(t.order==="ZXY"){let f=c*u,m=c*d,g=l*u,_=l*d;e[0]=f-_*o,e[4]=-a*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=a*u,e[9]=_-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){let f=a*u,m=a*d,g=o*u,_=o*d;e[0]=c*u,e[4]=g*l-m,e[8]=f*l+_,e[1]=c*d,e[5]=_*l+f,e[9]=m*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){let f=a*c,m=a*l,g=o*c,_=o*l;e[0]=c*u,e[4]=_-f*d,e[8]=g*d+m,e[1]=d,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=m*d+g,e[10]=f-_*d}else if(t.order==="XZY"){let f=a*c,m=a*l,g=o*c,_=o*l;e[0]=c*u,e[4]=-d,e[8]=l*u,e[1]=f*d+_,e[5]=a*u,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*u,e[10]=_*d+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(ep,t,np)}lookAt(t,e,n){let s=this.elements;return Ne.subVectors(t,e),Ne.lengthSq()===0&&(Ne.z=1),Ne.normalize(),Ln.crossVectors(n,Ne),Ln.lengthSq()===0&&(Math.abs(n.z)===1?Ne.x+=1e-4:Ne.z+=1e-4,Ne.normalize(),Ln.crossVectors(n,Ne)),Ln.normalize(),Ks.crossVectors(Ne,Ln),s[0]=Ln.x,s[4]=Ks.x,s[8]=Ne.x,s[1]=Ln.y,s[5]=Ks.y,s[9]=Ne.y,s[2]=Ln.z,s[6]=Ks.z,s[10]=Ne.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){let n=t.elements,s=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],d=n[5],f=n[9],m=n[13],g=n[2],_=n[6],p=n[10],h=n[14],T=n[3],y=n[7],x=n[11],B=n[15],C=s[0],N=s[4],U=s[8],w=s[12],M=s[1],z=s[5],G=s[9],$=s[13],K=s[2],ct=s[6],F=s[10],V=s[14],O=s[3],lt=s[7],mt=s[11],vt=s[15];return r[0]=a*C+o*M+c*K+l*O,r[4]=a*N+o*z+c*ct+l*lt,r[8]=a*U+o*G+c*F+l*mt,r[12]=a*w+o*$+c*V+l*vt,r[1]=u*C+d*M+f*K+m*O,r[5]=u*N+d*z+f*ct+m*lt,r[9]=u*U+d*G+f*F+m*mt,r[13]=u*w+d*$+f*V+m*vt,r[2]=g*C+_*M+p*K+h*O,r[6]=g*N+_*z+p*ct+h*lt,r[10]=g*U+_*G+p*F+h*mt,r[14]=g*w+_*$+p*V+h*vt,r[3]=T*C+y*M+x*K+B*O,r[7]=T*N+y*z+x*ct+B*lt,r[11]=T*U+y*G+x*F+B*mt,r[15]=T*w+y*$+x*V+B*vt,this}multiplyScalar(t){let e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){let t=this.elements,e=t[0],n=t[4],s=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],d=t[6],f=t[10],m=t[14],g=t[3],_=t[7],p=t[11],h=t[15];return g*(+r*c*d-s*l*d-r*o*f+n*l*f+s*o*m-n*c*m)+_*(+e*c*m-e*l*f+r*a*f-s*a*m+s*l*u-r*c*u)+p*(+e*l*d-e*o*m-r*a*d+n*a*m+r*o*u-n*l*u)+h*(-s*o*u-e*c*d+e*o*f+s*a*d-n*a*f+n*c*u)}transpose(){let t=this.elements,e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){let s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){let t=this.elements,e=t[0],n=t[1],s=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],d=t[9],f=t[10],m=t[11],g=t[12],_=t[13],p=t[14],h=t[15],T=d*p*l-_*f*l+_*c*m-o*p*m-d*c*h+o*f*h,y=g*f*l-u*p*l-g*c*m+a*p*m+u*c*h-a*f*h,x=u*_*l-g*d*l+g*o*m-a*_*m-u*o*h+a*d*h,B=g*d*c-u*_*c-g*o*f+a*_*f+u*o*p-a*d*p,C=e*T+n*y+s*x+r*B;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let N=1/C;return t[0]=T*N,t[1]=(_*f*r-d*p*r-_*s*m+n*p*m+d*s*h-n*f*h)*N,t[2]=(o*p*r-_*c*r+_*s*l-n*p*l-o*s*h+n*c*h)*N,t[3]=(d*c*r-o*f*r-d*s*l+n*f*l+o*s*m-n*c*m)*N,t[4]=y*N,t[5]=(u*p*r-g*f*r+g*s*m-e*p*m-u*s*h+e*f*h)*N,t[6]=(g*c*r-a*p*r-g*s*l+e*p*l+a*s*h-e*c*h)*N,t[7]=(a*f*r-u*c*r+u*s*l-e*f*l-a*s*m+e*c*m)*N,t[8]=x*N,t[9]=(g*d*r-u*_*r-g*n*m+e*_*m+u*n*h-e*d*h)*N,t[10]=(a*_*r-g*o*r+g*n*l-e*_*l-a*n*h+e*o*h)*N,t[11]=(u*o*r-a*d*r-u*n*l+e*d*l+a*n*m-e*o*m)*N,t[12]=B*N,t[13]=(u*_*s-g*d*s+g*n*f-e*_*f-u*n*p+e*d*p)*N,t[14]=(g*o*s-a*_*s-g*n*c+e*_*c+a*n*p-e*o*p)*N,t[15]=(a*d*s-u*o*s+u*n*c-e*d*c-a*n*f+e*o*f)*N,this}scale(t){let e=this.elements,n=t.x,s=t.y,r=t.z;return e[0]*=n,e[4]*=s,e[8]*=r,e[1]*=n,e[5]*=s,e[9]*=r,e[2]*=n,e[6]*=s,e[10]*=r,e[3]*=n,e[7]*=s,e[11]*=r,this}getMaxScaleOnAxis(){let t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){let e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){let e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){let n=Math.cos(e),s=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,u*o+n,u*c-s*a,0,l*c-s*o,u*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,r,a){return this.set(1,n,r,0,t,1,a,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){let s=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,d=o+o,f=r*l,m=r*u,g=r*d,_=a*u,p=a*d,h=o*d,T=c*l,y=c*u,x=c*d,B=n.x,C=n.y,N=n.z;return s[0]=(1-(_+h))*B,s[1]=(m+x)*B,s[2]=(g-y)*B,s[3]=0,s[4]=(m-x)*C,s[5]=(1-(f+h))*C,s[6]=(p+T)*C,s[7]=0,s[8]=(g+y)*N,s[9]=(p-T)*N,s[10]=(1-(f+_))*N,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){let s=this.elements,r=wi.set(s[0],s[1],s[2]).length(),a=wi.set(s[4],s[5],s[6]).length(),o=wi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),t.x=s[12],t.y=s[13],t.z=s[14],qe.copy(this);let l=1/r,u=1/a,d=1/o;return qe.elements[0]*=l,qe.elements[1]*=l,qe.elements[2]*=l,qe.elements[4]*=u,qe.elements[5]*=u,qe.elements[6]*=u,qe.elements[8]*=d,qe.elements[9]*=d,qe.elements[10]*=d,e.setFromRotationMatrix(qe),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,s,r,a,o=Mn){let c=this.elements,l=2*r/(e-t),u=2*r/(n-s),d=(e+t)/(e-t),f=(n+s)/(n-s),m,g;if(o===Mn)m=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ar)m=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,s,r,a,o=Mn){let c=this.elements,l=1/(e-t),u=1/(n-s),d=1/(a-r),f=(e+t)*l,m=(n+s)*u,g,_;if(o===Mn)g=(a+r)*d,_=-2*d;else if(o===Ar)g=r*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-f,c[1]=0,c[5]=2*u,c[9]=0,c[13]=-m,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){let e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){let n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}},wi=new k,qe=new ie,ep=new k(0,0,0),np=new k(1,1,1),Ln=new k,Ks=new k,Ne=new k,ah=new ie,oh=new en,nn=class i{constructor(t=0,e=0,n=0,s=i.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){let s=t.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],u=s[9],d=s[2],f=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(de(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-de(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(de(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-de(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(f,m),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(de(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-de(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ah.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ah,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return oh.setFromEuler(this),this.setFromQuaternion(oh,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};nn.DEFAULT_ORDER="XYZ";var Lr=class{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}},ip=0,ch=new k,Ti=new en,fn=new ie,Qs=new k,ls=new k,sp=new k,rp=new en,lh=new k(1,0,0),hh=new k(0,1,0),uh=new k(0,0,1),dh={type:"added"},ap={type:"removed"},Ai={type:"childadded",child:null},Va={type:"childremoved",child:null},ve=class i extends Vn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=fi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=i.DEFAULT_UP.clone();let t=new k,e=new nn,n=new en,s=new k(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new ie},normalMatrix:{value:new Ot}}),this.matrix=new ie,this.matrixWorld=new ie,this.matrixAutoUpdate=i.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=i.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Lr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Ti.setFromAxisAngle(t,e),this.quaternion.multiply(Ti),this}rotateOnWorldAxis(t,e){return Ti.setFromAxisAngle(t,e),this.quaternion.premultiply(Ti),this}rotateX(t){return this.rotateOnAxis(lh,t)}rotateY(t){return this.rotateOnAxis(hh,t)}rotateZ(t){return this.rotateOnAxis(uh,t)}translateOnAxis(t,e){return ch.copy(t).applyQuaternion(this.quaternion),this.position.add(ch.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(lh,t)}translateY(t){return this.translateOnAxis(hh,t)}translateZ(t){return this.translateOnAxis(uh,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(fn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Qs.copy(t):Qs.set(t,e,n);let s=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?fn.lookAt(ls,Qs,this.up):fn.lookAt(Qs,ls,this.up),this.quaternion.setFromRotationMatrix(fn),s&&(fn.extractRotation(s.matrixWorld),Ti.setFromRotationMatrix(fn),this.quaternion.premultiply(Ti.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(dh),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ap),Va.child=t,this.dispatchEvent(Va),Va.child=null),this}removeFromParent(){let t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),fn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),fn.multiply(t.parent.matrixWorld)),t.applyMatrix4(fn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(dh),Ai.child=t,this.dispatchEvent(Ai),Ai.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,t,sp),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,rp,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);let e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){let e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);let e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){let n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(t){let e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(t.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){let d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));s.material=o}else s.material=r(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let c=this.animations[o];s.animations.push(r(t.animations,c))}}if(e){let o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),d=a(t.shapes),f=a(t.skeletons),m=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),f.length>0&&(n.skeletons=f),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let c=[];for(let l in o){let u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){let s=t.children[n];this.add(s.clone())}return this}};ve.DEFAULT_UP=new k(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Ye=new k,pn=new k,Ga=new k,mn=new k,Ri=new k,Ci=new k,fh=new k,Wa=new k,Xa=new k,qa=new k,Ya=new le,$a=new le,Za=new le,On=class i{constructor(t=new k,e=new k,n=new k){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),Ye.subVectors(t,e),s.cross(Ye);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(t,e,n,s,r){Ye.subVectors(s,e),pn.subVectors(n,e),Ga.subVectors(t,e);let a=Ye.dot(Ye),o=Ye.dot(pn),c=Ye.dot(Ga),l=pn.dot(pn),u=pn.dot(Ga),d=a*l-o*o;if(d===0)return r.set(0,0,0),null;let f=1/d,m=(l*c-o*u)*f,g=(a*u-o*c)*f;return r.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,mn)===null?!1:mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(t,e,n,s,r,a,o,c){return this.getBarycoord(t,e,n,s,mn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,mn.x),c.addScaledVector(a,mn.y),c.addScaledVector(o,mn.z),c)}static getInterpolatedAttribute(t,e,n,s,r,a){return Ya.setScalar(0),$a.setScalar(0),Za.setScalar(0),Ya.fromBufferAttribute(t,e),$a.fromBufferAttribute(t,n),Za.fromBufferAttribute(t,s),a.setScalar(0),a.addScaledVector(Ya,r.x),a.addScaledVector($a,r.y),a.addScaledVector(Za,r.z),a}static isFrontFacing(t,e,n,s){return Ye.subVectors(n,e),pn.subVectors(t,e),Ye.cross(pn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return Ye.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),Ye.cross(pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return i.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return i.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,r){return i.getInterpolation(t,this.a,this.b,this.c,e,n,s,r)}containsPoint(t){return i.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return i.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){let n=this.a,s=this.b,r=this.c,a,o;Ri.subVectors(s,n),Ci.subVectors(r,n),Wa.subVectors(t,n);let c=Ri.dot(Wa),l=Ci.dot(Wa);if(c<=0&&l<=0)return e.copy(n);Xa.subVectors(t,s);let u=Ri.dot(Xa),d=Ci.dot(Xa);if(u>=0&&d<=u)return e.copy(s);let f=c*d-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Ri,a);qa.subVectors(t,r);let m=Ri.dot(qa),g=Ci.dot(qa);if(g>=0&&m<=g)return e.copy(r);let _=m*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Ci,o);let p=u*g-m*d;if(p<=0&&d-u>=0&&m-g>=0)return fh.subVectors(r,s),o=(d-u)/(d-u+(m-g)),e.copy(s).addScaledVector(fh,o);let h=1/(p+_+f);return a=_*h,o=f*h,e.copy(n).addScaledVector(Ri,a).addScaledVector(Ci,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}},xu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Nn={h:0,s:0,l:0},js={h:0,s:0,l:0};function Ja(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}var kt=class{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){let s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Ee){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$t.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=$t.workingColorSpace){return this.r=t,this.g=e,this.b=n,$t.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=$t.workingColorSpace){if(t=qc(t,1),e=de(e,0,1),n=de(n,0,1),e===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=Ja(a,r,t+1/3),this.g=Ja(a,r,t),this.b=Ja(a,r,t-1/3)}return $t.toWorkingColorSpace(this,s),this}setStyle(t,e=Ee){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Ee){let n=xu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=bn(t.r),this.g=bn(t.g),this.b=bn(t.b),this}copyLinearToSRGB(t){return this.r=ki(t.r),this.g=ki(t.g),this.b=ki(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Ee){return $t.fromWorkingColorSpace(Se.copy(this),t),Math.round(de(Se.r*255,0,255))*65536+Math.round(de(Se.g*255,0,255))*256+Math.round(de(Se.b*255,0,255))}getHexString(t=Ee){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$t.workingColorSpace){$t.fromWorkingColorSpace(Se.copy(this),e);let n=Se.r,s=Se.g,r=Se.b,a=Math.max(n,s,r),o=Math.min(n,s,r),c,l,u=(o+a)/2;if(o===a)c=0,l=0;else{let d=a-o;switch(l=u<=.5?d/(a+o):d/(2-a-o),a){case n:c=(s-r)/d+(s<r?6:0);break;case s:c=(r-n)/d+2;break;case r:c=(n-s)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=$t.workingColorSpace){return $t.fromWorkingColorSpace(Se.copy(this),e),t.r=Se.r,t.g=Se.g,t.b=Se.b,t}getStyle(t=Ee){$t.fromWorkingColorSpace(Se.copy(this),t);let e=Se.r,n=Se.g,s=Se.b;return t!==Ee?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Nn),this.setHSL(Nn.h+t,Nn.s+e,Nn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Nn),t.getHSL(js);let n=ps(Nn.h,js.h,e),s=ps(Nn.s,js.s,e),r=ps(Nn.l,js.l,e);return this.setHSL(n,s,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){let e=this.r,n=this.g,s=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*s,this.g=r[1]*e+r[4]*n+r[7]*s,this.b=r[2]*e+r[5]*n+r[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Se=new kt;kt.NAMES=xu;var op=0,Gn=class extends Vn{static get type(){return"Material"}get type(){return this.constructor.type}set type(t){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=fi(),this.name="",this.blending=Fi,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=fo,this.blendDst=po,this.blendEquation=ii,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new kt(0,0,0),this.blendAlpha=0,this.depthFunc=Vi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Zl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=vi,this.stencilZFail=vi,this.stencilZPass=vi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(let e in t){let n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}let s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){let e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==fo&&(n.blendSrc=this.blendSrc),this.blendDst!==po&&(n.blendDst=this.blendDst),this.blendEquation!==ii&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Vi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Zl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==vi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==vi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==vi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let c=r[o];delete c.metadata,a.push(c)}return a}if(e){let r=s(t.textures),a=s(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;let e=t.clippingPlanes,n=null;if(e!==null){let s=e.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},$i=class extends Gn{static get type(){return"MeshBasicMaterial"}constructor(t){super(),this.isMeshBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.combine=iu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}};var ue=new k,tr=new ft,Ue=class{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Jl,this.updateRanges=[],this.gpuType=vn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)tr.fromBufferAttribute(this,e),tr.applyMatrix3(t),this.setXY(e,tr.x,tr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix3(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyMatrix4(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.applyNormalMatrix(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ue.fromBufferAttribute(this,e),ue.transformDirection(t),this.setXYZ(e,ue.x,ue.y,ue.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Di(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Te(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Di(e,this.array)),e}setX(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Di(e,this.array)),e}setY(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Di(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Di(e,this.array)),e}setW(t,e){return this.normalized&&(e=Te(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),s=Te(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,r){return t*=this.itemSize,this.normalized&&(e=Te(e,this.array),n=Te(n,this.array),s=Te(s,this.array),r=Te(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Jl&&(t.usage=this.usage),t}};var Nr=class extends Ue{constructor(t,e,n){super(new Uint16Array(t),e,n)}};var Dr=class extends Ue{constructor(t,e,n){super(new Uint32Array(t),e,n)}};var te=class extends Ue{constructor(t,e,n){super(new Float32Array(t),e,n)}},cp=0,ze=new ie,Ka=new ve,Ii=new k,De=new ci,hs=new ci,ye=new k,we=class i extends Vn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=fi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_u(t)?Dr:Nr)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){let e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new Ot().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ze.makeRotationFromQuaternion(t),this.applyMatrix4(ze),this}rotateX(t){return ze.makeRotationX(t),this.applyMatrix4(ze),this}rotateY(t){return ze.makeRotationY(t),this.applyMatrix4(ze),this}rotateZ(t){return ze.makeRotationZ(t),this.applyMatrix4(ze),this}translate(t,e,n){return ze.makeTranslation(t,e,n),this.applyMatrix4(ze),this}scale(t,e,n){return ze.makeScale(t,e,n),this.applyMatrix4(ze),this}lookAt(t){return Ka.lookAt(t),Ka.updateMatrix(),this.applyMatrix4(Ka.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ii).negate(),this.translate(Ii.x,Ii.y,Ii.z),this}setFromPoints(t){let e=this.getAttribute("position");if(e===void 0){let n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new te(n,3))}else{for(let n=0,s=e.count;n<s;n++){let r=t[n];e.setXYZ(n,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){let r=e[n];De.setFromBufferAttribute(r),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,De.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,De.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(De.min),this.boundingBox.expandByPoint(De.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yi);let t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(t){let n=this.boundingSphere.center;if(De.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){let o=e[r];hs.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(De.min,hs.min),De.expandByPoint(ye),ye.addVectors(De.max,hs.max),De.expandByPoint(ye)):(De.expandByPoint(hs.min),De.expandByPoint(hs.max))}De.getCenter(n);let s=0;for(let r=0,a=t.count;r<a;r++)ye.fromBufferAttribute(t,r),s=Math.max(s,n.distanceToSquared(ye));if(e)for(let r=0,a=e.length;r<a;r++){let o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)ye.fromBufferAttribute(o,l),c&&(Ii.fromBufferAttribute(t,l),ye.add(Ii)),s=Math.max(s,n.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=e.position,s=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ue(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],c=[];for(let U=0;U<n.count;U++)o[U]=new k,c[U]=new k;let l=new k,u=new k,d=new k,f=new ft,m=new ft,g=new ft,_=new k,p=new k;function h(U,w,M){l.fromBufferAttribute(n,U),u.fromBufferAttribute(n,w),d.fromBufferAttribute(n,M),f.fromBufferAttribute(r,U),m.fromBufferAttribute(r,w),g.fromBufferAttribute(r,M),u.sub(l),d.sub(l),m.sub(f),g.sub(f);let z=1/(m.x*g.y-g.x*m.y);isFinite(z)&&(_.copy(u).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(z),p.copy(d).multiplyScalar(m.x).addScaledVector(u,-g.x).multiplyScalar(z),o[U].add(_),o[w].add(_),o[M].add(_),c[U].add(p),c[w].add(p),c[M].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let U=0,w=T.length;U<w;++U){let M=T[U],z=M.start,G=M.count;for(let $=z,K=z+G;$<K;$+=3)h(t.getX($+0),t.getX($+1),t.getX($+2))}let y=new k,x=new k,B=new k,C=new k;function N(U){B.fromBufferAttribute(s,U),C.copy(B);let w=o[U];y.copy(w),y.sub(B.multiplyScalar(B.dot(w))).normalize(),x.crossVectors(C,w);let z=x.dot(c[U])<0?-1:1;a.setXYZW(U,y.x,y.y,y.z,z)}for(let U=0,w=T.length;U<w;++U){let M=T[U],z=M.start,G=M.count;for(let $=z,K=z+G;$<K;$+=3)N(t.getX($+0)),N(t.getX($+1)),N(t.getX($+2))}}computeVertexNormals(){let t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ue(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,m=n.count;f<m;f++)n.setXYZ(f,0,0,0);let s=new k,r=new k,a=new k,o=new k,c=new k,l=new k,u=new k,d=new k;if(t)for(let f=0,m=t.count;f<m;f+=3){let g=t.getX(f+0),_=t.getX(f+1),p=t.getX(f+2);s.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,p),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,p),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(p,l.x,l.y,l.z)}else for(let f=0,m=e.count;f<m;f+=3)s.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,c){let l=o.array,u=o.itemSize,d=o.normalized,f=new l.constructor(c.length*u),m=0,g=0;for(let _=0,p=c.length;_<p;_++){o.isInterleavedBufferAttribute?m=c[_]*o.data.stride+o.offset:m=c[_]*u;for(let h=0;h<u;h++)f[g++]=l[m++]}return new Ue(f,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let e=new i,n=this.index.array,s=this.attributes;for(let o in s){let c=s[o],l=t(c,n);e.setAttribute(o,l)}let r=this.morphAttributes;for(let o in r){let c=[],l=r[o];for(let u=0,d=l.length;u<d;u++){let f=l[u],m=t(f,n);c.push(m)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,c=a.length;o<c;o++){let l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){let t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){let c=this.parameters;for(let l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};let e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});let n=this.attributes;for(let c in n){let l=n[c];t.data.attributes[c]=l.toJSON(t.data)}let s={},r=!1;for(let c in this.morphAttributes){let l=this.morphAttributes[c],u=[];for(let d=0,f=l.length;d<f;d++){let m=l[d];u.push(m.toJSON(t.data))}u.length>0&&(s[c]=u,r=!0)}r&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let e={};this.name=t.name;let n=t.index;n!==null&&this.setIndex(n.clone(e));let s=t.attributes;for(let l in s){let u=s[l];this.setAttribute(l,u.clone(e))}let r=t.morphAttributes;for(let l in r){let u=[],d=r[l];for(let f=0,m=d.length;f<m;f++)u.push(d[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;let a=t.groups;for(let l=0,u=a.length;l<u;l++){let d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}let o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());let c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},ph=new ie,Qn=new Pr,er=new Yi,mh=new k,nr=new k,ir=new k,sr=new k,Qa=new k,rr=new k,gh=new k,ar=new k,fe=class extends ve{constructor(t=new we,e=new $i){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(s,t);let o=this.morphTargetInfluences;if(r&&o){rr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){let u=o[c],d=r[c];u!==0&&(Qa.fromBufferAttribute(d,t),a?rr.addScaledVector(Qa,u):rr.addScaledVector(Qa.sub(e),u))}e.add(rr)}return e}raycast(t,e){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),er.copy(n.boundingSphere),er.applyMatrix4(r),Qn.copy(t.ray).recast(t.near),!(er.containsPoint(Qn.origin)===!1&&(Qn.intersectSphere(er,mh)===null||Qn.origin.distanceToSquared(mh)>(t.far-t.near)**2))&&(ph.copy(r).invert(),Qn.copy(t.ray).applyMatrix4(ph),!(n.boundingBox!==null&&Qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Qn)))}_computeIntersections(t,e,n){let s,r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,f=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let p=f[g],h=a[p.materialIndex],T=Math.max(p.start,m.start),y=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let x=T,B=y;x<B;x+=3){let C=o.getX(x),N=o.getX(x+1),U=o.getX(x+2);s=or(this,h,t,n,l,u,d,C,N,U),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,h=_;p<h;p+=3){let T=o.getX(p),y=o.getX(p+1),x=o.getX(p+2);s=or(this,a,t,n,l,u,d,T,y,x),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=f.length;g<_;g++){let p=f[g],h=a[p.materialIndex],T=Math.max(p.start,m.start),y=Math.min(c.count,Math.min(p.start+p.count,m.start+m.count));for(let x=T,B=y;x<B;x+=3){let C=x,N=x+1,U=x+2;s=or(this,h,t,n,l,u,d,C,N,U),s&&(s.faceIndex=Math.floor(x/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{let g=Math.max(0,m.start),_=Math.min(c.count,m.start+m.count);for(let p=g,h=_;p<h;p+=3){let T=p,y=p+1,x=p+2;s=or(this,a,t,n,l,u,d,T,y,x),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}};function lp(i,t,e,n,s,r,a,o){let c;if(t.side===Ie?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,t.side===Hn,o),c===null)return null;ar.copy(o),ar.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(ar);return l<e.near||l>e.far?null:{distance:l,point:ar.clone(),object:i}}function or(i,t,e,n,s,r,a,o,c,l){i.getVertexPosition(o,nr),i.getVertexPosition(c,ir),i.getVertexPosition(l,sr);let u=lp(i,t,e,n,nr,ir,sr,gh);if(u){let d=new k;On.getBarycoord(gh,nr,ir,sr,d),s&&(u.uv=On.getInterpolatedAttribute(s,o,c,l,d,new ft)),r&&(u.uv1=On.getInterpolatedAttribute(r,o,c,l,d,new ft)),a&&(u.normal=On.getInterpolatedAttribute(a,o,c,l,d,new k),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let f={a:o,b:c,c:l,normal:new k,materialIndex:0};On.getNormal(nr,ir,sr,f.normal),u.face=f,u.barycoord=d}return u}var Pe=class i extends we{constructor(t=1,e=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let c=[],l=[],u=[],d=[],f=0,m=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,s,a,2),g("x","z","y",1,-1,t,n,-e,s,a,3),g("x","y","z",1,-1,t,e,n,s,r,4),g("x","y","z",-1,-1,t,e,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new te(l,3)),this.setAttribute("normal",new te(u,3)),this.setAttribute("uv",new te(d,2));function g(_,p,h,T,y,x,B,C,N,U,w){let M=x/N,z=B/U,G=x/2,$=B/2,K=C/2,ct=N+1,F=U+1,V=0,O=0,lt=new k;for(let mt=0;mt<F;mt++){let vt=mt*z-$;for(let Ct=0;Ct<ct;Ct++){let Xt=Ct*M-G;lt[_]=Xt*T,lt[p]=vt*y,lt[h]=K,l.push(lt.x,lt.y,lt.z),lt[_]=0,lt[p]=0,lt[h]=C>0?1:-1,u.push(lt.x,lt.y,lt.z),d.push(Ct/N),d.push(1-mt/U),V+=1}}for(let mt=0;mt<U;mt++)for(let vt=0;vt<N;vt++){let Ct=f+vt+ct*mt,Xt=f+vt+ct*(mt+1),D=f+(vt+1)+ct*(mt+1),P=f+(vt+1)+ct*mt;c.push(Ct,Xt,P),c.push(Xt,D,P),O+=6}o.addGroup(m,O,w),m+=O,f+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}};function Zi(i){let t={};for(let e in i){t[e]={};for(let n in i[e]){let s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function Ae(i){let t={};for(let e=0;e<i.length;e++){let n=Zi(i[e]);for(let s in n)t[s]=n[s]}return t}function hp(i){let t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function yu(i){let t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:$t.workingColorSpace}var up={clone:Zi,merge:Ae},dp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,fp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Fe=class extends Gn{static get type(){return"ShaderMaterial"}constructor(t){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=dp,this.fragmentShader=fp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Zi(t.uniforms),this.uniformsGroups=hp(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){let e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?e.uniforms[s]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[s]={type:"m4",value:a.toArray()}:e.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}},Ur=class extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ie,this.projectionMatrix=new ie,this.projectionMatrixInverse=new ie,this.coordinateSystem=Mn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Dn=new k,_h=new ft,xh=new ft,Re=class extends Ur{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){let e=.5*this.getFilmHeight()/t;this.fov=ys*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){let t=Math.tan(zi*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ys*2*Math.atan(Math.tan(zi*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z)}getViewSize(t,e){return this.getViewBounds(t,_h,xh),e.subVectors(xh,_h)}setViewOffset(t,e,n,s,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=this.near,e=t*Math.tan(zi*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,e-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}let o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}},Pi=-90,Li=1,nc=class extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new Re(Pi,Li,t,e);s.layers=this.layers,this.add(s);let r=new Re(Pi,Li,t,e);r.layers=this.layers,this.add(r);let a=new Re(Pi,Li,t,e);a.layers=this.layers,this.add(a);let o=new Re(Pi,Li,t,e);o.layers=this.layers,this.add(o);let c=new Re(Pi,Li,t,e);c.layers=this.layers,this.add(c);let l=new Re(Pi,Li,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){let t=this.coordinateSystem,e=this.children.concat(),[n,s,r,a,o,c]=e;for(let l of e)this.remove(l);if(t===Mn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===Ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(let l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,c,l,u]=this.children,d=t.getRenderTarget(),f=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;let _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,r),t.setRenderTarget(n,1,s),t.render(e,a),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,c),t.setRenderTarget(n,4,s),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,u),t.setRenderTarget(d,f,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Or=class extends Oe{constructor(t,e,n,s,r,a,o,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:Gi,super(t,e,n,s,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}},ic=class extends En{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;let n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Or(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:tn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Pe(5,5,5),r=new Fe({name:"CubemapFromEquirect",uniforms:Zi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ie,blending:Fn});r.uniforms.tEquirect.value=e;let a=new fe(s,r),o=e.minFilter;return e.minFilter===ai&&(e.minFilter=tn),new nc(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,s){let r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,s);t.setRenderTarget(r)}},ja=new k,pp=new k,mp=new Ot,xn=class{constructor(t=new k(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){let s=ja.subVectors(n,e).cross(pp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){let t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){let n=t.delta(ja),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;let r=-(t.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){let e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){let n=e||mp.getNormalMatrix(t),s=this.coplanarPoint(ja).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}},jn=new Yi,cr=new k,vs=class{constructor(t=new xn,e=new xn,n=new xn,s=new xn,r=new xn,a=new xn){this.planes=[t,e,n,s,r,a]}set(t,e,n,s,r,a){let o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(t){let e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Mn){let n=this.planes,s=t.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],u=s[5],d=s[6],f=s[7],m=s[8],g=s[9],_=s[10],p=s[11],h=s[12],T=s[13],y=s[14],x=s[15];if(n[0].setComponents(c-r,f-l,p-m,x-h).normalize(),n[1].setComponents(c+r,f+l,p+m,x+h).normalize(),n[2].setComponents(c+a,f+u,p+g,x+T).normalize(),n[3].setComponents(c-a,f-u,p-g,x-T).normalize(),n[4].setComponents(c-o,f-d,p-_,x-y).normalize(),e===Mn)n[5].setComponents(c+o,f+d,p+_,x+y).normalize();else if(e===Ar)n[5].setComponents(o,d,_,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{let e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(t){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(t){let e=this.planes,n=t.center,s=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){let e=this.planes;for(let n=0;n<6;n++){let s=e[n];if(cr.x=s.normal.x>0?t.max.x:t.min.x,cr.y=s.normal.y>0?t.max.y:t.min.y,cr.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(cr)<0)return!1}return!0}containsPoint(t){let e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};function vu(){let i=null,t=!1,e=null,n=null;function s(r,a){e(r,a),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){i=r}}}function gp(i){let t=new WeakMap;function e(o,c){let l=o.array,u=o.usage,d=l.byteLength,f=i.createBuffer();i.bindBuffer(c,f),i.bufferData(c,l,u),o.onUploadCallback();let m;if(l instanceof Float32Array)m=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)m=i.SHORT;else if(l instanceof Uint32Array)m=i.UNSIGNED_INT;else if(l instanceof Int32Array)m=i.INT;else if(l instanceof Int8Array)m=i.BYTE;else if(l instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:f,type:m,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){let u=c.array,d=c.updateRanges;if(i.bindBuffer(l,o),d.length===0)i.bufferSubData(l,0,u);else{d.sort((m,g)=>m.start-g.start);let f=0;for(let m=1;m<d.length;m++){let g=d[f],_=d[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++f,d[f]=_)}d.length=f+1;for(let m=0,g=d.length;m<g;m++){let _=d[m];i.bufferSubData(l,_.start*u.BYTES_PER_ELEMENT,u,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let c=t.get(o);c&&(i.deleteBuffer(c.buffer),t.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=t.get(o);(!u||u.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let l=t.get(o);if(l===void 0)t.set(o,e(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}var Wn=class i extends we{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};let r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(s),l=o+1,u=c+1,d=t/o,f=e/c,m=[],g=[],_=[],p=[];for(let h=0;h<u;h++){let T=h*f-a;for(let y=0;y<l;y++){let x=y*d-r;g.push(x,-T,0),_.push(0,0,1),p.push(y/o),p.push(1-h/c)}}for(let h=0;h<c;h++)for(let T=0;T<o;T++){let y=T+l*h,x=T+l*(h+1),B=T+1+l*(h+1),C=T+1+l*h;m.push(y,x,C),m.push(x,B,C)}this.setIndex(m),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(_,3)),this.setAttribute("uv",new te(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.width,t.height,t.widthSegments,t.heightSegments)}},_p=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,yp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,vp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mp=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Sp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ep=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Tp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ap=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Rp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ip=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Pp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Lp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Np=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Dp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Up=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Op=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Fp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Bp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,zp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,kp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Hp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Vp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Gp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Wp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Xp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,qp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Yp="gl_FragColor = linearToOutputTexel( gl_FragColor );",$p=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Zp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Jp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Kp=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Qp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,jp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,tm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,em=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,nm=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,im=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,rm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,am=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,om=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,cm=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lm=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,hm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,um=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,dm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,fm=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pm=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,mm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,_m=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,ym=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,vm=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Mm=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Em=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Tm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Am=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Rm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Im=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Pm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Lm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Nm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Dm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Um=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Om=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Bm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,zm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,km=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Hm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Gm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Wm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Xm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,qm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ym=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,$m=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Qm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,jm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,tg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,eg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,ng=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,ig=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,sg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,ag=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,og=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cg=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lg=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,hg=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,ug=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,dg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,fg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,pg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,mg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,gg=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,_g=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,yg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,vg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Mg=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Sg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Eg=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,wg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Tg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Ag=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Rg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Cg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ig=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Pg=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Lg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ng=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Dg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Ug=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Og=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Fg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Bg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,zg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,kg=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Hg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Vg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Gg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Xg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,qg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Yg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,$g=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Zg=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:_p,alphahash_pars_fragment:xp,alphamap_fragment:yp,alphamap_pars_fragment:vp,alphatest_fragment:Mp,alphatest_pars_fragment:bp,aomap_fragment:Sp,aomap_pars_fragment:Ep,batching_pars_vertex:wp,batching_vertex:Tp,begin_vertex:Ap,beginnormal_vertex:Rp,bsdfs:Cp,iridescence_fragment:Ip,bumpmap_pars_fragment:Pp,clipping_planes_fragment:Lp,clipping_planes_pars_fragment:Np,clipping_planes_pars_vertex:Dp,clipping_planes_vertex:Up,color_fragment:Op,color_pars_fragment:Fp,color_pars_vertex:Bp,color_vertex:zp,common:kp,cube_uv_reflection_fragment:Hp,defaultnormal_vertex:Vp,displacementmap_pars_vertex:Gp,displacementmap_vertex:Wp,emissivemap_fragment:Xp,emissivemap_pars_fragment:qp,colorspace_fragment:Yp,colorspace_pars_fragment:$p,envmap_fragment:Zp,envmap_common_pars_fragment:Jp,envmap_pars_fragment:Kp,envmap_pars_vertex:Qp,envmap_physical_pars_fragment:lm,envmap_vertex:jp,fog_vertex:tm,fog_pars_vertex:em,fog_fragment:nm,fog_pars_fragment:im,gradientmap_pars_fragment:sm,lightmap_pars_fragment:rm,lights_lambert_fragment:am,lights_lambert_pars_fragment:om,lights_pars_begin:cm,lights_toon_fragment:hm,lights_toon_pars_fragment:um,lights_phong_fragment:dm,lights_phong_pars_fragment:fm,lights_physical_fragment:pm,lights_physical_pars_fragment:mm,lights_fragment_begin:gm,lights_fragment_maps:_m,lights_fragment_end:xm,logdepthbuf_fragment:ym,logdepthbuf_pars_fragment:vm,logdepthbuf_pars_vertex:Mm,logdepthbuf_vertex:bm,map_fragment:Sm,map_pars_fragment:Em,map_particle_fragment:wm,map_particle_pars_fragment:Tm,metalnessmap_fragment:Am,metalnessmap_pars_fragment:Rm,morphinstance_vertex:Cm,morphcolor_vertex:Im,morphnormal_vertex:Pm,morphtarget_pars_vertex:Lm,morphtarget_vertex:Nm,normal_fragment_begin:Dm,normal_fragment_maps:Um,normal_pars_fragment:Om,normal_pars_vertex:Fm,normal_vertex:Bm,normalmap_pars_fragment:zm,clearcoat_normal_fragment_begin:km,clearcoat_normal_fragment_maps:Hm,clearcoat_pars_fragment:Vm,iridescence_pars_fragment:Gm,opaque_fragment:Wm,packing:Xm,premultiplied_alpha_fragment:qm,project_vertex:Ym,dithering_fragment:$m,dithering_pars_fragment:Zm,roughnessmap_fragment:Jm,roughnessmap_pars_fragment:Km,shadowmap_pars_fragment:Qm,shadowmap_pars_vertex:jm,shadowmap_vertex:tg,shadowmask_pars_fragment:eg,skinbase_vertex:ng,skinning_pars_vertex:ig,skinning_vertex:sg,skinnormal_vertex:rg,specularmap_fragment:ag,specularmap_pars_fragment:og,tonemapping_fragment:cg,tonemapping_pars_fragment:lg,transmission_fragment:hg,transmission_pars_fragment:ug,uv_pars_fragment:dg,uv_pars_vertex:fg,uv_vertex:pg,worldpos_vertex:mg,background_vert:gg,background_frag:_g,backgroundCube_vert:xg,backgroundCube_frag:yg,cube_vert:vg,cube_frag:Mg,depth_vert:bg,depth_frag:Sg,distanceRGBA_vert:Eg,distanceRGBA_frag:wg,equirect_vert:Tg,equirect_frag:Ag,linedashed_vert:Rg,linedashed_frag:Cg,meshbasic_vert:Ig,meshbasic_frag:Pg,meshlambert_vert:Lg,meshlambert_frag:Ng,meshmatcap_vert:Dg,meshmatcap_frag:Ug,meshnormal_vert:Og,meshnormal_frag:Fg,meshphong_vert:Bg,meshphong_frag:zg,meshphysical_vert:kg,meshphysical_frag:Hg,meshtoon_vert:Vg,meshtoon_frag:Gg,points_vert:Wg,points_frag:Xg,shadow_vert:qg,shadow_frag:Yg,sprite_vert:$g,sprite_frag:Zg},bt={common:{diffuse:{value:new kt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ot}},envmap:{envMap:{value:null},envMapRotation:{value:new Ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ot},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new kt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new kt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0},uvTransform:{value:new Ot}},sprite:{diffuse:{value:new kt(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ot},alphaMap:{value:null},alphaMapTransform:{value:new Ot},alphaTest:{value:0}}},je={basic:{uniforms:Ae([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Ae([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Ae([bt.common,bt.specularmap,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,bt.lights,{emissive:{value:new kt(0)},specular:{value:new kt(1118481)},shininess:{value:30}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Ae([bt.common,bt.envmap,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.roughnessmap,bt.metalnessmap,bt.fog,bt.lights,{emissive:{value:new kt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Ae([bt.common,bt.aomap,bt.lightmap,bt.emissivemap,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.gradientmap,bt.fog,bt.lights,{emissive:{value:new kt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Ae([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,bt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Ae([bt.points,bt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Ae([bt.common,bt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Ae([bt.common,bt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Ae([bt.common,bt.bumpmap,bt.normalmap,bt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Ae([bt.sprite,bt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ot}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distanceRGBA:{uniforms:Ae([bt.common,bt.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distanceRGBA_vert,fragmentShader:Wt.distanceRGBA_frag},shadow:{uniforms:Ae([bt.lights,bt.fog,{color:{value:new kt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};je.physical={uniforms:Ae([je.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ot},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ot},sheen:{value:0},sheenColor:{value:new kt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ot},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ot},attenuationDistance:{value:0},attenuationColor:{value:new kt(0)},specularColor:{value:new kt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ot},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ot}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};var lr={r:0,b:0,g:0},ti=new nn,Jg=new ie;function Kg(i,t,e,n,s,r,a){let o=new kt(0),c=r===!0?0:1,l,u,d=null,f=0,m=null;function g(T){let y=T.isScene===!0?T.background:null;return y&&y.isTexture&&(y=(T.backgroundBlurriness>0?e:t).get(y)),y}function _(T){let y=!1,x=g(T);x===null?h(o,c):x&&x.isColor&&(h(x,1),y=!0);let B=i.xr.getEnvironmentBlendMode();B==="additive"?n.buffers.color.setClear(0,0,0,1,a):B==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(T,y){let x=g(y);x&&(x.isCubeTexture||x.mapping===ra)?(u===void 0&&(u=new fe(new Pe(1,1,1),new Fe({name:"BackgroundCubeMaterial",uniforms:Zi(je.backgroundCube.uniforms),vertexShader:je.backgroundCube.vertexShader,fragmentShader:je.backgroundCube.fragmentShader,side:Ie,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(B,C,N){this.matrixWorld.copyPosition(N.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),ti.copy(y.backgroundRotation),ti.x*=-1,ti.y*=-1,ti.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(ti.y*=-1,ti.z*=-1),u.material.uniforms.envMap.value=x,u.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Jg.makeRotationFromEuler(ti)),u.material.toneMapped=$t.getTransfer(x.colorSpace)!==jt,(d!==x||f!==x.version||m!==i.toneMapping)&&(u.material.needsUpdate=!0,d=x,f=x.version,m=i.toneMapping),u.layers.enableAll(),T.unshift(u,u.geometry,u.material,0,0,null)):x&&x.isTexture&&(l===void 0&&(l=new fe(new Wn(2,2),new Fe({name:"BackgroundMaterial",uniforms:Zi(je.background.uniforms),vertexShader:je.background.vertexShader,fragmentShader:je.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=x,l.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,l.material.toneMapped=$t.getTransfer(x.colorSpace)!==jt,x.matrixAutoUpdate===!0&&x.updateMatrix(),l.material.uniforms.uvTransform.value.copy(x.matrix),(d!==x||f!==x.version||m!==i.toneMapping)&&(l.material.needsUpdate=!0,d=x,f=x.version,m=i.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function h(T,y){T.getRGB(lr,yu(i)),n.buffers.color.setClear(lr.r,lr.g,lr.b,y,a)}return{getClearColor:function(){return o},setClearColor:function(T,y=1){o.set(T),c=y,h(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(T){c=T,h(o,c)},render:_,addToRenderList:p}}function Qg(i,t){let e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=f(null),r=s,a=!1;function o(M,z,G,$,K){let ct=!1,F=d($,G,z);r!==F&&(r=F,l(r.object)),ct=m(M,$,G,K),ct&&g(M,$,G,K),K!==null&&t.update(K,i.ELEMENT_ARRAY_BUFFER),(ct||a)&&(a=!1,x(M,z,G,$),K!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(K).buffer))}function c(){return i.createVertexArray()}function l(M){return i.bindVertexArray(M)}function u(M){return i.deleteVertexArray(M)}function d(M,z,G){let $=G.wireframe===!0,K=n[M.id];K===void 0&&(K={},n[M.id]=K);let ct=K[z.id];ct===void 0&&(ct={},K[z.id]=ct);let F=ct[$];return F===void 0&&(F=f(c()),ct[$]=F),F}function f(M){let z=[],G=[],$=[];for(let K=0;K<e;K++)z[K]=0,G[K]=0,$[K]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:z,enabledAttributes:G,attributeDivisors:$,object:M,attributes:{},index:null}}function m(M,z,G,$){let K=r.attributes,ct=z.attributes,F=0,V=G.getAttributes();for(let O in V)if(V[O].location>=0){let mt=K[O],vt=ct[O];if(vt===void 0&&(O==="instanceMatrix"&&M.instanceMatrix&&(vt=M.instanceMatrix),O==="instanceColor"&&M.instanceColor&&(vt=M.instanceColor)),mt===void 0||mt.attribute!==vt||vt&&mt.data!==vt.data)return!0;F++}return r.attributesNum!==F||r.index!==$}function g(M,z,G,$){let K={},ct=z.attributes,F=0,V=G.getAttributes();for(let O in V)if(V[O].location>=0){let mt=ct[O];mt===void 0&&(O==="instanceMatrix"&&M.instanceMatrix&&(mt=M.instanceMatrix),O==="instanceColor"&&M.instanceColor&&(mt=M.instanceColor));let vt={};vt.attribute=mt,mt&&mt.data&&(vt.data=mt.data),K[O]=vt,F++}r.attributes=K,r.attributesNum=F,r.index=$}function _(){let M=r.newAttributes;for(let z=0,G=M.length;z<G;z++)M[z]=0}function p(M){h(M,0)}function h(M,z){let G=r.newAttributes,$=r.enabledAttributes,K=r.attributeDivisors;G[M]=1,$[M]===0&&(i.enableVertexAttribArray(M),$[M]=1),K[M]!==z&&(i.vertexAttribDivisor(M,z),K[M]=z)}function T(){let M=r.newAttributes,z=r.enabledAttributes;for(let G=0,$=z.length;G<$;G++)z[G]!==M[G]&&(i.disableVertexAttribArray(G),z[G]=0)}function y(M,z,G,$,K,ct,F){F===!0?i.vertexAttribIPointer(M,z,G,K,ct):i.vertexAttribPointer(M,z,G,$,K,ct)}function x(M,z,G,$){_();let K=$.attributes,ct=G.getAttributes(),F=z.defaultAttributeValues;for(let V in ct){let O=ct[V];if(O.location>=0){let lt=K[V];if(lt===void 0&&(V==="instanceMatrix"&&M.instanceMatrix&&(lt=M.instanceMatrix),V==="instanceColor"&&M.instanceColor&&(lt=M.instanceColor)),lt!==void 0){let mt=lt.normalized,vt=lt.itemSize,Ct=t.get(lt);if(Ct===void 0)continue;let Xt=Ct.buffer,D=Ct.type,P=Ct.bytesPerElement,R=D===i.INT||D===i.UNSIGNED_INT||lt.gpuType===kc;if(lt.isInterleavedBufferAttribute){let S=lt.data,Q=S.stride,ht=lt.offset;if(S.isInstancedInterleavedBuffer){for(let J=0;J<O.locationSize;J++)h(O.location+J,S.meshPerAttribute);M.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=S.meshPerAttribute*S.count)}else for(let J=0;J<O.locationSize;J++)p(O.location+J);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let J=0;J<O.locationSize;J++)y(O.location+J,vt/O.locationSize,D,mt,Q*P,(ht+vt/O.locationSize*J)*P,R)}else{if(lt.isInstancedBufferAttribute){for(let S=0;S<O.locationSize;S++)h(O.location+S,lt.meshPerAttribute);M.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=lt.meshPerAttribute*lt.count)}else for(let S=0;S<O.locationSize;S++)p(O.location+S);i.bindBuffer(i.ARRAY_BUFFER,Xt);for(let S=0;S<O.locationSize;S++)y(O.location+S,vt/O.locationSize,D,mt,vt*P,vt/O.locationSize*S*P,R)}}else if(F!==void 0){let mt=F[V];if(mt!==void 0)switch(mt.length){case 2:i.vertexAttrib2fv(O.location,mt);break;case 3:i.vertexAttrib3fv(O.location,mt);break;case 4:i.vertexAttrib4fv(O.location,mt);break;default:i.vertexAttrib1fv(O.location,mt)}}}}T()}function B(){U();for(let M in n){let z=n[M];for(let G in z){let $=z[G];for(let K in $)u($[K].object),delete $[K];delete z[G]}delete n[M]}}function C(M){if(n[M.id]===void 0)return;let z=n[M.id];for(let G in z){let $=z[G];for(let K in $)u($[K].object),delete $[K];delete z[G]}delete n[M.id]}function N(M){for(let z in n){let G=n[z];if(G[M.id]===void 0)continue;let $=G[M.id];for(let K in $)u($[K].object),delete $[K];delete G[M.id]}}function U(){w(),a=!0,r!==s&&(r=s,l(r.object))}function w(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:U,resetDefaultState:w,dispose:B,releaseStatesOfGeometry:C,releaseStatesOfProgram:N,initAttributes:_,enableAttribute:p,disableUnusedAttributes:T}}function jg(i,t,e){let n;function s(l){n=l}function r(l,u){i.drawArrays(n,l,u),e.update(u,n,1)}function a(l,u,d){d!==0&&(i.drawArraysInstanced(n,l,u,d),e.update(u,n,d))}function o(l,u,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,u,0,d);let m=0;for(let g=0;g<d;g++)m+=u[g];e.update(m,n,1)}function c(l,u,d,f){if(d===0)return;let m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<l.length;g++)a(l[g],u[g],f[g]);else{m.multiDrawArraysInstancedWEBGL(n,l,0,u,0,f,0,d);let g=0;for(let _=0;_<d;_++)g+=u[_]*f[_];e.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function t0(i,t,e,n){let s;function r(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){let N=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(N.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(N){return!(N!==$e&&n.convert(N)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(N){let U=N===Ps&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(N!==Sn&&n.convert(N)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&N!==vn&&!U)}function c(N){if(N==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";N="mediump"}return N==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp",u=c(l);u!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",u,"instead."),l=u);let d=e.logarithmicDepthBuffer===!0,f=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),h=i.getParameter(i.MAX_VERTEX_ATTRIBS),T=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),y=i.getParameter(i.MAX_VARYING_VECTORS),x=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),B=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reverseDepthBuffer:f,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:h,maxVertexUniforms:T,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:B,maxSamples:C}}function e0(i){let t=this,e=null,n=0,s=!1,r=!1,a=new xn,o=new Ot,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,f){let m=d.length!==0||f||n!==0||s;return s=f,n=d.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,f){e=u(d,f,0)},this.setState=function(d,f,m){let g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,h=i.get(d);if(!s||g===null||g.length===0||r&&!p)r?u(null):l();else{let T=r?0:n,y=T*4,x=h.clippingState||null;c.value=x,x=u(g,f,y,m);for(let B=0;B!==y;++B)x[B]=e[B];h.clippingState=x,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=T}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(d,f,m,g){let _=d!==null?d.length:0,p=null;if(_!==0){if(p=c.value,g!==!0||p===null){let h=m+_*4,T=f.matrixWorldInverse;o.getNormalMatrix(T),(p===null||p.length<h)&&(p=new Float32Array(h));for(let y=0,x=m;y!==_;++y,x+=4)a.copy(d[y]).applyMatrix4(T,o),a.normal.toArray(p,x),p[x+3]=a.constant}c.value=p,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function n0(i){let t=new WeakMap;function e(a,o){return o===bo?a.mapping=Gi:o===So&&(a.mapping=Wi),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===bo||o===So)if(t.has(a)){let c=t.get(a).texture;return e(c,a.mapping)}else{let c=a.image;if(c&&c.height>0){let l=new ic(c.height);return l.fromEquirectangularTexture(i,a),t.set(a,l),a.addEventListener("dispose",s),e(l.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}var Fr=class extends Ur{constructor(t=-1,e=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-t,a=n+t,o=s+e,c=s-e;if(this.view!==null&&this.view.enabled){let l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){let e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}},Ui=4,yh=[.125,.215,.35,.446,.526,.582],si=20,to=new Fr,vh=new kt,eo=null,no=0,io=0,so=!1,ni=(1+Math.sqrt(5))/2,Ni=1/ni,Mh=[new k(-ni,Ni,0),new k(ni,Ni,0),new k(-Ni,0,ni),new k(Ni,0,ni),new k(0,ni,-Ni),new k(0,ni,Ni),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],Br=class{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){eo=this._renderer.getRenderTarget(),no=this._renderer.getActiveCubeFace(),io=this._renderer.getActiveMipmapLevel(),so=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,s,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Eh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(eo,no,io),this._renderer.xr.enabled=so,t.scissorTest=!1,hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Gi||t.mapping===Wi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),eo=this._renderer.getRenderTarget(),no=this._renderer.getActiveCubeFace(),io=this._renderer.getActiveMipmapLevel(),so=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:tn,minFilter:tn,generateMipmaps:!1,type:Ps,format:$e,colorSpace:ji,depthBuffer:!1},s=bh(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=bh(t,e,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=i0(r)),this._blurMaterial=s0(r,t,e)}return s}_compileMaterial(t){let e=new fe(this._lodPlanes[0],t);this._renderer.compile(e,to)}_sceneToCubeUV(t,e,n,s){let o=new Re(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(vh),u.toneMapping=Bn,u.autoClear=!1;let m=new $i({name:"PMREM.Background",side:Ie,depthWrite:!1,depthTest:!1}),g=new fe(new Pe,m),_=!1,p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,_=!0):(m.color.copy(vh),_=!0);for(let h=0;h<6;h++){let T=h%3;T===0?(o.up.set(0,c[h],0),o.lookAt(l[h],0,0)):T===1?(o.up.set(0,0,c[h]),o.lookAt(0,l[h],0)):(o.up.set(0,c[h],0),o.lookAt(0,0,l[h]));let y=this._cubeSize;hr(s,T*y,h>2?y:0,y,y),u.setRenderTarget(s),_&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=p}_textureToCubeUV(t,e){let n=this._renderer,s=t.mapping===Gi||t.mapping===Wi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Eh()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sh());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new fe(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;let c=this._cubeSize;hr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,to)}_applyPMREM(t){let e=this._renderer,n=e.autoClear;e.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Mh[(s-r-1)%Mh.length];this._blur(t,r-1,r,a,o)}e.autoClear=n}_blur(t,e,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,s,"latitudinal",r),this._halfBlur(a,t,n,n,s,"longitudinal",r)}_halfBlur(t,e,n,s,r,a,o){let c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,d=new fe(this._lodPlanes[s],l),f=l.uniforms,m=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*si-1),_=r/g,p=isFinite(r)?1+Math.floor(u*_):si;p>si&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${si}`);let h=[],T=0;for(let N=0;N<si;++N){let U=N/_,w=Math.exp(-U*U/2);h.push(w),N===0?T+=w:N<p&&(T+=2*w)}for(let N=0;N<h.length;N++)h[N]=h[N]/T;f.envMap.value=t.texture,f.samples.value=p,f.weights.value=h,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);let{_lodMax:y}=this;f.dTheta.value=g,f.mipInt.value=y-n;let x=this._sizeLods[s],B=3*x*(s>y-Ui?s-y+Ui:0),C=4*(this._cubeSize-x);hr(e,B,C,3*x,2*x),c.setRenderTarget(e),c.render(d,to)}};function i0(i){let t=[],e=[],n=[],s=i,r=i-Ui+1+yh.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);e.push(o);let c=1/o;a>i-Ui?c=yh[a-i+Ui-1]:a===0&&(c=0),n.push(c);let l=1/(o-2),u=-l,d=1+l,f=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,g=6,_=3,p=2,h=1,T=new Float32Array(_*g*m),y=new Float32Array(p*g*m),x=new Float32Array(h*g*m);for(let C=0;C<m;C++){let N=C%3*2/3-1,U=C>2?0:-1,w=[N,U,0,N+2/3,U,0,N+2/3,U+1,0,N,U,0,N+2/3,U+1,0,N,U+1,0];T.set(w,_*g*C),y.set(f,p*g*C);let M=[C,C,C,C,C,C];x.set(M,h*g*C)}let B=new we;B.setAttribute("position",new Ue(T,_)),B.setAttribute("uv",new Ue(y,p)),B.setAttribute("faceIndex",new Ue(x,h)),t.push(B),s>Ui&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function bh(i,t,e){let n=new En(i,t,e);return n.texture.mapping=ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hr(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function s0(i,t,e){let n=new Float32Array(si),s=new k(0,1,0);return new Fe({name:"SphericalGaussianBlur",defines:{n:si,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Sh(){return new Fe({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Eh(){return new Fe({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Yc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fn,depthTest:!1,depthWrite:!1})}function Yc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function r0(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){let c=o.mapping,l=c===bo||c===So,u=c===Gi||c===Wi;if(l||u){let d=t.get(o),f=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==f)return e===null&&(e=new Br(i)),d=l?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{let m=o.image;return l&&m&&m.height>0||u&&m&&s(m)?(e===null&&(e=new Br(i)),d=l?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",r),d.texture):null}}}return o}function s(o){let c=0,l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){let c=o.target;c.removeEventListener("dispose",r);let l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function a0(i){let t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){let s=e(n);return s===null&&ds("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function o0(i,t,e,n){let s={},r=new WeakMap;function a(d){let f=d.target;f.index!==null&&t.remove(f.index);for(let g in f.attributes)t.remove(f.attributes[g]);for(let g in f.morphAttributes){let _=f.morphAttributes[g];for(let p=0,h=_.length;p<h;p++)t.remove(_[p])}f.removeEventListener("dispose",a),delete s[f.id];let m=r.get(f);m&&(t.remove(m),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(d,f){return s[f.id]===!0||(f.addEventListener("dispose",a),s[f.id]=!0,e.memory.geometries++),f}function c(d){let f=d.attributes;for(let g in f)t.update(f[g],i.ARRAY_BUFFER);let m=d.morphAttributes;for(let g in m){let _=m[g];for(let p=0,h=_.length;p<h;p++)t.update(_[p],i.ARRAY_BUFFER)}}function l(d){let f=[],m=d.index,g=d.attributes.position,_=0;if(m!==null){let T=m.array;_=m.version;for(let y=0,x=T.length;y<x;y+=3){let B=T[y+0],C=T[y+1],N=T[y+2];f.push(B,C,C,N,N,B)}}else if(g!==void 0){let T=g.array;_=g.version;for(let y=0,x=T.length/3-1;y<x;y+=3){let B=y+0,C=y+1,N=y+2;f.push(B,C,C,N,N,B)}}else return;let p=new(_u(f)?Dr:Nr)(f,1);p.version=_;let h=r.get(d);h&&t.remove(h),r.set(d,p)}function u(d){let f=r.get(d);if(f){let m=d.index;m!==null&&f.version<m.version&&l(d)}else l(d);return r.get(d)}return{get:o,update:c,getWireframeAttribute:u}}function c0(i,t,e){let n;function s(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function c(f,m){i.drawElements(n,m,r,f*a),e.update(m,n,1)}function l(f,m,g){g!==0&&(i.drawElementsInstanced(n,m,r,f*a,g),e.update(m,n,g))}function u(f,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,f,0,g);let p=0;for(let h=0;h<g;h++)p+=m[h];e.update(p,n,1)}function d(f,m,g,_){if(g===0)return;let p=t.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<f.length;h++)l(f[h]/a,m[h],_[h]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,r,f,0,_,0,g);let h=0;for(let T=0;T<g;T++)h+=m[T]*_[T];e.update(h,n,1)}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function l0(i){let t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case i.TRIANGLES:e.triangles+=o*(r/3);break;case i.LINES:e.lines+=o*(r/2);break;case i.LINE_STRIP:e.lines+=o*(r-1);break;case i.LINE_LOOP:e.lines+=o*r;break;case i.POINTS:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function h0(i,t,e){let n=new WeakMap,s=new le;function r(a,o,c){let l=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,f=n.get(o);if(f===void 0||f.count!==d){let w=function(){N.dispose(),n.delete(o),o.removeEventListener("dispose",w)};f!==void 0&&f.texture.dispose();let m=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],h=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],y=0;m===!0&&(y=1),g===!0&&(y=2),_===!0&&(y=3);let x=o.attributes.position.count*y,B=1;x>t.maxTextureSize&&(B=Math.ceil(x/t.maxTextureSize),x=t.maxTextureSize);let C=new Float32Array(x*B*4*d),N=new Ir(C,x,B,d);N.type=vn,N.needsUpdate=!0;let U=y*4;for(let M=0;M<d;M++){let z=p[M],G=h[M],$=T[M],K=x*B*4*M;for(let ct=0;ct<z.count;ct++){let F=ct*U;m===!0&&(s.fromBufferAttribute(z,ct),C[K+F+0]=s.x,C[K+F+1]=s.y,C[K+F+2]=s.z,C[K+F+3]=0),g===!0&&(s.fromBufferAttribute(G,ct),C[K+F+4]=s.x,C[K+F+5]=s.y,C[K+F+6]=s.z,C[K+F+7]=0),_===!0&&(s.fromBufferAttribute($,ct),C[K+F+8]=s.x,C[K+F+9]=s.y,C[K+F+10]=s.z,C[K+F+11]=$.itemSize===4?s.w:1)}}f={count:d,texture:N,size:new ft(x,B)},n.set(o,f),o.addEventListener("dispose",w)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,e);else{let m=0;for(let _=0;_<l.length;_++)m+=l[_];let g=o.morphTargetsRelative?1:1-m;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",f.texture,e),c.getUniforms().setValue(i,"morphTargetsTextureSize",f.size)}return{update:r}}function u0(i,t,e,n){let s=new WeakMap;function r(c){let l=n.render.frame,u=c.geometry,d=t.get(c,u);if(s.get(d)!==l&&(t.update(d),s.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(e.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){let f=c.skeleton;s.get(f)!==l&&(f.update(),s.set(f,l))}return d}function a(){s=new WeakMap}function o(c){let l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}var zr=class extends Oe{constructor(t,e,n,s,r,a,o,c,l,u=Bi){if(u!==Bi&&u!==qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Bi&&(n=oi),n===void 0&&u===qi&&(n=Xi),super(null,s,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ze,this.minFilter=c!==void 0?c:Ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){let e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}},Mu=new Oe,wh=new zr(1,1),bu=new Ir,Su=new ec,Eu=new Or,Th=[],Ah=[],Rh=new Float32Array(16),Ch=new Float32Array(9),Ih=new Float32Array(4);function ts(i,t,e){let n=i[0];if(n<=0||n>0)return i;let s=t*e,r=Th[s];if(r===void 0&&(r=new Float32Array(s),Th[s]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,i[a].toArray(r,o)}return r}function me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function ge(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function oa(i,t){let e=Ah[t];e===void 0&&(e=new Int32Array(t),Ah[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function d0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function f0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2fv(this.addr,t),ge(e,t)}}function p0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(me(e,t))return;i.uniform3fv(this.addr,t),ge(e,t)}}function m0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4fv(this.addr,t),ge(e,t)}}function g0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Ih.set(n),i.uniformMatrix2fv(this.addr,!1,Ih),ge(e,n)}}function _0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Ch.set(n),i.uniformMatrix3fv(this.addr,!1,Ch),ge(e,n)}}function x0(i,t){let e=this.cache,n=t.elements;if(n===void 0){if(me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),ge(e,t)}else{if(me(e,n))return;Rh.set(n),i.uniformMatrix4fv(this.addr,!1,Rh),ge(e,n)}}function y0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function v0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2iv(this.addr,t),ge(e,t)}}function M0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3iv(this.addr,t),ge(e,t)}}function b0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4iv(this.addr,t),ge(e,t)}}function S0(i,t){let e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function E0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(me(e,t))return;i.uniform2uiv(this.addr,t),ge(e,t)}}function w0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(me(e,t))return;i.uniform3uiv(this.addr,t),ge(e,t)}}function T0(i,t){let e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(me(e,t))return;i.uniform4uiv(this.addr,t),ge(e,t)}}function A0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(wh.compareFunction=gu,r=wh):r=Mu,e.setTexture2D(t||r,s)}function R0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||Su,s)}function C0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Eu,s)}function I0(i,t,e){let n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||bu,s)}function P0(i){switch(i){case 5126:return d0;case 35664:return f0;case 35665:return p0;case 35666:return m0;case 35674:return g0;case 35675:return _0;case 35676:return x0;case 5124:case 35670:return y0;case 35667:case 35671:return v0;case 35668:case 35672:return M0;case 35669:case 35673:return b0;case 5125:return S0;case 36294:return E0;case 36295:return w0;case 36296:return T0;case 35678:case 36198:case 36298:case 36306:case 35682:return A0;case 35679:case 36299:case 36307:return R0;case 35680:case 36300:case 36308:case 36293:return C0;case 36289:case 36303:case 36311:case 36292:return I0}}function L0(i,t){i.uniform1fv(this.addr,t)}function N0(i,t){let e=ts(t,this.size,2);i.uniform2fv(this.addr,e)}function D0(i,t){let e=ts(t,this.size,3);i.uniform3fv(this.addr,e)}function U0(i,t){let e=ts(t,this.size,4);i.uniform4fv(this.addr,e)}function O0(i,t){let e=ts(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function F0(i,t){let e=ts(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function B0(i,t){let e=ts(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function z0(i,t){i.uniform1iv(this.addr,t)}function k0(i,t){i.uniform2iv(this.addr,t)}function H0(i,t){i.uniform3iv(this.addr,t)}function V0(i,t){i.uniform4iv(this.addr,t)}function G0(i,t){i.uniform1uiv(this.addr,t)}function W0(i,t){i.uniform2uiv(this.addr,t)}function X0(i,t){i.uniform3uiv(this.addr,t)}function q0(i,t){i.uniform4uiv(this.addr,t)}function Y0(i,t,e){let n=this.cache,s=t.length,r=oa(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==s;++a)e.setTexture2D(t[a]||Mu,r[a])}function $0(i,t,e){let n=this.cache,s=t.length,r=oa(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==s;++a)e.setTexture3D(t[a]||Su,r[a])}function Z0(i,t,e){let n=this.cache,s=t.length,r=oa(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==s;++a)e.setTextureCube(t[a]||Eu,r[a])}function J0(i,t,e){let n=this.cache,s=t.length,r=oa(e,s);me(n,r)||(i.uniform1iv(this.addr,r),ge(n,r));for(let a=0;a!==s;++a)e.setTexture2DArray(t[a]||bu,r[a])}function K0(i){switch(i){case 5126:return L0;case 35664:return N0;case 35665:return D0;case 35666:return U0;case 35674:return O0;case 35675:return F0;case 35676:return B0;case 5124:case 35670:return z0;case 35667:case 35671:return k0;case 35668:case 35672:return H0;case 35669:case 35673:return V0;case 5125:return G0;case 36294:return W0;case 36295:return X0;case 36296:return q0;case 35678:case 36198:case 36298:case 36306:case 35682:return Y0;case 35679:case 36299:case 36307:return $0;case 35680:case 36300:case 36308:case 36293:return Z0;case 36289:case 36303:case 36311:case 36292:return J0}}var sc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=P0(e.type)}},rc=class{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=K0(e.type)}},ac=class{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(t,e[o.id],n)}}},ro=/(\w+)(\])?(\[|\.)?/g;function Ph(i,t){i.seq.push(t),i.map[t.id]=t}function Q0(i,t,e){let n=i.name,s=n.length;for(ro.lastIndex=0;;){let r=ro.exec(n),a=ro.lastIndex,o=r[1],c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Ph(e,l===void 0?new sc(o,i,t):new rc(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new ac(o),Ph(e,d)),e=d}}}var Hi=class{constructor(t,e){this.seq=[],this.map={};let n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=t.getActiveUniform(e,s),a=t.getUniformLocation(e,r.name);Q0(r,a,this)}}setValue(t,e,n,s){let r=this.map[e];r!==void 0&&r.setValue(t,n,s)}setOptional(t,e,n){let s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let r=0,a=e.length;r!==a;++r){let o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,s)}}static seqWithValue(t,e){let n=[];for(let s=0,r=t.length;s!==r;++s){let a=t[s];a.id in e&&n.push(a)}return n}};function Lh(i,t,e){let n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}var j0=37297,t_=0;function e_(i,t){let e=i.split(`
`),n=[],s=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}var Nh=new Ot;function n_(i){$t._getMatrix(Nh,$t.workingColorSpace,i);let t=`mat3( ${Nh.elements.map(e=>e.toFixed(4))} )`;switch($t.getTransfer(i)){case aa:return[t,"LinearTransferOETF"];case jt:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[t,"LinearTransferOETF"]}}function Dh(i,t,e){let n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return e.toUpperCase()+`

`+s+`

`+e_(i.getShaderSource(t),a)}else return s}function i_(i,t){let e=n_(t);return[`vec4 ${i}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function s_(i,t){let e;switch(t){case pf:e="Linear";break;case mf:e="Reinhard";break;case gf:e="Cineon";break;case _f:e="ACESFilmic";break;case yf:e="AgX";break;case vf:e="Neutral";break;case xf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}var ur=new k;function r_(){$t.getLuminanceCoefficients(ur);let i=ur.x.toFixed(4),t=ur.y.toFixed(4),e=ur.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function a_(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(fs).join(`
`)}function o_(i){let t=[];for(let e in i){let n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function c_(i,t){let e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(t,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:i.getAttribLocation(t,a),locationSize:o}}return e}function fs(i){return i!==""}function Uh(i,t){let e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Oh(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var l_=/^[ \t]*#include +<([\w\d./]+)>/gm;function oc(i){return i.replace(l_,u_)}var h_=new Map;function u_(i,t){let e=Wt[t];if(e===void 0){let n=h_.get(t);if(n!==void 0)e=Wt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return oc(e)}var d_=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Fh(i){return i.replace(d_,f_)}function f_(i,t,e,n){let s="";for(let r=parseInt(t);r<parseInt(e);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Bh(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function p_(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===nu?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===zc?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===_n&&(t="SHADOWMAP_TYPE_VSM"),t}function m_(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Gi:case Wi:t="ENVMAP_TYPE_CUBE";break;case ra:t="ENVMAP_TYPE_CUBE_UV";break}return t}function g_(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Wi:t="ENVMAP_MODE_REFRACTION";break}return t}function __(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case iu:t="ENVMAP_BLENDING_MULTIPLY";break;case df:t="ENVMAP_BLENDING_MIX";break;case ff:t="ENVMAP_BLENDING_ADD";break}return t}function x_(i){let t=i.envMapCubeUVHeight;if(t===null)return null;let e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function y_(i,t,e,n){let s=i.getContext(),r=e.defines,a=e.vertexShader,o=e.fragmentShader,c=p_(e),l=m_(e),u=g_(e),d=__(e),f=x_(e),m=a_(e),g=o_(r),_=s.createProgram(),p,h,T=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fs).join(`
`),p.length>0&&(p+=`
`),h=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(fs).join(`
`),h.length>0&&(h+=`
`)):(p=[Bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(fs).join(`
`),h=[Bh(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+d:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Bn?"#define TONE_MAPPING":"",e.toneMapping!==Bn?Wt.tonemapping_pars_fragment:"",e.toneMapping!==Bn?s_("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,i_("linearToOutputTexel",e.outputColorSpace),r_(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(fs).join(`
`)),a=oc(a),a=Uh(a,e),a=Oh(a,e),o=oc(o),o=Uh(o,e),o=Oh(o,e),a=Fh(a),o=Fh(o),e.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,h=["#define varying in",e.glslVersion===Kl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Kl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+h);let y=T+p+a,x=T+h+o,B=Lh(s,s.VERTEX_SHADER,y),C=Lh(s,s.FRAGMENT_SHADER,x);s.attachShader(_,B),s.attachShader(_,C),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function N(z){if(i.debug.checkShaderErrors){let G=s.getProgramInfoLog(_).trim(),$=s.getShaderInfoLog(B).trim(),K=s.getShaderInfoLog(C).trim(),ct=!0,F=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(ct=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,B,C);else{let V=Dh(s,B,"vertex"),O=Dh(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+z.name+`
Material Type: `+z.type+`

Program Info Log: `+G+`
`+V+`
`+O)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):($===""||K==="")&&(F=!1);F&&(z.diagnostics={runnable:ct,programLog:G,vertexShader:{log:$,prefix:p},fragmentShader:{log:K,prefix:h}})}s.deleteShader(B),s.deleteShader(C),U=new Hi(s,_),w=c_(s,_)}let U;this.getUniforms=function(){return U===void 0&&N(this),U};let w;this.getAttributes=function(){return w===void 0&&N(this),w};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=s.getProgramParameter(_,j0)),M},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=t_++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=B,this.fragmentShader=C,this}var v_=0,cc=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){let e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){let e=this.materialCache.get(t);for(let n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){let e=this.materialCache,n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){let e=this.shaderCache,n=e.get(t);return n===void 0&&(n=new lc(t),e.set(t,n)),n}},lc=class{constructor(t){this.id=v_++,this.code=t,this.usedTimes=0}};function M_(i,t,e,n,s,r,a){let o=new Lr,c=new cc,l=new Set,u=[],d=s.logarithmicDepthBuffer,f=s.vertexTextures,m=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(w){return l.add(w),w===0?"uv":`uv${w}`}function p(w,M,z,G,$){let K=G.fog,ct=$.geometry,F=w.isMeshStandardMaterial?G.environment:null,V=(w.isMeshStandardMaterial?e:t).get(w.envMap||F),O=V&&V.mapping===ra?V.image.height:null,lt=g[w.type];w.precision!==null&&(m=s.getMaxPrecision(w.precision),m!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",m,"instead."));let mt=ct.morphAttributes.position||ct.morphAttributes.normal||ct.morphAttributes.color,vt=mt!==void 0?mt.length:0,Ct=0;ct.morphAttributes.position!==void 0&&(Ct=1),ct.morphAttributes.normal!==void 0&&(Ct=2),ct.morphAttributes.color!==void 0&&(Ct=3);let Xt,D,P,R;if(lt){let Qt=je[lt];Xt=Qt.vertexShader,D=Qt.fragmentShader}else Xt=w.vertexShader,D=w.fragmentShader,c.update(w),P=c.getVertexShaderID(w),R=c.getFragmentShaderID(w);let S=i.getRenderTarget(),Q=i.state.buffers.depth.getReversed(),ht=$.isInstancedMesh===!0,J=$.isBatchedMesh===!0,gt=!!w.map,Z=!!w.matcap,j=!!V,b=!!w.aoMap,et=!!w.lightMap,tt=!!w.bumpMap,at=!!w.normalMap,I=!!w.displacementMap,L=!!w.emissiveMap,it=!!w.metalnessMap,E=!!w.roughnessMap,v=w.anisotropy>0,Y=w.clearcoat>0,rt=w.dispersion>0,pt=w.iridescence>0,H=w.sheen>0,ut=w.transmission>0,dt=v&&!!w.anisotropyMap,yt=Y&&!!w.clearcoatMap,It=Y&&!!w.clearcoatNormalMap,xt=Y&&!!w.clearcoatRoughnessMap,At=pt&&!!w.iridescenceMap,Ut=pt&&!!w.iridescenceThicknessMap,Ft=H&&!!w.sheenColorMap,Rt=H&&!!w.sheenRoughnessMap,Yt=!!w.specularMap,Gt=!!w.specularColorMap,ee=!!w.specularIntensityMap,W=ut&&!!w.transmissionMap,St=ut&&!!w.thicknessMap,ot=!!w.gradientMap,_t=!!w.alphaMap,Tt=w.alphaTest>0,Et=!!w.alphaHash,Ht=!!w.extensions,ce=Bn;w.toneMapped&&(S===null||S.isXRRenderTarget===!0)&&(ce=i.toneMapping);let Me={shaderID:lt,shaderType:w.type,shaderName:w.name,vertexShader:Xt,fragmentShader:D,defines:w.defines,customVertexShaderID:P,customFragmentShaderID:R,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:m,batching:J,batchingColor:J&&$._colorsTexture!==null,instancing:ht,instancingColor:ht&&$.instanceColor!==null,instancingMorph:ht&&$.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:S===null?i.outputColorSpace:S.isXRRenderTarget===!0?S.texture.colorSpace:ji,alphaToCoverage:!!w.alphaToCoverage,map:gt,matcap:Z,envMap:j,envMapMode:j&&V.mapping,envMapCubeUVHeight:O,aoMap:b,lightMap:et,bumpMap:tt,normalMap:at,displacementMap:f&&I,emissiveMap:L,normalMapObjectSpace:at&&w.normalMapType===Ef,normalMapTangentSpace:at&&w.normalMapType===mu,metalnessMap:it,roughnessMap:E,anisotropy:v,anisotropyMap:dt,clearcoat:Y,clearcoatMap:yt,clearcoatNormalMap:It,clearcoatRoughnessMap:xt,dispersion:rt,iridescence:pt,iridescenceMap:At,iridescenceThicknessMap:Ut,sheen:H,sheenColorMap:Ft,sheenRoughnessMap:Rt,specularMap:Yt,specularColorMap:Gt,specularIntensityMap:ee,transmission:ut,transmissionMap:W,thicknessMap:St,gradientMap:ot,opaque:w.transparent===!1&&w.blending===Fi&&w.alphaToCoverage===!1,alphaMap:_t,alphaTest:Tt,alphaHash:Et,combine:w.combine,mapUv:gt&&_(w.map.channel),aoMapUv:b&&_(w.aoMap.channel),lightMapUv:et&&_(w.lightMap.channel),bumpMapUv:tt&&_(w.bumpMap.channel),normalMapUv:at&&_(w.normalMap.channel),displacementMapUv:I&&_(w.displacementMap.channel),emissiveMapUv:L&&_(w.emissiveMap.channel),metalnessMapUv:it&&_(w.metalnessMap.channel),roughnessMapUv:E&&_(w.roughnessMap.channel),anisotropyMapUv:dt&&_(w.anisotropyMap.channel),clearcoatMapUv:yt&&_(w.clearcoatMap.channel),clearcoatNormalMapUv:It&&_(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&_(w.clearcoatRoughnessMap.channel),iridescenceMapUv:At&&_(w.iridescenceMap.channel),iridescenceThicknessMapUv:Ut&&_(w.iridescenceThicknessMap.channel),sheenColorMapUv:Ft&&_(w.sheenColorMap.channel),sheenRoughnessMapUv:Rt&&_(w.sheenRoughnessMap.channel),specularMapUv:Yt&&_(w.specularMap.channel),specularColorMapUv:Gt&&_(w.specularColorMap.channel),specularIntensityMapUv:ee&&_(w.specularIntensityMap.channel),transmissionMapUv:W&&_(w.transmissionMap.channel),thicknessMapUv:St&&_(w.thicknessMap.channel),alphaMapUv:_t&&_(w.alphaMap.channel),vertexTangents:!!ct.attributes.tangent&&(at||v),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!ct.attributes.color&&ct.attributes.color.itemSize===4,pointsUvs:$.isPoints===!0&&!!ct.attributes.uv&&(gt||_t),fog:!!K,useFog:w.fog===!0,fogExp2:!!K&&K.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:Q,skinning:$.isSkinnedMesh===!0,morphTargets:ct.morphAttributes.position!==void 0,morphNormals:ct.morphAttributes.normal!==void 0,morphColors:ct.morphAttributes.color!==void 0,morphTargetsCount:vt,morphTextureStride:Ct,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:w.dithering,shadowMapEnabled:i.shadowMap.enabled&&z.length>0,shadowMapType:i.shadowMap.type,toneMapping:ce,decodeVideoTexture:gt&&w.map.isVideoTexture===!0&&$t.getTransfer(w.map.colorSpace)===jt,decodeVideoTextureEmissive:L&&w.emissiveMap.isVideoTexture===!0&&$t.getTransfer(w.emissiveMap.colorSpace)===jt,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===yn,flipSided:w.side===Ie,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionClipCullDistance:Ht&&w.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ht&&w.extensions.multiDraw===!0||J)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()};return Me.vertexUv1s=l.has(1),Me.vertexUv2s=l.has(2),Me.vertexUv3s=l.has(3),l.clear(),Me}function h(w){let M=[];if(w.shaderID?M.push(w.shaderID):(M.push(w.customVertexShaderID),M.push(w.customFragmentShaderID)),w.defines!==void 0)for(let z in w.defines)M.push(z),M.push(w.defines[z]);return w.isRawShaderMaterial===!1&&(T(M,w),y(M,w),M.push(i.outputColorSpace)),M.push(w.customProgramCacheKey),M.join()}function T(w,M){w.push(M.precision),w.push(M.outputColorSpace),w.push(M.envMapMode),w.push(M.envMapCubeUVHeight),w.push(M.mapUv),w.push(M.alphaMapUv),w.push(M.lightMapUv),w.push(M.aoMapUv),w.push(M.bumpMapUv),w.push(M.normalMapUv),w.push(M.displacementMapUv),w.push(M.emissiveMapUv),w.push(M.metalnessMapUv),w.push(M.roughnessMapUv),w.push(M.anisotropyMapUv),w.push(M.clearcoatMapUv),w.push(M.clearcoatNormalMapUv),w.push(M.clearcoatRoughnessMapUv),w.push(M.iridescenceMapUv),w.push(M.iridescenceThicknessMapUv),w.push(M.sheenColorMapUv),w.push(M.sheenRoughnessMapUv),w.push(M.specularMapUv),w.push(M.specularColorMapUv),w.push(M.specularIntensityMapUv),w.push(M.transmissionMapUv),w.push(M.thicknessMapUv),w.push(M.combine),w.push(M.fogExp2),w.push(M.sizeAttenuation),w.push(M.morphTargetsCount),w.push(M.morphAttributeCount),w.push(M.numDirLights),w.push(M.numPointLights),w.push(M.numSpotLights),w.push(M.numSpotLightMaps),w.push(M.numHemiLights),w.push(M.numRectAreaLights),w.push(M.numDirLightShadows),w.push(M.numPointLightShadows),w.push(M.numSpotLightShadows),w.push(M.numSpotLightShadowsWithMaps),w.push(M.numLightProbes),w.push(M.shadowMapType),w.push(M.toneMapping),w.push(M.numClippingPlanes),w.push(M.numClipIntersection),w.push(M.depthPacking)}function y(w,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),w.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.decodeVideoTextureEmissive&&o.enable(20),M.alphaToCoverage&&o.enable(21),w.push(o.mask)}function x(w){let M=g[w.type],z;if(M){let G=je[M];z=up.clone(G.uniforms)}else z=w.uniforms;return z}function B(w,M){let z;for(let G=0,$=u.length;G<$;G++){let K=u[G];if(K.cacheKey===M){z=K,++z.usedTimes;break}}return z===void 0&&(z=new y_(i,M,w,r),u.push(z)),z}function C(w){if(--w.usedTimes===0){let M=u.indexOf(w);u[M]=u[u.length-1],u.pop(),w.destroy()}}function N(w){c.remove(w)}function U(){c.dispose()}return{getParameters:p,getProgramCacheKey:h,getUniforms:x,acquireProgram:B,releaseProgram:C,releaseShaderCache:N,programs:u,dispose:U}}function b_(){let i=new WeakMap;function t(a){return i.has(a)}function e(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:r}}function S_(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function zh(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function kh(){let i=[],t=0,e=[],n=[],s=[];function r(){t=0,e.length=0,n.length=0,s.length=0}function a(d,f,m,g,_,p){let h=i[t];return h===void 0?(h={id:d.id,object:d,geometry:f,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},i[t]=h):(h.id=d.id,h.object=d,h.geometry=f,h.material=m,h.groupOrder=g,h.renderOrder=d.renderOrder,h.z=_,h.group=p),t++,h}function o(d,f,m,g,_,p){let h=a(d,f,m,g,_,p);m.transmission>0?n.push(h):m.transparent===!0?s.push(h):e.push(h)}function c(d,f,m,g,_,p){let h=a(d,f,m,g,_,p);m.transmission>0?n.unshift(h):m.transparent===!0?s.unshift(h):e.unshift(h)}function l(d,f){e.length>1&&e.sort(d||S_),n.length>1&&n.sort(f||zh),s.length>1&&s.sort(f||zh)}function u(){for(let d=t,f=i.length;d<f;d++){let m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:u,sort:l}}function E_(){let i=new WeakMap;function t(n,s){let r=i.get(n),a;return r===void 0?(a=new kh,i.set(n,[a])):s>=r.length?(a=new kh,r.push(a)):a=r[s],a}function e(){i=new WeakMap}return{get:t,dispose:e}}function w_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new k,color:new kt};break;case"SpotLight":e={position:new k,direction:new k,color:new kt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new k,color:new kt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new k,skyColor:new kt,groundColor:new kt};break;case"RectAreaLight":e={color:new kt,position:new k,halfWidth:new k,halfHeight:new k};break}return i[t.id]=e,e}}}function T_(){let i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}var A_=0;function R_(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function C_(i){let t=new w_,e=T_(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new k);let s=new k,r=new ie,a=new ie;function o(l){let u=0,d=0,f=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let m=0,g=0,_=0,p=0,h=0,T=0,y=0,x=0,B=0,C=0,N=0;l.sort(R_);for(let w=0,M=l.length;w<M;w++){let z=l[w],G=z.color,$=z.intensity,K=z.distance,ct=z.shadow&&z.shadow.map?z.shadow.map.texture:null;if(z.isAmbientLight)u+=G.r*$,d+=G.g*$,f+=G.b*$;else if(z.isLightProbe){for(let F=0;F<9;F++)n.probe[F].addScaledVector(z.sh.coefficients[F],$);N++}else if(z.isDirectionalLight){let F=t.get(z);if(F.color.copy(z.color).multiplyScalar(z.intensity),z.castShadow){let V=z.shadow,O=e.get(z);O.shadowIntensity=V.intensity,O.shadowBias=V.bias,O.shadowNormalBias=V.normalBias,O.shadowRadius=V.radius,O.shadowMapSize=V.mapSize,n.directionalShadow[m]=O,n.directionalShadowMap[m]=ct,n.directionalShadowMatrix[m]=z.shadow.matrix,T++}n.directional[m]=F,m++}else if(z.isSpotLight){let F=t.get(z);F.position.setFromMatrixPosition(z.matrixWorld),F.color.copy(G).multiplyScalar($),F.distance=K,F.coneCos=Math.cos(z.angle),F.penumbraCos=Math.cos(z.angle*(1-z.penumbra)),F.decay=z.decay,n.spot[_]=F;let V=z.shadow;if(z.map&&(n.spotLightMap[B]=z.map,B++,V.updateMatrices(z),z.castShadow&&C++),n.spotLightMatrix[_]=V.matrix,z.castShadow){let O=e.get(z);O.shadowIntensity=V.intensity,O.shadowBias=V.bias,O.shadowNormalBias=V.normalBias,O.shadowRadius=V.radius,O.shadowMapSize=V.mapSize,n.spotShadow[_]=O,n.spotShadowMap[_]=ct,x++}_++}else if(z.isRectAreaLight){let F=t.get(z);F.color.copy(G).multiplyScalar($),F.halfWidth.set(z.width*.5,0,0),F.halfHeight.set(0,z.height*.5,0),n.rectArea[p]=F,p++}else if(z.isPointLight){let F=t.get(z);if(F.color.copy(z.color).multiplyScalar(z.intensity),F.distance=z.distance,F.decay=z.decay,z.castShadow){let V=z.shadow,O=e.get(z);O.shadowIntensity=V.intensity,O.shadowBias=V.bias,O.shadowNormalBias=V.normalBias,O.shadowRadius=V.radius,O.shadowMapSize=V.mapSize,O.shadowCameraNear=V.camera.near,O.shadowCameraFar=V.camera.far,n.pointShadow[g]=O,n.pointShadowMap[g]=ct,n.pointShadowMatrix[g]=z.shadow.matrix,y++}n.point[g]=F,g++}else if(z.isHemisphereLight){let F=t.get(z);F.skyColor.copy(z.color).multiplyScalar($),F.groundColor.copy(z.groundColor).multiplyScalar($),n.hemi[h]=F,h++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=bt.LTC_FLOAT_1,n.rectAreaLTC2=bt.LTC_FLOAT_2):(n.rectAreaLTC1=bt.LTC_HALF_1,n.rectAreaLTC2=bt.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;let U=n.hash;(U.directionalLength!==m||U.pointLength!==g||U.spotLength!==_||U.rectAreaLength!==p||U.hemiLength!==h||U.numDirectionalShadows!==T||U.numPointShadows!==y||U.numSpotShadows!==x||U.numSpotMaps!==B||U.numLightProbes!==N)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=h,n.directionalShadow.length=T,n.directionalShadowMap.length=T,n.pointShadow.length=y,n.pointShadowMap.length=y,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=T,n.pointShadowMatrix.length=y,n.spotLightMatrix.length=x+B-C,n.spotLightMap.length=B,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=N,U.directionalLength=m,U.pointLength=g,U.spotLength=_,U.rectAreaLength=p,U.hemiLength=h,U.numDirectionalShadows=T,U.numPointShadows=y,U.numSpotShadows=x,U.numSpotMaps=B,U.numLightProbes=N,n.version=A_++)}function c(l,u){let d=0,f=0,m=0,g=0,_=0,p=u.matrixWorldInverse;for(let h=0,T=l.length;h<T;h++){let y=l[h];if(y.isDirectionalLight){let x=n.directional[d];x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),d++}else if(y.isSpotLight){let x=n.spot[m];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),x.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),x.direction.sub(s),x.direction.transformDirection(p),m++}else if(y.isRectAreaLight){let x=n.rectArea[g];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),a.identity(),r.copy(y.matrixWorld),r.premultiply(p),a.extractRotation(r),x.halfWidth.set(y.width*.5,0,0),x.halfHeight.set(0,y.height*.5,0),x.halfWidth.applyMatrix4(a),x.halfHeight.applyMatrix4(a),g++}else if(y.isPointLight){let x=n.point[f];x.position.setFromMatrixPosition(y.matrixWorld),x.position.applyMatrix4(p),f++}else if(y.isHemisphereLight){let x=n.hemi[_];x.direction.setFromMatrixPosition(y.matrixWorld),x.direction.transformDirection(p),_++}}}return{setup:o,setupView:c,state:n}}function Hh(i){let t=new C_(i),e=[],n=[];function s(u){l.camera=u,e.length=0,n.length=0}function r(u){e.push(u)}function a(u){n.push(u)}function o(){t.setup(e)}function c(u){t.setupView(e,u)}let l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function I_(i){let t=new WeakMap;function e(s,r=0){let a=t.get(s),o;return a===void 0?(o=new Hh(i),t.set(s,[o])):r>=a.length?(o=new Hh(i),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}var hc=class extends Gn{static get type(){return"MeshDepthMaterial"}constructor(t){super(),this.isMeshDepthMaterial=!0,this.depthPacking=bf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}},uc=class extends Gn{static get type(){return"MeshDistanceMaterial"}constructor(t){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}},P_=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,L_=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function N_(i,t,e){let n=new vs,s=new ft,r=new ft,a=new le,o=new hc({depthPacking:Sf}),c=new uc,l={},u=e.maxTextureSize,d={[Hn]:Ie,[Ie]:Hn,[yn]:yn},f=new Fe({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:P_,fragmentShader:L_}),m=f.clone();m.defines.HORIZONTAL_PASS=1;let g=new we;g.setAttribute("position",new Ue(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let _=new fe(g,f),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=nu;let h=this.type;this.render=function(C,N,U){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;let w=i.getRenderTarget(),M=i.getActiveCubeFace(),z=i.getActiveMipmapLevel(),G=i.state;G.setBlending(Fn),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);let $=h!==_n&&this.type===_n,K=h===_n&&this.type!==_n;for(let ct=0,F=C.length;ct<F;ct++){let V=C[ct],O=V.shadow;if(O===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(O.autoUpdate===!1&&O.needsUpdate===!1)continue;s.copy(O.mapSize);let lt=O.getFrameExtents();if(s.multiply(lt),r.copy(O.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/lt.x),s.x=r.x*lt.x,O.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/lt.y),s.y=r.y*lt.y,O.mapSize.y=r.y)),O.map===null||$===!0||K===!0){let vt=this.type!==_n?{minFilter:Ze,magFilter:Ze}:{};O.map!==null&&O.map.dispose(),O.map=new En(s.x,s.y,vt),O.map.texture.name=V.name+".shadowMap",O.camera.updateProjectionMatrix()}i.setRenderTarget(O.map),i.clear();let mt=O.getViewportCount();for(let vt=0;vt<mt;vt++){let Ct=O.getViewport(vt);a.set(r.x*Ct.x,r.y*Ct.y,r.x*Ct.z,r.y*Ct.w),G.viewport(a),O.updateMatrices(V,vt),n=O.getFrustum(),x(N,U,O.camera,V,this.type)}O.isPointLightShadow!==!0&&this.type===_n&&T(O,U),O.needsUpdate=!1}h=this.type,p.needsUpdate=!1,i.setRenderTarget(w,M,z)};function T(C,N){let U=t.update(_);f.defines.VSM_SAMPLES!==C.blurSamples&&(f.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,f.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new En(s.x,s.y)),f.uniforms.shadow_pass.value=C.map.texture,f.uniforms.resolution.value=C.mapSize,f.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(N,null,U,f,_,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(N,null,U,m,_,null)}function y(C,N,U,w){let M=null,z=U.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(z!==void 0)M=z;else if(M=U.isPointLight===!0?c:o,i.localClippingEnabled&&N.clipShadows===!0&&Array.isArray(N.clippingPlanes)&&N.clippingPlanes.length!==0||N.displacementMap&&N.displacementScale!==0||N.alphaMap&&N.alphaTest>0||N.map&&N.alphaTest>0){let G=M.uuid,$=N.uuid,K=l[G];K===void 0&&(K={},l[G]=K);let ct=K[$];ct===void 0&&(ct=M.clone(),K[$]=ct,N.addEventListener("dispose",B)),M=ct}if(M.visible=N.visible,M.wireframe=N.wireframe,w===_n?M.side=N.shadowSide!==null?N.shadowSide:N.side:M.side=N.shadowSide!==null?N.shadowSide:d[N.side],M.alphaMap=N.alphaMap,M.alphaTest=N.alphaTest,M.map=N.map,M.clipShadows=N.clipShadows,M.clippingPlanes=N.clippingPlanes,M.clipIntersection=N.clipIntersection,M.displacementMap=N.displacementMap,M.displacementScale=N.displacementScale,M.displacementBias=N.displacementBias,M.wireframeLinewidth=N.wireframeLinewidth,M.linewidth=N.linewidth,U.isPointLight===!0&&M.isMeshDistanceMaterial===!0){let G=i.properties.get(M);G.light=U}return M}function x(C,N,U,w,M){if(C.visible===!1)return;if(C.layers.test(N.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&M===_n)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,C.matrixWorld);let $=t.update(C),K=C.material;if(Array.isArray(K)){let ct=$.groups;for(let F=0,V=ct.length;F<V;F++){let O=ct[F],lt=K[O.materialIndex];if(lt&&lt.visible){let mt=y(C,lt,w,M);C.onBeforeShadow(i,C,N,U,$,mt,O),i.renderBufferDirect(U,null,$,mt,C,O),C.onAfterShadow(i,C,N,U,$,mt,O)}}}else if(K.visible){let ct=y(C,K,w,M);C.onBeforeShadow(i,C,N,U,$,ct,null),i.renderBufferDirect(U,null,$,ct,C,null),C.onAfterShadow(i,C,N,U,$,ct,null)}}let G=C.children;for(let $=0,K=G.length;$<K;$++)x(G[$],N,U,w,M)}function B(C){C.target.removeEventListener("dispose",B);for(let U in l){let w=l[U],M=C.target.uuid;M in w&&(w[M].dispose(),delete w[M])}}}var D_={[mo]:go,[_o]:vo,[xo]:Mo,[Vi]:yo,[go]:mo,[vo]:_o,[Mo]:xo,[yo]:Vi};function U_(i,t){function e(){let W=!1,St=new le,ot=null,_t=new le(0,0,0,0);return{setMask:function(Tt){ot!==Tt&&!W&&(i.colorMask(Tt,Tt,Tt,Tt),ot=Tt)},setLocked:function(Tt){W=Tt},setClear:function(Tt,Et,Ht,ce,Me){Me===!0&&(Tt*=ce,Et*=ce,Ht*=ce),St.set(Tt,Et,Ht,ce),_t.equals(St)===!1&&(i.clearColor(Tt,Et,Ht,ce),_t.copy(St))},reset:function(){W=!1,ot=null,_t.set(-1,0,0,0)}}}function n(){let W=!1,St=!1,ot=null,_t=null,Tt=null;return{setReversed:function(Et){if(St!==Et){let Ht=t.get("EXT_clip_control");St?Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.ZERO_TO_ONE_EXT):Ht.clipControlEXT(Ht.LOWER_LEFT_EXT,Ht.NEGATIVE_ONE_TO_ONE_EXT);let ce=Tt;Tt=null,this.setClear(ce)}St=Et},getReversed:function(){return St},setTest:function(Et){Et?S(i.DEPTH_TEST):Q(i.DEPTH_TEST)},setMask:function(Et){ot!==Et&&!W&&(i.depthMask(Et),ot=Et)},setFunc:function(Et){if(St&&(Et=D_[Et]),_t!==Et){switch(Et){case mo:i.depthFunc(i.NEVER);break;case go:i.depthFunc(i.ALWAYS);break;case _o:i.depthFunc(i.LESS);break;case Vi:i.depthFunc(i.LEQUAL);break;case xo:i.depthFunc(i.EQUAL);break;case yo:i.depthFunc(i.GEQUAL);break;case vo:i.depthFunc(i.GREATER);break;case Mo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}_t=Et}},setLocked:function(Et){W=Et},setClear:function(Et){Tt!==Et&&(St&&(Et=1-Et),i.clearDepth(Et),Tt=Et)},reset:function(){W=!1,ot=null,_t=null,Tt=null,St=!1}}}function s(){let W=!1,St=null,ot=null,_t=null,Tt=null,Et=null,Ht=null,ce=null,Me=null;return{setTest:function(Qt){W||(Qt?S(i.STENCIL_TEST):Q(i.STENCIL_TEST))},setMask:function(Qt){St!==Qt&&!W&&(i.stencilMask(Qt),St=Qt)},setFunc:function(Qt,Ve,ln){(ot!==Qt||_t!==Ve||Tt!==ln)&&(i.stencilFunc(Qt,Ve,ln),ot=Qt,_t=Ve,Tt=ln)},setOp:function(Qt,Ve,ln){(Et!==Qt||Ht!==Ve||ce!==ln)&&(i.stencilOp(Qt,Ve,ln),Et=Qt,Ht=Ve,ce=ln)},setLocked:function(Qt){W=Qt},setClear:function(Qt){Me!==Qt&&(i.clearStencil(Qt),Me=Qt)},reset:function(){W=!1,St=null,ot=null,_t=null,Tt=null,Et=null,Ht=null,ce=null,Me=null}}}let r=new e,a=new n,o=new s,c=new WeakMap,l=new WeakMap,u={},d={},f=new WeakMap,m=[],g=null,_=!1,p=null,h=null,T=null,y=null,x=null,B=null,C=null,N=new kt(0,0,0),U=0,w=!1,M=null,z=null,G=null,$=null,K=null,ct=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),F=!1,V=0,O=i.getParameter(i.VERSION);O.indexOf("WebGL")!==-1?(V=parseFloat(/^WebGL (\d)/.exec(O)[1]),F=V>=1):O.indexOf("OpenGL ES")!==-1&&(V=parseFloat(/^OpenGL ES (\d)/.exec(O)[1]),F=V>=2);let lt=null,mt={},vt=i.getParameter(i.SCISSOR_BOX),Ct=i.getParameter(i.VIEWPORT),Xt=new le().fromArray(vt),D=new le().fromArray(Ct);function P(W,St,ot,_t){let Tt=new Uint8Array(4),Et=i.createTexture();i.bindTexture(W,Et),i.texParameteri(W,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(W,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ht=0;Ht<ot;Ht++)W===i.TEXTURE_3D||W===i.TEXTURE_2D_ARRAY?i.texImage3D(St,0,i.RGBA,1,1,_t,0,i.RGBA,i.UNSIGNED_BYTE,Tt):i.texImage2D(St+Ht,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Tt);return Et}let R={};R[i.TEXTURE_2D]=P(i.TEXTURE_2D,i.TEXTURE_2D,1),R[i.TEXTURE_CUBE_MAP]=P(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),R[i.TEXTURE_2D_ARRAY]=P(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),R[i.TEXTURE_3D]=P(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),S(i.DEPTH_TEST),a.setFunc(Vi),tt(!1),at(Vl),S(i.CULL_FACE),b(Fn);function S(W){u[W]!==!0&&(i.enable(W),u[W]=!0)}function Q(W){u[W]!==!1&&(i.disable(W),u[W]=!1)}function ht(W,St){return d[W]!==St?(i.bindFramebuffer(W,St),d[W]=St,W===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=St),W===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=St),!0):!1}function J(W,St){let ot=m,_t=!1;if(W){ot=f.get(St),ot===void 0&&(ot=[],f.set(St,ot));let Tt=W.textures;if(ot.length!==Tt.length||ot[0]!==i.COLOR_ATTACHMENT0){for(let Et=0,Ht=Tt.length;Et<Ht;Et++)ot[Et]=i.COLOR_ATTACHMENT0+Et;ot.length=Tt.length,_t=!0}}else ot[0]!==i.BACK&&(ot[0]=i.BACK,_t=!0);_t&&i.drawBuffers(ot)}function gt(W){return g!==W?(i.useProgram(W),g=W,!0):!1}let Z={[ii]:i.FUNC_ADD,[$d]:i.FUNC_SUBTRACT,[Zd]:i.FUNC_REVERSE_SUBTRACT};Z[Jd]=i.MIN,Z[Kd]=i.MAX;let j={[Qd]:i.ZERO,[jd]:i.ONE,[tf]:i.SRC_COLOR,[fo]:i.SRC_ALPHA,[of]:i.SRC_ALPHA_SATURATE,[rf]:i.DST_COLOR,[nf]:i.DST_ALPHA,[ef]:i.ONE_MINUS_SRC_COLOR,[po]:i.ONE_MINUS_SRC_ALPHA,[af]:i.ONE_MINUS_DST_COLOR,[sf]:i.ONE_MINUS_DST_ALPHA,[cf]:i.CONSTANT_COLOR,[lf]:i.ONE_MINUS_CONSTANT_COLOR,[hf]:i.CONSTANT_ALPHA,[uf]:i.ONE_MINUS_CONSTANT_ALPHA};function b(W,St,ot,_t,Tt,Et,Ht,ce,Me,Qt){if(W===Fn){_===!0&&(Q(i.BLEND),_=!1);return}if(_===!1&&(S(i.BLEND),_=!0),W!==Yd){if(W!==p||Qt!==w){if((h!==ii||x!==ii)&&(i.blendEquation(i.FUNC_ADD),h=ii,x=ii),Qt)switch(W){case Fi:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gl:i.blendFunc(i.ONE,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xl:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}else switch(W){case Fi:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case Gl:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case Wl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xl:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",W);break}T=null,y=null,B=null,C=null,N.set(0,0,0),U=0,p=W,w=Qt}return}Tt=Tt||St,Et=Et||ot,Ht=Ht||_t,(St!==h||Tt!==x)&&(i.blendEquationSeparate(Z[St],Z[Tt]),h=St,x=Tt),(ot!==T||_t!==y||Et!==B||Ht!==C)&&(i.blendFuncSeparate(j[ot],j[_t],j[Et],j[Ht]),T=ot,y=_t,B=Et,C=Ht),(ce.equals(N)===!1||Me!==U)&&(i.blendColor(ce.r,ce.g,ce.b,Me),N.copy(ce),U=Me),p=W,w=!1}function et(W,St){W.side===yn?Q(i.CULL_FACE):S(i.CULL_FACE);let ot=W.side===Ie;St&&(ot=!ot),tt(ot),W.blending===Fi&&W.transparent===!1?b(Fn):b(W.blending,W.blendEquation,W.blendSrc,W.blendDst,W.blendEquationAlpha,W.blendSrcAlpha,W.blendDstAlpha,W.blendColor,W.blendAlpha,W.premultipliedAlpha),a.setFunc(W.depthFunc),a.setTest(W.depthTest),a.setMask(W.depthWrite),r.setMask(W.colorWrite);let _t=W.stencilWrite;o.setTest(_t),_t&&(o.setMask(W.stencilWriteMask),o.setFunc(W.stencilFunc,W.stencilRef,W.stencilFuncMask),o.setOp(W.stencilFail,W.stencilZFail,W.stencilZPass)),L(W.polygonOffset,W.polygonOffsetFactor,W.polygonOffsetUnits),W.alphaToCoverage===!0?S(i.SAMPLE_ALPHA_TO_COVERAGE):Q(i.SAMPLE_ALPHA_TO_COVERAGE)}function tt(W){M!==W&&(W?i.frontFace(i.CW):i.frontFace(i.CCW),M=W)}function at(W){W!==Xd?(S(i.CULL_FACE),W!==z&&(W===Vl?i.cullFace(i.BACK):W===qd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Q(i.CULL_FACE),z=W}function I(W){W!==G&&(F&&i.lineWidth(W),G=W)}function L(W,St,ot){W?(S(i.POLYGON_OFFSET_FILL),($!==St||K!==ot)&&(i.polygonOffset(St,ot),$=St,K=ot)):Q(i.POLYGON_OFFSET_FILL)}function it(W){W?S(i.SCISSOR_TEST):Q(i.SCISSOR_TEST)}function E(W){W===void 0&&(W=i.TEXTURE0+ct-1),lt!==W&&(i.activeTexture(W),lt=W)}function v(W,St,ot){ot===void 0&&(lt===null?ot=i.TEXTURE0+ct-1:ot=lt);let _t=mt[ot];_t===void 0&&(_t={type:void 0,texture:void 0},mt[ot]=_t),(_t.type!==W||_t.texture!==St)&&(lt!==ot&&(i.activeTexture(ot),lt=ot),i.bindTexture(W,St||R[W]),_t.type=W,_t.texture=St)}function Y(){let W=mt[lt];W!==void 0&&W.type!==void 0&&(i.bindTexture(W.type,null),W.type=void 0,W.texture=void 0)}function rt(){try{i.compressedTexImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function pt(){try{i.compressedTexImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function H(){try{i.texSubImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function ut(){try{i.texSubImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function dt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function yt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function It(){try{i.texStorage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function xt(){try{i.texStorage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function At(){try{i.texImage2D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ut(){try{i.texImage3D.apply(i,arguments)}catch(W){console.error("THREE.WebGLState:",W)}}function Ft(W){Xt.equals(W)===!1&&(i.scissor(W.x,W.y,W.z,W.w),Xt.copy(W))}function Rt(W){D.equals(W)===!1&&(i.viewport(W.x,W.y,W.z,W.w),D.copy(W))}function Yt(W,St){let ot=l.get(St);ot===void 0&&(ot=new WeakMap,l.set(St,ot));let _t=ot.get(W);_t===void 0&&(_t=i.getUniformBlockIndex(St,W.name),ot.set(W,_t))}function Gt(W,St){let _t=l.get(St).get(W);c.get(St)!==_t&&(i.uniformBlockBinding(St,_t,W.__bindingPointIndex),c.set(St,_t))}function ee(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},lt=null,mt={},d={},f=new WeakMap,m=[],g=null,_=!1,p=null,h=null,T=null,y=null,x=null,B=null,C=null,N=new kt(0,0,0),U=0,w=!1,M=null,z=null,G=null,$=null,K=null,Xt.set(0,0,i.canvas.width,i.canvas.height),D.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:S,disable:Q,bindFramebuffer:ht,drawBuffers:J,useProgram:gt,setBlending:b,setMaterial:et,setFlipSided:tt,setCullFace:at,setLineWidth:I,setPolygonOffset:L,setScissorTest:it,activeTexture:E,bindTexture:v,unbindTexture:Y,compressedTexImage2D:rt,compressedTexImage3D:pt,texImage2D:At,texImage3D:Ut,updateUBOMapping:Yt,uniformBlockBinding:Gt,texStorage2D:It,texStorage3D:xt,texSubImage2D:H,texSubImage3D:ut,compressedTexSubImage2D:dt,compressedTexSubImage3D:yt,scissor:Ft,viewport:Rt,reset:ee}}function Vh(i,t,e,n){let s=O_(n);switch(e){case cu:return i*t;case hu:return i*t;case uu:return i*t*2;case du:return i*t/s.components*s.byteLength;case Gc:return i*t/s.components*s.byteLength;case fu:return i*t*2/s.components*s.byteLength;case Wc:return i*t*2/s.components*s.byteLength;case lu:return i*t*3/s.components*s.byteLength;case $e:return i*t*4/s.components*s.byteLength;case Xc:return i*t*4/s.components*s.byteLength;case Mr:case br:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Sr:case Er:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ao:case Co:return Math.max(i,16)*Math.max(t,8)/4;case To:case Ro:return Math.max(i,8)*Math.max(t,8)/2;case Io:case Po:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case Lo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case No:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Do:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Uo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Oo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case Fo:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case Bo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case zo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case ko:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case Ho:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Vo:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Go:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Xo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case qo:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case wr:case Yo:case $o:return Math.ceil(i/4)*Math.ceil(t/4)*16;case pu:case Zo:return Math.ceil(i/4)*Math.ceil(t/4)*8;case Jo:case Ko:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function O_(i){switch(i){case Sn:case ru:return{byteLength:1,components:1};case xs:case au:case Ps:return{byteLength:2,components:1};case Hc:case Vc:return{byteLength:2,components:4};case oi:case kc:case vn:return{byteLength:4,components:1};case ou:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function F_(i,t,e,n,s,r,a){let o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ft,u=new WeakMap,d,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,v){return m?new OffscreenCanvas(E,v):Rr("canvas")}function _(E,v,Y){let rt=1,pt=it(E);if((pt.width>Y||pt.height>Y)&&(rt=Y/Math.max(pt.width,pt.height)),rt<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){let H=Math.floor(rt*pt.width),ut=Math.floor(rt*pt.height);d===void 0&&(d=g(H,ut));let dt=v?g(H,ut):d;return dt.width=H,dt.height=ut,dt.getContext("2d").drawImage(E,0,0,H,ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+pt.width+"x"+pt.height+") to ("+H+"x"+ut+")."),dt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+pt.width+"x"+pt.height+")."),E;return E}function p(E){return E.generateMipmaps}function h(E){i.generateMipmap(E)}function T(E){return E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:E.isWebGL3DRenderTarget?i.TEXTURE_3D:E.isWebGLArrayRenderTarget||E.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function y(E,v,Y,rt,pt=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let H=v;if(v===i.RED&&(Y===i.FLOAT&&(H=i.R32F),Y===i.HALF_FLOAT&&(H=i.R16F),Y===i.UNSIGNED_BYTE&&(H=i.R8)),v===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(H=i.R8UI),Y===i.UNSIGNED_SHORT&&(H=i.R16UI),Y===i.UNSIGNED_INT&&(H=i.R32UI),Y===i.BYTE&&(H=i.R8I),Y===i.SHORT&&(H=i.R16I),Y===i.INT&&(H=i.R32I)),v===i.RG&&(Y===i.FLOAT&&(H=i.RG32F),Y===i.HALF_FLOAT&&(H=i.RG16F),Y===i.UNSIGNED_BYTE&&(H=i.RG8)),v===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(H=i.RG8UI),Y===i.UNSIGNED_SHORT&&(H=i.RG16UI),Y===i.UNSIGNED_INT&&(H=i.RG32UI),Y===i.BYTE&&(H=i.RG8I),Y===i.SHORT&&(H=i.RG16I),Y===i.INT&&(H=i.RG32I)),v===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(H=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(H=i.RGB16UI),Y===i.UNSIGNED_INT&&(H=i.RGB32UI),Y===i.BYTE&&(H=i.RGB8I),Y===i.SHORT&&(H=i.RGB16I),Y===i.INT&&(H=i.RGB32I)),v===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(H=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(H=i.RGBA16UI),Y===i.UNSIGNED_INT&&(H=i.RGBA32UI),Y===i.BYTE&&(H=i.RGBA8I),Y===i.SHORT&&(H=i.RGBA16I),Y===i.INT&&(H=i.RGBA32I)),v===i.RGB&&Y===i.UNSIGNED_INT_5_9_9_9_REV&&(H=i.RGB9_E5),v===i.RGBA){let ut=pt?aa:$t.getTransfer(rt);Y===i.FLOAT&&(H=i.RGBA32F),Y===i.HALF_FLOAT&&(H=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(H=ut===jt?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(H=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(H=i.RGB5_A1)}return(H===i.R16F||H===i.R32F||H===i.RG16F||H===i.RG32F||H===i.RGBA16F||H===i.RGBA32F)&&t.get("EXT_color_buffer_float"),H}function x(E,v){let Y;return E?v===null||v===oi||v===Xi?Y=i.DEPTH24_STENCIL8:v===vn?Y=i.DEPTH32F_STENCIL8:v===xs&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):v===null||v===oi||v===Xi?Y=i.DEPTH_COMPONENT24:v===vn?Y=i.DEPTH_COMPONENT32F:v===xs&&(Y=i.DEPTH_COMPONENT16),Y}function B(E,v){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ze&&E.minFilter!==tn?Math.log2(Math.max(v.width,v.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?v.mipmaps.length:1}function C(E){let v=E.target;v.removeEventListener("dispose",C),U(v),v.isVideoTexture&&u.delete(v)}function N(E){let v=E.target;v.removeEventListener("dispose",N),M(v)}function U(E){let v=n.get(E);if(v.__webglInit===void 0)return;let Y=E.source,rt=f.get(Y);if(rt){let pt=rt[v.__cacheKey];pt.usedTimes--,pt.usedTimes===0&&w(E),Object.keys(rt).length===0&&f.delete(Y)}n.remove(E)}function w(E){let v=n.get(E);i.deleteTexture(v.__webglTexture);let Y=E.source,rt=f.get(Y);delete rt[v.__cacheKey],a.memory.textures--}function M(E){let v=n.get(E);if(E.depthTexture&&(E.depthTexture.dispose(),n.remove(E.depthTexture)),E.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(v.__webglFramebuffer[rt]))for(let pt=0;pt<v.__webglFramebuffer[rt].length;pt++)i.deleteFramebuffer(v.__webglFramebuffer[rt][pt]);else i.deleteFramebuffer(v.__webglFramebuffer[rt]);v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer[rt])}else{if(Array.isArray(v.__webglFramebuffer))for(let rt=0;rt<v.__webglFramebuffer.length;rt++)i.deleteFramebuffer(v.__webglFramebuffer[rt]);else i.deleteFramebuffer(v.__webglFramebuffer);if(v.__webglDepthbuffer&&i.deleteRenderbuffer(v.__webglDepthbuffer),v.__webglMultisampledFramebuffer&&i.deleteFramebuffer(v.__webglMultisampledFramebuffer),v.__webglColorRenderbuffer)for(let rt=0;rt<v.__webglColorRenderbuffer.length;rt++)v.__webglColorRenderbuffer[rt]&&i.deleteRenderbuffer(v.__webglColorRenderbuffer[rt]);v.__webglDepthRenderbuffer&&i.deleteRenderbuffer(v.__webglDepthRenderbuffer)}let Y=E.textures;for(let rt=0,pt=Y.length;rt<pt;rt++){let H=n.get(Y[rt]);H.__webglTexture&&(i.deleteTexture(H.__webglTexture),a.memory.textures--),n.remove(Y[rt])}n.remove(E)}let z=0;function G(){z=0}function $(){let E=z;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),z+=1,E}function K(E){let v=[];return v.push(E.wrapS),v.push(E.wrapT),v.push(E.wrapR||0),v.push(E.magFilter),v.push(E.minFilter),v.push(E.anisotropy),v.push(E.internalFormat),v.push(E.format),v.push(E.type),v.push(E.generateMipmaps),v.push(E.premultiplyAlpha),v.push(E.flipY),v.push(E.unpackAlignment),v.push(E.colorSpace),v.join()}function ct(E,v){let Y=n.get(E);if(E.isVideoTexture&&I(E),E.isRenderTargetTexture===!1&&E.version>0&&Y.__version!==E.version){let rt=E.image;if(rt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{D(Y,E,v);return}}e.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+v)}function F(E,v){let Y=n.get(E);if(E.version>0&&Y.__version!==E.version){D(Y,E,v);return}e.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+v)}function V(E,v){let Y=n.get(E);if(E.version>0&&Y.__version!==E.version){D(Y,E,v);return}e.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+v)}function O(E,v){let Y=n.get(E);if(E.version>0&&Y.__version!==E.version){P(Y,E,v);return}e.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+v)}let lt={[Eo]:i.REPEAT,[ri]:i.CLAMP_TO_EDGE,[wo]:i.MIRRORED_REPEAT},mt={[Ze]:i.NEAREST,[Mf]:i.NEAREST_MIPMAP_NEAREST,[Xs]:i.NEAREST_MIPMAP_LINEAR,[tn]:i.LINEAR,[La]:i.LINEAR_MIPMAP_NEAREST,[ai]:i.LINEAR_MIPMAP_LINEAR},vt={[wf]:i.NEVER,[Pf]:i.ALWAYS,[Tf]:i.LESS,[gu]:i.LEQUAL,[Af]:i.EQUAL,[If]:i.GEQUAL,[Rf]:i.GREATER,[Cf]:i.NOTEQUAL};function Ct(E,v){if(v.type===vn&&t.has("OES_texture_float_linear")===!1&&(v.magFilter===tn||v.magFilter===La||v.magFilter===Xs||v.magFilter===ai||v.minFilter===tn||v.minFilter===La||v.minFilter===Xs||v.minFilter===ai)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,lt[v.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,lt[v.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,lt[v.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,mt[v.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,mt[v.minFilter]),v.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,vt[v.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(v.magFilter===Ze||v.minFilter!==Xs&&v.minFilter!==ai||v.type===vn&&t.has("OES_texture_float_linear")===!1)return;if(v.anisotropy>1||n.get(v).__currentAnisotropy){let Y=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(v.anisotropy,s.getMaxAnisotropy())),n.get(v).__currentAnisotropy=v.anisotropy}}}function Xt(E,v){let Y=!1;E.__webglInit===void 0&&(E.__webglInit=!0,v.addEventListener("dispose",C));let rt=v.source,pt=f.get(rt);pt===void 0&&(pt={},f.set(rt,pt));let H=K(v);if(H!==E.__cacheKey){pt[H]===void 0&&(pt[H]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),pt[H].usedTimes++;let ut=pt[E.__cacheKey];ut!==void 0&&(pt[E.__cacheKey].usedTimes--,ut.usedTimes===0&&w(v)),E.__cacheKey=H,E.__webglTexture=pt[H].texture}return Y}function D(E,v,Y){let rt=i.TEXTURE_2D;(v.isDataArrayTexture||v.isCompressedArrayTexture)&&(rt=i.TEXTURE_2D_ARRAY),v.isData3DTexture&&(rt=i.TEXTURE_3D);let pt=Xt(E,v),H=v.source;e.bindTexture(rt,E.__webglTexture,i.TEXTURE0+Y);let ut=n.get(H);if(H.version!==ut.__version||pt===!0){e.activeTexture(i.TEXTURE0+Y);let dt=$t.getPrimaries($t.workingColorSpace),yt=v.colorSpace===Un?null:$t.getPrimaries(v.colorSpace),It=v.colorSpace===Un||dt===yt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,It);let xt=_(v.image,!1,s.maxTextureSize);xt=L(v,xt);let At=r.convert(v.format,v.colorSpace),Ut=r.convert(v.type),Ft=y(v.internalFormat,At,Ut,v.colorSpace,v.isVideoTexture);Ct(rt,v);let Rt,Yt=v.mipmaps,Gt=v.isVideoTexture!==!0,ee=ut.__version===void 0||pt===!0,W=H.dataReady,St=B(v,xt);if(v.isDepthTexture)Ft=x(v.format===qi,v.type),ee&&(Gt?e.texStorage2D(i.TEXTURE_2D,1,Ft,xt.width,xt.height):e.texImage2D(i.TEXTURE_2D,0,Ft,xt.width,xt.height,0,At,Ut,null));else if(v.isDataTexture)if(Yt.length>0){Gt&&ee&&e.texStorage2D(i.TEXTURE_2D,St,Ft,Yt[0].width,Yt[0].height);for(let ot=0,_t=Yt.length;ot<_t;ot++)Rt=Yt[ot],Gt?W&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,Rt.width,Rt.height,At,Ut,Rt.data):e.texImage2D(i.TEXTURE_2D,ot,Ft,Rt.width,Rt.height,0,At,Ut,Rt.data);v.generateMipmaps=!1}else Gt?(ee&&e.texStorage2D(i.TEXTURE_2D,St,Ft,xt.width,xt.height),W&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,xt.width,xt.height,At,Ut,xt.data)):e.texImage2D(i.TEXTURE_2D,0,Ft,xt.width,xt.height,0,At,Ut,xt.data);else if(v.isCompressedTexture)if(v.isCompressedArrayTexture){Gt&&ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Ft,Yt[0].width,Yt[0].height,xt.depth);for(let ot=0,_t=Yt.length;ot<_t;ot++)if(Rt=Yt[ot],v.format!==$e)if(At!==null)if(Gt){if(W)if(v.layerUpdates.size>0){let Tt=Vh(Rt.width,Rt.height,v.format,v.type);for(let Et of v.layerUpdates){let Ht=Rt.data.subarray(Et*Tt/Rt.data.BYTES_PER_ELEMENT,(Et+1)*Tt/Rt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,Et,Rt.width,Rt.height,1,At,Ht)}v.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,Rt.width,Rt.height,xt.depth,At,Rt.data)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ot,Ft,Rt.width,Rt.height,xt.depth,0,Rt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Gt?W&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,ot,0,0,0,Rt.width,Rt.height,xt.depth,At,Ut,Rt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,ot,Ft,Rt.width,Rt.height,xt.depth,0,At,Ut,Rt.data)}else{Gt&&ee&&e.texStorage2D(i.TEXTURE_2D,St,Ft,Yt[0].width,Yt[0].height);for(let ot=0,_t=Yt.length;ot<_t;ot++)Rt=Yt[ot],v.format!==$e?At!==null?Gt?W&&e.compressedTexSubImage2D(i.TEXTURE_2D,ot,0,0,Rt.width,Rt.height,At,Rt.data):e.compressedTexImage2D(i.TEXTURE_2D,ot,Ft,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Gt?W&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,Rt.width,Rt.height,At,Ut,Rt.data):e.texImage2D(i.TEXTURE_2D,ot,Ft,Rt.width,Rt.height,0,At,Ut,Rt.data)}else if(v.isDataArrayTexture)if(Gt){if(ee&&e.texStorage3D(i.TEXTURE_2D_ARRAY,St,Ft,xt.width,xt.height,xt.depth),W)if(v.layerUpdates.size>0){let ot=Vh(xt.width,xt.height,v.format,v.type);for(let _t of v.layerUpdates){let Tt=xt.data.subarray(_t*ot/xt.data.BYTES_PER_ELEMENT,(_t+1)*ot/xt.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,_t,xt.width,xt.height,1,At,Ut,Tt)}v.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,xt.width,xt.height,xt.depth,At,Ut,xt.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Ft,xt.width,xt.height,xt.depth,0,At,Ut,xt.data);else if(v.isData3DTexture)Gt?(ee&&e.texStorage3D(i.TEXTURE_3D,St,Ft,xt.width,xt.height,xt.depth),W&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,xt.width,xt.height,xt.depth,At,Ut,xt.data)):e.texImage3D(i.TEXTURE_3D,0,Ft,xt.width,xt.height,xt.depth,0,At,Ut,xt.data);else if(v.isFramebufferTexture){if(ee)if(Gt)e.texStorage2D(i.TEXTURE_2D,St,Ft,xt.width,xt.height);else{let ot=xt.width,_t=xt.height;for(let Tt=0;Tt<St;Tt++)e.texImage2D(i.TEXTURE_2D,Tt,Ft,ot,_t,0,At,Ut,null),ot>>=1,_t>>=1}}else if(Yt.length>0){if(Gt&&ee){let ot=it(Yt[0]);e.texStorage2D(i.TEXTURE_2D,St,Ft,ot.width,ot.height)}for(let ot=0,_t=Yt.length;ot<_t;ot++)Rt=Yt[ot],Gt?W&&e.texSubImage2D(i.TEXTURE_2D,ot,0,0,At,Ut,Rt):e.texImage2D(i.TEXTURE_2D,ot,Ft,At,Ut,Rt);v.generateMipmaps=!1}else if(Gt){if(ee){let ot=it(xt);e.texStorage2D(i.TEXTURE_2D,St,Ft,ot.width,ot.height)}W&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,At,Ut,xt)}else e.texImage2D(i.TEXTURE_2D,0,Ft,At,Ut,xt);p(v)&&h(rt),ut.__version=H.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function P(E,v,Y){if(v.image.length!==6)return;let rt=Xt(E,v),pt=v.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+Y);let H=n.get(pt);if(pt.version!==H.__version||rt===!0){e.activeTexture(i.TEXTURE0+Y);let ut=$t.getPrimaries($t.workingColorSpace),dt=v.colorSpace===Un?null:$t.getPrimaries(v.colorSpace),yt=v.colorSpace===Un||ut===dt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,v.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,v.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,v.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,yt);let It=v.isCompressedTexture||v.image[0].isCompressedTexture,xt=v.image[0]&&v.image[0].isDataTexture,At=[];for(let _t=0;_t<6;_t++)!It&&!xt?At[_t]=_(v.image[_t],!0,s.maxCubemapSize):At[_t]=xt?v.image[_t].image:v.image[_t],At[_t]=L(v,At[_t]);let Ut=At[0],Ft=r.convert(v.format,v.colorSpace),Rt=r.convert(v.type),Yt=y(v.internalFormat,Ft,Rt,v.colorSpace),Gt=v.isVideoTexture!==!0,ee=H.__version===void 0||rt===!0,W=pt.dataReady,St=B(v,Ut);Ct(i.TEXTURE_CUBE_MAP,v);let ot;if(It){Gt&&ee&&e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Yt,Ut.width,Ut.height);for(let _t=0;_t<6;_t++){ot=At[_t].mipmaps;for(let Tt=0;Tt<ot.length;Tt++){let Et=ot[Tt];v.format!==$e?Ft!==null?Gt?W&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Tt,0,0,Et.width,Et.height,Ft,Et.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Tt,Yt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Gt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Tt,0,0,Et.width,Et.height,Ft,Rt,Et.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Tt,Yt,Et.width,Et.height,0,Ft,Rt,Et.data)}}}else{if(ot=v.mipmaps,Gt&&ee){ot.length>0&&St++;let _t=it(At[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,St,Yt,_t.width,_t.height)}for(let _t=0;_t<6;_t++)if(xt){Gt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,At[_t].width,At[_t].height,Ft,Rt,At[_t].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Yt,At[_t].width,At[_t].height,0,Ft,Rt,At[_t].data);for(let Tt=0;Tt<ot.length;Tt++){let Ht=ot[Tt].image[_t].image;Gt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Tt+1,0,0,Ht.width,Ht.height,Ft,Rt,Ht.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Tt+1,Yt,Ht.width,Ht.height,0,Ft,Rt,Ht.data)}}else{Gt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,0,0,Ft,Rt,At[_t]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,0,Yt,Ft,Rt,At[_t]);for(let Tt=0;Tt<ot.length;Tt++){let Et=ot[Tt];Gt?W&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Tt+1,0,0,Ft,Rt,Et.image[_t]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+_t,Tt+1,Yt,Ft,Rt,Et.image[_t])}}}p(v)&&h(i.TEXTURE_CUBE_MAP),H.__version=pt.version,v.onUpdate&&v.onUpdate(v)}E.__version=v.version}function R(E,v,Y,rt,pt,H){let ut=r.convert(Y.format,Y.colorSpace),dt=r.convert(Y.type),yt=y(Y.internalFormat,ut,dt,Y.colorSpace),It=n.get(v),xt=n.get(Y);if(xt.__renderTarget=v,!It.__hasExternalTextures){let At=Math.max(1,v.width>>H),Ut=Math.max(1,v.height>>H);pt===i.TEXTURE_3D||pt===i.TEXTURE_2D_ARRAY?e.texImage3D(pt,H,yt,At,Ut,v.depth,0,ut,dt,null):e.texImage2D(pt,H,yt,At,Ut,0,ut,dt,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),at(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,rt,pt,xt.__webglTexture,0,tt(v)):(pt===i.TEXTURE_2D||pt>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&pt<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,rt,pt,xt.__webglTexture,H),e.bindFramebuffer(i.FRAMEBUFFER,null)}function S(E,v,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,E),v.depthBuffer){let rt=v.depthTexture,pt=rt&&rt.isDepthTexture?rt.type:null,H=x(v.stencilBuffer,pt),ut=v.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,dt=tt(v);at(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,dt,H,v.width,v.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,dt,H,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,H,v.width,v.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,ut,i.RENDERBUFFER,E)}else{let rt=v.textures;for(let pt=0;pt<rt.length;pt++){let H=rt[pt],ut=r.convert(H.format,H.colorSpace),dt=r.convert(H.type),yt=y(H.internalFormat,ut,dt,H.colorSpace),It=tt(v);Y&&at(v)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,It,yt,v.width,v.height):at(v)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,It,yt,v.width,v.height):i.renderbufferStorage(i.RENDERBUFFER,yt,v.width,v.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Q(E,v){if(v&&v.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(v.depthTexture&&v.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let rt=n.get(v.depthTexture);rt.__renderTarget=v,(!rt.__webglTexture||v.depthTexture.image.width!==v.width||v.depthTexture.image.height!==v.height)&&(v.depthTexture.image.width=v.width,v.depthTexture.image.height=v.height,v.depthTexture.needsUpdate=!0),ct(v.depthTexture,0);let pt=rt.__webglTexture,H=tt(v);if(v.depthTexture.format===Bi)at(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,pt,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,pt,0);else if(v.depthTexture.format===qi)at(v)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,pt,0,H):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,pt,0);else throw new Error("Unknown depthTexture format")}function ht(E){let v=n.get(E),Y=E.isWebGLCubeRenderTarget===!0;if(v.__boundDepthTexture!==E.depthTexture){let rt=E.depthTexture;if(v.__depthDisposeCallback&&v.__depthDisposeCallback(),rt){let pt=()=>{delete v.__boundDepthTexture,delete v.__depthDisposeCallback,rt.removeEventListener("dispose",pt)};rt.addEventListener("dispose",pt),v.__depthDisposeCallback=pt}v.__boundDepthTexture=rt}if(E.depthTexture&&!v.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Q(v.__webglFramebuffer,E)}else if(Y){v.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer[rt]),v.__webglDepthbuffer[rt]===void 0)v.__webglDepthbuffer[rt]=i.createRenderbuffer(),S(v.__webglDepthbuffer[rt],E,!1);else{let pt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=v.__webglDepthbuffer[rt];i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,pt,i.RENDERBUFFER,H)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,v.__webglFramebuffer),v.__webglDepthbuffer===void 0)v.__webglDepthbuffer=i.createRenderbuffer(),S(v.__webglDepthbuffer,E,!1);else{let rt=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,pt=v.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,pt),i.framebufferRenderbuffer(i.FRAMEBUFFER,rt,i.RENDERBUFFER,pt)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function J(E,v,Y){let rt=n.get(E);v!==void 0&&R(rt.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&ht(E)}function gt(E){let v=E.texture,Y=n.get(E),rt=n.get(v);E.addEventListener("dispose",N);let pt=E.textures,H=E.isWebGLCubeRenderTarget===!0,ut=pt.length>1;if(ut||(rt.__webglTexture===void 0&&(rt.__webglTexture=i.createTexture()),rt.__version=v.version,a.memory.textures++),H){Y.__webglFramebuffer=[];for(let dt=0;dt<6;dt++)if(v.mipmaps&&v.mipmaps.length>0){Y.__webglFramebuffer[dt]=[];for(let yt=0;yt<v.mipmaps.length;yt++)Y.__webglFramebuffer[dt][yt]=i.createFramebuffer()}else Y.__webglFramebuffer[dt]=i.createFramebuffer()}else{if(v.mipmaps&&v.mipmaps.length>0){Y.__webglFramebuffer=[];for(let dt=0;dt<v.mipmaps.length;dt++)Y.__webglFramebuffer[dt]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(ut)for(let dt=0,yt=pt.length;dt<yt;dt++){let It=n.get(pt[dt]);It.__webglTexture===void 0&&(It.__webglTexture=i.createTexture(),a.memory.textures++)}if(E.samples>0&&at(E)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let dt=0;dt<pt.length;dt++){let yt=pt[dt];Y.__webglColorRenderbuffer[dt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[dt]);let It=r.convert(yt.format,yt.colorSpace),xt=r.convert(yt.type),At=y(yt.internalFormat,It,xt,yt.colorSpace,E.isXRRenderTarget===!0),Ut=tt(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ut,At,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+dt,i.RENDERBUFFER,Y.__webglColorRenderbuffer[dt])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),S(Y.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(H){e.bindTexture(i.TEXTURE_CUBE_MAP,rt.__webglTexture),Ct(i.TEXTURE_CUBE_MAP,v);for(let dt=0;dt<6;dt++)if(v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)R(Y.__webglFramebuffer[dt][yt],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,yt);else R(Y.__webglFramebuffer[dt],E,v,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0);p(v)&&h(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(ut){for(let dt=0,yt=pt.length;dt<yt;dt++){let It=pt[dt],xt=n.get(It);e.bindTexture(i.TEXTURE_2D,xt.__webglTexture),Ct(i.TEXTURE_2D,It),R(Y.__webglFramebuffer,E,It,i.COLOR_ATTACHMENT0+dt,i.TEXTURE_2D,0),p(It)&&h(i.TEXTURE_2D)}e.unbindTexture()}else{let dt=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(dt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(dt,rt.__webglTexture),Ct(dt,v),v.mipmaps&&v.mipmaps.length>0)for(let yt=0;yt<v.mipmaps.length;yt++)R(Y.__webglFramebuffer[yt],E,v,i.COLOR_ATTACHMENT0,dt,yt);else R(Y.__webglFramebuffer,E,v,i.COLOR_ATTACHMENT0,dt,0);p(v)&&h(dt),e.unbindTexture()}E.depthBuffer&&ht(E)}function Z(E){let v=E.textures;for(let Y=0,rt=v.length;Y<rt;Y++){let pt=v[Y];if(p(pt)){let H=T(E),ut=n.get(pt).__webglTexture;e.bindTexture(H,ut),h(H),e.unbindTexture()}}}let j=[],b=[];function et(E){if(E.samples>0){if(at(E)===!1){let v=E.textures,Y=E.width,rt=E.height,pt=i.COLOR_BUFFER_BIT,H=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ut=n.get(E),dt=v.length>1;if(dt)for(let yt=0;yt<v.length;yt++)e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let yt=0;yt<v.length;yt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(pt|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(pt|=i.STENCIL_BUFFER_BIT)),dt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,ut.__webglColorRenderbuffer[yt]);let It=n.get(v[yt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,It,0)}i.blitFramebuffer(0,0,Y,rt,0,0,Y,rt,pt,i.NEAREST),c===!0&&(j.length=0,b.length=0,j.push(i.COLOR_ATTACHMENT0+yt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(j.push(H),b.push(H),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,b)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,j))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),dt)for(let yt=0;yt<v.length;yt++){e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.RENDERBUFFER,ut.__webglColorRenderbuffer[yt]);let It=n.get(v[yt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,ut.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+yt,i.TEXTURE_2D,It,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&c){let v=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[v])}}}function tt(E){return Math.min(s.maxSamples,E.samples)}function at(E){let v=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&v.__useRenderToTexture!==!1}function I(E){let v=a.render.frame;u.get(E)!==v&&(u.set(E,v),E.update())}function L(E,v){let Y=E.colorSpace,rt=E.format,pt=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||Y!==ji&&Y!==Un&&($t.getTransfer(Y)===jt?(rt!==$e||pt!==Sn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),v}function it(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(l.width=E.naturalWidth||E.width,l.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(l.width=E.displayWidth,l.height=E.displayHeight):(l.width=E.width,l.height=E.height),l}this.allocateTextureUnit=$,this.resetTextureUnits=G,this.setTexture2D=ct,this.setTexture2DArray=F,this.setTexture3D=V,this.setTextureCube=O,this.rebindTextures=J,this.setupRenderTarget=gt,this.updateRenderTargetMipmap=Z,this.updateMultisampleRenderTarget=et,this.setupDepthRenderbuffer=ht,this.setupFrameBufferTexture=R,this.useMultisampledRTT=at}function B_(i,t){function e(n,s=Un){let r,a=$t.getTransfer(s);if(n===Sn)return i.UNSIGNED_BYTE;if(n===Hc)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Vc)return i.UNSIGNED_SHORT_5_5_5_1;if(n===ou)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ru)return i.BYTE;if(n===au)return i.SHORT;if(n===xs)return i.UNSIGNED_SHORT;if(n===kc)return i.INT;if(n===oi)return i.UNSIGNED_INT;if(n===vn)return i.FLOAT;if(n===Ps)return i.HALF_FLOAT;if(n===cu)return i.ALPHA;if(n===lu)return i.RGB;if(n===$e)return i.RGBA;if(n===hu)return i.LUMINANCE;if(n===uu)return i.LUMINANCE_ALPHA;if(n===Bi)return i.DEPTH_COMPONENT;if(n===qi)return i.DEPTH_STENCIL;if(n===du)return i.RED;if(n===Gc)return i.RED_INTEGER;if(n===fu)return i.RG;if(n===Wc)return i.RG_INTEGER;if(n===Xc)return i.RGBA_INTEGER;if(n===Mr||n===br||n===Sr||n===Er)if(a===jt)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Mr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Mr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Sr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Er)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===To||n===Ao||n===Ro||n===Co)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===To)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ao)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ro)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Co)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Io||n===Po||n===Lo)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Io||n===Po)return a===jt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Lo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===No||n===Do||n===Uo||n===Oo||n===Fo||n===Bo||n===zo||n===ko||n===Ho||n===Vo||n===Go||n===Wo||n===Xo||n===qo)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===No)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Do)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Uo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Bo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===zo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ko)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ho)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Vo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Go)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Xo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===qo)return a===jt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===wr||n===Yo||n===$o)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===wr)return a===jt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===$o)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===pu||n===Zo||n===Jo||n===Ko)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===wr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Zo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Jo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Ko)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Xi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}var dc=class extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}},pe=class extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}},z_={type:"move"},ms=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pe,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pe,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pe,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){let e=this._hand;if(e)for(let n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,r=null,a=null,o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(let _ of t.hand.values()){let p=e.getJointPose(_,n),h=this._getHandJoint(l,_);p!==null&&(h.matrix.fromArray(p.transform.matrix),h.matrix.decompose(h.position,h.rotation,h.scale),h.matrixWorldNeedsUpdate=!0,h.jointRadius=p.radius),h.visible=p!==null}let u=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],f=u.position.distanceTo(d.position),m=.02,g=.005;l.inputState.pinching&&f>m+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=m-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(z_)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){let n=new pe;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}},k_=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,H_=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,fc=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){let s=new Oe,r=t.properties.get(s);r.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){let e=t.cameras[0].viewport,n=new Fe({vertexShader:k_,fragmentShader:H_,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new fe(new Wn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},pc=class extends Vn{constructor(t,e){super();let n=this,s=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,d=null,f=null,m=null,g=null,_=new fc,p=e.getContextAttributes(),h=null,T=null,y=[],x=[],B=new ft,C=null,N=new Re;N.viewport=new le;let U=new Re;U.viewport=new le;let w=[N,U],M=new dc,z=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(D){let P=y[D];return P===void 0&&(P=new ms,y[D]=P),P.getTargetRaySpace()},this.getControllerGrip=function(D){let P=y[D];return P===void 0&&(P=new ms,y[D]=P),P.getGripSpace()},this.getHand=function(D){let P=y[D];return P===void 0&&(P=new ms,y[D]=P),P.getHandSpace()};function $(D){let P=x.indexOf(D.inputSource);if(P===-1)return;let R=y[P];R!==void 0&&(R.update(D.inputSource,D.frame,l||a),R.dispatchEvent({type:D.type,data:D.inputSource}))}function K(){s.removeEventListener("select",$),s.removeEventListener("selectstart",$),s.removeEventListener("selectend",$),s.removeEventListener("squeeze",$),s.removeEventListener("squeezestart",$),s.removeEventListener("squeezeend",$),s.removeEventListener("end",K),s.removeEventListener("inputsourceschange",ct);for(let D=0;D<y.length;D++){let P=x[D];P!==null&&(x[D]=null,y[D].disconnect(P))}z=null,G=null,_.reset(),t.setRenderTarget(h),m=null,f=null,d=null,s=null,T=null,Xt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(B.width,B.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(D){r=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(D){o=D,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(D){l=D},this.getBaseLayer=function(){return f!==null?f:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(D){if(s=D,s!==null){if(h=t.getRenderTarget(),s.addEventListener("select",$),s.addEventListener("selectstart",$),s.addEventListener("selectend",$),s.addEventListener("squeeze",$),s.addEventListener("squeezestart",$),s.addEventListener("squeezeend",$),s.addEventListener("end",K),s.addEventListener("inputsourceschange",ct),p.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(B),s.renderState.layers===void 0){let P={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,e,P),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),T=new En(m.framebufferWidth,m.framebufferHeight,{format:$e,type:Sn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let P=null,R=null,S=null;p.depth&&(S=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,P=p.stencil?qi:Bi,R=p.stencil?Xi:oi);let Q={colorFormat:e.RGBA8,depthFormat:S,scaleFactor:r};d=new XRWebGLBinding(s,e),f=d.createProjectionLayer(Q),s.updateRenderState({layers:[f]}),t.setPixelRatio(1),t.setSize(f.textureWidth,f.textureHeight,!1),T=new En(f.textureWidth,f.textureHeight,{format:$e,type:Sn,depthTexture:new zr(f.textureWidth,f.textureHeight,R,void 0,void 0,void 0,void 0,void 0,void 0,P),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:f.ignoreDepthValues===!1})}T.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),Xt.setContext(s),Xt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function ct(D){for(let P=0;P<D.removed.length;P++){let R=D.removed[P],S=x.indexOf(R);S>=0&&(x[S]=null,y[S].disconnect(R))}for(let P=0;P<D.added.length;P++){let R=D.added[P],S=x.indexOf(R);if(S===-1){for(let ht=0;ht<y.length;ht++)if(ht>=x.length){x.push(R),S=ht;break}else if(x[ht]===null){x[ht]=R,S=ht;break}if(S===-1)break}let Q=y[S];Q&&Q.connect(R)}}let F=new k,V=new k;function O(D,P,R){F.setFromMatrixPosition(P.matrixWorld),V.setFromMatrixPosition(R.matrixWorld);let S=F.distanceTo(V),Q=P.projectionMatrix.elements,ht=R.projectionMatrix.elements,J=Q[14]/(Q[10]-1),gt=Q[14]/(Q[10]+1),Z=(Q[9]+1)/Q[5],j=(Q[9]-1)/Q[5],b=(Q[8]-1)/Q[0],et=(ht[8]+1)/ht[0],tt=J*b,at=J*et,I=S/(-b+et),L=I*-b;if(P.matrixWorld.decompose(D.position,D.quaternion,D.scale),D.translateX(L),D.translateZ(I),D.matrixWorld.compose(D.position,D.quaternion,D.scale),D.matrixWorldInverse.copy(D.matrixWorld).invert(),Q[10]===-1)D.projectionMatrix.copy(P.projectionMatrix),D.projectionMatrixInverse.copy(P.projectionMatrixInverse);else{let it=J+I,E=gt+I,v=tt-L,Y=at+(S-L),rt=Z*gt/E*it,pt=j*gt/E*it;D.projectionMatrix.makePerspective(v,Y,rt,pt,it,E),D.projectionMatrixInverse.copy(D.projectionMatrix).invert()}}function lt(D,P){P===null?D.matrixWorld.copy(D.matrix):D.matrixWorld.multiplyMatrices(P.matrixWorld,D.matrix),D.matrixWorldInverse.copy(D.matrixWorld).invert()}this.updateCamera=function(D){if(s===null)return;let P=D.near,R=D.far;_.texture!==null&&(_.depthNear>0&&(P=_.depthNear),_.depthFar>0&&(R=_.depthFar)),M.near=U.near=N.near=P,M.far=U.far=N.far=R,(z!==M.near||G!==M.far)&&(s.updateRenderState({depthNear:M.near,depthFar:M.far}),z=M.near,G=M.far),N.layers.mask=D.layers.mask|2,U.layers.mask=D.layers.mask|4,M.layers.mask=N.layers.mask|U.layers.mask;let S=D.parent,Q=M.cameras;lt(M,S);for(let ht=0;ht<Q.length;ht++)lt(Q[ht],S);Q.length===2?O(M,N,U):M.projectionMatrix.copy(N.projectionMatrix),mt(D,M,S)};function mt(D,P,R){R===null?D.matrix.copy(P.matrixWorld):(D.matrix.copy(R.matrixWorld),D.matrix.invert(),D.matrix.multiply(P.matrixWorld)),D.matrix.decompose(D.position,D.quaternion,D.scale),D.updateMatrixWorld(!0),D.projectionMatrix.copy(P.projectionMatrix),D.projectionMatrixInverse.copy(P.projectionMatrixInverse),D.isPerspectiveCamera&&(D.fov=ys*2*Math.atan(1/D.projectionMatrix.elements[5]),D.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(f===null&&m===null))return c},this.setFoveation=function(D){c=D,f!==null&&(f.fixedFoveation=D),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=D)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(M)};let vt=null;function Ct(D,P){if(u=P.getViewerPose(l||a),g=P,u!==null){let R=u.views;m!==null&&(t.setRenderTargetFramebuffer(T,m.framebuffer),t.setRenderTarget(T));let S=!1;R.length!==M.cameras.length&&(M.cameras.length=0,S=!0);for(let ht=0;ht<R.length;ht++){let J=R[ht],gt=null;if(m!==null)gt=m.getViewport(J);else{let j=d.getViewSubImage(f,J);gt=j.viewport,ht===0&&(t.setRenderTargetTextures(T,j.colorTexture,f.ignoreDepthValues?void 0:j.depthStencilTexture),t.setRenderTarget(T))}let Z=w[ht];Z===void 0&&(Z=new Re,Z.layers.enable(ht),Z.viewport=new le,w[ht]=Z),Z.matrix.fromArray(J.transform.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale),Z.projectionMatrix.fromArray(J.projectionMatrix),Z.projectionMatrixInverse.copy(Z.projectionMatrix).invert(),Z.viewport.set(gt.x,gt.y,gt.width,gt.height),ht===0&&(M.matrix.copy(Z.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),S===!0&&M.cameras.push(Z)}let Q=s.enabledFeatures;if(Q&&Q.includes("depth-sensing")){let ht=d.getDepthInformation(R[0]);ht&&ht.isValid&&ht.texture&&_.init(t,ht,s.renderState)}}for(let R=0;R<y.length;R++){let S=x[R],Q=y[R];S!==null&&Q!==void 0&&Q.update(S,P,l||a)}vt&&vt(D,P),P.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:P}),g=null}let Xt=new vu;Xt.setAnimationLoop(Ct),this.setAnimationLoop=function(D){vt=D},this.dispose=function(){}}},ei=new nn,V_=new ie;function G_(i,t){function e(p,h){p.matrixAutoUpdate===!0&&p.updateMatrix(),h.value.copy(p.matrix)}function n(p,h){h.color.getRGB(p.fogColor.value,yu(i)),h.isFog?(p.fogNear.value=h.near,p.fogFar.value=h.far):h.isFogExp2&&(p.fogDensity.value=h.density)}function s(p,h,T,y,x){h.isMeshBasicMaterial||h.isMeshLambertMaterial?r(p,h):h.isMeshToonMaterial?(r(p,h),d(p,h)):h.isMeshPhongMaterial?(r(p,h),u(p,h)):h.isMeshStandardMaterial?(r(p,h),f(p,h),h.isMeshPhysicalMaterial&&m(p,h,x)):h.isMeshMatcapMaterial?(r(p,h),g(p,h)):h.isMeshDepthMaterial?r(p,h):h.isMeshDistanceMaterial?(r(p,h),_(p,h)):h.isMeshNormalMaterial?r(p,h):h.isLineBasicMaterial?(a(p,h),h.isLineDashedMaterial&&o(p,h)):h.isPointsMaterial?c(p,h,T,y):h.isSpriteMaterial?l(p,h):h.isShadowMaterial?(p.color.value.copy(h.color),p.opacity.value=h.opacity):h.isShaderMaterial&&(h.uniformsNeedUpdate=!1)}function r(p,h){p.opacity.value=h.opacity,h.color&&p.diffuse.value.copy(h.color),h.emissive&&p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity),h.map&&(p.map.value=h.map,e(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,e(h.alphaMap,p.alphaMapTransform)),h.bumpMap&&(p.bumpMap.value=h.bumpMap,e(h.bumpMap,p.bumpMapTransform),p.bumpScale.value=h.bumpScale,h.side===Ie&&(p.bumpScale.value*=-1)),h.normalMap&&(p.normalMap.value=h.normalMap,e(h.normalMap,p.normalMapTransform),p.normalScale.value.copy(h.normalScale),h.side===Ie&&p.normalScale.value.negate()),h.displacementMap&&(p.displacementMap.value=h.displacementMap,e(h.displacementMap,p.displacementMapTransform),p.displacementScale.value=h.displacementScale,p.displacementBias.value=h.displacementBias),h.emissiveMap&&(p.emissiveMap.value=h.emissiveMap,e(h.emissiveMap,p.emissiveMapTransform)),h.specularMap&&(p.specularMap.value=h.specularMap,e(h.specularMap,p.specularMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest);let T=t.get(h),y=T.envMap,x=T.envMapRotation;y&&(p.envMap.value=y,ei.copy(x),ei.x*=-1,ei.y*=-1,ei.z*=-1,y.isCubeTexture&&y.isRenderTargetTexture===!1&&(ei.y*=-1,ei.z*=-1),p.envMapRotation.value.setFromMatrix4(V_.makeRotationFromEuler(ei)),p.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=h.reflectivity,p.ior.value=h.ior,p.refractionRatio.value=h.refractionRatio),h.lightMap&&(p.lightMap.value=h.lightMap,p.lightMapIntensity.value=h.lightMapIntensity,e(h.lightMap,p.lightMapTransform)),h.aoMap&&(p.aoMap.value=h.aoMap,p.aoMapIntensity.value=h.aoMapIntensity,e(h.aoMap,p.aoMapTransform))}function a(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,h.map&&(p.map.value=h.map,e(h.map,p.mapTransform))}function o(p,h){p.dashSize.value=h.dashSize,p.totalSize.value=h.dashSize+h.gapSize,p.scale.value=h.scale}function c(p,h,T,y){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.size.value=h.size*T,p.scale.value=y*.5,h.map&&(p.map.value=h.map,e(h.map,p.uvTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,e(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function l(p,h){p.diffuse.value.copy(h.color),p.opacity.value=h.opacity,p.rotation.value=h.rotation,h.map&&(p.map.value=h.map,e(h.map,p.mapTransform)),h.alphaMap&&(p.alphaMap.value=h.alphaMap,e(h.alphaMap,p.alphaMapTransform)),h.alphaTest>0&&(p.alphaTest.value=h.alphaTest)}function u(p,h){p.specular.value.copy(h.specular),p.shininess.value=Math.max(h.shininess,1e-4)}function d(p,h){h.gradientMap&&(p.gradientMap.value=h.gradientMap)}function f(p,h){p.metalness.value=h.metalness,h.metalnessMap&&(p.metalnessMap.value=h.metalnessMap,e(h.metalnessMap,p.metalnessMapTransform)),p.roughness.value=h.roughness,h.roughnessMap&&(p.roughnessMap.value=h.roughnessMap,e(h.roughnessMap,p.roughnessMapTransform)),h.envMap&&(p.envMapIntensity.value=h.envMapIntensity)}function m(p,h,T){p.ior.value=h.ior,h.sheen>0&&(p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),p.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(p.sheenColorMap.value=h.sheenColorMap,e(h.sheenColorMap,p.sheenColorMapTransform)),h.sheenRoughnessMap&&(p.sheenRoughnessMap.value=h.sheenRoughnessMap,e(h.sheenRoughnessMap,p.sheenRoughnessMapTransform))),h.clearcoat>0&&(p.clearcoat.value=h.clearcoat,p.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(p.clearcoatMap.value=h.clearcoatMap,e(h.clearcoatMap,p.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,e(h.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(p.clearcoatNormalMap.value=h.clearcoatNormalMap,e(h.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===Ie&&p.clearcoatNormalScale.value.negate())),h.dispersion>0&&(p.dispersion.value=h.dispersion),h.iridescence>0&&(p.iridescence.value=h.iridescence,p.iridescenceIOR.value=h.iridescenceIOR,p.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(p.iridescenceMap.value=h.iridescenceMap,e(h.iridescenceMap,p.iridescenceMapTransform)),h.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=h.iridescenceThicknessMap,e(h.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),h.transmission>0&&(p.transmission.value=h.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),h.transmissionMap&&(p.transmissionMap.value=h.transmissionMap,e(h.transmissionMap,p.transmissionMapTransform)),p.thickness.value=h.thickness,h.thicknessMap&&(p.thicknessMap.value=h.thicknessMap,e(h.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=h.attenuationDistance,p.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(p.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(p.anisotropyMap.value=h.anisotropyMap,e(h.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=h.specularIntensity,p.specularColor.value.copy(h.specularColor),h.specularColorMap&&(p.specularColorMap.value=h.specularColorMap,e(h.specularColorMap,p.specularColorMapTransform)),h.specularIntensityMap&&(p.specularIntensityMap.value=h.specularIntensityMap,e(h.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,h){h.matcap&&(p.matcap.value=h.matcap)}function _(p,h){let T=t.get(h).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function W_(i,t,e,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(T,y){let x=y.program;n.uniformBlockBinding(T,x)}function l(T,y){let x=s[T.id];x===void 0&&(g(T),x=u(T),s[T.id]=x,T.addEventListener("dispose",p));let B=y.program;n.updateUBOMapping(T,B);let C=t.render.frame;r[T.id]!==C&&(f(T),r[T.id]=C)}function u(T){let y=d();T.__bindingPointIndex=y;let x=i.createBuffer(),B=T.__size,C=T.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,B,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,y,x),x}function d(){for(let T=0;T<o;T++)if(a.indexOf(T)===-1)return a.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(T){let y=s[T.id],x=T.uniforms,B=T.__cache;i.bindBuffer(i.UNIFORM_BUFFER,y);for(let C=0,N=x.length;C<N;C++){let U=Array.isArray(x[C])?x[C]:[x[C]];for(let w=0,M=U.length;w<M;w++){let z=U[w];if(m(z,C,w,B)===!0){let G=z.__offset,$=Array.isArray(z.value)?z.value:[z.value],K=0;for(let ct=0;ct<$.length;ct++){let F=$[ct],V=_(F);typeof F=="number"||typeof F=="boolean"?(z.__data[0]=F,i.bufferSubData(i.UNIFORM_BUFFER,G+K,z.__data)):F.isMatrix3?(z.__data[0]=F.elements[0],z.__data[1]=F.elements[1],z.__data[2]=F.elements[2],z.__data[3]=0,z.__data[4]=F.elements[3],z.__data[5]=F.elements[4],z.__data[6]=F.elements[5],z.__data[7]=0,z.__data[8]=F.elements[6],z.__data[9]=F.elements[7],z.__data[10]=F.elements[8],z.__data[11]=0):(F.toArray(z.__data,K),K+=V.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,G,z.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(T,y,x,B){let C=T.value,N=y+"_"+x;if(B[N]===void 0)return typeof C=="number"||typeof C=="boolean"?B[N]=C:B[N]=C.clone(),!0;{let U=B[N];if(typeof C=="number"||typeof C=="boolean"){if(U!==C)return B[N]=C,!0}else if(U.equals(C)===!1)return U.copy(C),!0}return!1}function g(T){let y=T.uniforms,x=0,B=16;for(let N=0,U=y.length;N<U;N++){let w=Array.isArray(y[N])?y[N]:[y[N]];for(let M=0,z=w.length;M<z;M++){let G=w[M],$=Array.isArray(G.value)?G.value:[G.value];for(let K=0,ct=$.length;K<ct;K++){let F=$[K],V=_(F),O=x%B,lt=O%V.boundary,mt=O+lt;x+=lt,mt!==0&&B-mt<V.storage&&(x+=B-mt),G.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),G.__offset=x,x+=V.storage}}}let C=x%B;return C>0&&(x+=B-C),T.__size=x,T.__cache={},this}function _(T){let y={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(y.boundary=4,y.storage=4):T.isVector2?(y.boundary=8,y.storage=8):T.isVector3||T.isColor?(y.boundary=16,y.storage=12):T.isVector4?(y.boundary=16,y.storage=16):T.isMatrix3?(y.boundary=48,y.storage=48):T.isMatrix4?(y.boundary=64,y.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),y}function p(T){let y=T.target;y.removeEventListener("dispose",p);let x=a.indexOf(y.__bindingPointIndex);a.splice(x,1),i.deleteBuffer(s[y.id]),delete s[y.id],delete r[y.id]}function h(){for(let T in s)i.deleteBuffer(s[T]);a=[],s={},r={}}return{bind:c,update:l,dispose:h}}var kr=class{constructor(t={}){let{canvas:e=$f(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reverseDepthBuffer:f=!1}=t;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=a;let g=new Uint32Array(4),_=new Int32Array(4),p=null,h=null,T=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Ee,this.toneMapping=Bn,this.toneMappingExposure=1;let x=this,B=!1,C=0,N=0,U=null,w=-1,M=null,z=new le,G=new le,$=null,K=new kt(0),ct=0,F=e.width,V=e.height,O=1,lt=null,mt=null,vt=new le(0,0,F,V),Ct=new le(0,0,F,V),Xt=!1,D=new vs,P=!1,R=!1,S=new ie,Q=new ie,ht=new k,J=new le,gt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Z=!1;function j(){return U===null?O:1}let b=n;function et(A,X){return e.getContext(A,X)}try{let A={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Bc}`),e.addEventListener("webglcontextlost",_t,!1),e.addEventListener("webglcontextrestored",Tt,!1),e.addEventListener("webglcontextcreationerror",Et,!1),b===null){let X="webgl2";if(b=et(X,A),b===null)throw et(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}let tt,at,I,L,it,E,v,Y,rt,pt,H,ut,dt,yt,It,xt,At,Ut,Ft,Rt,Yt,Gt,ee,W;function St(){tt=new a0(b),tt.init(),Gt=new B_(b,tt),at=new t0(b,tt,t,Gt),I=new U_(b,tt),at.reverseDepthBuffer&&f&&I.buffers.depth.setReversed(!0),L=new l0(b),it=new b_,E=new F_(b,tt,I,it,at,Gt,L),v=new n0(x),Y=new r0(x),rt=new gp(b),ee=new Qg(b,rt),pt=new o0(b,rt,L,ee),H=new u0(b,pt,rt,L),Ft=new h0(b,at,E),xt=new e0(it),ut=new M_(x,v,Y,tt,at,ee,xt),dt=new G_(x,it),yt=new E_,It=new I_(tt),Ut=new Kg(x,v,Y,I,H,m,c),At=new N_(x,H,at),W=new W_(b,L,at,I),Rt=new jg(b,tt,L),Yt=new c0(b,tt,L),L.programs=ut.programs,x.capabilities=at,x.extensions=tt,x.properties=it,x.renderLists=yt,x.shadowMap=At,x.state=I,x.info=L}St();let ot=new pc(x,b);this.xr=ot,this.getContext=function(){return b},this.getContextAttributes=function(){return b.getContextAttributes()},this.forceContextLoss=function(){let A=tt.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=tt.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return O},this.setPixelRatio=function(A){A!==void 0&&(O=A,this.setSize(F,V,!1))},this.getSize=function(A){return A.set(F,V)},this.setSize=function(A,X,nt=!0){if(ot.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}F=A,V=X,e.width=Math.floor(A*O),e.height=Math.floor(X*O),nt===!0&&(e.style.width=A+"px",e.style.height=X+"px"),this.setViewport(0,0,A,X)},this.getDrawingBufferSize=function(A){return A.set(F*O,V*O).floor()},this.setDrawingBufferSize=function(A,X,nt){F=A,V=X,O=nt,e.width=Math.floor(A*nt),e.height=Math.floor(X*nt),this.setViewport(0,0,A,X)},this.getCurrentViewport=function(A){return A.copy(z)},this.getViewport=function(A){return A.copy(vt)},this.setViewport=function(A,X,nt,st){A.isVector4?vt.set(A.x,A.y,A.z,A.w):vt.set(A,X,nt,st),I.viewport(z.copy(vt).multiplyScalar(O).round())},this.getScissor=function(A){return A.copy(Ct)},this.setScissor=function(A,X,nt,st){A.isVector4?Ct.set(A.x,A.y,A.z,A.w):Ct.set(A,X,nt,st),I.scissor(G.copy(Ct).multiplyScalar(O).round())},this.getScissorTest=function(){return Xt},this.setScissorTest=function(A){I.setScissorTest(Xt=A)},this.setOpaqueSort=function(A){lt=A},this.setTransparentSort=function(A){mt=A},this.getClearColor=function(A){return A.copy(Ut.getClearColor())},this.setClearColor=function(){Ut.setClearColor.apply(Ut,arguments)},this.getClearAlpha=function(){return Ut.getClearAlpha()},this.setClearAlpha=function(){Ut.setClearAlpha.apply(Ut,arguments)},this.clear=function(A=!0,X=!0,nt=!0){let st=0;if(A){let q=!1;if(U!==null){let Mt=U.texture.format;q=Mt===Xc||Mt===Wc||Mt===Gc}if(q){let Mt=U.texture.type,wt=Mt===Sn||Mt===oi||Mt===xs||Mt===Xi||Mt===Hc||Mt===Vc,Pt=Ut.getClearColor(),Lt=Ut.getClearAlpha(),zt=Pt.r,Vt=Pt.g,Nt=Pt.b;wt?(g[0]=zt,g[1]=Vt,g[2]=Nt,g[3]=Lt,b.clearBufferuiv(b.COLOR,0,g)):(_[0]=zt,_[1]=Vt,_[2]=Nt,_[3]=Lt,b.clearBufferiv(b.COLOR,0,_))}else st|=b.COLOR_BUFFER_BIT}X&&(st|=b.DEPTH_BUFFER_BIT),nt&&(st|=b.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),b.clear(st)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",_t,!1),e.removeEventListener("webglcontextrestored",Tt,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),yt.dispose(),It.dispose(),it.dispose(),v.dispose(),Y.dispose(),H.dispose(),ee.dispose(),W.dispose(),ut.dispose(),ot.dispose(),ot.removeEventListener("sessionstart",el),ot.removeEventListener("sessionend",nl),Yn.stop()};function _t(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),B=!0}function Tt(){console.log("THREE.WebGLRenderer: Context Restored."),B=!1;let A=L.autoReset,X=At.enabled,nt=At.autoUpdate,st=At.needsUpdate,q=At.type;St(),L.autoReset=A,At.enabled=X,At.autoUpdate=nt,At.needsUpdate=st,At.type=q}function Et(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function Ht(A){let X=A.target;X.removeEventListener("dispose",Ht),ce(X)}function ce(A){Me(A),it.remove(A)}function Me(A){let X=it.get(A).programs;X!==void 0&&(X.forEach(function(nt){ut.releaseProgram(nt)}),A.isShaderMaterial&&ut.releaseShaderCache(A))}this.renderBufferDirect=function(A,X,nt,st,q,Mt){X===null&&(X=gt);let wt=q.isMesh&&q.matrixWorld.determinant()<0,Pt=Wu(A,X,nt,st,q);I.setMaterial(st,wt);let Lt=nt.index,zt=1;if(st.wireframe===!0){if(Lt=pt.getWireframeAttribute(nt),Lt===void 0)return;zt=2}let Vt=nt.drawRange,Nt=nt.attributes.position,Zt=Vt.start*zt,ne=(Vt.start+Vt.count)*zt;Mt!==null&&(Zt=Math.max(Zt,Mt.start*zt),ne=Math.min(ne,(Mt.start+Mt.count)*zt)),Lt!==null?(Zt=Math.max(Zt,0),ne=Math.min(ne,Lt.count)):Nt!=null&&(Zt=Math.max(Zt,0),ne=Math.min(ne,Nt.count));let se=ne-Zt;if(se<0||se===1/0)return;ee.setup(q,st,Pt,nt,Lt);let Ce,Jt=Rt;if(Lt!==null&&(Ce=rt.get(Lt),Jt=Yt,Jt.setIndex(Ce)),q.isMesh)st.wireframe===!0?(I.setLineWidth(st.wireframeLinewidth*j()),Jt.setMode(b.LINES)):Jt.setMode(b.TRIANGLES);else if(q.isLine){let Dt=st.linewidth;Dt===void 0&&(Dt=1),I.setLineWidth(Dt*j()),q.isLineSegments?Jt.setMode(b.LINES):q.isLineLoop?Jt.setMode(b.LINE_LOOP):Jt.setMode(b.LINE_STRIP)}else q.isPoints?Jt.setMode(b.POINTS):q.isSprite&&Jt.setMode(b.TRIANGLES);if(q.isBatchedMesh)if(q._multiDrawInstances!==null)Jt.renderMultiDrawInstances(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount,q._multiDrawInstances);else if(tt.get("WEBGL_multi_draw"))Jt.renderMultiDraw(q._multiDrawStarts,q._multiDrawCounts,q._multiDrawCount);else{let Dt=q._multiDrawStarts,hn=q._multiDrawCounts,Kt=q._multiDrawCount,Ge=Lt?rt.get(Lt).bytesPerElement:1,mi=it.get(st).currentProgram.getUniforms();for(let Le=0;Le<Kt;Le++)mi.setValue(b,"_gl_DrawID",Le),Jt.render(Dt[Le]/Ge,hn[Le])}else if(q.isInstancedMesh)Jt.renderInstances(Zt,se,q.count);else if(nt.isInstancedBufferGeometry){let Dt=nt._maxInstanceCount!==void 0?nt._maxInstanceCount:1/0,hn=Math.min(nt.instanceCount,Dt);Jt.renderInstances(Zt,se,hn)}else Jt.render(Zt,se)};function Qt(A,X,nt){A.transparent===!0&&A.side===yn&&A.forceSinglePass===!1?(A.side=Ie,A.needsUpdate=!0,Os(A,X,nt),A.side=Hn,A.needsUpdate=!0,Os(A,X,nt),A.side=yn):Os(A,X,nt)}this.compile=function(A,X,nt=null){nt===null&&(nt=A),h=It.get(nt),h.init(X),y.push(h),nt.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(h.pushLight(q),q.castShadow&&h.pushShadow(q))}),A!==nt&&A.traverseVisible(function(q){q.isLight&&q.layers.test(X.layers)&&(h.pushLight(q),q.castShadow&&h.pushShadow(q))}),h.setupLights();let st=new Set;return A.traverse(function(q){if(!(q.isMesh||q.isPoints||q.isLine||q.isSprite))return;let Mt=q.material;if(Mt)if(Array.isArray(Mt))for(let wt=0;wt<Mt.length;wt++){let Pt=Mt[wt];Qt(Pt,nt,q),st.add(Pt)}else Qt(Mt,nt,q),st.add(Mt)}),y.pop(),h=null,st},this.compileAsync=function(A,X,nt=null){let st=this.compile(A,X,nt);return new Promise(q=>{function Mt(){if(st.forEach(function(wt){it.get(wt).currentProgram.isReady()&&st.delete(wt)}),st.size===0){q(A);return}setTimeout(Mt,10)}tt.get("KHR_parallel_shader_compile")!==null?Mt():setTimeout(Mt,10)})};let Ve=null;function ln(A){Ve&&Ve(A)}function el(){Yn.stop()}function nl(){Yn.start()}let Yn=new vu;Yn.setAnimationLoop(ln),typeof self<"u"&&Yn.setContext(self),this.setAnimationLoop=function(A){Ve=A,ot.setAnimationLoop(A),A===null?Yn.stop():Yn.start()},ot.addEventListener("sessionstart",el),ot.addEventListener("sessionend",nl),this.render=function(A,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(B===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),ot.enabled===!0&&ot.isPresenting===!0&&(ot.cameraAutoUpdate===!0&&ot.updateCamera(X),X=ot.getCamera()),A.isScene===!0&&A.onBeforeRender(x,A,X,U),h=It.get(A,y.length),h.init(X),y.push(h),Q.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),D.setFromProjectionMatrix(Q),R=this.localClippingEnabled,P=xt.init(this.clippingPlanes,R),p=yt.get(A,T.length),p.init(),T.push(p),ot.enabled===!0&&ot.isPresenting===!0){let Mt=x.xr.getDepthSensingMesh();Mt!==null&&Sa(Mt,X,-1/0,x.sortObjects)}Sa(A,X,0,x.sortObjects),p.finish(),x.sortObjects===!0&&p.sort(lt,mt),Z=ot.enabled===!1||ot.isPresenting===!1||ot.hasDepthSensing()===!1,Z&&Ut.addToRenderList(p,A),this.info.render.frame++,P===!0&&xt.beginShadows();let nt=h.state.shadowsArray;At.render(nt,A,X),P===!0&&xt.endShadows(),this.info.autoReset===!0&&this.info.reset();let st=p.opaque,q=p.transmissive;if(h.setupLights(),X.isArrayCamera){let Mt=X.cameras;if(q.length>0)for(let wt=0,Pt=Mt.length;wt<Pt;wt++){let Lt=Mt[wt];sl(st,q,A,Lt)}Z&&Ut.render(A);for(let wt=0,Pt=Mt.length;wt<Pt;wt++){let Lt=Mt[wt];il(p,A,Lt,Lt.viewport)}}else q.length>0&&sl(st,q,A,X),Z&&Ut.render(A),il(p,A,X);U!==null&&(E.updateMultisampleRenderTarget(U),E.updateRenderTargetMipmap(U)),A.isScene===!0&&A.onAfterRender(x,A,X),ee.resetDefaultState(),w=-1,M=null,y.pop(),y.length>0?(h=y[y.length-1],P===!0&&xt.setGlobalState(x.clippingPlanes,h.state.camera)):h=null,T.pop(),T.length>0?p=T[T.length-1]:p=null};function Sa(A,X,nt,st){if(A.visible===!1)return;if(A.layers.test(X.layers)){if(A.isGroup)nt=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(X);else if(A.isLight)h.pushLight(A),A.castShadow&&h.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||D.intersectsSprite(A)){st&&J.setFromMatrixPosition(A.matrixWorld).applyMatrix4(Q);let wt=H.update(A),Pt=A.material;Pt.visible&&p.push(A,wt,Pt,nt,J.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||D.intersectsObject(A))){let wt=H.update(A),Pt=A.material;if(st&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),J.copy(A.boundingSphere.center)):(wt.boundingSphere===null&&wt.computeBoundingSphere(),J.copy(wt.boundingSphere.center)),J.applyMatrix4(A.matrixWorld).applyMatrix4(Q)),Array.isArray(Pt)){let Lt=wt.groups;for(let zt=0,Vt=Lt.length;zt<Vt;zt++){let Nt=Lt[zt],Zt=Pt[Nt.materialIndex];Zt&&Zt.visible&&p.push(A,wt,Zt,nt,J.z,Nt)}}else Pt.visible&&p.push(A,wt,Pt,nt,J.z,null)}}let Mt=A.children;for(let wt=0,Pt=Mt.length;wt<Pt;wt++)Sa(Mt[wt],X,nt,st)}function il(A,X,nt,st){let q=A.opaque,Mt=A.transmissive,wt=A.transparent;h.setupLightsView(nt),P===!0&&xt.setGlobalState(x.clippingPlanes,nt),st&&I.viewport(z.copy(st)),q.length>0&&Us(q,X,nt),Mt.length>0&&Us(Mt,X,nt),wt.length>0&&Us(wt,X,nt),I.buffers.depth.setTest(!0),I.buffers.depth.setMask(!0),I.buffers.color.setMask(!0),I.setPolygonOffset(!1)}function sl(A,X,nt,st){if((nt.isScene===!0?nt.overrideMaterial:null)!==null)return;h.state.transmissionRenderTarget[st.id]===void 0&&(h.state.transmissionRenderTarget[st.id]=new En(1,1,{generateMipmaps:!0,type:tt.has("EXT_color_buffer_half_float")||tt.has("EXT_color_buffer_float")?Ps:Sn,minFilter:ai,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:$t.workingColorSpace}));let Mt=h.state.transmissionRenderTarget[st.id],wt=st.viewport||z;Mt.setSize(wt.z,wt.w);let Pt=x.getRenderTarget();x.setRenderTarget(Mt),x.getClearColor(K),ct=x.getClearAlpha(),ct<1&&x.setClearColor(16777215,.5),x.clear(),Z&&Ut.render(nt);let Lt=x.toneMapping;x.toneMapping=Bn;let zt=st.viewport;if(st.viewport!==void 0&&(st.viewport=void 0),h.setupLightsView(st),P===!0&&xt.setGlobalState(x.clippingPlanes,st),Us(A,nt,st),E.updateMultisampleRenderTarget(Mt),E.updateRenderTargetMipmap(Mt),tt.has("WEBGL_multisampled_render_to_texture")===!1){let Vt=!1;for(let Nt=0,Zt=X.length;Nt<Zt;Nt++){let ne=X[Nt],se=ne.object,Ce=ne.geometry,Jt=ne.material,Dt=ne.group;if(Jt.side===yn&&se.layers.test(st.layers)){let hn=Jt.side;Jt.side=Ie,Jt.needsUpdate=!0,rl(se,nt,st,Ce,Jt,Dt),Jt.side=hn,Jt.needsUpdate=!0,Vt=!0}}Vt===!0&&(E.updateMultisampleRenderTarget(Mt),E.updateRenderTargetMipmap(Mt))}x.setRenderTarget(Pt),x.setClearColor(K,ct),zt!==void 0&&(st.viewport=zt),x.toneMapping=Lt}function Us(A,X,nt){let st=X.isScene===!0?X.overrideMaterial:null;for(let q=0,Mt=A.length;q<Mt;q++){let wt=A[q],Pt=wt.object,Lt=wt.geometry,zt=st===null?wt.material:st,Vt=wt.group;Pt.layers.test(nt.layers)&&rl(Pt,X,nt,Lt,zt,Vt)}}function rl(A,X,nt,st,q,Mt){A.onBeforeRender(x,X,nt,st,q,Mt),A.modelViewMatrix.multiplyMatrices(nt.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),q.onBeforeRender(x,X,nt,st,A,Mt),q.transparent===!0&&q.side===yn&&q.forceSinglePass===!1?(q.side=Ie,q.needsUpdate=!0,x.renderBufferDirect(nt,X,st,q,A,Mt),q.side=Hn,q.needsUpdate=!0,x.renderBufferDirect(nt,X,st,q,A,Mt),q.side=yn):x.renderBufferDirect(nt,X,st,q,A,Mt),A.onAfterRender(x,X,nt,st,q,Mt)}function Os(A,X,nt){X.isScene!==!0&&(X=gt);let st=it.get(A),q=h.state.lights,Mt=h.state.shadowsArray,wt=q.state.version,Pt=ut.getParameters(A,q.state,Mt,X,nt),Lt=ut.getProgramCacheKey(Pt),zt=st.programs;st.environment=A.isMeshStandardMaterial?X.environment:null,st.fog=X.fog,st.envMap=(A.isMeshStandardMaterial?Y:v).get(A.envMap||st.environment),st.envMapRotation=st.environment!==null&&A.envMap===null?X.environmentRotation:A.envMapRotation,zt===void 0&&(A.addEventListener("dispose",Ht),zt=new Map,st.programs=zt);let Vt=zt.get(Lt);if(Vt!==void 0){if(st.currentProgram===Vt&&st.lightsStateVersion===wt)return ol(A,Pt),Vt}else Pt.uniforms=ut.getUniforms(A),A.onBeforeCompile(Pt,x),Vt=ut.acquireProgram(Pt,Lt),zt.set(Lt,Vt),st.uniforms=Pt.uniforms;let Nt=st.uniforms;return(!A.isShaderMaterial&&!A.isRawShaderMaterial||A.clipping===!0)&&(Nt.clippingPlanes=xt.uniform),ol(A,Pt),st.needsLights=qu(A),st.lightsStateVersion=wt,st.needsLights&&(Nt.ambientLightColor.value=q.state.ambient,Nt.lightProbe.value=q.state.probe,Nt.directionalLights.value=q.state.directional,Nt.directionalLightShadows.value=q.state.directionalShadow,Nt.spotLights.value=q.state.spot,Nt.spotLightShadows.value=q.state.spotShadow,Nt.rectAreaLights.value=q.state.rectArea,Nt.ltc_1.value=q.state.rectAreaLTC1,Nt.ltc_2.value=q.state.rectAreaLTC2,Nt.pointLights.value=q.state.point,Nt.pointLightShadows.value=q.state.pointShadow,Nt.hemisphereLights.value=q.state.hemi,Nt.directionalShadowMap.value=q.state.directionalShadowMap,Nt.directionalShadowMatrix.value=q.state.directionalShadowMatrix,Nt.spotShadowMap.value=q.state.spotShadowMap,Nt.spotLightMatrix.value=q.state.spotLightMatrix,Nt.spotLightMap.value=q.state.spotLightMap,Nt.pointShadowMap.value=q.state.pointShadowMap,Nt.pointShadowMatrix.value=q.state.pointShadowMatrix),st.currentProgram=Vt,st.uniformsList=null,Vt}function al(A){if(A.uniformsList===null){let X=A.currentProgram.getUniforms();A.uniformsList=Hi.seqWithValue(X.seq,A.uniforms)}return A.uniformsList}function ol(A,X){let nt=it.get(A);nt.outputColorSpace=X.outputColorSpace,nt.batching=X.batching,nt.batchingColor=X.batchingColor,nt.instancing=X.instancing,nt.instancingColor=X.instancingColor,nt.instancingMorph=X.instancingMorph,nt.skinning=X.skinning,nt.morphTargets=X.morphTargets,nt.morphNormals=X.morphNormals,nt.morphColors=X.morphColors,nt.morphTargetsCount=X.morphTargetsCount,nt.numClippingPlanes=X.numClippingPlanes,nt.numIntersection=X.numClipIntersection,nt.vertexAlphas=X.vertexAlphas,nt.vertexTangents=X.vertexTangents,nt.toneMapping=X.toneMapping}function Wu(A,X,nt,st,q){X.isScene!==!0&&(X=gt),E.resetTextureUnits();let Mt=X.fog,wt=st.isMeshStandardMaterial?X.environment:null,Pt=U===null?x.outputColorSpace:U.isXRRenderTarget===!0?U.texture.colorSpace:ji,Lt=(st.isMeshStandardMaterial?Y:v).get(st.envMap||wt),zt=st.vertexColors===!0&&!!nt.attributes.color&&nt.attributes.color.itemSize===4,Vt=!!nt.attributes.tangent&&(!!st.normalMap||st.anisotropy>0),Nt=!!nt.morphAttributes.position,Zt=!!nt.morphAttributes.normal,ne=!!nt.morphAttributes.color,se=Bn;st.toneMapped&&(U===null||U.isXRRenderTarget===!0)&&(se=x.toneMapping);let Ce=nt.morphAttributes.position||nt.morphAttributes.normal||nt.morphAttributes.color,Jt=Ce!==void 0?Ce.length:0,Dt=it.get(st),hn=h.state.lights;if(P===!0&&(R===!0||A!==M)){let Be=A===M&&st.id===w;xt.setState(st,A,Be)}let Kt=!1;st.version===Dt.__version?(Dt.needsLights&&Dt.lightsStateVersion!==hn.state.version||Dt.outputColorSpace!==Pt||q.isBatchedMesh&&Dt.batching===!1||!q.isBatchedMesh&&Dt.batching===!0||q.isBatchedMesh&&Dt.batchingColor===!0&&q.colorTexture===null||q.isBatchedMesh&&Dt.batchingColor===!1&&q.colorTexture!==null||q.isInstancedMesh&&Dt.instancing===!1||!q.isInstancedMesh&&Dt.instancing===!0||q.isSkinnedMesh&&Dt.skinning===!1||!q.isSkinnedMesh&&Dt.skinning===!0||q.isInstancedMesh&&Dt.instancingColor===!0&&q.instanceColor===null||q.isInstancedMesh&&Dt.instancingColor===!1&&q.instanceColor!==null||q.isInstancedMesh&&Dt.instancingMorph===!0&&q.morphTexture===null||q.isInstancedMesh&&Dt.instancingMorph===!1&&q.morphTexture!==null||Dt.envMap!==Lt||st.fog===!0&&Dt.fog!==Mt||Dt.numClippingPlanes!==void 0&&(Dt.numClippingPlanes!==xt.numPlanes||Dt.numIntersection!==xt.numIntersection)||Dt.vertexAlphas!==zt||Dt.vertexTangents!==Vt||Dt.morphTargets!==Nt||Dt.morphNormals!==Zt||Dt.morphColors!==ne||Dt.toneMapping!==se||Dt.morphTargetsCount!==Jt)&&(Kt=!0):(Kt=!0,Dt.__version=st.version);let Ge=Dt.currentProgram;Kt===!0&&(Ge=Os(st,X,q));let mi=!1,Le=!1,is=!1,re=Ge.getUniforms(),Qe=Dt.uniforms;if(I.useProgram(Ge.program)&&(mi=!0,Le=!0,is=!0),st.id!==w&&(w=st.id,Le=!0),mi||M!==A){I.buffers.depth.getReversed()?(S.copy(A.projectionMatrix),Jf(S),Kf(S),re.setValue(b,"projectionMatrix",S)):re.setValue(b,"projectionMatrix",A.projectionMatrix),re.setValue(b,"viewMatrix",A.matrixWorldInverse);let Tn=re.map.cameraPosition;Tn!==void 0&&Tn.setValue(b,ht.setFromMatrixPosition(A.matrixWorld)),at.logarithmicDepthBuffer&&re.setValue(b,"logDepthBufFC",2/(Math.log(A.far+1)/Math.LN2)),(st.isMeshPhongMaterial||st.isMeshToonMaterial||st.isMeshLambertMaterial||st.isMeshBasicMaterial||st.isMeshStandardMaterial||st.isShaderMaterial)&&re.setValue(b,"isOrthographic",A.isOrthographicCamera===!0),M!==A&&(M=A,Le=!0,is=!0)}if(q.isSkinnedMesh){re.setOptional(b,q,"bindMatrix"),re.setOptional(b,q,"bindMatrixInverse");let Be=q.skeleton;Be&&(Be.boneTexture===null&&Be.computeBoneTexture(),re.setValue(b,"boneTexture",Be.boneTexture,E))}q.isBatchedMesh&&(re.setOptional(b,q,"batchingTexture"),re.setValue(b,"batchingTexture",q._matricesTexture,E),re.setOptional(b,q,"batchingIdTexture"),re.setValue(b,"batchingIdTexture",q._indirectTexture,E),re.setOptional(b,q,"batchingColorTexture"),q._colorsTexture!==null&&re.setValue(b,"batchingColorTexture",q._colorsTexture,E));let ss=nt.morphAttributes;if((ss.position!==void 0||ss.normal!==void 0||ss.color!==void 0)&&Ft.update(q,nt,Ge),(Le||Dt.receiveShadow!==q.receiveShadow)&&(Dt.receiveShadow=q.receiveShadow,re.setValue(b,"receiveShadow",q.receiveShadow)),st.isMeshGouraudMaterial&&st.envMap!==null&&(Qe.envMap.value=Lt,Qe.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),st.isMeshStandardMaterial&&st.envMap===null&&X.environment!==null&&(Qe.envMapIntensity.value=X.environmentIntensity),Le&&(re.setValue(b,"toneMappingExposure",x.toneMappingExposure),Dt.needsLights&&Xu(Qe,is),Mt&&st.fog===!0&&dt.refreshFogUniforms(Qe,Mt),dt.refreshMaterialUniforms(Qe,st,O,V,h.state.transmissionRenderTarget[A.id]),Hi.upload(b,al(Dt),Qe,E)),st.isShaderMaterial&&st.uniformsNeedUpdate===!0&&(Hi.upload(b,al(Dt),Qe,E),st.uniformsNeedUpdate=!1),st.isSpriteMaterial&&re.setValue(b,"center",q.center),re.setValue(b,"modelViewMatrix",q.modelViewMatrix),re.setValue(b,"normalMatrix",q.normalMatrix),re.setValue(b,"modelMatrix",q.matrixWorld),st.isShaderMaterial||st.isRawShaderMaterial){let Be=st.uniformsGroups;for(let Tn=0,An=Be.length;Tn<An;Tn++){let cl=Be[Tn];W.update(cl,Ge),W.bind(cl,Ge)}}return Ge}function Xu(A,X){A.ambientLightColor.needsUpdate=X,A.lightProbe.needsUpdate=X,A.directionalLights.needsUpdate=X,A.directionalLightShadows.needsUpdate=X,A.pointLights.needsUpdate=X,A.pointLightShadows.needsUpdate=X,A.spotLights.needsUpdate=X,A.spotLightShadows.needsUpdate=X,A.rectAreaLights.needsUpdate=X,A.hemisphereLights.needsUpdate=X}function qu(A){return A.isMeshLambertMaterial||A.isMeshToonMaterial||A.isMeshPhongMaterial||A.isMeshStandardMaterial||A.isShadowMaterial||A.isShaderMaterial&&A.lights===!0}this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return N},this.getRenderTarget=function(){return U},this.setRenderTargetTextures=function(A,X,nt){it.get(A.texture).__webglTexture=X,it.get(A.depthTexture).__webglTexture=nt;let st=it.get(A);st.__hasExternalTextures=!0,st.__autoAllocateDepthBuffer=nt===void 0,st.__autoAllocateDepthBuffer||tt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),st.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,X){let nt=it.get(A);nt.__webglFramebuffer=X,nt.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(A,X=0,nt=0){U=A,C=X,N=nt;let st=!0,q=null,Mt=!1,wt=!1;if(A){let Lt=it.get(A);if(Lt.__useDefaultFramebuffer!==void 0)I.bindFramebuffer(b.FRAMEBUFFER,null),st=!1;else if(Lt.__webglFramebuffer===void 0)E.setupRenderTarget(A);else if(Lt.__hasExternalTextures)E.rebindTextures(A,it.get(A.texture).__webglTexture,it.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let Nt=A.depthTexture;if(Lt.__boundDepthTexture!==Nt){if(Nt!==null&&it.has(Nt)&&(A.width!==Nt.image.width||A.height!==Nt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(A)}}let zt=A.texture;(zt.isData3DTexture||zt.isDataArrayTexture||zt.isCompressedArrayTexture)&&(wt=!0);let Vt=it.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Array.isArray(Vt[X])?q=Vt[X][nt]:q=Vt[X],Mt=!0):A.samples>0&&E.useMultisampledRTT(A)===!1?q=it.get(A).__webglMultisampledFramebuffer:Array.isArray(Vt)?q=Vt[nt]:q=Vt,z.copy(A.viewport),G.copy(A.scissor),$=A.scissorTest}else z.copy(vt).multiplyScalar(O).floor(),G.copy(Ct).multiplyScalar(O).floor(),$=Xt;if(I.bindFramebuffer(b.FRAMEBUFFER,q)&&st&&I.drawBuffers(A,q),I.viewport(z),I.scissor(G),I.setScissorTest($),Mt){let Lt=it.get(A.texture);b.framebufferTexture2D(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,b.TEXTURE_CUBE_MAP_POSITIVE_X+X,Lt.__webglTexture,nt)}else if(wt){let Lt=it.get(A.texture),zt=X||0;b.framebufferTextureLayer(b.FRAMEBUFFER,b.COLOR_ATTACHMENT0,Lt.__webglTexture,nt||0,zt)}w=-1},this.readRenderTargetPixels=function(A,X,nt,st,q,Mt,wt){if(!(A&&A.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Pt=it.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&wt!==void 0&&(Pt=Pt[wt]),Pt){I.bindFramebuffer(b.FRAMEBUFFER,Pt);try{let Lt=A.texture,zt=Lt.format,Vt=Lt.type;if(!at.textureFormatReadable(zt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!at.textureTypeReadable(Vt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=A.width-st&&nt>=0&&nt<=A.height-q&&b.readPixels(X,nt,st,q,Gt.convert(zt),Gt.convert(Vt),Mt)}finally{let Lt=U!==null?it.get(U).__webglFramebuffer:null;I.bindFramebuffer(b.FRAMEBUFFER,Lt)}}},this.readRenderTargetPixelsAsync=async function(A,X,nt,st,q,Mt,wt){if(!(A&&A.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Pt=it.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&wt!==void 0&&(Pt=Pt[wt]),Pt){let Lt=A.texture,zt=Lt.format,Vt=Lt.type;if(!at.textureFormatReadable(zt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!at.textureTypeReadable(Vt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(X>=0&&X<=A.width-st&&nt>=0&&nt<=A.height-q){I.bindFramebuffer(b.FRAMEBUFFER,Pt);let Nt=b.createBuffer();b.bindBuffer(b.PIXEL_PACK_BUFFER,Nt),b.bufferData(b.PIXEL_PACK_BUFFER,Mt.byteLength,b.STREAM_READ),b.readPixels(X,nt,st,q,Gt.convert(zt),Gt.convert(Vt),0);let Zt=U!==null?it.get(U).__webglFramebuffer:null;I.bindFramebuffer(b.FRAMEBUFFER,Zt);let ne=b.fenceSync(b.SYNC_GPU_COMMANDS_COMPLETE,0);return b.flush(),await Zf(b,ne,4),b.bindBuffer(b.PIXEL_PACK_BUFFER,Nt),b.getBufferSubData(b.PIXEL_PACK_BUFFER,0,Mt),b.deleteBuffer(Nt),b.deleteSync(ne),Mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,X=null,nt=0){A.isTexture!==!0&&(ds("WebGLRenderer: copyFramebufferToTexture function signature has changed."),X=arguments[0]||null,A=arguments[1]);let st=Math.pow(2,-nt),q=Math.floor(A.image.width*st),Mt=Math.floor(A.image.height*st),wt=X!==null?X.x:0,Pt=X!==null?X.y:0;E.setTexture2D(A,0),b.copyTexSubImage2D(b.TEXTURE_2D,nt,0,0,wt,Pt,q,Mt),I.unbindTexture()},this.copyTextureToTexture=function(A,X,nt=null,st=null,q=0){A.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture function signature has changed."),st=arguments[0]||null,A=arguments[1],X=arguments[2],q=arguments[3]||0,nt=null);let Mt,wt,Pt,Lt,zt,Vt,Nt,Zt,ne,se=A.isCompressedTexture?A.mipmaps[q]:A.image;nt!==null?(Mt=nt.max.x-nt.min.x,wt=nt.max.y-nt.min.y,Pt=nt.isBox3?nt.max.z-nt.min.z:1,Lt=nt.min.x,zt=nt.min.y,Vt=nt.isBox3?nt.min.z:0):(Mt=se.width,wt=se.height,Pt=se.depth||1,Lt=0,zt=0,Vt=0),st!==null?(Nt=st.x,Zt=st.y,ne=st.z):(Nt=0,Zt=0,ne=0);let Ce=Gt.convert(X.format),Jt=Gt.convert(X.type),Dt;X.isData3DTexture?(E.setTexture3D(X,0),Dt=b.TEXTURE_3D):X.isDataArrayTexture||X.isCompressedArrayTexture?(E.setTexture2DArray(X,0),Dt=b.TEXTURE_2D_ARRAY):(E.setTexture2D(X,0),Dt=b.TEXTURE_2D),b.pixelStorei(b.UNPACK_FLIP_Y_WEBGL,X.flipY),b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL,X.premultiplyAlpha),b.pixelStorei(b.UNPACK_ALIGNMENT,X.unpackAlignment);let hn=b.getParameter(b.UNPACK_ROW_LENGTH),Kt=b.getParameter(b.UNPACK_IMAGE_HEIGHT),Ge=b.getParameter(b.UNPACK_SKIP_PIXELS),mi=b.getParameter(b.UNPACK_SKIP_ROWS),Le=b.getParameter(b.UNPACK_SKIP_IMAGES);b.pixelStorei(b.UNPACK_ROW_LENGTH,se.width),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,se.height),b.pixelStorei(b.UNPACK_SKIP_PIXELS,Lt),b.pixelStorei(b.UNPACK_SKIP_ROWS,zt),b.pixelStorei(b.UNPACK_SKIP_IMAGES,Vt);let is=A.isDataArrayTexture||A.isData3DTexture,re=X.isDataArrayTexture||X.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let Qe=it.get(A),ss=it.get(X),Be=it.get(Qe.__renderTarget),Tn=it.get(ss.__renderTarget);I.bindFramebuffer(b.READ_FRAMEBUFFER,Be.__webglFramebuffer),I.bindFramebuffer(b.DRAW_FRAMEBUFFER,Tn.__webglFramebuffer);for(let An=0;An<Pt;An++)is&&b.framebufferTextureLayer(b.READ_FRAMEBUFFER,b.COLOR_ATTACHMENT0,it.get(A).__webglTexture,q,Vt+An),A.isDepthTexture?(re&&b.framebufferTextureLayer(b.DRAW_FRAMEBUFFER,b.COLOR_ATTACHMENT0,it.get(X).__webglTexture,q,ne+An),b.blitFramebuffer(Lt,zt,Mt,wt,Nt,Zt,Mt,wt,b.DEPTH_BUFFER_BIT,b.NEAREST)):re?b.copyTexSubImage3D(Dt,q,Nt,Zt,ne+An,Lt,zt,Mt,wt):b.copyTexSubImage2D(Dt,q,Nt,Zt,ne+An,Lt,zt,Mt,wt);I.bindFramebuffer(b.READ_FRAMEBUFFER,null),I.bindFramebuffer(b.DRAW_FRAMEBUFFER,null)}else re?A.isDataTexture||A.isData3DTexture?b.texSubImage3D(Dt,q,Nt,Zt,ne,Mt,wt,Pt,Ce,Jt,se.data):X.isCompressedArrayTexture?b.compressedTexSubImage3D(Dt,q,Nt,Zt,ne,Mt,wt,Pt,Ce,se.data):b.texSubImage3D(Dt,q,Nt,Zt,ne,Mt,wt,Pt,Ce,Jt,se):A.isDataTexture?b.texSubImage2D(b.TEXTURE_2D,q,Nt,Zt,Mt,wt,Ce,Jt,se.data):A.isCompressedTexture?b.compressedTexSubImage2D(b.TEXTURE_2D,q,Nt,Zt,se.width,se.height,Ce,se.data):b.texSubImage2D(b.TEXTURE_2D,q,Nt,Zt,Mt,wt,Ce,Jt,se);b.pixelStorei(b.UNPACK_ROW_LENGTH,hn),b.pixelStorei(b.UNPACK_IMAGE_HEIGHT,Kt),b.pixelStorei(b.UNPACK_SKIP_PIXELS,Ge),b.pixelStorei(b.UNPACK_SKIP_ROWS,mi),b.pixelStorei(b.UNPACK_SKIP_IMAGES,Le),q===0&&X.generateMipmaps&&b.generateMipmap(Dt),I.unbindTexture()},this.copyTextureToTexture3D=function(A,X,nt=null,st=null,q=0){return A.isTexture!==!0&&(ds("WebGLRenderer: copyTextureToTexture3D function signature has changed."),nt=arguments[0]||null,st=arguments[1]||null,A=arguments[2],X=arguments[3],q=arguments[4]||0),ds('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,X,nt,st,q)},this.initRenderTarget=function(A){it.get(A).__webglFramebuffer===void 0&&E.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?E.setTextureCube(A,0):A.isData3DTexture?E.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?E.setTexture2DArray(A,0):E.setTexture2D(A,0),I.unbindTexture()},this.resetState=function(){C=0,N=0,U=null,I.reset(),ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;let e=this.getContext();e.drawingBufferColorspace=$t._getDrawingBufferColorSpace(t),e.unpackColorSpace=$t._getUnpackColorSpace()}};var Ms=class extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new nn,this.environmentIntensity=1,this.environmentRotation=new nn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){let e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}};var Hr=class extends Ue{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){let t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}};var bs=class extends Gn{static get type(){return"LineBasicMaterial"}constructor(t){super(),this.isLineBasicMaterial=!0,this.color=new kt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}},Vr=new k,Gr=new k,Gh=new ie,us=new Pr,dr=new Yi,ao=new k,Wh=new k,mc=class extends ve{constructor(t=new we,e=new bs){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[0];for(let s=1,r=e.count;s<r;s++)Vr.fromBufferAttribute(e,s-1),Gr.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=Vr.distanceTo(Gr);t.setAttribute("lineDistance",new te(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){let n=this.geometry,s=this.matrixWorld,r=t.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),dr.copy(n.boundingSphere),dr.applyMatrix4(s),dr.radius+=r,t.ray.intersectsSphere(dr)===!1)return;Gh.copy(s).invert(),us.copy(t.ray).applyMatrix4(Gh);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,u=n.index,f=n.attributes.position;if(u!==null){let m=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=l){let h=u.getX(_),T=u.getX(_+1),y=fr(this,t,us,c,h,T);y&&e.push(y)}if(this.isLineLoop){let _=u.getX(g-1),p=u.getX(m),h=fr(this,t,us,c,_,p);h&&e.push(h)}}else{let m=Math.max(0,a.start),g=Math.min(f.count,a.start+a.count);for(let _=m,p=g-1;_<p;_+=l){let h=fr(this,t,us,c,_,_+1);h&&e.push(h)}if(this.isLineLoop){let _=fr(this,t,us,c,g-1,m);_&&e.push(_)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){let s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function fr(i,t,e,n,s,r){let a=i.geometry.attributes.position;if(Vr.fromBufferAttribute(a,s),Gr.fromBufferAttribute(a,r),e.distanceSqToSegment(Vr,Gr,ao,Wh)>n)return;ao.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(ao);if(!(c<t.near||c>t.far))return{distance:c,point:Wh.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var Xh=new k,qh=new k,Ss=class extends mc{constructor(t,e){super(t,e),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let t=this.geometry;if(t.index===null){let e=t.attributes.position,n=[];for(let s=0,r=e.count;s<r;s+=2)Xh.fromBufferAttribute(e,s),qh.fromBufferAttribute(e,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+Xh.distanceTo(qh);t.setAttribute("lineDistance",new te(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var Wr=class extends Oe{constructor(t,e,n,s,r,a,o,c,l){super(t,e,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}},ke=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){let n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){let e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){let t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let e=[],n,s=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(s),e.push(r),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){let n=this.getLengths(),s=0,r=n.length,a;e?a=e:a=t*n[r-1];let o=0,c=r-1,l;for(;o<=c;)if(s=Math.floor(o+(c-o)/2),l=n[s]-a,l<0)o=s+1;else if(l>0)c=s-1;else{c=s;break}if(s=c,n[s]===a)return s/(r-1);let u=n[s],f=n[s+1]-u,m=(a-u)/f;return(s+m)/(r-1)}getTangent(t,e){let s=t-1e-4,r=t+1e-4;s<0&&(s=0),r>1&&(r=1);let a=this.getPoint(s),o=this.getPoint(r),c=e||(a.isVector2?new ft:new k);return c.copy(o).sub(a).normalize(),c}getTangentAt(t,e){let n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){let n=new k,s=[],r=[],a=[],o=new k,c=new ie;for(let m=0;m<=t;m++){let g=m/t;s[m]=this.getTangentAt(g,new k)}r[0]=new k,a[0]=new k;let l=Number.MAX_VALUE,u=Math.abs(s[0].x),d=Math.abs(s[0].y),f=Math.abs(s[0].z);u<=l&&(l=u,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),f<=l&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),r[0].crossVectors(s[0],o),a[0].crossVectors(s[0],r[0]);for(let m=1;m<=t;m++){if(r[m]=r[m-1].clone(),a[m]=a[m-1].clone(),o.crossVectors(s[m-1],s[m]),o.length()>Number.EPSILON){o.normalize();let g=Math.acos(de(s[m-1].dot(s[m]),-1,1));r[m].applyMatrix4(c.makeRotationAxis(o,g))}a[m].crossVectors(s[m],r[m])}if(e===!0){let m=Math.acos(de(r[0].dot(r[t]),-1,1));m/=t,s[0].dot(o.crossVectors(r[0],r[t]))>0&&(m=-m);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(s[g],m*g)),a[g].crossVectors(s[g],r[g])}return{tangents:s,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){let t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}},Es=class extends ke{constructor(t=0,e=0,n=1,s=1,r=0,a=Math.PI*2,o=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=s,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=c}getPoint(t,e=new ft){let n=e,s=Math.PI*2,r=this.aEndAngle-this.aStartAngle,a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=s;for(;r>s;)r-=s;r<Number.EPSILON&&(a?r=0:r=s),this.aClockwise===!0&&!a&&(r===s?r=-s:r=r-s);let o=this.aStartAngle+t*r,c=this.aX+this.xRadius*Math.cos(o),l=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let u=Math.cos(this.aRotation),d=Math.sin(this.aRotation),f=c-this.aX,m=l-this.aY;c=f*u-m*d+this.aX,l=f*d+m*u+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){let t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}},gc=class extends Es{constructor(t,e,n,s,r,a){super(t,e,n,n,s,r,a),this.isArcCurve=!0,this.type="ArcCurve"}};function $c(){let i=0,t=0,e=0,n=0;function s(r,a,o,c){i=r,t=o,e=-3*r+3*a-2*o-c,n=2*r-2*a+o+c}return{initCatmullRom:function(r,a,o,c,l){s(a,o,l*(o-r),l*(c-a))},initNonuniformCatmullRom:function(r,a,o,c,l,u,d){let f=(a-r)/l-(o-r)/(l+u)+(o-a)/u,m=(o-a)/u-(c-a)/(u+d)+(c-o)/d;f*=u,m*=u,s(a,o,f,m)},calc:function(r){let a=r*r,o=a*r;return i+t*r+e*a+n*o}}}var pr=new k,oo=new $c,co=new $c,lo=new $c,_c=class extends ke{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new k){let n=e,s=this.points,r=s.length,a=(r-(this.closed?0:1))*t,o=Math.floor(a),c=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:c===0&&o===r-1&&(o=r-2,c=1);let l,u;this.closed||o>0?l=s[(o-1)%r]:(pr.subVectors(s[0],s[1]).add(s[0]),l=pr);let d=s[o%r],f=s[(o+1)%r];if(this.closed||o+2<r?u=s[(o+2)%r]:(pr.subVectors(s[r-1],s[r-2]).add(s[r-1]),u=pr),this.curveType==="centripetal"||this.curveType==="chordal"){let m=this.curveType==="chordal"?.5:.25,g=Math.pow(l.distanceToSquared(d),m),_=Math.pow(d.distanceToSquared(f),m),p=Math.pow(f.distanceToSquared(u),m);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),oo.initNonuniformCatmullRom(l.x,d.x,f.x,u.x,g,_,p),co.initNonuniformCatmullRom(l.y,d.y,f.y,u.y,g,_,p),lo.initNonuniformCatmullRom(l.z,d.z,f.z,u.z,g,_,p)}else this.curveType==="catmullrom"&&(oo.initCatmullRom(l.x,d.x,f.x,u.x,this.tension),co.initCatmullRom(l.y,d.y,f.y,u.y,this.tension),lo.initCatmullRom(l.z,d.z,f.z,u.z,this.tension));return n.set(oo.calc(c),co.calc(c),lo.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new k().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}};function Yh(i,t,e,n,s){let r=(n-t)*.5,a=(s-e)*.5,o=i*i,c=i*o;return(2*e-2*n+r+a)*c+(-3*e+3*n-2*r-a)*o+r*i+e}function X_(i,t){let e=1-i;return e*e*t}function q_(i,t){return 2*(1-i)*i*t}function Y_(i,t){return i*i*t}function gs(i,t,e,n){return X_(i,t)+q_(i,e)+Y_(i,n)}function $_(i,t){let e=1-i;return e*e*e*t}function Z_(i,t){let e=1-i;return 3*e*e*i*t}function J_(i,t){return 3*(1-i)*i*i*t}function K_(i,t){return i*i*i*t}function _s(i,t,e,n,s){return $_(i,t)+Z_(i,e)+J_(i,n)+K_(i,s)}var Xr=class extends ke{constructor(t=new ft,e=new ft,n=new ft,s=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new ft){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(_s(t,s.x,r.x,a.x,o.x),_s(t,s.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},xc=class extends ke{constructor(t=new k,e=new k,n=new k,s=new k){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=s}getPoint(t,e=new k){let n=e,s=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(_s(t,s.x,r.x,a.x,o.x),_s(t,s.y,r.y,a.y,o.y),_s(t,s.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}},qr=class extends ke{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},yc=class extends ke{constructor(t=new k,e=new k){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new k){let n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new k){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},Yr=class extends ke{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(gs(t,s.x,r.x,a.x),gs(t,s.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},vc=class extends ke{constructor(t=new k,e=new k,n=new k){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new k){let n=e,s=this.v0,r=this.v1,a=this.v2;return n.set(gs(t,s.x,r.x,a.x),gs(t,s.y,r.y,a.y),gs(t,s.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){let t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}},$r=class extends ke{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){let n=e,s=this.points,r=(s.length-1)*t,a=Math.floor(r),o=r-a,c=s[a===0?a:a-1],l=s[a],u=s[a>s.length-2?s.length-1:a+1],d=s[a>s.length-3?s.length-1:a+2];return n.set(Yh(o,c.x,l.x,u.x,d.x),Yh(o,c.y,l.y,u.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){let s=this.points[e];t.points.push(s.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){let s=t.points[e];this.points.push(new ft().fromArray(s))}return this}},Mc=Object.freeze({__proto__:null,ArcCurve:gc,CatmullRomCurve3:_c,CubicBezierCurve:Xr,CubicBezierCurve3:xc,EllipseCurve:Es,LineCurve:qr,LineCurve3:yc,QuadraticBezierCurve:Yr,QuadraticBezierCurve3:vc,SplineCurve:$r}),bc=class extends ke{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){let t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){let n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Mc[n](e,t))}return this}getPoint(t,e){let n=t*this.getLength(),s=this.getCurveLengths(),r=0;for(;r<s.length;){if(s[r]>=n){let a=s[r]-n,o=this.curves[r],c=o.getLength(),l=c===0?0:1-a/c;return o.getPointAt(l,e)}r++}return null}getLength(){let t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let t=[],e=0;for(let n=0,s=this.curves.length;n<s;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){let e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){let e=[],n;for(let s=0,r=this.curves;s<r.length;s++){let a=r[s],o=a.isEllipseCurve?t*2:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?t*a.points.length:t,c=a.getPoints(o);for(let l=0;l<c.length;l++){let u=c[l];n&&n.equals(u)||(e.push(u),n=u)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(s.clone())}return this.autoClose=t.autoClose,this}toJSON(){let t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){let s=this.curves[e];t.curves.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){let s=t.curves[e];this.curves.push(new Mc[s.type]().fromJSON(s))}return this}},sn=class extends bc{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){let n=new qr(this.currentPoint.clone(),new ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,s){let r=new Yr(this.currentPoint.clone(),new ft(t,e),new ft(n,s));return this.curves.push(r),this.currentPoint.set(n,s),this}bezierCurveTo(t,e,n,s,r,a){let o=new Xr(this.currentPoint.clone(),new ft(t,e),new ft(n,s),new ft(r,a));return this.curves.push(o),this.currentPoint.set(r,a),this}splineThru(t){let e=[this.currentPoint.clone()].concat(t),n=new $r(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,s,r,a){let o=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+o,e+c,n,s,r,a),this}absarc(t,e,n,s,r,a){return this.absellipse(t,e,n,n,s,r,a),this}ellipse(t,e,n,s,r,a,o,c){let l=this.currentPoint.x,u=this.currentPoint.y;return this.absellipse(t+l,e+u,n,s,r,a,o,c),this}absellipse(t,e,n,s,r,a,o,c){let l=new Es(t,e,n,s,r,a,o,c);if(this.curves.length>0){let d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);let u=l.getPoint(1);return this.currentPoint.copy(u),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){let t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}},Sc=class i extends we{constructor(t=[new ft(0,-.5),new ft(.5,0),new ft(0,.5)],e=12,n=0,s=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:s},e=Math.floor(e),s=de(s,0,Math.PI*2);let r=[],a=[],o=[],c=[],l=[],u=1/e,d=new k,f=new ft,m=new k,g=new k,_=new k,p=0,h=0;for(let T=0;T<=t.length-1;T++)switch(T){case 0:p=t[T+1].x-t[T].x,h=t[T+1].y-t[T].y,m.x=h*1,m.y=-p,m.z=h*0,_.copy(m),m.normalize(),c.push(m.x,m.y,m.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:p=t[T+1].x-t[T].x,h=t[T+1].y-t[T].y,m.x=h*1,m.y=-p,m.z=h*0,g.copy(m),m.x+=_.x,m.y+=_.y,m.z+=_.z,m.normalize(),c.push(m.x,m.y,m.z),_.copy(g)}for(let T=0;T<=e;T++){let y=n+T*u*s,x=Math.sin(y),B=Math.cos(y);for(let C=0;C<=t.length-1;C++){d.x=t[C].x*x,d.y=t[C].y,d.z=t[C].x*B,a.push(d.x,d.y,d.z),f.x=T/e,f.y=C/(t.length-1),o.push(f.x,f.y);let N=c[3*C+0]*x,U=c[3*C+1],w=c[3*C+0]*B;l.push(N,U,w)}}for(let T=0;T<e;T++)for(let y=0;y<t.length-1;y++){let x=y+T*t.length,B=x,C=x+t.length,N=x+t.length+1,U=x+1;r.push(B,C,U),r.push(N,U,C)}this.setIndex(r),this.setAttribute("position",new te(a,3)),this.setAttribute("uv",new te(o,2)),this.setAttribute("normal",new te(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.points,t.segments,t.phiStart,t.phiLength)}},ws=class i extends Sc{constructor(t=1,e=1,n=4,s=8){let r=new sn;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),s),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:s}}static fromJSON(t){return new i(t.radius,t.length,t.capSegments,t.radialSegments)}};var rn=class i extends we{constructor(t=1,e=1,n=1,s=32,r=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:c};let l=this;s=Math.floor(s),r=Math.floor(r);let u=[],d=[],f=[],m=[],g=0,_=[],p=n/2,h=0;T(),a===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(u),this.setAttribute("position",new te(d,3)),this.setAttribute("normal",new te(f,3)),this.setAttribute("uv",new te(m,2));function T(){let x=new k,B=new k,C=0,N=(e-t)/n;for(let U=0;U<=r;U++){let w=[],M=U/r,z=M*(e-t)+t;for(let G=0;G<=s;G++){let $=G/s,K=$*c+o,ct=Math.sin(K),F=Math.cos(K);B.x=z*ct,B.y=-M*n+p,B.z=z*F,d.push(B.x,B.y,B.z),x.set(ct,N,F).normalize(),f.push(x.x,x.y,x.z),m.push($,1-M),w.push(g++)}_.push(w)}for(let U=0;U<s;U++)for(let w=0;w<r;w++){let M=_[w][U],z=_[w+1][U],G=_[w+1][U+1],$=_[w][U+1];(t>0||w!==0)&&(u.push(M,z,$),C+=3),(e>0||w!==r-1)&&(u.push(z,G,$),C+=3)}l.addGroup(h,C,0),h+=C}function y(x){let B=g,C=new ft,N=new k,U=0,w=x===!0?t:e,M=x===!0?1:-1;for(let G=1;G<=s;G++)d.push(0,p*M,0),f.push(0,M,0),m.push(.5,.5),g++;let z=g;for(let G=0;G<=s;G++){let K=G/s*c+o,ct=Math.cos(K),F=Math.sin(K);N.x=w*F,N.y=p*M,N.z=w*ct,d.push(N.x,N.y,N.z),f.push(0,M,0),C.x=ct*.5+.5,C.y=F*.5*M+.5,m.push(C.x,C.y),g++}for(let G=0;G<s;G++){let $=B+G,K=z+G;x===!0?u.push(K,K+1,$):u.push(K+1,K,$),U+=3}l.addGroup(h,U,x===!0?1:2),h+=U}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Zr=class i extends rn{constructor(t=1,e=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new i(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}};var mr=new k,gr=new k,ho=new k,_r=new On,Ts=class extends we{constructor(t=null,e=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:t,thresholdAngle:e},t!==null){let s=Math.pow(10,4),r=Math.cos(zi*e),a=t.getIndex(),o=t.getAttribute("position"),c=a?a.count:o.count,l=[0,0,0],u=["a","b","c"],d=new Array(3),f={},m=[];for(let g=0;g<c;g+=3){a?(l[0]=a.getX(g),l[1]=a.getX(g+1),l[2]=a.getX(g+2)):(l[0]=g,l[1]=g+1,l[2]=g+2);let{a:_,b:p,c:h}=_r;if(_.fromBufferAttribute(o,l[0]),p.fromBufferAttribute(o,l[1]),h.fromBufferAttribute(o,l[2]),_r.getNormal(ho),d[0]=`${Math.round(_.x*s)},${Math.round(_.y*s)},${Math.round(_.z*s)}`,d[1]=`${Math.round(p.x*s)},${Math.round(p.y*s)},${Math.round(p.z*s)}`,d[2]=`${Math.round(h.x*s)},${Math.round(h.y*s)},${Math.round(h.z*s)}`,!(d[0]===d[1]||d[1]===d[2]||d[2]===d[0]))for(let T=0;T<3;T++){let y=(T+1)%3,x=d[T],B=d[y],C=_r[u[T]],N=_r[u[y]],U=`${x}_${B}`,w=`${B}_${x}`;w in f&&f[w]?(ho.dot(f[w].normal)<=r&&(m.push(C.x,C.y,C.z),m.push(N.x,N.y,N.z)),f[w]=null):U in f||(f[U]={index0:l[T],index1:l[y],normal:ho.clone()})}}for(let g in f)if(f[g]){let{index0:_,index1:p}=f[g];mr.fromBufferAttribute(o,_),gr.fromBufferAttribute(o,p),m.push(mr.x,mr.y,mr.z),m.push(gr.x,gr.y,gr.z)}this.setAttribute("position",new te(m,3))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}},zn=class extends sn{constructor(t){super(t),this.uuid=fi(),this.type="Shape",this.holes=[]}getPointsHoles(t){let e=[];for(let n=0,s=this.holes.length;n<s;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(s.clone())}return this}toJSON(){let t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){let s=this.holes[e];t.holes.push(s.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){let s=t.holes[e];this.holes.push(new sn().fromJSON(s))}return this}},Q_={triangulate:function(i,t,e=2){let n=t&&t.length,s=n?t[0]*e:i.length,r=wu(i,0,s,e,!0),a=[];if(!r||r.next===r.prev)return a;let o,c,l,u,d,f,m;if(n&&(r=ix(i,t,r,e)),i.length>80*e){o=l=i[0],c=u=i[1];for(let g=e;g<s;g+=e)d=i[g],f=i[g+1],d<o&&(o=d),f<c&&(c=f),d>l&&(l=d),f>u&&(u=f);m=Math.max(l-o,u-c),m=m!==0?32767/m:0}return As(r,a,e,o,c,m,0),a}};function wu(i,t,e,n,s){let r,a;if(s===px(i,t,e,n)>0)for(r=t;r<e;r+=n)a=$h(r,i[r],i[r+1],a);else for(r=e-n;r>=t;r-=n)a=$h(r,i[r],i[r+1],a);return a&&ca(a,a.next)&&(Cs(a),a=a.next),a}function li(i,t){if(!i)return i;t||(t=i);let e=i,n;do if(n=!1,!e.steiner&&(ca(e,e.next)||oe(e.prev,e,e.next)===0)){if(Cs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function As(i,t,e,n,s,r,a){if(!i)return;!a&&r&&cx(i,n,s,r);let o=i,c,l;for(;i.prev!==i.next;){if(c=i.prev,l=i.next,r?tx(i,n,s,r):j_(i)){t.push(c.i/e|0),t.push(i.i/e|0),t.push(l.i/e|0),Cs(i),i=l.next,o=l.next;continue}if(i=l,i===o){a?a===1?(i=ex(li(i),t,e),As(i,t,e,n,s,r,2)):a===2&&nx(i,t,e,n,s,r):As(li(i),t,e,n,s,r,1);break}}}function j_(i){let t=i.prev,e=i,n=i.next;if(oe(t,e,n)>=0)return!1;let s=t.x,r=e.x,a=n.x,o=t.y,c=e.y,l=n.y,u=s<r?s<a?s:a:r<a?r:a,d=o<c?o<l?o:l:c<l?c:l,f=s>r?s>a?s:a:r>a?r:a,m=o>c?o>l?o:l:c>l?c:l,g=n.next;for(;g!==t;){if(g.x>=u&&g.x<=f&&g.y>=d&&g.y<=m&&Oi(s,o,r,c,a,l,g.x,g.y)&&oe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function tx(i,t,e,n){let s=i.prev,r=i,a=i.next;if(oe(s,r,a)>=0)return!1;let o=s.x,c=r.x,l=a.x,u=s.y,d=r.y,f=a.y,m=o<c?o<l?o:l:c<l?c:l,g=u<d?u<f?u:f:d<f?d:f,_=o>c?o>l?o:l:c>l?c:l,p=u>d?u>f?u:f:d>f?d:f,h=Ec(m,g,t,e,n),T=Ec(_,p,t,e,n),y=i.prevZ,x=i.nextZ;for(;y&&y.z>=h&&x&&x.z<=T;){if(y.x>=m&&y.x<=_&&y.y>=g&&y.y<=p&&y!==s&&y!==a&&Oi(o,u,c,d,l,f,y.x,y.y)&&oe(y.prev,y,y.next)>=0||(y=y.prevZ,x.x>=m&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&Oi(o,u,c,d,l,f,x.x,x.y)&&oe(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;y&&y.z>=h;){if(y.x>=m&&y.x<=_&&y.y>=g&&y.y<=p&&y!==s&&y!==a&&Oi(o,u,c,d,l,f,y.x,y.y)&&oe(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;x&&x.z<=T;){if(x.x>=m&&x.x<=_&&x.y>=g&&x.y<=p&&x!==s&&x!==a&&Oi(o,u,c,d,l,f,x.x,x.y)&&oe(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function ex(i,t,e){let n=i;do{let s=n.prev,r=n.next.next;!ca(s,r)&&Tu(s,n,n.next,r)&&Rs(s,r)&&Rs(r,s)&&(t.push(s.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Cs(n),Cs(n.next),n=i=r),n=n.next}while(n!==i);return li(n)}function nx(i,t,e,n,s,r){let a=i;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&ux(a,o)){let c=Au(a,o);a=li(a,a.next),c=li(c,c.next),As(a,t,e,n,s,r,0),As(c,t,e,n,s,r,0);return}o=o.next}a=a.next}while(a!==i)}function ix(i,t,e,n){let s=[],r,a,o,c,l;for(r=0,a=t.length;r<a;r++)o=t[r]*n,c=r<a-1?t[r+1]*n:i.length,l=wu(i,o,c,n,!1),l===l.next&&(l.steiner=!0),s.push(hx(l));for(s.sort(sx),r=0;r<s.length;r++)e=rx(s[r],e);return e}function sx(i,t){return i.x-t.x}function rx(i,t){let e=ax(i,t);if(!e)return t;let n=Au(e,i);return li(n,n.next),li(e,e.next)}function ax(i,t){let e=t,n=-1/0,s,r=i.x,a=i.y;do{if(a<=e.y&&a>=e.next.y&&e.next.y!==e.y){let f=e.x+(a-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(f<=r&&f>n&&(n=f,s=e.x<e.next.x?e:e.next,f===r))return s}e=e.next}while(e!==t);if(!s)return null;let o=s,c=s.x,l=s.y,u=1/0,d;e=s;do r>=e.x&&e.x>=c&&r!==e.x&&Oi(a<l?r:n,a,c,l,a<l?n:r,a,e.x,e.y)&&(d=Math.abs(a-e.y)/(r-e.x),Rs(e,i)&&(d<u||d===u&&(e.x>s.x||e.x===s.x&&ox(s,e)))&&(s=e,u=d)),e=e.next;while(e!==o);return s}function ox(i,t){return oe(i.prev,i,t.prev)<0&&oe(t.next,i,i.next)<0}function cx(i,t,e,n){let s=i;do s.z===0&&(s.z=Ec(s.x,s.y,t,e,n)),s.prevZ=s.prev,s.nextZ=s.next,s=s.next;while(s!==i);s.prevZ.nextZ=null,s.prevZ=null,lx(s)}function lx(i){let t,e,n,s,r,a,o,c,l=1;do{for(e=i,i=null,r=null,a=0;e;){for(a++,n=e,o=0,t=0;t<l&&(o++,n=n.nextZ,!!n);t++);for(c=l;o>0||c>0&&n;)o!==0&&(c===0||!n||e.z<=n.z)?(s=e,e=e.nextZ,o--):(s=n,n=n.nextZ,c--),r?r.nextZ=s:i=s,s.prevZ=r,r=s;e=n}r.nextZ=null,l*=2}while(a>1);return i}function Ec(i,t,e,n,s){return i=(i-e)*s|0,t=(t-n)*s|0,i=(i|i<<8)&16711935,i=(i|i<<4)&252645135,i=(i|i<<2)&858993459,i=(i|i<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,i|t<<1}function hx(i){let t=i,e=i;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==i);return e}function Oi(i,t,e,n,s,r,a,o){return(s-a)*(t-o)>=(i-a)*(r-o)&&(i-a)*(n-o)>=(e-a)*(t-o)&&(e-a)*(r-o)>=(s-a)*(n-o)}function ux(i,t){return i.next.i!==t.i&&i.prev.i!==t.i&&!dx(i,t)&&(Rs(i,t)&&Rs(t,i)&&fx(i,t)&&(oe(i.prev,i,t.prev)||oe(i,t.prev,t))||ca(i,t)&&oe(i.prev,i,i.next)>0&&oe(t.prev,t,t.next)>0)}function oe(i,t,e){return(t.y-i.y)*(e.x-t.x)-(t.x-i.x)*(e.y-t.y)}function ca(i,t){return i.x===t.x&&i.y===t.y}function Tu(i,t,e,n){let s=yr(oe(i,t,e)),r=yr(oe(i,t,n)),a=yr(oe(e,n,i)),o=yr(oe(e,n,t));return!!(s!==r&&a!==o||s===0&&xr(i,e,t)||r===0&&xr(i,n,t)||a===0&&xr(e,i,n)||o===0&&xr(e,t,n))}function xr(i,t,e){return t.x<=Math.max(i.x,e.x)&&t.x>=Math.min(i.x,e.x)&&t.y<=Math.max(i.y,e.y)&&t.y>=Math.min(i.y,e.y)}function yr(i){return i>0?1:i<0?-1:0}function dx(i,t){let e=i;do{if(e.i!==i.i&&e.next.i!==i.i&&e.i!==t.i&&e.next.i!==t.i&&Tu(e,e.next,i,t))return!0;e=e.next}while(e!==i);return!1}function Rs(i,t){return oe(i.prev,i,i.next)<0?oe(i,t,i.next)>=0&&oe(i,i.prev,t)>=0:oe(i,t,i.prev)<0||oe(i,i.next,t)<0}function fx(i,t){let e=i,n=!1,s=(i.x+t.x)/2,r=(i.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&s<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==i);return n}function Au(i,t){let e=new wc(i.i,i.x,i.y),n=new wc(t.i,t.x,t.y),s=i.next,r=t.prev;return i.next=t,t.prev=i,e.next=s,s.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function $h(i,t,e,n){let s=new wc(i,t,e);return n?(s.next=n.next,s.prev=n,n.next.prev=s,n.next=s):(s.prev=s,s.next=s),s}function Cs(i){i.next.prev=i.prev,i.prev.next=i.next,i.prevZ&&(i.prevZ.nextZ=i.nextZ),i.nextZ&&(i.nextZ.prevZ=i.prevZ)}function wc(i,t,e){this.i=i,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function px(i,t,e,n){let s=0;for(let r=t,a=e-n;r<e;r+=n)s+=(i[a]-i[r])*(i[r+1]+i[a+1]),a=r;return s}var kn=class i{static area(t){let e=t.length,n=0;for(let s=e-1,r=0;r<e;s=r++)n+=t[s].x*t[r].y-t[r].x*t[s].y;return n*.5}static isClockWise(t){return i.area(t)<0}static triangulateShape(t,e){let n=[],s=[],r=[];Zh(t),Jh(n,t);let a=t.length;e.forEach(Zh);for(let c=0;c<e.length;c++)s.push(a),a+=e[c].length,Jh(n,e[c]);let o=Q_.triangulate(n,s);for(let c=0;c<o.length;c+=3)r.push(o.slice(c,c+3));return r}};function Zh(i){let t=i.length;t>2&&i[t-1].equals(i[0])&&i.pop()}function Jh(i,t){for(let e=0;e<t.length;e++)i.push(t[e].x),i.push(t[e].y)}var Jr=class i extends we{constructor(t=new zn([new ft(.5,.5),new ft(-.5,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];let n=this,s=[],r=[];for(let o=0,c=t.length;o<c;o++){let l=t[o];a(l)}this.setAttribute("position",new te(s,3)),this.setAttribute("uv",new te(r,2)),this.computeVertexNormals();function a(o){let c=[],l=e.curveSegments!==void 0?e.curveSegments:12,u=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1,f=e.bevelEnabled!==void 0?e.bevelEnabled:!0,m=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:m-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3,h=e.extrudePath,T=e.UVGenerator!==void 0?e.UVGenerator:mx,y,x=!1,B,C,N,U;h&&(y=h.getSpacedPoints(u),x=!0,f=!1,B=h.computeFrenetFrames(u,!1),C=new k,N=new k,U=new k),f||(p=0,m=0,g=0,_=0);let w=o.extractPoints(l),M=w.shape,z=w.holes;if(!kn.isClockWise(M)){M=M.reverse();for(let Z=0,j=z.length;Z<j;Z++){let b=z[Z];kn.isClockWise(b)&&(z[Z]=b.reverse())}}let $=kn.triangulateShape(M,z),K=M;for(let Z=0,j=z.length;Z<j;Z++){let b=z[Z];M=M.concat(b)}function ct(Z,j,b){return j||console.error("THREE.ExtrudeGeometry: vec does not exist"),Z.clone().addScaledVector(j,b)}let F=M.length,V=$.length;function O(Z,j,b){let et,tt,at,I=Z.x-j.x,L=Z.y-j.y,it=b.x-Z.x,E=b.y-Z.y,v=I*I+L*L,Y=I*E-L*it;if(Math.abs(Y)>Number.EPSILON){let rt=Math.sqrt(v),pt=Math.sqrt(it*it+E*E),H=j.x-L/rt,ut=j.y+I/rt,dt=b.x-E/pt,yt=b.y+it/pt,It=((dt-H)*E-(yt-ut)*it)/(I*E-L*it);et=H+I*It-Z.x,tt=ut+L*It-Z.y;let xt=et*et+tt*tt;if(xt<=2)return new ft(et,tt);at=Math.sqrt(xt/2)}else{let rt=!1;I>Number.EPSILON?it>Number.EPSILON&&(rt=!0):I<-Number.EPSILON?it<-Number.EPSILON&&(rt=!0):Math.sign(L)===Math.sign(E)&&(rt=!0),rt?(et=-L,tt=I,at=Math.sqrt(v)):(et=I,tt=L,at=Math.sqrt(v/2))}return new ft(et/at,tt/at)}let lt=[];for(let Z=0,j=K.length,b=j-1,et=Z+1;Z<j;Z++,b++,et++)b===j&&(b=0),et===j&&(et=0),lt[Z]=O(K[Z],K[b],K[et]);let mt=[],vt,Ct=lt.concat();for(let Z=0,j=z.length;Z<j;Z++){let b=z[Z];vt=[];for(let et=0,tt=b.length,at=tt-1,I=et+1;et<tt;et++,at++,I++)at===tt&&(at=0),I===tt&&(I=0),vt[et]=O(b[et],b[at],b[I]);mt.push(vt),Ct=Ct.concat(vt)}for(let Z=0;Z<p;Z++){let j=Z/p,b=m*Math.cos(j*Math.PI/2),et=g*Math.sin(j*Math.PI/2)+_;for(let tt=0,at=K.length;tt<at;tt++){let I=ct(K[tt],lt[tt],et);S(I.x,I.y,-b)}for(let tt=0,at=z.length;tt<at;tt++){let I=z[tt];vt=mt[tt];for(let L=0,it=I.length;L<it;L++){let E=ct(I[L],vt[L],et);S(E.x,E.y,-b)}}}let Xt=g+_;for(let Z=0;Z<F;Z++){let j=f?ct(M[Z],Ct[Z],Xt):M[Z];x?(N.copy(B.normals[0]).multiplyScalar(j.x),C.copy(B.binormals[0]).multiplyScalar(j.y),U.copy(y[0]).add(N).add(C),S(U.x,U.y,U.z)):S(j.x,j.y,0)}for(let Z=1;Z<=u;Z++)for(let j=0;j<F;j++){let b=f?ct(M[j],Ct[j],Xt):M[j];x?(N.copy(B.normals[Z]).multiplyScalar(b.x),C.copy(B.binormals[Z]).multiplyScalar(b.y),U.copy(y[Z]).add(N).add(C),S(U.x,U.y,U.z)):S(b.x,b.y,d/u*Z)}for(let Z=p-1;Z>=0;Z--){let j=Z/p,b=m*Math.cos(j*Math.PI/2),et=g*Math.sin(j*Math.PI/2)+_;for(let tt=0,at=K.length;tt<at;tt++){let I=ct(K[tt],lt[tt],et);S(I.x,I.y,d+b)}for(let tt=0,at=z.length;tt<at;tt++){let I=z[tt];vt=mt[tt];for(let L=0,it=I.length;L<it;L++){let E=ct(I[L],vt[L],et);x?S(E.x,E.y+y[u-1].y,y[u-1].x+b):S(E.x,E.y,d+b)}}}D(),P();function D(){let Z=s.length/3;if(f){let j=0,b=F*j;for(let et=0;et<V;et++){let tt=$[et];Q(tt[2]+b,tt[1]+b,tt[0]+b)}j=u+p*2,b=F*j;for(let et=0;et<V;et++){let tt=$[et];Q(tt[0]+b,tt[1]+b,tt[2]+b)}}else{for(let j=0;j<V;j++){let b=$[j];Q(b[2],b[1],b[0])}for(let j=0;j<V;j++){let b=$[j];Q(b[0]+F*u,b[1]+F*u,b[2]+F*u)}}n.addGroup(Z,s.length/3-Z,0)}function P(){let Z=s.length/3,j=0;R(K,j),j+=K.length;for(let b=0,et=z.length;b<et;b++){let tt=z[b];R(tt,j),j+=tt.length}n.addGroup(Z,s.length/3-Z,1)}function R(Z,j){let b=Z.length;for(;--b>=0;){let et=b,tt=b-1;tt<0&&(tt=Z.length-1);for(let at=0,I=u+p*2;at<I;at++){let L=F*at,it=F*(at+1),E=j+et+L,v=j+tt+L,Y=j+tt+it,rt=j+et+it;ht(E,v,Y,rt)}}}function S(Z,j,b){c.push(Z),c.push(j),c.push(b)}function Q(Z,j,b){J(Z),J(j),J(b);let et=s.length/3,tt=T.generateTopUV(n,s,et-3,et-2,et-1);gt(tt[0]),gt(tt[1]),gt(tt[2])}function ht(Z,j,b,et){J(Z),J(j),J(et),J(j),J(b),J(et);let tt=s.length/3,at=T.generateSideWallUV(n,s,tt-6,tt-3,tt-2,tt-1);gt(at[0]),gt(at[1]),gt(at[3]),gt(at[1]),gt(at[2]),gt(at[3])}function J(Z){s.push(c[Z*3+0]),s.push(c[Z*3+1]),s.push(c[Z*3+2])}function gt(Z){r.push(Z.x),r.push(Z.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){let t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return gx(e,n,t)}static fromJSON(t,e){let n=[];for(let r=0,a=t.shapes.length;r<a;r++){let o=e[t.shapes[r]];n.push(o)}let s=t.options.extrudePath;return s!==void 0&&(t.options.extrudePath=new Mc[s.type]().fromJSON(s)),new i(n,t.options)}},mx={generateTopUV:function(i,t,e,n,s){let r=t[e*3],a=t[e*3+1],o=t[n*3],c=t[n*3+1],l=t[s*3],u=t[s*3+1];return[new ft(r,a),new ft(o,c),new ft(l,u)]},generateSideWallUV:function(i,t,e,n,s,r){let a=t[e*3],o=t[e*3+1],c=t[e*3+2],l=t[n*3],u=t[n*3+1],d=t[n*3+2],f=t[s*3],m=t[s*3+1],g=t[s*3+2],_=t[r*3],p=t[r*3+1],h=t[r*3+2];return Math.abs(o-u)<Math.abs(a-l)?[new ft(a,1-c),new ft(l,1-d),new ft(f,1-g),new ft(_,1-h)]:[new ft(o,1-c),new ft(u,1-d),new ft(m,1-g),new ft(p,1-h)]}};function gx(i,t,e){if(e.shapes=[],Array.isArray(i))for(let n=0,s=i.length;n<s;n++){let r=i[n];e.shapes.push(r.uuid)}else e.shapes.push(i.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}var hi=class i extends we{constructor(t=1,e=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));let c=Math.min(a+o,Math.PI),l=0,u=[],d=new k,f=new k,m=[],g=[],_=[],p=[];for(let h=0;h<=n;h++){let T=[],y=h/n,x=0;h===0&&a===0?x=.5/e:h===n&&c===Math.PI&&(x=-.5/e);for(let B=0;B<=e;B++){let C=B/e;d.x=-t*Math.cos(s+C*r)*Math.sin(a+y*o),d.y=t*Math.cos(a+y*o),d.z=t*Math.sin(s+C*r)*Math.sin(a+y*o),g.push(d.x,d.y,d.z),f.copy(d).normalize(),_.push(f.x,f.y,f.z),p.push(C+x,1-y),T.push(l++)}u.push(T)}for(let h=0;h<n;h++)for(let T=0;T<e;T++){let y=u[h][T+1],x=u[h][T],B=u[h+1][T],C=u[h+1][T+1];(h!==0||a>0)&&m.push(y,x,C),(h!==n-1||c<Math.PI)&&m.push(x,B,C)}this.setIndex(m),this.setAttribute("position",new te(g,3)),this.setAttribute("normal",new te(_,3)),this.setAttribute("uv",new te(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new i(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}};var Is=class extends Gn{static get type(){return"MeshStandardMaterial"}constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new kt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new kt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=mu,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new nn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}},Kr=class extends Is{static get type(){return"MeshPhysicalMaterial"}constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ft(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return de(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new kt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new kt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new kt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}};function vr(i,t,e){return!i||!e&&i.constructor===t?i:typeof t.BYTES_PER_ELEMENT=="number"?new t(i):Array.prototype.slice.call(i)}function _x(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}var Ji=class{constructor(t,e,n,s){this.parameterPositions=t,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new e.constructor(n),this.sampleValues=e,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(t){let e=this.parameterPositions,n=this._cachedIndex,s=e[n],r=e[n-1];n:{t:{let a;e:{i:if(!(t<s)){for(let o=n+2;;){if(s===void 0){if(t<r)break i;return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=e[++n],t<s)break t}a=e.length;break e}if(!(t>=r)){let o=e[1];t<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=e[--n-1],t>=r)break t}a=n,n=0;break e}break n}for(;n<a;){let o=n+a>>>1;t<e[o]?a=o:n=o+1}if(s=e[n],r=e[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=e.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,t,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(t){let e=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=t*s;for(let a=0;a!==s;++a)e[a]=n[r+a];return e}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Tc=class extends Ji{constructor(t,e,n,s){super(t,e,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ql,endingEnd:ql}}intervalChanged_(t,e,n){let s=this.parameterPositions,r=t-2,a=t+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Yl:r=t,o=2*e-n;break;case $l:r=s.length-2,o=e+s[r]-s[r+1];break;default:r=t,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Yl:a=t,c=2*n-e;break;case $l:a=1,c=n+s[1]-s[0];break;default:a=t-1,c=e}let l=(n-e)*.5,u=this.valueSize;this._weightPrev=l/(e-o),this._weightNext=l/(c-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=this._offsetPrev,d=this._offsetNext,f=this._weightPrev,m=this._weightNext,g=(n-e)/(s-e),_=g*g,p=_*g,h=-f*p+2*f*_-f*g,T=(1+f)*p+(-1.5-2*f)*_+(-.5+f)*g+1,y=(-1-m)*p+(1.5+m)*_+.5*g,x=m*p-m*_;for(let B=0;B!==o;++B)r[B]=h*a[u+B]+T*a[l+B]+y*a[c+B]+x*a[d+B];return r}},Ac=class extends Ji{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=t*o,l=c-o,u=(n-e)/(s-e),d=1-u;for(let f=0;f!==o;++f)r[f]=a[l+f]*d+a[c+f]*u;return r}},Rc=class extends Ji{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t){return this.copySampleValue_(t-1)}},Je=class{constructor(t,e,n,s){if(t===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(e===void 0||e.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+t);this.name=t,this.times=vr(e,this.TimeBufferType),this.values=vr(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(t){let e=t.constructor,n;if(e.toJSON!==this.toJSON)n=e.toJSON(t);else{n={name:t.name,times:vr(t.times,Array),values:vr(t.values,Array)};let s=t.getInterpolation();s!==t.DefaultInterpolation&&(n.interpolation=s)}return n.type=t.ValueTypeName,n}InterpolantFactoryMethodDiscrete(t){return new Rc(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodLinear(t){return new Ac(this.times,this.values,this.getValueSize(),t)}InterpolantFactoryMethodSmooth(t){return new Tc(this.times,this.values,this.getValueSize(),t)}setInterpolation(t){let e;switch(t){case Tr:e=this.InterpolantFactoryMethodDiscrete;break;case Qo:e=this.InterpolantFactoryMethodLinear;break;case Na:e=this.InterpolantFactoryMethodSmooth;break}if(e===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(t!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=e,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Tr;case this.InterpolantFactoryMethodLinear:return Qo;case this.InterpolantFactoryMethodSmooth:return Na}}getValueSize(){return this.values.length/this.times.length}shift(t){if(t!==0){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]+=t}return this}scale(t){if(t!==1){let e=this.times;for(let n=0,s=e.length;n!==s;++n)e[n]*=t}return this}trim(t,e){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<t;)++r;for(;a!==-1&&n[a]>e;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let t=!0,e=this.getValueSize();e-Math.floor(e)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),t=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),t=!1);let a=null;for(let o=0;o!==r;o++){let c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),t=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),t=!1;break}a=c}if(s!==void 0&&_x(s))for(let o=0,c=s.length;o!==c;++o){let l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),t=!1;break}}return t}optimize(){let t=this.times.slice(),e=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Na,r=t.length-1,a=1;for(let o=1;o<r;++o){let c=!1,l=t[o],u=t[o+1];if(l!==u&&(o!==1||l!==t[0]))if(s)c=!0;else{let d=o*n,f=d-n,m=d+n;for(let g=0;g!==n;++g){let _=e[d+g];if(_!==e[f+g]||_!==e[m+g]){c=!0;break}}}if(c){if(o!==a){t[a]=t[o];let d=o*n,f=a*n;for(let m=0;m!==n;++m)e[f+m]=e[d+m]}++a}}if(r>0){t[a]=t[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)e[c+l]=e[o+l];++a}return a!==t.length?(this.times=t.slice(0,a),this.values=e.slice(0,a*n)):(this.times=t,this.values=e),this}clone(){let t=this.times.slice(),e=this.values.slice(),n=this.constructor,s=new n(this.name,t,e);return s.createInterpolant=this.createInterpolant,s}};Je.prototype.TimeBufferType=Float32Array;Je.prototype.ValueBufferType=Float32Array;Je.prototype.DefaultInterpolation=Qo;var ui=class extends Je{constructor(t,e,n){super(t,e,n)}};ui.prototype.ValueTypeName="bool";ui.prototype.ValueBufferType=Array;ui.prototype.DefaultInterpolation=Tr;ui.prototype.InterpolantFactoryMethodLinear=void 0;ui.prototype.InterpolantFactoryMethodSmooth=void 0;var Cc=class extends Je{};Cc.prototype.ValueTypeName="color";var Ic=class extends Je{};Ic.prototype.ValueTypeName="number";var Pc=class extends Ji{constructor(t,e,n,s){super(t,e,n,s)}interpolate_(t,e,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-e)/(s-e),l=t*o;for(let u=l+o;l!==u;l+=4)en.slerpFlat(r,0,a,l-o,a,l,c);return r}},Qr=class extends Je{InterpolantFactoryMethodLinear(t){return new Pc(this.times,this.values,this.getValueSize(),t)}};Qr.prototype.ValueTypeName="quaternion";Qr.prototype.InterpolantFactoryMethodSmooth=void 0;var di=class extends Je{constructor(t,e,n){super(t,e,n)}};di.prototype.ValueTypeName="string";di.prototype.ValueBufferType=Array;di.prototype.DefaultInterpolation=Tr;di.prototype.InterpolantFactoryMethodLinear=void 0;di.prototype.InterpolantFactoryMethodSmooth=void 0;var Lc=class extends Je{};Lc.prototype.ValueTypeName="vector";var Kh={enabled:!1,files:{},add:function(i,t){this.enabled!==!1&&(this.files[i]=t)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Nc=class{constructor(t,e,n){let s=this,r=!1,a=0,o=0,c,l=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return c?c(u):u},this.setURLModifier=function(u){return c=u,this},this.addHandler=function(u,d){return l.push(u,d),this},this.removeHandler=function(u){let d=l.indexOf(u);return d!==-1&&l.splice(d,2),this},this.getHandler=function(u){for(let d=0,f=l.length;d<f;d+=2){let m=l[d],g=l[d+1];if(m.global&&(m.lastIndex=0),m.test(u))return g}return null}}},xx=new Nc,Ki=class{constructor(t){this.manager=t!==void 0?t:xx,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){let n=this;return new Promise(function(s,r){n.load(t,s,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}};Ki.DEFAULT_MATERIAL_NAME="__DEFAULT";var gn={},Dc=class extends Error{constructor(t,e){super(t),this.response=e}},jr=class extends Ki{constructor(t){super(t)}load(t,e,n,s){t===void 0&&(t=""),this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);let r=Kh.get(t);if(r!==void 0)return this.manager.itemStart(t),setTimeout(()=>{e&&e(r),this.manager.itemEnd(t)},0),r;if(gn[t]!==void 0){gn[t].push({onLoad:e,onProgress:n,onError:s});return}gn[t]=[],gn[t].push({onLoad:e,onProgress:n,onError:s});let a=new Request(t,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;let u=gn[t],d=l.body.getReader(),f=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),m=f?parseInt(f):0,g=m!==0,_=0,p=new ReadableStream({start(h){T();function T(){d.read().then(({done:y,value:x})=>{if(y)h.close();else{_+=x.byteLength;let B=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:m});for(let C=0,N=u.length;C<N;C++){let U=u[C];U.onProgress&&U.onProgress(B)}h.enqueue(x),T()}},y=>{h.error(y)})}}});return new Response(p)}else throw new Dc(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return l.json();default:if(o===void 0)return l.text();{let d=/charset="?([^;"\s]*)"?/i.exec(o),f=d&&d[1]?d[1].toLowerCase():void 0,m=new TextDecoder(f);return l.arrayBuffer().then(g=>m.decode(g))}}}).then(l=>{Kh.add(t,l);let u=gn[t];delete gn[t];for(let d=0,f=u.length;d<f;d++){let m=u[d];m.onLoad&&m.onLoad(l)}}).catch(l=>{let u=gn[t];if(u===void 0)throw this.manager.itemError(t),l;delete gn[t];for(let d=0,f=u.length;d<f;d++){let m=u[d];m.onError&&m.onError(l)}this.manager.itemError(t)}).finally(()=>{this.manager.itemEnd(t)}),this.manager.itemStart(t)}setResponseType(t){return this.responseType=t,this}setMimeType(t){return this.mimeType=t,this}};var ta=class extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new kt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){let e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}},ea=class extends ta{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new kt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}},uo=new ie,Qh=new k,jh=new k,Uc=class{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.map=null,this.mapPass=null,this.matrix=new ie,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new vs,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new le(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){let e=this.camera,n=this.matrix;Qh.setFromMatrixPosition(t.matrixWorld),e.position.copy(Qh),jh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(jh),e.updateMatrixWorld(),uo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uo),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(uo)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}};var Oc=class extends Uc{constructor(){super(new Fr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Qi=class extends ta{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new Oc}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}};var na=class extends we{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(t){return super.copy(t),this.instanceCount=t.instanceCount,this}toJSON(){let t=super.toJSON();return t.instanceCount=this.instanceCount,t.isInstancedBufferGeometry=!0,t}};var ia=class{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=tu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let e=tu();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}};function tu(){return performance.now()}var Zc="\\[\\]\\.:\\/",yx=new RegExp("["+Zc+"]","g"),Jc="[^"+Zc+"]",vx="[^"+Zc.replace("\\.","")+"]",Mx=/((?:WC+[\/:])*)/.source.replace("WC",Jc),bx=/(WCOD+)?/.source.replace("WCOD",vx),Sx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Jc),Ex=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Jc),wx=new RegExp("^"+Mx+bx+Sx+Ex+"$"),Tx=["material","materials","bones","map"],Fc=class{constructor(t,e,n){let s=n||ae.parseTrackName(e);this._targetGroup=t,this._bindings=t.subscribe_(e,s)}getValue(t,e){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(t,e)}setValue(t,e){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(t,e)}bind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].bind()}unbind(){let t=this._bindings;for(let e=this._targetGroup.nCachedObjects_,n=t.length;e!==n;++e)t[e].unbind()}},ae=class i{constructor(t,e,n){this.path=e,this.parsedPath=n||i.parseTrackName(e),this.node=i.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,e,n){return t&&t.isAnimationObjectGroup?new i.Composite(t,e,n):new i(t,e,n)}static sanitizeNodeName(t){return t.replace(/\s/g,"_").replace(yx,"")}static parseTrackName(t){let e=wx.exec(t);if(e===null)throw new Error("PropertyBinding: Cannot parse trackName: "+t);let n={nodeName:e[2],objectName:e[3],objectIndex:e[4],propertyName:e[5],propertyIndex:e[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Tx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+t);return n}static findNode(t,e){if(e===void 0||e===""||e==="."||e===-1||e===t.name||e===t.uuid)return t;if(t.skeleton){let n=t.skeleton.getBoneByName(e);if(n!==void 0)return n}if(t.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===e||o.uuid===e)return o;let c=n(o.children);if(c)return c}return null},s=n(t.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(t,e){t[e]=this.targetObject[this.propertyName]}_getValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)t[e++]=n[s]}_getValue_arrayElement(t,e){t[e]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(t,e){this.resolvedProperty.toArray(t,e)}_setValue_direct(t,e){this.targetObject[this.propertyName]=t[e]}_setValue_direct_setNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(t,e){this.targetObject[this.propertyName]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++]}_setValue_array_setNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(t,e){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=t[e++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(t,e){this.resolvedProperty[this.propertyIndex]=t[e]}_setValue_arrayElement_setNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty[this.propertyIndex]=t[e],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(t,e){this.resolvedProperty.fromArray(t,e)}_setValue_fromArray_setNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(t,e){this.resolvedProperty.fromArray(t,e),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(t,e){this.bind(),this.getValue(t,e)}_setValue_unbound(t,e){this.bind(),this.setValue(t,e)}bind(){let t=this.node,e=this.parsedPath,n=e.objectName,s=e.propertyName,r=e.propertyIndex;if(t||(t=i.findNode(this.rootNode,e.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=e.objectIndex;switch(n){case"materials":if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}t=t.material.materials;break;case"bones":if(!t.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}t=t.skeleton.bones;for(let u=0;u<t.length;u++)if(t[u].name===l){l=u;break}break;case"map":if("map"in t){t=t.map;break}if(!t.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!t.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}t=t.material.map;break;default:if(t[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}t=t[n]}if(l!==void 0){if(t[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,t);return}t=t[l]}}let a=t[s];if(a===void 0){let l=e.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",t);return}let o=this.Versioning.None;this.targetObject=t,t.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:t.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!t.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!t.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}t.morphTargetDictionary[r]!==void 0&&(r=t.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ae.Composite=Fc;ae.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};ae.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};ae.prototype.GetterByBindingType=[ae.prototype._getValue_direct,ae.prototype._getValue_array,ae.prototype._getValue_arrayElement,ae.prototype._getValue_toArray];ae.prototype.SetterByBindingTypeAndVersioning=[[ae.prototype._setValue_direct,ae.prototype._setValue_direct_setNeedsUpdate,ae.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_array,ae.prototype._setValue_array_setNeedsUpdate,ae.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_arrayElement,ae.prototype._setValue_arrayElement_setNeedsUpdate,ae.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ae.prototype._setValue_fromArray,ae.prototype._setValue_fromArray_setNeedsUpdate,ae.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var hy=new Float32Array(1);var eu=new ft,sa=class{constructor(t=new ft(1/0,1/0),e=new ft(-1/0,-1/0)){this.isBox2=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){let n=eu.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(t){return this.isEmpty()?t.set(0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,eu).distanceTo(t)}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}};var an=class{constructor(){this.type="ShapePath",this.color=new kt,this.subPaths=[],this.currentPath=null}moveTo(t,e){return this.currentPath=new sn,this.subPaths.push(this.currentPath),this.currentPath.moveTo(t,e),this}lineTo(t,e){return this.currentPath.lineTo(t,e),this}quadraticCurveTo(t,e,n,s){return this.currentPath.quadraticCurveTo(t,e,n,s),this}bezierCurveTo(t,e,n,s,r,a){return this.currentPath.bezierCurveTo(t,e,n,s,r,a),this}splineThru(t){return this.currentPath.splineThru(t),this}toShapes(t){function e(h){let T=[];for(let y=0,x=h.length;y<x;y++){let B=h[y],C=new zn;C.curves=B.curves,T.push(C)}return T}function n(h,T){let y=T.length,x=!1;for(let B=y-1,C=0;C<y;B=C++){let N=T[B],U=T[C],w=U.x-N.x,M=U.y-N.y;if(Math.abs(M)>Number.EPSILON){if(M<0&&(N=T[C],w=-w,U=T[B],M=-M),h.y<N.y||h.y>U.y)continue;if(h.y===N.y){if(h.x===N.x)return!0}else{let z=M*(h.x-N.x)-w*(h.y-N.y);if(z===0)return!0;if(z<0)continue;x=!x}}else{if(h.y!==N.y)continue;if(U.x<=h.x&&h.x<=N.x||N.x<=h.x&&h.x<=U.x)return!0}}return x}let s=kn.isClockWise,r=this.subPaths;if(r.length===0)return[];let a,o,c,l=[];if(r.length===1)return o=r[0],c=new zn,c.curves=o.curves,l.push(c),l;let u=!s(r[0].getPoints());u=t?!u:u;let d=[],f=[],m=[],g=0,_;f[g]=void 0,m[g]=[];for(let h=0,T=r.length;h<T;h++)o=r[h],_=o.getPoints(),a=s(_),a=t?!a:a,a?(!u&&f[g]&&g++,f[g]={s:new zn,p:_},f[g].s.curves=o.curves,u&&g++,m[g]=[]):m[g].push({h:o,p:_[0]});if(!f[0])return e(r);if(f.length>1){let h=!1,T=0;for(let y=0,x=f.length;y<x;y++)d[y]=[];for(let y=0,x=f.length;y<x;y++){let B=m[y];for(let C=0;C<B.length;C++){let N=B[C],U=!0;for(let w=0;w<f.length;w++)n(N.p,f[w].p)&&(y!==w&&T++,U?(U=!1,d[w].push(N)):h=!0);U&&d[y].push(N)}}T>0&&h===!1&&(m=d)}let p;for(let h=0,T=f.length;h<T;h++){c=f[h].s,l.push(c),p=m[h];for(let y=0,x=p.length;y<x;y++)c.holes.push(p[y].h)}return l}};typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Bc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Bc);var Ru=new k,Ax=new en,Cu=new k,pi=class extends ve{constructor(t=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=t,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(e){e.element instanceof e.element.ownerDocument.defaultView.Element&&e.element.parentNode!==null&&e.element.remove()})})}copy(t,e){return super.copy(t,e),this.element=t.element.cloneNode(!0),this}};var on=new ie,Rx=new ie,ha=class{constructor(t={}){let e=this,n,s,r,a,o={camera:{style:""},objects:new WeakMap},c=t.element!==void 0?t.element:document.createElement("div");c.style.overflow="hidden",this.domElement=c;let l=document.createElement("div");l.style.transformOrigin="0 0",l.style.pointerEvents="none",c.appendChild(l);let u=document.createElement("div");u.style.transformStyle="preserve-3d",l.appendChild(u),this.getSize=function(){return{width:n,height:s}},this.render=function(p,h){let T=h.projectionMatrix.elements[5]*a;h.view&&h.view.enabled?(l.style.transform=`translate( ${-h.view.offsetX*(n/h.view.width)}px, ${-h.view.offsetY*(s/h.view.height)}px )`,l.style.transform+=`scale( ${h.view.fullWidth/h.view.width}, ${h.view.fullHeight/h.view.height} )`):l.style.transform="",p.matrixWorldAutoUpdate===!0&&p.updateMatrixWorld(),h.parent===null&&h.matrixWorldAutoUpdate===!0&&h.updateMatrixWorld();let y,x;h.isOrthographicCamera&&(y=-(h.right+h.left)/2,x=(h.top+h.bottom)/2);let B=h.view&&h.view.enabled?h.view.height/h.view.fullHeight:1,C=h.isOrthographicCamera?`scale( ${B} )scale(`+T+")translate("+d(y)+"px,"+d(x)+"px)"+f(h.matrixWorldInverse):`scale( ${B} )translateZ(`+T+"px)"+f(h.matrixWorldInverse),U=(h.isPerspectiveCamera?"perspective("+T+"px) ":"")+C+"translate("+r+"px,"+a+"px)";o.camera.style!==U&&(u.style.transform=U,o.camera.style=U),_(p,p,h,C)},this.setSize=function(p,h){n=p,s=h,r=n/2,a=s/2,c.style.width=p+"px",c.style.height=h+"px",l.style.width=p+"px",l.style.height=h+"px",u.style.width=p+"px",u.style.height=h+"px"};function d(p){return Math.abs(p)<1e-10?0:p}function f(p){let h=p.elements;return"matrix3d("+d(h[0])+","+d(-h[1])+","+d(h[2])+","+d(h[3])+","+d(h[4])+","+d(-h[5])+","+d(h[6])+","+d(h[7])+","+d(h[8])+","+d(-h[9])+","+d(h[10])+","+d(h[11])+","+d(h[12])+","+d(-h[13])+","+d(h[14])+","+d(h[15])+")"}function m(p){let h=p.elements;return"translate(-50%,-50%)"+("matrix3d("+d(h[0])+","+d(h[1])+","+d(h[2])+","+d(h[3])+","+d(-h[4])+","+d(-h[5])+","+d(-h[6])+","+d(-h[7])+","+d(h[8])+","+d(h[9])+","+d(h[10])+","+d(h[11])+","+d(h[12])+","+d(h[13])+","+d(h[14])+","+d(h[15])+")")}function g(p){p.isCSS3DObject&&(p.element.style.display="none");for(let h=0,T=p.children.length;h<T;h++)g(p.children[h])}function _(p,h,T,y){if(p.visible===!1){g(p);return}if(p.isCSS3DObject){let x=p.layers.test(T.layers)===!0,B=p.element;if(B.style.display=x===!0?"":"none",x===!0){p.onBeforeRender(e,h,T);let C;p.isCSS3DSprite?(on.copy(T.matrixWorldInverse),on.transpose(),p.rotation2D!==0&&on.multiply(Rx.makeRotationZ(p.rotation2D)),p.matrixWorld.decompose(Ru,Ax,Cu),on.setPosition(Ru),on.scale(Cu),on.elements[3]=0,on.elements[7]=0,on.elements[11]=0,on.elements[15]=1,C=m(on)):C=m(p.matrixWorld);let N=o.objects.get(p);if(N===void 0||N.style!==C){B.style.transform=C;let U={style:C};o.objects.set(p,U)}B.parentNode!==u&&u.appendChild(B),p.onAfterRender(e,h,T)}}for(let x=0,B=p.children.length;x<B;x++)_(p.children[x],h,T,y)}}};var _e=1184540,cn=5441529,Cx=9861119,pa=14998783,Iu=16250620,Ix=15657721,Px=14868970,ua=16742938,Pu=1623735,Kc=16039448,Lx=15026253,da=2042475,he=300,Nx=430,es=[[600,0,80],[1380,0,60],[1770,he,60],[2150,he,60],[2830,he,60],[3430,he,60],[3790,0,60],[4220,0,60],[4420,0,60],[5150,0,60],[5330,0,60],[5730,0,40],[5730,0,-240]].map(([i,t,e])=>new k(i,t,e)),Lu=[0,0,3,4,4,7,9,9,9,10,12],Dx=[["Train scheduling",1,[650,240,-150],120,60],["Flight scheduling",2,[2250,he+470,-250],60,60],["Desk scheduling",3,[3060,he+110,-10],140,60],["Shift scheduling",4,[2980,he+205,-150],120,230],["Shift scheduling",5,[3980,205,-160],140,60],["Maintenance scheduling",6,[4800,140,-470],300,230],["Aircraft scheduling",7,[6300,265,-870],220,400],["Gate scheduling",8,[5730,240,-400],200,230],["Shift scheduling",9,[5480,205,-150],140,60]],ns=10,Ux=i=>1+2.4*Math.pow(i-1,3)+1.4*Math.pow(i-1,2),Ls=i=>i<.5?2*i*i:1-Math.pow(-2*i+2,2)/2,Ke=i=>Math.min(Math.max(i,0),1),Qc=new Map;function Ox(i,t){let e=`${i}-${JSON.stringify(t||{})}`;return Qc.has(e)||Qc.set(e,new Is({color:i,roughness:.85,metalness:0,...t})),Qc.get(e)}var Du=new bs({color:_e,transparent:!0,opacity:.45});function xe(i,t,{edges:e=!1,shadow:n=!0,options:s}={}){let r=new fe(i,Ox(t,s));return r.castShadow=n,r.receiveShadow=!0,e&&r.add(new Ss(new Ts(i,25),Du)),r}function Bt(i,t,e,n,s,r,a,o={}){let c=xe(new Pe(i,t,e),n,{edges:!0,...o});return c.position.set(s,r+t/2,a),c}function qt(i,t,e,...n){let s=new pe;return s.position.set(i,t,e),n.forEach(r=>s.add(r)),s}function Uu(i,t,e){let s=document.createElement("canvas");s.width=i*3,s.height=t*3;let r=s.getContext("2d");r.scale(3,3),e(r,i,t);let a=new Wr(s);a.colorSpace=Ee,a.anisotropy=8;let o=new fe(new Wn(i,t),new $i({map:a}));return o.add(new Ss(new Ts(o.geometry),Du)),o}function fa(i,t,{background:e="#ffffff",color:n="#12131c",size:s=34}={}){return Uu(t,70,(r,a,o)=>{r.fillStyle=e,r.fillRect(0,0,a,o),r.fillStyle=n,r.font=`600 ${s}px "Inter Tight", sans-serif`,r.textAlign="center",r.textBaseline="middle",r.fillText(i,a/2,o/2+2)})}function Fx(){let i=[["BALENCIA","2"],["ROAM","2"],["SPARIS","2"],["OSAKE","2"],["NEW YOLK","2"]];return Uu(420,260,(t,e,n)=>{t.fillStyle="#12131c",t.fillRect(0,0,e,n),t.font='600 18px "Inter Tight", sans-serif',t.fillStyle="#9677ff",t.fillText("DEPARTURES",28,40),t.fillText("GATE",e-80,40),i.forEach(([s,r],a)=>{let o=82+a*38,c=s==="ROAM";t.font=`${c?600:400} 26px "JetBrains Mono", monospace`,t.fillStyle=c?"#f4be18":"#e6e6ef",t.fillText(s,28,o),t.fillText(r,e-62,o)})})}function Xn({body:i=Cx,cap:t=null}={}){let e=new pe,n=[-1,1].map(a=>{let o=new pe;o.position.set(a*9,70,0);let c=xe(new ws(7,50,4,8),_e);return c.position.y=-36,o.add(c),e.add(o),o}),s=xe(new ws(25,46,6,16),i);s.position.y=110;let r=xe(new hi(25,24,16),16777215);if(r.position.y=170,[-1,1].forEach(a=>{let o=xe(new hi(3.5,8,8),_e,{shadow:!1});o.position.set(a*8,4,23),r.add(o)}),e.add(s,r),t){let a=xe(new rn(23,25,14,20),t);a.position.y=192;let o=xe(new Pe(34,4,18),t);o.position.set(0,186,24),e.add(a,o)}return e.userData={legs:n,head:r,torso:s,phase:Math.random()*10},e}function Bx(){let i=new pe,t=Bt(34,50,22,Lx,0,6,0),e=Bt(4,34,4,_e,0,56,0,{edges:!1}),n=xe(new rn(5,5,24,10),_e);return n.rotation.x=Math.PI/2,n.position.y=5,i.add(t,e,n),i}function zx(){let i=new pe,t=1100;i.add(Bt(t,210,140,cn,0,20,0)),i.add(Bt(t,16,142,16777215,0,70,0,{edges:!1}));let e=xe(new rn(70,70,210,20,1,!1,0,Math.PI),cn,{edges:!0});e.position.set(t/2,125,0),i.add(e);for(let n=0;n<6;n++){let s=-t/2+120+n*170;if(i.add(Bt(120,70,4,13625847,s,120,71,{edges:!0})),n%2===0){let r=xe(new hi(16,12,10),16777215,{shadow:!1});r.position.set(s-20+n*6,152,62),i.add(r)}}return i.add(Bt(t-80,20,100,_e,0,0,0,{edges:!1})),i}function jc(i){let t=new pe,e=520,n=40,s=70+n,r=xe(new rn(n,n,e,24),16777215,{edges:!1});r.rotation.x=Math.PI/2,r.position.y=s;let a=xe(new hi(n,24,16),16777215);a.scale.z=1.8,a.position.set(0,s,e/2);let o=xe(new Zr(n,120,24),16777215);o.rotation.x=-Math.PI/2,o.position.set(0,s+6,-e/2-58);let c=xe(new Pe(44,12,20),_e);c.position.set(0,s+22,e/2+40);let l=xe(new Pe(580,10,110),15856118,{edges:!0});l.position.set(0,s-18,-20);let u=xe(new Pe(10,130,100),i,{edges:!0});u.position.set(0,s+90,-e/2-20);let d=xe(new Pe(220,8,60),15856118,{edges:!0});return d.position.set(0,s+20,-e/2-40),t.add(r,a,o,c,l,u,d),[-1,1].forEach(f=>{let m=xe(new rn(20,22,80,16),i);m.rotation.x=Math.PI/2,m.position.set(f*140,s-40,10),t.add(m)}),[-1,0,1].forEach(f=>{let m=xe(new rn(8,8,50,8),_e);m.position.set(f*60,25,f===0?e/2-40:-40),t.add(m)}),t}function Nu(i,t,e,n){let s=new pe,r=e-i,a=n-t,o=Math.hypot(r,a),c=Math.atan2(a,r),l=new pe;l.position.set(i,t,60),l.rotation.z=c,l.add(Bt(o,16,150,14605289,o/2,-16,0)),[-1,1].forEach(u=>{l.add(Bt(o,70,12,pa,o/2,0,u*81,{options:{transparent:!0,opacity:.85}})),l.add(Bt(o+30,8,16,_e,o/2,70,u*81,{edges:!1}))});for(let u=1;u<12;u++)l.add(Bt(2,2,140,_e,o*u/12,0,0,{edges:!1,shadow:!1}));return s.add(l),s}var ma=class{constructor(t,e){this.stage=t,this.origin=e.clone().add(new k(-700,-300,1350)),this.group=new pe,this.group.position.copy(this.origin),this.cssGroup=new pe,this.cssGroup.position.copy(this.origin),this.group.visible=this.cssGroup.visible=!1,t.scene.add(this.group),t.cssScene.add(this.cssGroup),this.parts=[],this.step=0,this.stepTime=0,this.activeTime=0,this.active=!1,this.routeLengths=[0];for(let n=1;n<es.length;n++)this.routeLengths.push(this.routeLengths[n-1]+es[n].distanceTo(es[n-1]));this.distance=0,this.follow=()=>this.cameraPose(),this.build(),t.updaters.push((n,s)=>this.update(n,s))}add(t,e=null){return t.userData.delay=e??.15+t.position.x/6600*1.1,this.parts.push(t),this.group.add(t),t}build(){let t=new Qi(16777215,1.6);t.position.set(2400,2600,1800),t.target.position.set(3300,0,-300),t.castShadow=!0,t.shadow.mapSize.set(4096,4096),Object.assign(t.shadow.camera,{left:-4200,right:4200,top:2600,bottom:-2600,near:100,far:8e3}),t.shadow.bias=-5e-4,t.shadow.radius=3,this.group.add(t,t.target),this.add(qt(0,0,0,Bt(6800,30,640,Iu,3350,-30,-10)),0),this.add(qt(0,0,0,Bt(1750,he,560,Ix,2600,0,20)),.3),this.add(qt(0,0,0,Bt(1750,12,560,Iu,2600,he-12,20,{edges:!1})),.35),this.add(qt(0,0,0,Bt(4700,900,30,16777215,2350,0,-275)),.1),this.add(qt(0,0,0,Bt(2100,70,30,16777215,5750,0,-275),Bt(2100,160,30,16777215,5750,740,-275),Bt(2100,670,6,13625847,5750,70,-275,{options:{transparent:!0,opacity:.18},shadow:!1}),...[4720,5420,6100,6780].map(c=>Bt(24,670,34,16777215,c,70,-275))),.7),this.add(qt(0,0,0,Bt(2400,20,1300,Px,5800,-20,-940)),.6),[5e3,5650,6300].forEach(c=>{this.add(qt(0,0,0,Bt(8,2,900,Kc,c,0,-760,{edges:!1,shadow:!1})),.7)}),this.add(qt(0,0,0,Bt(1500,20,150,14144739,700,-20,-150)),.1),this.trainPart=this.add(qt(0,0,-150,zx()),.2);let e=fa("ZAVENTEM",320);e.position.set(650,500,-258),this.add(qt(0,0,0,e),.2),this.add(Nu(1380,0,1770,he),.3),this.add(Nu(3430,he,3790,0),.6);let n=Fx();n.position.set(2250,he+340,-258),this.add(qt(0,0,0,n),.45),this.add(qt(2980,he,-40,Bt(240,110,80,16777215,0,0,0),Bt(244,10,84,cn,0,110,0))),this.add(qt(2980,he,-150,Xn({body:cn})));let s=fa("RIANNA AIR",280,{background:"#5307f9",color:"#ffffff"});s.position.set(2980,he+380,-200),this.add(qt(0,0,0,s,Bt(6,345,6,_e,2860,he,-205,{edges:!1}),Bt(6,345,6,_e,3100,he,-205,{edges:!1})),.55),this.add(qt(3240,he,-170,Bt(380,40,70,12104904,0,0,0),Bt(380,4,60,_e,0,40,0,{edges:!1}))),this.add(qt(3440,he,-170,Bt(60,160,100,_e,0,0,0))),[[2480,-120,Pu],[2560,-60,ua],[2680,-150,Kc]].forEach(([c,l,u])=>{this.add(qt(c,he,l,Xn({body:u})))}),this.add(qt(4130,0,-120,Bt(280,80,90,12104904,0,0,0),Bt(130,130,110,16777215,0,80,0))),this.add(qt(4350,0,60,Bt(16,230,30,_e,-70,0,0),Bt(16,230,30,_e,70,0,0),Bt(156,18,30,cn,0,230,0))),this.add(qt(3980,0,-160,Xn({body:da,cap:da}))),this.add(qt(4500,0,-40,Xn({body:da,cap:da})));let r=fa("GATE 2",220,{background:"#12131c",color:"#f4be18",size:38});r.position.set(5650,640,-255),this.add(qt(0,0,0,r),.75);for(let c=0;c<4;c++)this.add(qt(4880+c*70,0,-150,Bt(56,45,56,pa,0,0,0),Bt(56,50,10,pa,0,45,-23)));this.add(qt(4950,0,-150,Xn({body:ua}))),this.add(qt(5480,0,-60,Bt(200,105,70,16777215,0,0,0),Bt(204,10,74,cn,0,105,0))),this.add(qt(5430,0,-150,Xn({body:cn}))),this.add(qt(5530,0,-150,Xn({body:cn})));let a=fa("ROAM \xB7 Boarding",260,{size:30});a.position.set(5480,380,-200),this.add(qt(0,0,0,a,Bt(6,345,6,_e,5370,0,-205,{edges:!1}),Bt(6,345,6,_e,5590,0,-205,{edges:!1})),.8),this.add(qt(0,0,0,Bt(140,250,40,pa,5730,0,-250),Bt(90,200,6,_e,5730,0,-228,{edges:!1})),.8),this.add(qt(5730,0,-400,Bt(80,90,250,14605289,0,150,0),Bt(30,150,30,12104904,0,0,40))),this.planes=[this.add(qt(5e3,0,-590,jc(Pu)),.9),this.add(qt(5650,0,-590,jc(cn)),1),this.add(qt(6300,0,-590,jc(ua)),1.1)],this.gatePlane=this.planes[1],this.add(qt(4800,0,-470,Bt(170,110,90,16777215,0,14,0),Bt(172,18,92,ua,0,60,0),Bt(56,80,90,13625847,100,14,0),Bt(60,60,60,Kc,-40,124,0)),1),this.traveller=Xn({body:cn}),this.suitcase=Bx(),this.travellerPart=this.add(qt(0,0,0,this.traveller,this.suitcase),.6),this.suitcase.position.set(-38,0,-6),this.suitcase.rotation.z=-.35,this.headline=document.createElement("div"),this.headline.className="tf-scene-headline",this.headline.innerHTML='Every step is a <span class="highlight">scheduling problem</span>';let o=new pi(this.headline);o.position.set(3400,1900,-300),o.scale.setScalar(3.2),this.cssGroup.add(o),this.labels=Dx.map(([c,l,[u,d,f],m,g])=>this.label(c,l,u,d,f,m,g))}label(t,e,n,s,r,a,o){let c=document.createElement("div");c.className="tf-scene-label",c.innerHTML=`<div class="inner"><span class="pill"></span><span class="stem" style="height:${a}px"></span><span class="tip"></span></div>`,c.querySelector(".pill").textContent=t;let l=new pi(c);return l.userData={from:e,stem:a,finaleStem:o,anchor:new k(n,s,r),height:60+a+16},this.cssGroup.add(l),l}setActive(t){t&&!this.active&&(this.activeTime=this.stage.clock.getElapsedTime()),this.active=t,this.group.visible=this.cssGroup.visible=t,t?this.stage.follow=this.follow:this.stage.follow===this.follow&&(this.stage.follow=null)}setStep(t,{instant:e=!1}={}){this.step=t,this.stepTime=this.stage.clock.getElapsedTime(),e&&(this.distance=this.routeLengths[Lu[t]]);let n=t>=ns;this.headline.classList.toggle("visible",n),this.labels.forEach(s=>{let{from:r,stem:a,finaleStem:o}=s.userData;s.element.classList.toggle("visible",n||t===r);let c=n?o:a;s.element.querySelector(".stem").style.height=`${c}px`,s.userData.height=60+c+16})}cameraPose(){let t=this.travellerPart.position,e,n,s=2.2;if(this.step>=ns){let r=Ls(Ke((this.stage.clock.getElapsedTime()-this.stepTime)/14));e=new k(3400+r*150,2e3,7e3-r*450),n=new k(3400,950,-400),s=1.3}else if(this.step>=6&&this.step<=8){let r=[4950,6050,5650][this.step-6];e=new k(r-100,620,1600),n=new k(r,170,-500)}else{let r=this.step<=1?250:150;e=new k(t.x+r,t.y+380,1500),n=new k(t.x+r,t.y+200,-150)}return e.add(this.origin),n.add(this.origin),{x:e.x,y:e.y,z:e.z,tx:n.x,ty:n.y,tz:n.z,pixels:0,divider:0,damping:s}}routePoint(t){let e=1;for(;e<es.length-1&&this.routeLengths[e]<t;)e++;let n=es[e-1],s=es[e],r=Ke((t-this.routeLengths[e-1])/(this.routeLengths[e]-this.routeLengths[e-1]));return n.clone().lerp(s,r)}update(t,e){if(!this.active)return;let n=t-this.activeTime;for(let g of this.parts){let _=Math.max(Ux(Ke((n-g.userData.delay)/.7)),1e-4);g.scale.set(1,_,1)}let r=this.routeLengths[Lu[this.step]]-this.distance,a=Math.abs(r)>1;this.distance+=Math.sign(r)*Math.min(Math.abs(r),Nx*e),this.travellerPart.position.copy(this.routePoint(this.distance));let o=this.step>=ns?Ke((t-this.stepTime-1.4)/.5):0;if(this.traveller.scale.setScalar(1-o+1e-4),this.animatePerson(this.traveller,t,a),this.parts.forEach(g=>g.children.forEach(_=>_.userData.legs&&_!==this.traveller&&this.animatePerson(_,t,!1))),this.step>=4){let g=Ke((t-this.stepTime)/2.2),_=this.step===4?g:1;this.suitcase.visible=_<1,this.suitcase.rotation.z=0,this.suitcase.position.set(3040+_*400,he+40,-170).sub(this.travellerPart.position)}else this.suitcase.visible=!0,this.suitcase.rotation.z=-.35,this.suitcase.position.set(-38,0,-6);let l=Ls(Ke((n-.2)/2.4)),u=this.step>=2?Ls(Ke((t-this.stepTime)/3)):0;this.trainPart.position.x=-1500+l*2200-u*3200;let d=this.step>=ns?t-this.stepTime-2.2:-1,f=this.gatePlane;if(f.visible=!0,d<=0)f.position.set(5650,0,-590),f.rotation.set(0,0,0);else{let g=Ls(Ke(d/2.2)),_=Ls(Ke((d-2.2)/1.6)),p=Ke((d-3.8)/5);f.position.set(5650+_*120+4200*p*p,520*Math.max(p-.45,0)**1.5*3,-590-g*450),f.rotation.set(0,_*Math.PI*.5,0),f.rotateX(-.16*Ke((p-.45)*4)),f.visible=p<1}let m=this.stage.camera;for(let g of this.labels){let _=g.userData.anchor.clone().add(this.origin),p=He.clamp(m.position.distanceTo(_)/1600,1,2.4);g.scale.setScalar(p),g.position.copy(g.userData.anchor),g.position.y+=g.userData.height/2*p}}animatePerson(t,e,n){let{legs:s,torso:r,head:a,phase:o}=t.userData,c=n?Math.sin(e*11)*.55:0;s[0].rotation.z=c,s[1].rotation.z=-c;let l=n?Math.abs(Math.sin(e*11))*6:Math.sin(e*1.6+o)*1.5;r.position.y=110+l,a.position.y=170+l}};var ga={airport:{steps:ns,create:(i,t)=>new ma(i,t)}};We.registerLanguage("java",Nl);We.registerLanguage("kotlin",Dl);We.registerLanguage("python",Ul);We.registerLanguage("bash",Ol);We.registerLanguage("json",Fl);We.registerLanguage("xml",Bl);We.registerLanguage("yaml",zl);We.registerLanguage("properties",kl);We.registerLanguage("plaintext",Hl);var kx=["H1","H2","H3","H4"];function Ou(i){let t=[];return[...i.children].filter(n=>n.tagName==="SECTION").forEach((n,s)=>{let r=[...n.children].filter(o=>o.tagName==="SECTION");if(r.length===0){t.push({el:n,col:s,row:0,chapter:n.dataset.chapter||null});return}let a=n.dataset.chapter||Hx(r[0]);r.forEach((o,c)=>t.push({el:o,col:s,row:c,chapter:a}))}),t}function Hx(i){let t=i.querySelector("h1, h2, h3");return t?t.textContent.replace(/\s+/g," ").trim():null}function Fu(i){let t=i.el;t.classList.add("tf-slide"),t.dataset.backgroundColor&&t.classList.add("divider");let e=[...t.children].filter(s=>!s.matches("aside.notes, style"));e.length===1&&kx.includes(e[0].tagName)&&t.classList.add("statement");let n=ga[t.dataset.scene];if(n){t.classList.add("scene");for(let s=0;s<n.steps;s++){let r=document.createElement("span");r.className="fragment tf-step",t.appendChild(r)}}if(i.chapter&&!t.classList.contains("divider")&&!t.classList.contains("title")&&!n){let s=document.createElement("div");s.className="tf-eyebrow",s.textContent=i.chapter,t.prepend(s)}if(t.classList.contains("layers")){let s=document.createElement("div");s.className="tf-layers",t.querySelectorAll(":scope > img").forEach(r=>s.appendChild(r)),t.appendChild(s)}t.querySelectorAll("pre code").forEach(s=>{s.textContent=Vx(s.textContent),s.removeAttribute("style"),We.highlightElement(s)}),i.fragments=[...t.querySelectorAll(".fragment")]}function Vx(i){let t=i.replace(/\t/g,"    ").split(`
`);for(;t.length&&!t[0].trim();)t.shift();for(;t.length&&!t[t.length-1].trim();)t.pop();let e=Math.min(...t.filter(n=>n.trim()).map(n=>n.match(/^ */)[0].length));return t.map(n=>n.slice(e).trimEnd()).join(`
`)}function Bu(i){let t=[...i.querySelectorAll("pre")];if(!t.length)return;let e=()=>i.scrollHeight>i.clientHeight+1||t.some(n=>n.scrollWidth>n.clientWidth+1);for(let n=34;n>=12;n--)if(t.forEach(s=>s.style.fontSize=`${n}px`),!e())return}var qn=64,_a=-320,zu=`
  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }
  // 0 in the middle of the screen, 1 towards the edges: keeps the pixels away from the content.
  // Off-center, so the pixels gather on the right and at the bottom, away from titles in the top left.
  float edgeMask(vec2 world, vec3 cam, vec2 halfView) {
    vec2 d = (world - cam.xy) / halfView - vec2(-0.3, 0.25);
    return smoothstep(0.95, 1.35, length(d * vec2(0.85, 1.1)));
  }
`,wn={uTime:{value:0},uCam:{value:new k},uHalf:{value:new ft(1,1)},uFade:{value:1},uDivider:{value:0},uRipple:{value:new k(0,0,-100)}},xa=class{constructor(t){this.uniforms=wn,this.cols=0,this.rows=0,this.grid=this.createGrid(),t.add(this.grid),this.cubeUniforms={...wn,uOrigin:{value:new ft}},this.cubes=null,this.scene=t}createGrid(){let t=new Fe({uniforms:wn,transparent:!0,depthWrite:!1,vertexShader:`
        varying vec2 vWorld;
        void main() {
          vec4 world = modelMatrix * vec4(position, 1.0);
          vWorld = world.xy;
          gl_Position = projectionMatrix * viewMatrix * world;
        }
      `,fragmentShader:`
        uniform vec3 uCam;
        uniform vec2 uHalf;
        uniform float uFade;
        uniform float uDivider;
        varying vec2 vWorld;
        ${zu}
        void main() {
          vec2 p = vWorld / ${qn.toFixed(1)};
          vec2 fw = fwidth(p);
          vec2 g = abs(fract(p) - 0.5);
          vec2 l = smoothstep(vec2(0.5) - fw * 1.1, vec2(0.5), g);
          float line = max(l.x, l.y);
          // Lines vanish when they get denser than a few pixels (overview) to avoid moir\xE9.
          line *= 1.0 - smoothstep(0.08, 0.3, max(fw.x, fw.y));
          float mask = mix(0.35, 1.0, edgeMask(vWorld, uCam, uHalf));
          vec3 color = mix(vec3(0.80, 0.80, 0.86), vec3(1.0), uDivider);
          float alpha = mix(0.55, 0.16, uDivider) * line * mask;
          gl_FragColor = vec4(color, alpha);
        }
      `}),e=new fe(new Wn(1,1),t);return e.scale.set(4e5,4e5,1),e.position.z=_a-.5,e.renderOrder=-1,e}resize(t,e){let n=(e-_a)*Math.tan(He.degToRad(t.fov/2)),s=n*t.aspect,r=Math.ceil(2*s/qn)+4,a=Math.ceil(2*n/qn)+4;if(r===this.cols&&a===this.rows)return;this.cols=r,this.rows=a,this.cubes&&(this.scene.remove(this.cubes),this.cubes.geometry.dispose());let o=new Pe(1,1,1),c=new na;c.index=o.index,c.attributes.position=o.attributes.position,c.attributes.normal=o.attributes.normal;let l=new Float32Array(r*a*2),u=0;for(let f=0;f<a;f++)for(let m=0;m<r;m++)l[u++]=m,l[u++]=f;c.setAttribute("aCell",new Hr(l,2)),c.instanceCount=r*a;let d=this.cubes?.material??this.createCubeMaterial();this.cubes=new fe(c,d),this.cubes.frustumCulled=!1,this.scene.add(this.cubes)}createCubeMaterial(){return new Fe({uniforms:this.cubeUniforms,vertexShader:`
        attribute vec2 aCell;
        uniform vec2 uOrigin;
        uniform float uTime;
        uniform vec3 uCam;
        uniform vec2 uHalf;
        uniform float uFade;
        uniform float uDivider;
        uniform vec3 uRipple;
        varying vec3 vColor;
        varying vec3 vNormal;
        ${zu}

        vec3 lightPalette(float r) {
          if (r < 0.34) return vec3(0.878, 0.851, 1.000);  // lavender
          if (r < 0.60) return vec3(0.588, 0.467, 1.000);  // light purple
          if (r < 0.82) return vec3(0.325, 0.027, 0.976);  // #5307F9 brand purple
          if (r < 0.88) return vec3(1.000, 0.478, 0.102);  // #ff7a1a orange
          if (r < 0.94) return vec3(0.094, 0.776, 0.718);  // #18c6b7 teal
          if (r < 0.98) return vec3(0.957, 0.745, 0.094);  // #f4be18 yellow
          return vec3(0.098, 0.788, 0.420);                // #19c96b green
        }
        vec3 dividerPalette(float r) {
          if (r < 0.35) return vec3(0.420, 0.180, 1.000);
          if (r < 0.65) return vec3(0.560, 0.420, 1.000);
          if (r < 0.88) return vec3(0.250, 0.000, 0.800);
          return vec3(1.0);
        }

        void main() {
          vec2 cell = uOrigin + aCell;
          vec2 center = (cell + 0.5) * ${qn.toFixed(1)};
          float h = hash(cell);
          float h2 = hash(cell + 17.31);

          float cloud = vnoise(cell * 0.09 + 3.7);
          float lit = step(0.84, cloud * 0.75 + h * 0.4);
          // A few loose pixels blink on and off.
          float phase = fract(uTime * 0.11 + h2 * 9.0);
          float blink = step(0.93, h2) * smoothstep(0.0, 0.08, phase) * smoothstep(0.45, 0.35, phase);
          lit = max(lit, blink);

          float mask = edgeMask(center, uCam, uHalf);
          float size = lit * mask * uFade;

          float rt = uTime - uRipple.z;
          float wave = rt * 2400.0;
          float rr = length(center - uRipple.xy);
          float ripple = step(0.0, rt) * exp(-pow((rr - wave) / 240.0, 2.0)) * exp(-rt * 1.2);

          float height = (0.12 + h * 0.35 + ripple * 2.2 + 0.08 * sin(uTime * 0.9 + h * 30.0)) * ${qn.toFixed(1)};
          vec3 p = position;
          p.xy *= ${(qn*.86).toFixed(1)} * size;
          p.z = (p.z + 0.5) * height * size;
          vec3 world = vec3(center + p.xy, ${_a.toFixed(1)} + p.z);

          vColor = mix(lightPalette(h2), dividerPalette(h2), uDivider);
          vNormal = normal;
          gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
        }
      `,fragmentShader:`
        varying vec3 vColor;
        varying vec3 vNormal;
        void main() {
          vec3 l = normalize(vec3(-0.45, 0.6, 1.0));
          float shade = 0.58 + 0.42 * max(dot(normalize(vNormal), l), 0.0);
          gl_FragColor = vec4(vColor * shade, 1.0);
        }
      `})}update(t,e,n,s=1){let a=(t.position.z-_a)*Math.tan(He.degToRad(t.fov/2));wn.uTime.value=e,wn.uCam.value.copy(t.position),wn.uHalf.value.set(a*t.aspect,a),wn.uFade.value=s*(1-He.smoothstep(t.position.z,n*1.25,n*1.6)),this.cubeUniforms.uOrigin.value.set(Math.floor(t.position.x/qn)-Math.floor(this.cols/2),Math.floor(t.position.y/qn)-Math.floor(this.rows/2))}ripple(t,e,n){wn.uRipple.value.set(t,e,n)}set divider(t){wn.uDivider.value=t}};var Gx=Ee,Ns=class i extends Ki{constructor(t){super(t),this.defaultDPI=90,this.defaultUnit="px"}load(t,e,n,s){let r=this,a=new jr(r.manager);a.setPath(r.path),a.setRequestHeader(r.requestHeader),a.setWithCredentials(r.withCredentials),a.load(t,function(o){try{e(r.parse(o))}catch(c){s?s(c):console.error(c),r.manager.itemError(t)}},n,s)}parse(t){let e=this;function n(D,P){if(D.nodeType!==1)return;let R=x(D),S=!1,Q=null;switch(D.nodeName){case"svg":P=g(D,P);break;case"style":r(D);break;case"g":P=g(D,P);break;case"path":P=g(D,P),D.hasAttribute("d")&&(Q=s(D));break;case"rect":P=g(D,P),Q=c(D);break;case"polygon":P=g(D,P),Q=l(D);break;case"polyline":P=g(D,P),Q=u(D);break;case"circle":P=g(D,P),Q=d(D);break;case"ellipse":P=g(D,P),Q=f(D);break;case"line":P=g(D,P),Q=m(D);break;case"defs":S=!0;break;case"use":P=g(D,P);let gt=(D.getAttributeNS("http://www.w3.org/1999/xlink","href")||"").substring(1),Z=D.viewportElement.getElementById(gt);Z?n(Z,P):console.warn("SVGLoader: 'use node' references non-existent node id: "+gt);break;default:}Q&&(P.fill!==void 0&&P.fill!=="none"&&Q.color.setStyle(P.fill,Gx),C(Q,vt),G.push(Q),Q.userData={node:D,style:P});let ht=D.childNodes;for(let J=0;J<ht.length;J++){let gt=ht[J];S&&gt.nodeName!=="style"&&gt.nodeName!=="defs"||n(gt,P)}R&&(K.pop(),K.length>0?vt.copy(K[K.length-1]):vt.identity())}function s(D){let P=new an,R=new ft,S=new ft,Q=new ft,ht=!0,J=!1,gt=D.getAttribute("d");if(gt===""||gt==="none")return null;let Z=gt.match(/[a-df-z][^a-df-z]*/ig);for(let j=0,b=Z.length;j<b;j++){let et=Z[j],tt=et.charAt(0),at=et.slice(1).trim();ht===!0&&(J=!0,ht=!1);let I;switch(tt){case"M":I=p(at);for(let L=0,it=I.length;L<it;L+=2)R.x=I[L+0],R.y=I[L+1],S.x=R.x,S.y=R.y,L===0?P.moveTo(R.x,R.y):P.lineTo(R.x,R.y),L===0&&Q.copy(R);break;case"H":I=p(at);for(let L=0,it=I.length;L<it;L++)R.x=I[L],S.x=R.x,S.y=R.y,P.lineTo(R.x,R.y),L===0&&J===!0&&Q.copy(R);break;case"V":I=p(at);for(let L=0,it=I.length;L<it;L++)R.y=I[L],S.x=R.x,S.y=R.y,P.lineTo(R.x,R.y),L===0&&J===!0&&Q.copy(R);break;case"L":I=p(at);for(let L=0,it=I.length;L<it;L+=2)R.x=I[L+0],R.y=I[L+1],S.x=R.x,S.y=R.y,P.lineTo(R.x,R.y),L===0&&J===!0&&Q.copy(R);break;case"C":I=p(at);for(let L=0,it=I.length;L<it;L+=6)P.bezierCurveTo(I[L+0],I[L+1],I[L+2],I[L+3],I[L+4],I[L+5]),S.x=I[L+2],S.y=I[L+3],R.x=I[L+4],R.y=I[L+5],L===0&&J===!0&&Q.copy(R);break;case"S":I=p(at);for(let L=0,it=I.length;L<it;L+=4)P.bezierCurveTo(_(R.x,S.x),_(R.y,S.y),I[L+0],I[L+1],I[L+2],I[L+3]),S.x=I[L+0],S.y=I[L+1],R.x=I[L+2],R.y=I[L+3],L===0&&J===!0&&Q.copy(R);break;case"Q":I=p(at);for(let L=0,it=I.length;L<it;L+=4)P.quadraticCurveTo(I[L+0],I[L+1],I[L+2],I[L+3]),S.x=I[L+0],S.y=I[L+1],R.x=I[L+2],R.y=I[L+3],L===0&&J===!0&&Q.copy(R);break;case"T":I=p(at);for(let L=0,it=I.length;L<it;L+=2){let E=_(R.x,S.x),v=_(R.y,S.y);P.quadraticCurveTo(E,v,I[L+0],I[L+1]),S.x=E,S.y=v,R.x=I[L+0],R.y=I[L+1],L===0&&J===!0&&Q.copy(R)}break;case"A":I=p(at,[3,4],7);for(let L=0,it=I.length;L<it;L+=7){if(I[L+5]==R.x&&I[L+6]==R.y)continue;let E=R.clone();R.x=I[L+5],R.y=I[L+6],S.x=R.x,S.y=R.y,a(P,I[L],I[L+1],I[L+2],I[L+3],I[L+4],E,R),L===0&&J===!0&&Q.copy(R)}break;case"m":I=p(at);for(let L=0,it=I.length;L<it;L+=2)R.x+=I[L+0],R.y+=I[L+1],S.x=R.x,S.y=R.y,L===0?P.moveTo(R.x,R.y):P.lineTo(R.x,R.y),L===0&&Q.copy(R);break;case"h":I=p(at);for(let L=0,it=I.length;L<it;L++)R.x+=I[L],S.x=R.x,S.y=R.y,P.lineTo(R.x,R.y),L===0&&J===!0&&Q.copy(R);break;case"v":I=p(at);for(let L=0,it=I.length;L<it;L++)R.y+=I[L],S.x=R.x,S.y=R.y,P.lineTo(R.x,R.y),L===0&&J===!0&&Q.copy(R);break;case"l":I=p(at);for(let L=0,it=I.length;L<it;L+=2)R.x+=I[L+0],R.y+=I[L+1],S.x=R.x,S.y=R.y,P.lineTo(R.x,R.y),L===0&&J===!0&&Q.copy(R);break;case"c":I=p(at);for(let L=0,it=I.length;L<it;L+=6)P.bezierCurveTo(R.x+I[L+0],R.y+I[L+1],R.x+I[L+2],R.y+I[L+3],R.x+I[L+4],R.y+I[L+5]),S.x=R.x+I[L+2],S.y=R.y+I[L+3],R.x+=I[L+4],R.y+=I[L+5],L===0&&J===!0&&Q.copy(R);break;case"s":I=p(at);for(let L=0,it=I.length;L<it;L+=4)P.bezierCurveTo(_(R.x,S.x),_(R.y,S.y),R.x+I[L+0],R.y+I[L+1],R.x+I[L+2],R.y+I[L+3]),S.x=R.x+I[L+0],S.y=R.y+I[L+1],R.x+=I[L+2],R.y+=I[L+3],L===0&&J===!0&&Q.copy(R);break;case"q":I=p(at);for(let L=0,it=I.length;L<it;L+=4)P.quadraticCurveTo(R.x+I[L+0],R.y+I[L+1],R.x+I[L+2],R.y+I[L+3]),S.x=R.x+I[L+0],S.y=R.y+I[L+1],R.x+=I[L+2],R.y+=I[L+3],L===0&&J===!0&&Q.copy(R);break;case"t":I=p(at);for(let L=0,it=I.length;L<it;L+=2){let E=_(R.x,S.x),v=_(R.y,S.y);P.quadraticCurveTo(E,v,R.x+I[L+0],R.y+I[L+1]),S.x=E,S.y=v,R.x=R.x+I[L+0],R.y=R.y+I[L+1],L===0&&J===!0&&Q.copy(R)}break;case"a":I=p(at,[3,4],7);for(let L=0,it=I.length;L<it;L+=7){if(I[L+5]==0&&I[L+6]==0)continue;let E=R.clone();R.x+=I[L+5],R.y+=I[L+6],S.x=R.x,S.y=R.y,a(P,I[L],I[L+1],I[L+2],I[L+3],I[L+4],E,R),L===0&&J===!0&&Q.copy(R)}break;case"Z":case"z":P.currentPath.autoClose=!0,P.currentPath.curves.length>0&&(R.copy(Q),P.currentPath.currentPoint.copy(R),ht=!0);break;default:console.warn(et)}J=!1}return P}function r(D){if(!(!D.sheet||!D.sheet.cssRules||!D.sheet.cssRules.length))for(let P=0;P<D.sheet.cssRules.length;P++){let R=D.sheet.cssRules[P];if(R.type!==1)continue;let S=R.selectorText.split(/,/gm).filter(Boolean).map(Q=>Q.trim());for(let Q=0;Q<S.length;Q++){let ht=Object.fromEntries(Object.entries(R.style).filter(([,J])=>J!==""));$[S[Q]]=Object.assign($[S[Q]]||{},ht)}}}function a(D,P,R,S,Q,ht,J,gt){if(P==0||R==0){D.lineTo(gt.x,gt.y);return}S=S*Math.PI/180,P=Math.abs(P),R=Math.abs(R);let Z=(J.x-gt.x)/2,j=(J.y-gt.y)/2,b=Math.cos(S)*Z+Math.sin(S)*j,et=-Math.sin(S)*Z+Math.cos(S)*j,tt=P*P,at=R*R,I=b*b,L=et*et,it=I/tt+L/at;if(it>1){let It=Math.sqrt(it);P=It*P,R=It*R,tt=P*P,at=R*R}let E=tt*L+at*I,v=(tt*at-E)/E,Y=Math.sqrt(Math.max(0,v));Q===ht&&(Y=-Y);let rt=Y*P*et/R,pt=-Y*R*b/P,H=Math.cos(S)*rt-Math.sin(S)*pt+(J.x+gt.x)/2,ut=Math.sin(S)*rt+Math.cos(S)*pt+(J.y+gt.y)/2,dt=o(1,0,(b-rt)/P,(et-pt)/R),yt=o((b-rt)/P,(et-pt)/R,(-b-rt)/P,(-et-pt)/R)%(Math.PI*2);D.currentPath.absellipse(H,ut,P,R,dt,dt+yt,ht===0,S)}function o(D,P,R,S){let Q=D*R+P*S,ht=Math.sqrt(D*D+P*P)*Math.sqrt(R*R+S*S),J=Math.acos(Math.max(-1,Math.min(1,Q/ht)));return D*S-P*R<0&&(J=-J),J}function c(D){let P=y(D.getAttribute("x")||0),R=y(D.getAttribute("y")||0),S=y(D.getAttribute("rx")||D.getAttribute("ry")||0),Q=y(D.getAttribute("ry")||D.getAttribute("rx")||0),ht=y(D.getAttribute("width")),J=y(D.getAttribute("height")),gt=1-.551915024494,Z=new an;return Z.moveTo(P+S,R),Z.lineTo(P+ht-S,R),(S!==0||Q!==0)&&Z.bezierCurveTo(P+ht-S*gt,R,P+ht,R+Q*gt,P+ht,R+Q),Z.lineTo(P+ht,R+J-Q),(S!==0||Q!==0)&&Z.bezierCurveTo(P+ht,R+J-Q*gt,P+ht-S*gt,R+J,P+ht-S,R+J),Z.lineTo(P+S,R+J),(S!==0||Q!==0)&&Z.bezierCurveTo(P+S*gt,R+J,P,R+J-Q*gt,P,R+J-Q),Z.lineTo(P,R+Q),(S!==0||Q!==0)&&Z.bezierCurveTo(P,R+Q*gt,P+S*gt,R,P+S,R),Z}function l(D){function P(ht,J,gt){let Z=y(J),j=y(gt);Q===0?S.moveTo(Z,j):S.lineTo(Z,j),Q++}let R=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,S=new an,Q=0;return D.getAttribute("points").replace(R,P),S.currentPath.autoClose=!0,S}function u(D){function P(ht,J,gt){let Z=y(J),j=y(gt);Q===0?S.moveTo(Z,j):S.lineTo(Z,j),Q++}let R=/([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g,S=new an,Q=0;return D.getAttribute("points").replace(R,P),S.currentPath.autoClose=!1,S}function d(D){let P=y(D.getAttribute("cx")||0),R=y(D.getAttribute("cy")||0),S=y(D.getAttribute("r")||0),Q=new sn;Q.absarc(P,R,S,0,Math.PI*2);let ht=new an;return ht.subPaths.push(Q),ht}function f(D){let P=y(D.getAttribute("cx")||0),R=y(D.getAttribute("cy")||0),S=y(D.getAttribute("rx")||0),Q=y(D.getAttribute("ry")||0),ht=new sn;ht.absellipse(P,R,S,Q,0,Math.PI*2);let J=new an;return J.subPaths.push(ht),J}function m(D){let P=y(D.getAttribute("x1")||0),R=y(D.getAttribute("y1")||0),S=y(D.getAttribute("x2")||0),Q=y(D.getAttribute("y2")||0),ht=new an;return ht.moveTo(P,R),ht.lineTo(S,Q),ht.currentPath.autoClose=!1,ht}function g(D,P){P=Object.assign({},P);let R={};if(D.hasAttribute("class")){let J=D.getAttribute("class").split(/\s/).filter(Boolean).map(gt=>gt.trim());for(let gt=0;gt<J.length;gt++)R=Object.assign(R,$["."+J[gt]])}D.hasAttribute("id")&&(R=Object.assign(R,$["#"+D.getAttribute("id")]));function S(J,gt,Z){Z===void 0&&(Z=function(b){return b.startsWith("url")&&console.warn("SVGLoader: url access in attributes is not implemented."),b}),D.hasAttribute(J)&&(P[gt]=Z(D.getAttribute(J))),R[J]&&(P[gt]=Z(R[J])),D.style&&D.style[J]!==""&&(P[gt]=Z(D.style[J]))}function Q(J){return Math.max(0,Math.min(1,y(J)))}function ht(J){return Math.max(0,y(J))}return S("fill","fill"),S("fill-opacity","fillOpacity",Q),S("fill-rule","fillRule"),S("opacity","opacity",Q),S("stroke","stroke"),S("stroke-opacity","strokeOpacity",Q),S("stroke-width","strokeWidth",ht),S("stroke-linejoin","strokeLineJoin"),S("stroke-linecap","strokeLineCap"),S("stroke-miterlimit","strokeMiterLimit",ht),S("visibility","visibility"),P}function _(D,P){return D-(P-D)}function p(D,P,R){if(typeof D!="string")throw new TypeError("Invalid input: "+typeof D);let S={SEPARATOR:/[ \t\r\n\,.\-+]/,WHITESPACE:/[ \t\r\n]/,DIGIT:/[\d]/,SIGN:/[-+]/,POINT:/\./,COMMA:/,/,EXP:/e/i,FLAGS:/[01]/},Q=0,ht=1,J=2,gt=3,Z=Q,j=!0,b="",et="",tt=[];function at(E,v,Y){let rt=new SyntaxError('Unexpected character "'+E+'" at index '+v+".");throw rt.partial=Y,rt}function I(){b!==""&&(et===""?tt.push(Number(b)):tt.push(Number(b)*Math.pow(10,Number(et)))),b="",et=""}let L,it=D.length;for(let E=0;E<it;E++){if(L=D[E],Array.isArray(P)&&P.includes(tt.length%R)&&S.FLAGS.test(L)){Z=ht,b=L,I();continue}if(Z===Q){if(S.WHITESPACE.test(L))continue;if(S.DIGIT.test(L)||S.SIGN.test(L)){Z=ht,b=L;continue}if(S.POINT.test(L)){Z=J,b=L;continue}S.COMMA.test(L)&&(j&&at(L,E,tt),j=!0)}if(Z===ht){if(S.DIGIT.test(L)){b+=L;continue}if(S.POINT.test(L)){b+=L,Z=J;continue}if(S.EXP.test(L)){Z=gt;continue}S.SIGN.test(L)&&b.length===1&&S.SIGN.test(b[0])&&at(L,E,tt)}if(Z===J){if(S.DIGIT.test(L)){b+=L;continue}if(S.EXP.test(L)){Z=gt;continue}S.POINT.test(L)&&b[b.length-1]==="."&&at(L,E,tt)}if(Z===gt){if(S.DIGIT.test(L)){et+=L;continue}if(S.SIGN.test(L)){if(et===""){et+=L;continue}et.length===1&&S.SIGN.test(et)&&at(L,E,tt)}}S.WHITESPACE.test(L)?(I(),Z=Q,j=!1):S.COMMA.test(L)?(I(),Z=Q,j=!0):S.SIGN.test(L)?(I(),Z=ht,b=L):S.POINT.test(L)?(I(),Z=J,b=L):at(L,E,tt)}return I(),tt}let h=["mm","cm","in","pt","pc","px"],T={mm:{mm:1,cm:.1,in:1/25.4,pt:72/25.4,pc:6/25.4,px:-1},cm:{mm:10,cm:1,in:1/2.54,pt:72/2.54,pc:6/2.54,px:-1},in:{mm:25.4,cm:2.54,in:1,pt:72,pc:6,px:-1},pt:{mm:25.4/72,cm:2.54/72,in:1/72,pt:1,pc:6/72,px:-1},pc:{mm:25.4/6,cm:2.54/6,in:1/6,pt:72/6,pc:1,px:-1},px:{px:1}};function y(D){let P="px";if(typeof D=="string"||D instanceof String)for(let S=0,Q=h.length;S<Q;S++){let ht=h[S];if(D.endsWith(ht)){P=ht,D=D.substring(0,D.length-ht.length);break}}let R;return P==="px"&&e.defaultUnit!=="px"?R=T.in[e.defaultUnit]/e.defaultDPI:(R=T[P][e.defaultUnit],R<0&&(R=T[P].in*e.defaultDPI)),R*parseFloat(D)}function x(D){if(!(D.hasAttribute("transform")||D.nodeName==="use"&&(D.hasAttribute("x")||D.hasAttribute("y"))))return null;let P=B(D);return K.length>0&&P.premultiply(K[K.length-1]),vt.copy(P),K.push(P),P}function B(D){let P=new Ot,R=ct;if(D.nodeName==="use"&&(D.hasAttribute("x")||D.hasAttribute("y"))){let S=y(D.getAttribute("x")),Q=y(D.getAttribute("y"));P.translate(S,Q)}if(D.hasAttribute("transform")){let S=D.getAttribute("transform").split(")");for(let Q=S.length-1;Q>=0;Q--){let ht=S[Q].trim();if(ht==="")continue;let J=ht.indexOf("("),gt=ht.length;if(J>0&&J<gt){let Z=ht.slice(0,J),j=p(ht.slice(J+1));switch(R.identity(),Z){case"translate":if(j.length>=1){let b=j[0],et=0;j.length>=2&&(et=j[1]),R.translate(b,et)}break;case"rotate":if(j.length>=1){let b=0,et=0,tt=0;b=j[0]*Math.PI/180,j.length>=3&&(et=j[1],tt=j[2]),F.makeTranslation(-et,-tt),V.makeRotation(b),O.multiplyMatrices(V,F),F.makeTranslation(et,tt),R.multiplyMatrices(F,O)}break;case"scale":if(j.length>=1){let b=j[0],et=b;j.length>=2&&(et=j[1]),R.scale(b,et)}break;case"skewX":j.length===1&&R.set(1,Math.tan(j[0]*Math.PI/180),0,0,1,0,0,0,1);break;case"skewY":j.length===1&&R.set(1,0,0,Math.tan(j[0]*Math.PI/180),1,0,0,0,1);break;case"matrix":j.length===6&&R.set(j[0],j[2],j[4],j[1],j[3],j[5],0,0,1);break}}P.premultiply(R)}}return P}function C(D,P){function R(J){mt.set(J.x,J.y,1).applyMatrix3(P),J.set(mt.x,mt.y)}function S(J){let gt=J.xRadius,Z=J.yRadius,j=Math.cos(J.aRotation),b=Math.sin(J.aRotation),et=new k(gt*j,gt*b,0),tt=new k(-Z*b,Z*j,0),at=et.applyMatrix3(P),I=tt.applyMatrix3(P),L=ct.set(at.x,I.x,0,at.y,I.y,0,0,0,1),it=F.copy(L).invert(),Y=V.copy(it).transpose().multiply(it).elements,rt=z(Y[0],Y[1],Y[4]),pt=Math.sqrt(rt.rt1),H=Math.sqrt(rt.rt2);if(J.xRadius=1/pt,J.yRadius=1/H,J.aRotation=Math.atan2(rt.sn,rt.cs),!((J.aEndAngle-J.aStartAngle)%(2*Math.PI)<Number.EPSILON)){let dt=F.set(pt,0,0,0,H,0,0,0,1),yt=V.set(rt.cs,rt.sn,0,-rt.sn,rt.cs,0,0,0,1),It=dt.multiply(yt).multiply(L),xt=At=>{let{x:Ut,y:Ft}=new k(Math.cos(At),Math.sin(At),0).applyMatrix3(It);return Math.atan2(Ft,Ut)};J.aStartAngle=xt(J.aStartAngle),J.aEndAngle=xt(J.aEndAngle),N(P)&&(J.aClockwise=!J.aClockwise)}}function Q(J){let gt=w(P),Z=M(P);J.xRadius*=gt,J.yRadius*=Z;let j=gt>Number.EPSILON?Math.atan2(P.elements[1],P.elements[0]):Math.atan2(-P.elements[3],P.elements[4]);J.aRotation+=j,N(P)&&(J.aStartAngle*=-1,J.aEndAngle*=-1,J.aClockwise=!J.aClockwise)}let ht=D.subPaths;for(let J=0,gt=ht.length;J<gt;J++){let j=ht[J].curves;for(let b=0;b<j.length;b++){let et=j[b];et.isLineCurve?(R(et.v1),R(et.v2)):et.isCubicBezierCurve?(R(et.v0),R(et.v1),R(et.v2),R(et.v3)):et.isQuadraticBezierCurve?(R(et.v0),R(et.v1),R(et.v2)):et.isEllipseCurve&&(lt.set(et.aX,et.aY),R(lt),et.aX=lt.x,et.aY=lt.y,U(P)?S(et):Q(et))}}}function N(D){let P=D.elements;return P[0]*P[4]-P[1]*P[3]<0}function U(D){let P=D.elements,R=P[0]*P[3]+P[1]*P[4];if(R===0)return!1;let S=w(D),Q=M(D);return Math.abs(R/(S*Q))>Number.EPSILON}function w(D){let P=D.elements;return Math.sqrt(P[0]*P[0]+P[1]*P[1])}function M(D){let P=D.elements;return Math.sqrt(P[3]*P[3]+P[4]*P[4])}function z(D,P,R){let S,Q,ht,J,gt,Z=D+R,j=D-R,b=Math.sqrt(j*j+4*P*P);return Z>0?(S=.5*(Z+b),gt=1/S,Q=D*gt*R-P*gt*P):Z<0?Q=.5*(Z-b):(S=.5*b,Q=-.5*b),j>0?ht=j+b:ht=j-b,Math.abs(ht)>2*Math.abs(P)?(gt=-2*P/ht,J=1/Math.sqrt(1+gt*gt),ht=gt*J):Math.abs(P)===0?(ht=1,J=0):(gt=-.5*ht/P,ht=1/Math.sqrt(1+gt*gt),J=gt*ht),j>0&&(gt=ht,ht=-J,J=gt),{rt1:S,rt2:Q,cs:ht,sn:J}}let G=[],$={},K=[],ct=new Ot,F=new Ot,V=new Ot,O=new Ot,lt=new ft,mt=new k,vt=new Ot,Ct=new DOMParser().parseFromString(t,"image/svg+xml");return n(Ct.documentElement,{fill:"#000",fillOpacity:1,strokeOpacity:1,strokeWidth:1,strokeLineJoin:"miter",strokeLineCap:"butt",strokeMiterLimit:4}),{paths:G,xml:Ct.documentElement}}static createShapes(t){let n={ORIGIN:0,DESTINATION:1,BETWEEN:2,LEFT:3,RIGHT:4,BEHIND:5,BEYOND:6},s={loc:n.ORIGIN,t:0};function r(_,p,h,T){let y=_.x,x=p.x,B=h.x,C=T.x,N=_.y,U=p.y,w=h.y,M=T.y,z=(C-B)*(N-w)-(M-w)*(y-B),G=(x-y)*(N-w)-(U-N)*(y-B),$=(M-w)*(x-y)-(C-B)*(U-N),K=z/$,ct=G/$;if($===0&&z!==0||K<=0||K>=1||ct<0||ct>1)return null;if(z===0&&$===0){for(let F=0;F<2;F++)if(a(F===0?h:T,_,p),s.loc==n.ORIGIN){let V=F===0?h:T;return{x:V.x,y:V.y,t:s.t}}else if(s.loc==n.BETWEEN){let V=+(y+s.t*(x-y)).toPrecision(10),O=+(N+s.t*(U-N)).toPrecision(10);return{x:V,y:O,t:s.t}}return null}else{for(let O=0;O<2;O++)if(a(O===0?h:T,_,p),s.loc==n.ORIGIN){let lt=O===0?h:T;return{x:lt.x,y:lt.y,t:s.t}}let F=+(y+K*(x-y)).toPrecision(10),V=+(N+K*(U-N)).toPrecision(10);return{x:F,y:V,t:K}}}function a(_,p,h){let T=h.x-p.x,y=h.y-p.y,x=_.x-p.x,B=_.y-p.y,C=T*B-x*y;if(_.x===p.x&&_.y===p.y){s.loc=n.ORIGIN,s.t=0;return}if(_.x===h.x&&_.y===h.y){s.loc=n.DESTINATION,s.t=1;return}if(C<-Number.EPSILON){s.loc=n.LEFT;return}if(C>Number.EPSILON){s.loc=n.RIGHT;return}if(T*x<0||y*B<0){s.loc=n.BEHIND;return}if(Math.sqrt(T*T+y*y)<Math.sqrt(x*x+B*B)){s.loc=n.BEYOND;return}let N;T!==0?N=x/T:N=B/y,s.loc=n.BETWEEN,s.t=N}function o(_,p){let h=[],T=[];for(let y=1;y<_.length;y++){let x=_[y-1],B=_[y];for(let C=1;C<p.length;C++){let N=p[C-1],U=p[C],w=r(x,B,N,U);w!==null&&h.find(M=>M.t<=w.t+Number.EPSILON&&M.t>=w.t-Number.EPSILON)===void 0&&(h.push(w),T.push(new ft(w.x,w.y)))}}return T}function c(_,p,h){let T=new ft;p.getCenter(T);let y=[];return h.forEach(x=>{x.boundingBox.containsPoint(T)&&o(_,x.points).forEach(C=>{y.push({identifier:x.identifier,isCW:x.isCW,point:C})})}),y.sort((x,B)=>x.point.x-B.point.x),y}function l(_,p,h,T,y){(y==null||y==="")&&(y="nonzero");let x=new ft;_.boundingBox.getCenter(x);let B=[new ft(h,x.y),new ft(T,x.y)],C=c(B,_.boundingBox,p);C.sort((G,$)=>G.point.x-$.point.x);let N=[],U=[];C.forEach(G=>{G.identifier===_.identifier?N.push(G):U.push(G)});let w=N[0].point.x,M=[],z=0;for(;z<U.length&&U[z].point.x<w;)M.length>0&&M[M.length-1]===U[z].identifier?M.pop():M.push(U[z].identifier),z++;if(M.push(_.identifier),y==="evenodd"){let G=M.length%2===0,$=M[M.length-2];return{identifier:_.identifier,isHole:G,for:$}}else if(y==="nonzero"){let G=!0,$=null,K=null;for(let ct=0;ct<M.length;ct++){let F=M[ct];G?(K=p[F].isCW,G=!1,$=F):K!==p[F].isCW&&(K=p[F].isCW,G=!0)}return{identifier:_.identifier,isHole:G,for:$}}else console.warn('fill-rule: "'+y+'" is currently not implemented.')}let u=999999999,d=-999999999,f=t.subPaths.map(_=>{let p=_.getPoints(),h=-999999999,T=999999999,y=-999999999,x=999999999;for(let B=0;B<p.length;B++){let C=p[B];C.y>h&&(h=C.y),C.y<T&&(T=C.y),C.x>y&&(y=C.x),C.x<x&&(x=C.x)}return d<=y&&(d=y+1),u>=x&&(u=x-1),{curves:_.curves,points:p,isCW:kn.isClockWise(p),identifier:-1,boundingBox:new sa(new ft(x,T),new ft(y,h))}});f=f.filter(_=>_.points.length>1);for(let _=0;_<f.length;_++)f[_].identifier=_;let m=f.map(_=>l(_,f,u,d,t.userData?t.userData.style.fillRule:void 0)),g=[];return f.forEach(_=>{if(!m[_.identifier].isHole){let h=new zn;h.curves=_.curves,m.filter(y=>y.isHole&&y.for===_.identifier).forEach(y=>{let x=f[y.identifier],B=new sn;B.curves=x.curves,h.holes.push(B)}),g.push(h)}}),g}static getStrokeStyle(t,e,n,s,r){return t=t!==void 0?t:1,e=e!==void 0?e:"#000",n=n!==void 0?n:"miter",s=s!==void 0?s:"butt",r=r!==void 0?r:4,{strokeColor:e,strokeWidth:t,strokeLineJoin:n,strokeLineCap:s,strokeMiterLimit:r}}static pointsToStroke(t,e,n,s){let r=[],a=[],o=[];if(i.pointsToStrokeWithBuffers(t,e,n,s,r,a,o)===0)return null;let c=new we;return c.setAttribute("position",new te(r,3)),c.setAttribute("normal",new te(a,3)),c.setAttribute("uv",new te(o,2)),c}static pointsToStrokeWithBuffers(t,e,n,s,r,a,o,c){let l=new ft,u=new ft,d=new ft,f=new ft,m=new ft,g=new ft,_=new ft,p=new ft,h=new ft,T=new ft,y=new ft,x=new ft,B=new ft,C=new ft,N=new ft,U=new ft,w=new ft;n=n!==void 0?n:12,s=s!==void 0?s:.001,c=c!==void 0?c:0,t=j(t);let M=t.length;if(M<2)return 0;let z=t[0].equals(t[M-1]),G,$=t[0],K,ct=e.strokeWidth/2,F=1/(M-1),V=0,O,lt,mt,vt,Ct=!1,Xt=0,D=c*3,P=c*2;R(t[0],t[1],l).multiplyScalar(ct),p.copy(t[0]).sub(l),h.copy(t[0]).add(l),T.copy(p),y.copy(h);for(let b=1;b<M;b++){G=t[b],b===M-1?z?K=t[1]:K=void 0:K=t[b+1];let et=l;if(R($,G,et),d.copy(et).multiplyScalar(ct),x.copy(G).sub(d),B.copy(G).add(d),O=V+F,lt=!1,K!==void 0){R(G,K,u),d.copy(u).multiplyScalar(ct),C.copy(G).sub(d),N.copy(G).add(d),mt=!0,d.subVectors(K,$),et.dot(d)<0&&(mt=!1),b===1&&(Ct=mt),d.subVectors(K,G),d.normalize();let tt=Math.abs(et.dot(d));if(tt>Number.EPSILON){let at=ct/tt;d.multiplyScalar(-at),f.subVectors(G,$),m.copy(f).setLength(at).add(d),U.copy(m).negate();let I=m.length(),L=f.length();f.divideScalar(L),g.subVectors(K,G);let it=g.length();switch(g.divideScalar(it),f.dot(U)<L&&g.dot(U)<it&&(lt=!0),w.copy(m).add(G),U.add(G),vt=!1,lt?mt?(N.copy(U),B.copy(U)):(C.copy(U),x.copy(U)):ht(),e.strokeLineJoin){case"bevel":J(mt,lt,O);break;case"round":gt(mt,lt),mt?Q(G,x,C,O,0):Q(G,N,B,O,1);break;case"miter":case"miter-clip":default:let E=ct*e.strokeMiterLimit/I;if(E<1)if(e.strokeLineJoin!=="miter-clip"){J(mt,lt,O);break}else gt(mt,lt),mt?(g.subVectors(w,x).multiplyScalar(E).add(x),_.subVectors(w,C).multiplyScalar(E).add(C),S(x,O,0),S(g,O,0),S(G,O,.5),S(G,O,.5),S(g,O,0),S(_,O,0),S(G,O,.5),S(_,O,0),S(C,O,0)):(g.subVectors(w,B).multiplyScalar(E).add(B),_.subVectors(w,N).multiplyScalar(E).add(N),S(B,O,1),S(g,O,1),S(G,O,.5),S(G,O,.5),S(g,O,1),S(_,O,1),S(G,O,.5),S(_,O,1),S(N,O,1));else lt?(mt?(S(h,V,1),S(p,V,0),S(w,O,0),S(h,V,1),S(w,O,0),S(U,O,1)):(S(h,V,1),S(p,V,0),S(w,O,1),S(p,V,0),S(U,O,0),S(w,O,1)),mt?C.copy(w):N.copy(w)):mt?(S(x,O,0),S(w,O,0),S(G,O,.5),S(G,O,.5),S(w,O,0),S(C,O,0)):(S(B,O,1),S(w,O,1),S(G,O,.5),S(G,O,.5),S(w,O,1),S(N,O,1)),vt=!0;break}}else ht()}else ht();!z&&b===M-1&&Z(t[0],T,y,mt,!0,V),V=O,$=G,p.copy(C),h.copy(N)}if(!z)Z(G,x,B,mt,!1,O);else if(lt&&r){let b=w,et=U;Ct!==mt&&(b=U,et=w),mt?(vt||Ct)&&(et.toArray(r,0*3),et.toArray(r,3*3),vt&&b.toArray(r,1*3)):(vt||!Ct)&&(et.toArray(r,1*3),et.toArray(r,3*3),vt&&b.toArray(r,0*3))}return Xt;function R(b,et,tt){return tt.subVectors(et,b),tt.set(-tt.y,tt.x).normalize()}function S(b,et,tt){r&&(r[D]=b.x,r[D+1]=b.y,r[D+2]=0,a&&(a[D]=0,a[D+1]=0,a[D+2]=1),D+=3,o&&(o[P]=et,o[P+1]=tt,P+=2)),Xt+=3}function Q(b,et,tt,at,I){l.copy(et).sub(b).normalize(),u.copy(tt).sub(b).normalize();let L=Math.PI,it=l.dot(u);Math.abs(it)<1&&(L=Math.abs(Math.acos(it))),L/=n,d.copy(et);for(let E=0,v=n-1;E<v;E++)f.copy(d).rotateAround(b,L),S(d,at,I),S(f,at,I),S(b,at,.5),d.copy(f);S(f,at,I),S(tt,at,I),S(b,at,.5)}function ht(){S(h,V,1),S(p,V,0),S(x,O,0),S(h,V,1),S(x,O,0),S(B,O,1)}function J(b,et,tt){et?b?(S(h,V,1),S(p,V,0),S(x,O,0),S(h,V,1),S(x,O,0),S(U,O,1),S(x,tt,0),S(C,tt,0),S(U,tt,.5)):(S(h,V,1),S(p,V,0),S(B,O,1),S(p,V,0),S(U,O,0),S(B,O,1),S(B,tt,1),S(U,tt,0),S(N,tt,1)):b?(S(x,tt,0),S(C,tt,0),S(G,tt,.5)):(S(B,tt,1),S(N,tt,0),S(G,tt,.5))}function gt(b,et){et&&(b?(S(h,V,1),S(p,V,0),S(x,O,0),S(h,V,1),S(x,O,0),S(U,O,1),S(x,V,0),S(G,O,.5),S(U,O,1),S(G,O,.5),S(C,V,0),S(U,O,1)):(S(h,V,1),S(p,V,0),S(B,O,1),S(p,V,0),S(U,O,0),S(B,O,1),S(B,V,1),S(U,O,0),S(G,O,.5),S(G,O,.5),S(U,O,0),S(N,V,1)))}function Z(b,et,tt,at,I,L){switch(e.strokeLineCap){case"round":I?Q(b,tt,et,L,.5):Q(b,et,tt,L,.5);break;case"square":if(I)l.subVectors(et,b),u.set(l.y,-l.x),d.addVectors(l,u).add(b),f.subVectors(u,l).add(b),at?(d.toArray(r,1*3),f.toArray(r,0*3),f.toArray(r,3*3)):(d.toArray(r,1*3),o[3*2+1]===1?f.toArray(r,3*3):d.toArray(r,3*3),f.toArray(r,0*3));else{l.subVectors(tt,b),u.set(l.y,-l.x),d.addVectors(l,u).add(b),f.subVectors(u,l).add(b);let it=r.length;at?(d.toArray(r,it-1*3),f.toArray(r,it-2*3),f.toArray(r,it-4*3)):(f.toArray(r,it-2*3),d.toArray(r,it-1*3),f.toArray(r,it-4*3))}break;case"butt":default:break}}function j(b){let et=!1;for(let at=1,I=b.length-1;at<I;at++)if(b[at].distanceTo(b[at+1])<s){et=!0;break}if(!et)return b;let tt=[];tt.push(b[0]);for(let at=1,I=b.length-1;at<I;at++)b[at].distanceTo(b[at+1])>=s&&tt.push(b[at]);return tt.push(b[b.length-1]),tt}}};var Wx="M106,79 L106,54 L79,54 L79,79 L63.1,79 L54,104 L79,104 L79,154 L107.35,154 C112.605,154 117.3,150.7125 119.095,145.775 L124.56,130.76 C124.56,130.76 125.205,129 127.075,129 L166.7,129 L175.8,104 L143.0525,104 C137.7975,104 133.1025,107.2875 131.3075,112.225 L125.8425,127.2375 C125.8425,127.2375 125.2,129 123.3275,129 L106,129 L106,104 L125.55,104 C130.805,104 135.5,100.7125 137.295,95.775 L142.76,80.76 C142.76,80.76 143.405,79 145.275,79 L189.9,79 L199,54 L161.2525,54 C155.9975,54 151.3025,57.2875 149.5075,62.225 L144.0425,77.2375 C144.0425,77.2375 143.4,79 141.5275,79 L106.0025,79 L106,79 Z",Ds;function Xx(){if(Ds)return Ds;let i=`<svg xmlns="http://www.w3.org/2000/svg"><path d="${Wx}"/></svg>`,{paths:t}=new Ns().parse(i),e=t.flatMap(s=>Ns.createShapes(s)),n=new Set;return e.forEach(s=>s.curves.forEach(r=>["v0","v1","v2","v3"].forEach(a=>r[a]&&n.add(r[a])))),n.forEach(s=>s.y*=-1),Ds=new Jr(e,{depth:22,curveSegments:16,bevelEnabled:!0,bevelThickness:3,bevelSize:2,bevelSegments:4}),Ds.center(),Ds}function ku({onDark:i=!1}={}){let t=new Kr({color:i?16777215:5441529,roughness:.32,metalness:.05,clearcoat:.6,clearcoatRoughness:.25}),e=new fe(Xx(),t),n=new pe;return n.add(e),n}var va=1920,Ma=1080,Hu=30,Vu=new kt(16185081),qx=new kt(5441529),Yx=i=>i<.5?4*i*i*i:1-Math.pow(-2*i+2,3)/2,$x=i=>1+2.2*Math.pow(i-1,3)+1.2*Math.pow(i-1,2);function tl(i){return new k(i.tx??i.x,i.ty??i.y,i.tz??0)}var ya=class{constructor(t){this.reducedMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches,this.clock=new ia,this.webgl=new kr({antialias:!0}),this.webgl.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.webgl.shadowMap.enabled=!0,this.webgl.shadowMap.type=zc,this.webgl.domElement.className="tf-webgl",t.appendChild(this.webgl.domElement),this.css=new ha,this.css.domElement.className="tf-css3d",t.appendChild(this.css.domElement),this.camera=new Re(Hu,1,10,2e5),this.lookAt=new k,this.scene=new Ms,this.cssScene=new Ms,this.scene.add(new ea(16777215,12167423,1.1));let e=new Qi(16777215,2.8);e.position.set(-600,900,1400),this.scene.add(e),this.pixels=new xa(this.scene),this.background=Vu.clone(),this.divider=0,this.pixelAmount=1,this.logos=[],this.updaters=[],this.pointer=new ft,this.flight=null,this.follow=null,window.addEventListener("pointermove",n=>{this.pointer.set(n.clientX/window.innerWidth*2-1,n.clientY/window.innerHeight*2-1)}),window.addEventListener("resize",()=>this.resize()),this.resize(),this.webgl.setAnimationLoop(()=>this.render())}addSlide(t,e,n){let s=new pi(t);return s.position.set(e,n,0),this.cssScene.add(s),s}addLogo(t,e,{onDark:n=!1}={}){let s=ku({onDark:n});return s.position.set(t,e,60),s.userData.base=s.position.clone(),s.userData.born=this.clock.getElapsedTime(),s.scale.setScalar(1e-4),this.scene.add(s),this.logos.push(s),s}restDistance(t=va,e=Ma){let n=Math.tan(He.degToRad(Hu/2));return Math.max(e/2/n,t/2/(n*this.camera.aspect))}resize(){let t=window.innerWidth,e=window.innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.webgl.setSize(t,e),this.css.setSize(t,e),this.pixels.resize(this.camera,this.restDistance()*1.7),this.target&&!this.follow&&this.jumpTo(this.target)}flyTo(t,{onArrive:e}={}){if(this.target=t,this.reducedMotion){this.jumpTo(t),e?.();return}let n=this.camera.position.clone(),s=Math.hypot(t.x-n.x,t.y-n.y),r=He.clamp(.75+Math.log10(1+s/1500)*.55,.75,1.6);this.flight={from:n,fromTarget:this.lookAt.clone(),fromDivider:this.divider,fromPixels:this.pixelAmount,to:t,toTarget:tl(t),start:this.clock.getElapsedTime(),duration:r,arc:t.arc??Math.min(s*.42,9e3),dir:new ft(t.x-n.x,t.y-n.y).normalize(),onArrive:e},t.ripple&&this.pixels.ripple(t.x,t.y,this.flight.start+r*.55)}jumpTo(t){this.target=t,this.flight=null,this.camera.position.set(t.x,t.y,t.z),this.lookAt.copy(tl(t)),this.camera.lookAt(this.lookAt),this.divider=t.divider??0,this.pixelAmount=t.pixels??1}render(){let t=Math.min(this.clock.getDelta(),.1),e=this.clock.getElapsedTime(),n=this.flight;if(n){let s=Math.min((e-n.start)/n.duration,1),r=Yx(s),a=Math.sin(Math.PI*r);this.camera.position.lerpVectors(n.from,new k(n.to.x,n.to.y,n.to.z),r),this.camera.position.z+=n.arc*a,this.lookAt.lerpVectors(n.fromTarget,n.toTarget,r);let o=.09*a*(this.camera.position.z-this.lookAt.z);this.camera.lookAt(this.lookAt.x+n.dir.x*o,this.lookAt.y+n.dir.y*o,this.lookAt.z);let c=He.smoothstep(s,.25,.75);this.divider=He.lerp(n.fromDivider,n.to.divider??0,c),this.pixelAmount=He.lerp(n.fromPixels,n.to.pixels??1,c),s>=1&&(this.flight=null,this.camera.lookAt(this.lookAt),n.onArrive?.())}else if(this.follow){let s=this.follow(),r=1-Math.exp(-t*(s.damping??2.2));this.camera.position.lerp(new k(s.x,s.y,s.z),r),this.lookAt.lerp(tl(s),r),this.camera.lookAt(this.lookAt)}for(let s of this.updaters)s(e,t);this.background.copy(Vu).lerp(qx,this.divider),this.webgl.setClearColor(this.background),this.pixels.divider=this.divider,this.pixels.update(this.camera,e,this.restDistance(),this.pixelAmount);for(let s of this.logos){let r=Math.min((e-s.userData.born-.3)/1.4,1);s.scale.setScalar(Math.max($x(Math.max(r,0)),1e-4)*3.4),s.rotation.set(Math.cos(e*.4)*.1+this.pointer.y*.18,Math.sin(e*.5)*.32+this.pointer.x*.35+(1-Math.max(r,0))*2.5,0),s.position.y=s.userData.base.y+Math.sin(e*.8)*14}this.webgl.render(this.scene,this.camera),this.css.render(this.cssScene,this.camera)}};var Zx=480,Jx=420,Kx='<svg viewBox="54 54 145 100" aria-hidden="true"><path fill="currentColor" d="M106,79 L106,54 L79,54 L79,79 L63.1,79 L54,104 L79,104 L79,154 L107.35,154 C112.605,154 117.3,150.7125 119.095,145.775 L124.56,130.76 C124.56,130.76 125.205,129 127.075,129 L166.7,129 L175.8,104 L143.0525,104 C137.7975,104 133.1025,107.2875 131.3075,112.225 L125.8425,127.2375 C125.8425,127.2375 125.2,129 123.3275,129 L106,129 L106,104 L125.55,104 C130.805,104 135.5,100.7125 137.295,95.775 L142.76,80.76 C142.76,80.76 143.405,79 145.275,79 L189.9,79 L199,54 L161.2525,54 C155.9975,54 151.3025,57.2875 149.5075,62.225 L144.0425,77.2375 C144.0425,77.2375 143.4,79 141.5275,79 L106.0025,79 L106,79 Z"/></svg>',ba=class{constructor(t,e){this.slides=e,this.index=0,this.fragment=0,this.overview=!1;let n=document.createElement("div");n.className="tf-stage",document.body.appendChild(n),this.stage=new ya(n);for(let a of e){a.x=a.col*(va+Zx),a.y=-a.row*(Ma+Jx),a.divider=a.el.classList.contains("divider"),a.object=this.stage.addSlide(a.el,a.x,a.y);let o=ga[a.el.dataset.scene];o&&(a.scene=o.create(this.stage,a.object.position)),a.el.addEventListener("click",()=>this.overview&&this.closeOverview(e.indexOf(a))),(a.el.classList.contains("title")||a.el.hasAttribute("data-logo"))&&this.stage.addLogo(a.x+470,a.y-10,{onDark:a.divider})}t.remove(),this.createHud(t.dataset.footer),this.bindInput();let[s,r]=this.readHash();this.show(s,r,{instant:!0})}createHud(t){this.hud=document.createElement("div"),this.hud.className="tf-hud",this.hud.innerHTML=`
      <div class="tf-progress"><span></span></div>
      <div class="tf-footer">${Kx}<span></span></div>
      <div class="tf-counter"></div>
      <div class="tf-blackout"></div>`,this.hud.querySelector(".tf-footer span").textContent=t||"",document.body.appendChild(this.hud)}bindInput(){document.addEventListener("keydown",e=>{if(e.altKey||e.ctrlKey||e.metaKey||e.target.closest?.("input, textarea, [contenteditable]"))return;let s={ArrowRight:()=>this.next(),ArrowDown:()=>this.next(),PageDown:()=>this.next()," ":()=>e.shiftKey?this.prev():this.next(),n:()=>this.next(),ArrowLeft:()=>this.prev(),ArrowUp:()=>this.prev(),PageUp:()=>this.prev(),Backspace:()=>this.prev(),p:()=>this.prev(),Home:()=>this.show(0,0),End:()=>this.show(this.slides.length-1,1/0),o:()=>this.overview?this.closeOverview():this.openOverview(),Escape:()=>this.overview?this.closeOverview():this.openOverview(),f:()=>this.toggleFullscreen(),b:()=>this.hud.classList.toggle("blackout"),".":()=>this.hud.classList.toggle("blackout")}[e.key.length===1?e.key.toLowerCase():e.key];s&&(e.preventDefault(),s())});let t=null;window.addEventListener("touchstart",e=>t=e.touches[0],{passive:!0}),window.addEventListener("touchend",e=>{if(!t)return;let n=e.changedTouches[0].clientX-t.clientX;Math.abs(n)>60&&(n<0?this.next():this.prev()),t=null}),window.addEventListener("hashchange",()=>{let[e,n]=this.readHash();(e!==this.index||n!==this.fragment)&&this.show(e,n)})}next(){if(this.overview)return this.closeOverview();this.fragment<this.slides[this.index].fragments.length?this.setFragment(this.fragment+1):this.index<this.slides.length-1&&this.show(this.index+1,0)}prev(){if(this.overview)return this.closeOverview();this.fragment>0?this.setFragment(this.fragment-1):this.index>0&&this.show(this.index-1,1/0)}setFragment(t,{instant:e=!1}={}){this.fragment=t;let n=this.slides[this.index];n.fragments.forEach((s,r)=>{s.classList.toggle("visible",r<t),s.classList.toggle("current-fragment",r===t-1)}),n.scene?.setStep(t,{instant:e}),this.writeHash()}show(t,e=0,{instant:n=!1}={}){t=Math.max(0,Math.min(t,this.slides.length-1));let s=this.slides[this.index],r=this.slides[t];this.index=t,this.slides.forEach((l,u)=>{u!==t&&l.fragments.forEach(d=>d.classList.toggle("visible",u<t))}),this.stage.follow=null,r.scene?.setActive(!0),this.setFragment(Math.min(e,r.fragments.length),{instant:!0}),this.slides.forEach(l=>l.el.classList.remove("present","leaving")),r.el.classList.add("present"),s!==r&&!n&&s.el.classList.add("leaving");let a=r.scene?r.scene.cameraPose():{x:r.x,y:r.y,z:this.stage.restDistance(),divider:r.divider?1:0,ripple:!0},o=()=>this.slides.forEach(l=>l!==this.slides[this.index]&&l.scene?.setActive(!1)),c=()=>{s.el.classList.remove("leaving"),o()};n?(o(),this.stage.jumpTo(a)):this.stage.flyTo(a,{onArrive:c}),this.updateHud()}openOverview(){this.overview=!0,this.slides.forEach(r=>r.scene?.setActive(!1)),document.documentElement.classList.add("tf-overview");let t=this.slides.map(r=>r.x),e=this.slides.map(r=>r.y),n=Math.max(...t)-Math.min(...t)+va,s=Math.max(...e)-Math.min(...e)+Ma;this.stage.flyTo({x:(Math.max(...t)+Math.min(...t))/2,y:(Math.max(...e)+Math.min(...e))/2,z:this.stage.restDistance(n*1.08,s*1.12),divider:0})}closeOverview(t=this.index){this.overview=!1,document.documentElement.classList.remove("tf-overview"),this.show(t,t===this.index?this.fragment:0)}toggleFullscreen(){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}updateHud(){let t=this.slides[this.index],e=this.slides.length;this.hud.classList.toggle("on-dark",t.divider),this.hud.querySelector(".tf-progress span").style.transform=`scaleX(${e>1?this.index/(e-1):1})`,this.hud.querySelector(".tf-counter").textContent=`${String(this.index+1).padStart(2,"0")} / ${String(e).padStart(2,"0")}`}readHash(){let t=location.hash.match(/^#\/(\d+)(?:\/(\d+))?/);return t?[Number(t[1])-1,Number(t[2]||0)]:[0,0]}writeHash(){let t=`#/${this.index+1}${this.fragment?`/${this.fragment}`:""}`;location.hash!==t&&history.replaceState(null,"",t)}};async function Gu(){let i=document.querySelector(".tf-deck");if(!i)return;let t=/print-pdf/i.test(location.search);document.documentElement.classList.add(t?"tf-print":"tf-live");let e=Ou(i);if(e.forEach(Fu),await Promise.all([document.fonts.load('400 32px "JetBrains Mono"'),document.fonts.load('600 32px "Inter Tight"')]).catch(()=>{}),e.forEach(n=>Bu(n.el)),t){e.forEach(n=>{n.fragments.forEach(s=>s.classList.add("visible")),i.appendChild(n.el)}),i.querySelectorAll(":scope > section:not(.tf-slide)").forEach(n=>n.remove());return}window.tfDeck=new ba(i,e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",Gu):Gu();})();
/*! For license information please see tf-deck.js.LEGAL.txt */
