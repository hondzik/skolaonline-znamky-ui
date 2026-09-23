var t="https://github.com/hondzik/skolaonline-znamky-ui";function e(t,e,i,s){var r,o=arguments.length,n=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,i,s);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,i,n):r(e,i))||n);return o>3&&n&&Object.defineProperty(e,i,n),n}"function"==typeof SuppressedError&&SuppressedError;const i=globalThis,s=i.ShadowRoot&&(void 0===i.ShadyCSS||i.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let n=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const i=1===t.length?t[0]:e.reduce((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1],t[0]);return new n(i,t,r)},c=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:p,getOwnPropertySymbols:u,getPrototypeOf:_}=Object,g=globalThis,f=g.trustedTypes,m=f?f.emptyScript:"",y=g.reactiveElementPolyfillSupport,v=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?m:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},b=(t,e)=>!d(t,e),w={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&h(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:s,set(e){const o=s?.call(this);r?.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(v("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(v("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(v("properties"))){const t=this.properties,e=[...p(t),...u(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(s)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of e){const e=document.createElement("style"),r=i.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=s.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:$).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=s;const o=r.fromAttribute(e,t.type);this[s]=o??this._$Ej?.get(s)??o,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(void 0!==t){const o=this.constructor;if(!1===s&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??b)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),!0===s&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t){const{wrapped:t}=i,s=this[e];!0!==t||this._$AL.has(e)||void 0===s||this.C(e,void 0,i,s)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[v("elementProperties")]=new Map,x[v("finalized")]=new Map,y?.({ReactiveElement:x}),(g.reactiveElementVersions??=[]).push("2.1.2");const k=globalThis,A=t=>t,E=k.trustedTypes,C=E?E.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,j="?"+z,M=`<${j}>`,T=document,P=()=>T.createComment(""),O=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,U="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,D=/>/g,L=RegExp(`>|${U}(?:([^\\s"'>=/]+)(${U}*=${U}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),I=/'/g,B=/"/g,V=/^(?:script|style|textarea|title)$/i,W=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),F=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Z=new WeakMap,K=T.createTreeWalker(T,129);function G(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==C?C.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<i;e++){const i=t[e];let a,c,d=-1,h=0;for(;h<i.length&&(n.lastIndex=h,c=n.exec(i),null!==c);)h=n.lastIndex,n===R?"!--"===c[1]?n=H:void 0!==c[1]?n=D:void 0!==c[2]?(V.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=L):void 0!==c[3]&&(n=L):n===L?">"===c[0]?(n=r??R,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?L:'"'===c[3]?B:I):n===B||n===I?n=L:n===H||n===D?n=R:(n=L,r=void 0);const l=n===L&&t[e+1].startsWith("/>")?" ":"";o+=n===R?i+M:d>=0?(s.push(a),i.slice(0,d)+S+i.slice(d)+z+l):i+z+(-2===d?e:l)}return[G(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class Y{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,d]=J(t,e);if(this.el=Y.createElement(c,i),K.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=K.nextNode())&&a.length<n;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[o++],i=s.getAttribute(t).split(z),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:i,ctor:"."===n[1]?it:"?"===n[1]?st:"@"===n[1]?rt:et}),s.removeAttribute(t)}else t.startsWith(z)&&(a.push({type:6,index:r}),s.removeAttribute(t));if(V.test(s.tagName)){const t=s.textContent.split(z),e=t.length-1;if(e>0){s.textContent=E?E.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],P()),K.nextNode(),a.push({type:2,index:++r});s.append(t[e],P())}}}else if(8===s.nodeType)if(s.data===j)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(z,t+1));)a.push({type:7,index:r}),t+=z.length-1}r++}}static createElement(t,e){const i=T.createElement("template");return i.innerHTML=t,i}}function Q(t,e,i=t,s){if(e===F)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=O(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,s)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??T).importNode(e,!0);K.currentNode=s;let r=K.nextNode(),o=0,n=0,a=i[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ot(r,this,t)),this._$AV.push(e),a=i[++n]}o!==a?.index&&(r=K.nextNode(),o++)}return K.currentNode=T,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),O(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==F&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&O(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=Y.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new X(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new Y(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new tt(this.O(P()),this.O(P()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=q}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!O(t)||t!==this._$AH&&t!==F,o&&(this._$AH=t);else{const s=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Q(this,s[i+n],e,n),a===F&&(a=this._$AH[n]),o||=!O(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!s&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class it extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class st extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class rt extends et{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===F)return;const i=this._$AH,s=t===q&&i!==q||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==q&&(i===q||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=k.litHtmlPolyfillSupport;nt?.(Y,tt),(k.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;class ct extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new tt(e.insertBefore(P(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const dt=at.litElementPolyfillSupport;dt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:b},pt=(t=lt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===s&&((t=Object.create(t)).wrapped=!0),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t,!0,i)},init(e){return void 0!==e&&this.C(s,void 0,t,e),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ut(t){return(e,i)=>"object"==typeof i?pt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)}function _t(t){return ut({...t,state:!0,attribute:!1})}var gt={no_entity:"Vyberte entitu integrace Škola OnLine – Známky.",history_button:"Celá historie",history_empty:"Žádné známky k zobrazení.",history_error:"Nepodařilo se načíst historii známek."},ft={entity:"Entita (dítě)",title:"Vlastní název (nepovinné)",title_font_size:"Velikost písma nadpisu",marks_font_size:"Velikost písma známek",size_by_weight:"Velikost podle váhy",size_by_weight_description:"Zvětší čtvereček známky podle její váhy vůči průměrné váze ostatních známek (funguje bez ohledu na to, jakou stupnici vah škola používá).",subjects_heading:"Pořadí a barvy předmětů",subjects_description:"Přetažením změníte pořadí předmětů na kartě, kliknutím na barevný kroužek nastavíte barvu předmětu.",reset_color:"Zrušit vlastní barvu",no_entity:"Nejprve vyberte entitu."},mt={card:gt,editor:ft},yt={no_entity:"Select an entity from the Škola OnLine – Marks integration.",history_button:"Full history",history_empty:"No marks to display.",history_error:"Failed to load mark history."},vt={entity:"Entity (child)",title:"Custom title (optional)",title_font_size:"Title font size",marks_font_size:"Marks font size",size_by_weight:"Size by weight",size_by_weight_description:"Scales a mark's chip size based on its weight relative to the average weight of the other marks (works regardless of which weight scale the school uses).",subjects_heading:"Subject order & colors",subjects_description:"Drag to reorder subjects on the card, click the color dot to set a subject's color.",reset_color:"Reset custom color",no_entity:"Select an entity first."},$t={card:yt,editor:vt};const bt={cs:Object.freeze({__proto__:null,card:gt,default:mt,editor:ft}),en:Object.freeze({__proto__:null,card:yt,default:$t,editor:vt})};function wt(t,e){const i=t.split(".").reduce((t,e)=>t&&"object"==typeof t?t[e]:void 0,bt[e]);return"string"==typeof i?i:void 0}function xt(t){return function(e){let i=wt(e,t?.locale.language??"en");return i||(i=wt(e,"en")),i||e}}const kt=[[1,[76,175,80]],[2,[139,195,74]],[3,[255,193,7]],[4,[255,152,0]],[5,[244,67,54]]];function At(t){const e=/^[1-5]/.exec(t.trim());return e?Number(e[0]):null}function Et(t){const e=Math.min(5,Math.max(1,t)),i=Math.min(kt.length-2,Math.floor(e-1)),[s,r]=kt[i],[o,n]=kt[i+1],a=(e-s)/(o-s),c=r.map((t,e)=>Math.round(t+(n[e]-t)*a));return`rgb(${c[0]}, ${c[1]}, ${c[2]})`}function Ct(t,e){if(e<=0)return 1.8;const i=t/e;return 1.8*Math.min(1.6,Math.max(.7,i))}async function St(t,e,i,s){const r=function(t,e){const i=t.entities?.[e]?.device_id,s=i?t.devices?.[i]?.config_entries?.[0]:void 0;if(!s)throw new Error(`Could not resolve config_entry_id for ${e} via the device registry`);return s}(t,e),o={config_entry_id:r,student_id:i};s&&(o.subject_id=s);return(await t.callService("skolaonline_znamky","get_marks",o,void 0,void 0,!0)).marks}function zt(t,e,i,s=new Date){return i.has(t)||function(t,e=new Date,i=3){const s=new Date(t).getTime();if(Number.isNaN(s))return!1;const r=e.getTime()-s;return r>=0&&r<=24*i*60*60*1e3}(e,s)}function jt(t,e){const i=new Map(t.subjects.map(t=>[t.subject_id,t])),s=e.subject_colors??{},r=new Set,o=[];for(const t of e.subject_order??[]){const e=i.get(t);e&&!r.has(t)&&(o.push(e),r.add(t))}const n=t.subjects.filter(t=>!r.has(t.subject_id)),a=new Intl.Collator("cs");return n.sort((e,i)=>a.compare(t.subject_names[e.subject_id]??e.subject_id,t.subject_names[i.subject_id]??i.subject_id)),[...o,...n].map(e=>({subject_id:e.subject_id,name:t.subject_names[e.subject_id]??e.subject_id,average:e.average,count:e.count,marks:e.marks,color:s[e.subject_id]}))}const Mt=a`
  :host {
    display: block;
  }

  ha-card {
    padding: 16px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
  }

  .student-name {
    font-size: var(--soz-title-font-size, 1.2em);
    font-weight: 500;
    color: var(--primary-text-color);
  }

  .context {
    font-size: 0.85em;
    color: var(--secondary-text-color);
  }

  .average {
    flex-shrink: 0;
    font-size: 1.6em;
    font-weight: 700;
    color: #fff;
    border-radius: 8px;
    padding: 4px 14px;
    min-width: 1.6em;
    text-align: center;
  }

  .subjects {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .subject-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px 10px;
    border-radius: 10px;
    border: 2px solid var(--subject-color, var(--primary-color));
    cursor: pointer;
  }

  .subject-row:hover {
    background: var(--secondary-background-color, rgba(0, 0, 0, 0.04));
  }

  .subject-row-top {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .subject-name {
    flex: 1;
    color: var(--primary-text-color);
    font-size: 0.95em;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .subject-average {
    font-weight: 600;
    min-width: 2.4em;
    text-align: right;
    flex-shrink: 0;
  }

  .marks {
    display: flex;
    gap: 4px;
    align-items: center;
    flex-wrap: wrap;
  }

  .mark-chip {
    width: 1.8em;
    height: 1.8em;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #fff;
    font-size: var(--soz-marks-font-size, 0.8em);
    font-weight: 600;
    position: relative;
  }

  .mark-chip.heavy {
    box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.35);
  }

  .mark-chip.new::after {
    content: '';
    position: absolute;
    top: -3px;
    right: -3px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: var(--error-color, #f44336);
    box-shadow: 0 0 0 2px var(--card-background-color, #fff);
  }

  .more-marks {
    color: var(--secondary-text-color);
    font-size: var(--soz-marks-font-size, 0.8em);
    padding-left: 2px;
    flex-shrink: 0;
  }

  .footer {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }

  .history {
    margin-top: 12px;
    border-top: 1px solid var(--divider-color, #e0e0e0);
    padding-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .history-row {
    display: flex;
    gap: 8px;
    align-items: baseline;
    padding: 4px 0;
    font-size: 0.85em;
    border-bottom: 1px solid var(--divider-color, #e0e0e0);
  }

  .history-row:last-child {
    border-bottom: none;
  }

  .history-date {
    color: var(--secondary-text-color);
    flex-shrink: 0;
    width: 5.5em;
  }

  .history-value {
    font-weight: 600;
    flex-shrink: 0;
  }

  .history-theme {
    flex: 1;
    color: var(--primary-text-color);
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .history-loading {
    display: flex;
    justify-content: center;
    padding: 12px;
  }

  .history-error {
    color: var(--error-color);
  }

  .empty {
    color: var(--secondary-text-color);
    text-align: center;
    padding: 16px;
  }
`,Tt=a`
  :host {
    display: block;
  }

  .list-item {
    background: var(--card-background-color, #fff);
    border: 1px solid var(--divider-color, #e0e0e0);
    padding: 12px 16px;
    margin-bottom: 8px;
    border-radius: 6px;
    cursor: grab;
    user-select: none;
    display: flex;
    align-items: center;
    gap: 12px;
    transition: all 0.15s;
    position: relative;
  }

  .list-item:last-child {
    margin-bottom: 0;
  }

  .list-item:active {
    cursor: grabbing;
  }

  .list-item.dragging {
    opacity: 0.5;
  }

  .item-leading {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    width: 24px;
    height: 24px;
    color: var(--primary-text-color, #333);
  }

  .item-trailing {
    flex-shrink: 0;
    display: flex;
    align-items: center;
  }

  .drag-handle {
    color: var(--secondary-text-color, #999);
    font-size: 18px;
    flex-shrink: 0;
    cursor: grab;
  }

  .list-item:active .drag-handle {
    cursor: grabbing;
  }

  .item-content {
    flex: 1;
    color: var(--primary-text-color, #333);
    font-size: 15px;
  }

  .drop-indicator {
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--primary-color, #2563eb);
    border-radius: 1px;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.1s;
  }

  .drop-indicator.top {
    top: -4px;
  }

  .drop-indicator.bottom {
    bottom: -4px;
  }

  .drop-indicator.show {
    opacity: 1;
  }
`;let Pt=class extends ct{constructor(){super(...arguments),this.items=[]}render(){return W` <div class="sortable-list">${this.items.map(t=>this.renderItem(t))}</div> `}renderItem(t){const e=this._draggedId===t.id,i=this._dropTarget?.id===t.id&&"top"===this._dropTarget.position,s=this._dropTarget?.id===t.id&&"bottom"===this._dropTarget.position;return W`
      <div
        class="list-item ${e?"dragging":""}"
        draggable="true"
        @dragstart=${e=>this.onDragStart(e,t)}
        @dragend=${()=>this.onDragEnd()}
        @dragover=${e=>this.onDragOver(e,t)}
        @dragleave=${e=>this.onDragLeave(e,t)}
        @drop=${e=>this.onDrop(e,t)}
      >
        <div class="drop-indicator top ${i?"show":""}"></div>
        <div class="drop-indicator bottom ${s?"show":""}"></div>
        <span class="drag-handle">⋮⋮</span>
        ${this.renderLeading?W`<div class="item-leading">${this.renderLeading(t)}</div>`:""}
        <div class="item-content">${t.label}</div>
        ${this.renderTrailing?W`<div class="item-trailing">${this.renderTrailing(t)}</div>`:""}
      </div>
    `}onDragStart(t,e){this._draggedId=e.id,t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}onDragEnd(){this._draggedId=void 0,this._dropTarget=void 0}onDragOver(t,e){if(t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move"),e.id===this._draggedId)return;const i=t.currentTarget.getBoundingClientRect(),s=i.top+i.height/2;this._dropTarget={id:e.id,position:t.clientY<s?"top":"bottom"}}onDragLeave(t,e){this._dropTarget?.id===e.id&&t.target===t.currentTarget&&(this._dropTarget=void 0)}onDrop(t,e){t.preventDefault(),t.stopPropagation();const i=this._draggedId,s=this._dropTarget?.position;if(this._dropTarget=void 0,!i||i===e.id)return;const r=[...this.items],o=r.findIndex(t=>t.id===i);if(-1===o)return;const[n]=r.splice(o,1);let a=r.findIndex(t=>t.id===e.id);"bottom"===s&&(a+=1),r.splice(a,0,n),this.items=r,this.dispatchEvent(new CustomEvent("reorder",{detail:{items:r},bubbles:!0,composed:!0}))}static get styles(){return Tt}};e([ut({attribute:!1})],Pt.prototype,"items",void 0),e([ut({attribute:!1})],Pt.prototype,"renderLeading",void 0),e([ut({attribute:!1})],Pt.prototype,"renderTrailing",void 0),e([_t()],Pt.prototype,"_draggedId",void 0),e([_t()],Pt.prototype,"_dropTarget",void 0),Pt=e([ht("so-sortable-list")],Pt);let Ot=class extends ct{constructor(){super(...arguments),this._config={type:"custom:skolaonline-znamky-ui-marks-all-card",entity:""}}setConfig(t){this._config={...t}}get _attrs(){if(this.hass&&this._config.entity)return this.hass.states[this._config.entity]?.attributes}render(){if(!this.hass)return W``;const t=xt(this.hass);return W`
      <div class="card-config">
        <ha-selector
          .hass=${this.hass}
          .selector=${{entity:{filter:{integration:"skolaonline_znamky",domain:"sensor"}}}}
          .value=${this._config.entity}
          .label=${t("editor.entity")}
          @value-changed=${this._entityChanged}
        ></ha-selector>

        <ha-textfield .label=${t("editor.title")} .value=${this._config.title??""} @input=${this._titleChanged}></ha-textfield>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:12,max:32,step:1,mode:"box",unit_of_measurement:"px"}}}
          .value=${this._config.title_font_size??20}
          .label=${t("editor.title_font_size")}
          @value-changed=${this._titleFontSizeChanged}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:8,max:24,step:1,mode:"box",unit_of_measurement:"px"}}}
          .value=${this._config.marks_font_size??14}
          .label=${t("editor.marks_font_size")}
          @value-changed=${this._marksFontSizeChanged}
        ></ha-selector>

        <ha-formfield class="switch-row" .label=${t("editor.size_by_weight")}>
          <ha-switch .checked=${this._config.size_by_weight??!1} @change=${this._sizeByWeightChanged}></ha-switch>
        </ha-formfield>
        <div class="section-description">${t("editor.size_by_weight_description")}</div>

        ${this._renderSubjects(t)}
      </div>
    `}_renderSubjects(t){const e=this._attrs;if(!e)return W`<div class="section-note">${t("editor.no_entity")}</div>`;const i=jt(e,this._config),s=i.map(t=>({id:t.subject_id,label:t.name}));return W`
      <div class="section-heading">${t("editor.subjects_heading")}</div>
      <div class="section-description">${t("editor.subjects_description")}</div>
      <so-sortable-list
        .items=${s}
        .renderLeading=${t=>this._renderColorSwatch(t,i)}
        .renderTrailing=${e=>this._renderResetButton(e,t)}
        @reorder=${this._onReorder}
      ></so-sortable-list>
    `}_renderColorSwatch(t,e){const i=e.find(e=>e.subject_id===t.id)?.color??"#3f51b5";return W`<input type="color" class="color-swatch" .value=${i} @click=${t=>t.stopPropagation()} @input=${e=>this._colorChanged(t.id,e)} />`}_renderResetButton(t,e){return W`
      <ha-icon-button .label=${e("editor.reset_color")} @click=${e=>this._resetColor(t.id,e)}>
        <ha-icon icon="mdi:format-color-reset"></ha-icon>
      </ha-icon-button>
    `}_entityChanged(t){this._updateConfig({...this._config,entity:t.detail.value})}_titleChanged(t){const e=t.target.value;this._updateConfig({...this._config,title:e||void 0})}_titleFontSizeChanged(t){this._updateConfig({...this._config,title_font_size:t.detail.value})}_marksFontSizeChanged(t){this._updateConfig({...this._config,marks_font_size:t.detail.value})}_sizeByWeightChanged(t){const e=t.target.checked;this._updateConfig({...this._config,size_by_weight:e})}_colorChanged(t,e){e.stopPropagation();const i=e.target.value;this._updateConfig({...this._config,subject_colors:{...this._config.subject_colors,[t]:i}})}_resetColor(t,e){e.stopPropagation();const i={...this._config.subject_colors};delete i[t],this._updateConfig({...this._config,subject_colors:i})}_onReorder(t){this._updateConfig({...this._config,subject_order:t.detail.items.map(t=>t.id)})}_updateConfig(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}static get styles(){return a`
      .card-config {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .section-heading {
        font-weight: 500;
        color: var(--primary-text-color);
        margin-top: 4px;
      }

      .section-description {
        font-size: 0.85em;
        color: var(--secondary-text-color);
        margin-bottom: 4px;
      }

      .section-note {
        color: var(--secondary-text-color);
        font-size: 0.9em;
      }

      .switch-row {
        display: flex;
        align-items: center;
        color: var(--primary-text-color);
      }

      .color-swatch {
        width: 24px;
        height: 24px;
        padding: 0;
        border: none;
        border-radius: 50%;
        cursor: pointer;
      }
    `}};e([ut({attribute:!1})],Ot.prototype,"hass",void 0),e([_t()],Ot.prototype,"_config",void 0),Ot=e([ht("skolaonline-znamky-ui-marks-all-editor")],Ot);const Nt="skolaonline-znamky-ui-marks-all-card";let Ut=class extends ct{constructor(){super(...arguments),this._historyLoading=!1,this._newMarkIds=new Set}setConfig(t){if(!t?.entity)throw new Error('skolaonline-znamky-ui-marks-all-card: "entity" is required');this._config=t}getCardSize(){return 2+Math.max(1,this._subjects.length)}static getConfigElement(){return document.createElement("skolaonline-znamky-ui-marks-all-editor")}static getStubConfig(t,e,i){const s=t,r=[...e,...i].find(t=>"skolaonline_znamky"===s.entities?.[t]?.platform);if(!r)throw new Error("No skolaonline_znamky entity available");return{type:`custom:${Nt}`,entity:r}}connectedCallback(){super.connectedCallback(),this._subscribeNewMarks()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeEvents?.(),this._unsubscribeEvents=void 0}updated(t){t.has("hass")&&!this._unsubscribeEvents&&this._subscribeNewMarks()}async _subscribeNewMarks(){if(this.hass&&!this._unsubscribeEvents)try{this._unsubscribeEvents=await this.hass.connection.subscribeEvents(t=>this._onNewMarkEvent(t.data),"skolaonline_znamky_new_mark")}catch(t){console.error(`${Nt}: failed to subscribe to skolaonline_znamky_new_mark`,t)}}_onNewMarkEvent(t){t.student_id===this._attrs?.student_id&&(this._newMarkIds=new Set(this._newMarkIds).add(t.mark_id))}get _attrs(){if(this.hass&&this._config)return this.hass.states[this._config.entity]?.attributes}get _subjects(){const t=this._attrs;return t?jt(t,this._config??{}):[]}get _referenceWeight(){const t=this._attrs;return t?0===(e=t.subjects.flatMap(t=>t.marks.map(t=>t.weight))).length?0:e.reduce((t,e)=>t+e,0)/e.length:0;var e}render(){if(!this._config)return W``;const t=xt(this.hass),e=this._attrs;if(!e||!this.hass)return W`<ha-card><div class="empty">${t("card.no_entity")}</div></ha-card>`;const i=Number(this.hass.states[this._config.entity].state),s=`--soz-title-font-size:${this._config.title_font_size??20}px;--soz-marks-font-size:${this._config.marks_font_size??14}px;`;return W`
      <ha-card style=${s}>
        <div class="header">
          <div>
            <div class="student-name">${this._config.title||e.student_name}</div>
            <div class="context">${e.school_year} · ${e.semester_name}</div>
          </div>
          <div class="average" style="background:${Et(i)}">${Number.isFinite(i)?i.toFixed(2):"–"}</div>
        </div>
        <div class="subjects">${this._subjects.map(t=>this._renderSubjectRow(t))}</div>
        <div class="footer">
          <button class="history-toggle" @click=${()=>this._toggleHistory(null)}>${t("card.history_button")}</button>
        </div>
        ${void 0!==this._historyTarget?this._renderHistory(t):q}
      </ha-card>
    `}_renderSubjectRow(t){const e=[...t.marks].sort((t,e)=>t.date<e.date?1:-1),i=t.count-e.length,s=this._referenceWeight;return W`
      <div class="subject-row" style="--subject-color:${t.color??"var(--primary-color)"}" @click=${()=>this._toggleHistory(t.subject_id)}>
        <div class="subject-row-top">
          <div class="subject-name">${t.name}</div>
          <div class="subject-average" style="color:${Et(t.average)}">${t.average.toFixed(2)}</div>
        </div>
        <div class="marks">${e.map(t=>this._renderMarkChip(t,s))} ${i>0?W`<div class="more-marks">+${i}</div>`:q}</div>
      </div>
    `}_renderMarkChip(t,e){const i=At(t.value),s=null===i?"var(--disabled-text-color, #9e9e9e)":Et(i),r=zt(t.id,t.date,this._newMarkIds),o=e>0&&t.weight>e,n=this._config?.size_by_weight?`width:${Ct(t.weight,e)}em;height:${Ct(t.weight,e)}em;`:"";return W`
      <div class="mark-chip ${o?"heavy":""} ${r?"new":""}" style="background:${s};${n}" title="${t.date.slice(0,10)} · ${t.weight}">
        ${t.value}
      </div>
    `}async _toggleHistory(t){if(this._historyTarget===t)return void(this._historyTarget=void 0);this._historyTarget=t,this._historyMarks=void 0,this._historyError=void 0;const e=this._attrs;if(this.hass&&this._config&&e){this._historyLoading=!0;try{this._historyMarks=await St(this.hass,this._config.entity,e.student_id,t??void 0)}catch(t){this._historyError=t instanceof Error?t.message:String(t)}finally{this._historyLoading=!1}}}_renderHistory(t){if(this._historyLoading)return W`<div class="history">
        <div class="history-loading"><ha-spinner size="small"></ha-spinner></div>
      </div>`;if(this._historyError)return W`<div class="history"><ha-alert alert-type="error">${this._historyError}</ha-alert></div>`;if(!this._historyMarks?.length)return W`<div class="history"><div class="empty">${t("card.history_empty")}</div></div>`;const e=[...this._historyMarks].sort((t,e)=>t.date<e.date?1:-1);return W` <div class="history">${e.map(t=>this._renderHistoryRow(t))}</div> `}_renderHistoryRow(t){const e=At(t.value),i=null===e?"inherit":Et(e);return W`
      <div class="history-row">
        <span class="history-date">${t.date.slice(0,10)}</span>
        <span class="history-value" style="color:${i}">${t.value}</span>
        <span class="history-theme">${t.theme||t.verbal_evaluation||""}</span>
      </div>
    `}static get styles(){return Mt}};e([ut({attribute:!1})],Ut.prototype,"hass",void 0),e([_t()],Ut.prototype,"_config",void 0),e([_t()],Ut.prototype,"_historyTarget",void 0),e([_t()],Ut.prototype,"_historyMarks",void 0),e([_t()],Ut.prototype,"_historyLoading",void 0),e([_t()],Ut.prototype,"_historyError",void 0),e([_t()],Ut.prototype,"_newMarkIds",void 0),Ut=e([ht(Nt)],Ut),window.customCards=window.customCards||[],window.customCards.push({type:Nt,name:"Škola OnLine – Známky",description:"Karta se známkami dítěte ze zálohové integrace skolaonline_znamky.",preview:!0,documentationURL:"https://github.com/hondzik/skolaonline-znamky-ui"}),function(){const e="padding: 2px 4px; font-family: Roboto,Verdana,Geneva,sans-serif;",i=`background-color: rgb(255, 127, 15); color: rgb(0, 0, 49); ${e}`,s=`background-color: rgb(0, 0, 49); color: rgb(255, 127, 15); ${e}`;console.groupCollapsed("%cLovelace Cards for skola-online-znamky integration%c0.0.3",i,s),console.info("Lovelace Cards for skola-online-znamky integration"),console.info(`Github: ${t}`),console.groupEnd()}();
