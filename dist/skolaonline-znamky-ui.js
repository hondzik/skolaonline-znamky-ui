var t="https://github.com/hondzik/skolaonline-znamky-ui";function e(t,e,s,i){var r,o=arguments.length,n=o<3?e:null===i?i=Object.getOwnPropertyDescriptor(e,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)n=Reflect.decorate(t,e,s,i);else for(var a=t.length-1;a>=0;a--)(r=t[a])&&(n=(o<3?r(n):o>3?r(e,s,n):r(e,s))||n);return o>3&&n&&Object.defineProperty(e,s,n),n}"function"==typeof SuppressedError&&SuppressedError;const s=globalThis,i=s.ShadowRoot&&(void 0===s.ShadyCSS||s.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,r=Symbol(),o=new WeakMap;let n=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==r)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(i&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=o.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(e,t))}return t}toString(){return this.cssText}};const a=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,i)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[i+1],t[0]);return new n(s,t,r)},c=i?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new n("string"==typeof t?t:t+"",void 0,r))(e)})(t):t,{is:d,defineProperty:h,getOwnPropertyDescriptor:l,getOwnPropertyNames:u,getOwnPropertySymbols:p,getPrototypeOf:_}=Object,g=globalThis,m=g.trustedTypes,f=m?m.emptyScript:"",y=g.reactiveElementPolyfillSupport,b=(t,e)=>t,v={toAttribute(t,e){switch(e){case Boolean:t=t?f:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(t){s=null}}return s}},$=(t,e)=>!d(t,e),w={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:$};Symbol.metadata??=Symbol("metadata"),g.litPropertyMetadata??=new WeakMap;let k=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=w){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);void 0!==i&&h(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=l(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:i,set(e){const o=i?.call(this);r?.call(this,e),this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??w}static _$Ei(){if(this.hasOwnProperty(b("elementProperties")))return;const t=_(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(b("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(b("properties"))){const t=this.properties,e=[...u(t),...p(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const s=this._$Eu(t,e);void 0!==s&&this._$Eh.set(s,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(c(t))}else void 0!==t&&e.push(c(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{if(i)t.adoptedStyleSheets=e.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const i of e){const e=document.createElement("style"),r=s.litNonce;void 0!==r&&e.setAttribute("nonce",r),e.textContent=i.cssText,t.appendChild(e)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(void 0!==i&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,i=s._$Eh.get(t);if(void 0!==i&&this._$Em!==i){const t=s.getPropertyOptions(i),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:v;this._$Em=i;const o=r.fromAttribute(e,t.type);this[i]=o??this._$Ej?.get(i)??o,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(void 0!==t){const o=this.constructor;if(!1===i&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??$)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),!0!==r||void 0!==o)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===i&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,i=this[e];!0!==t||this._$AL.has(e)||void 0===i||this.C(e,void 0,s,i)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(e){throw t=!1,this._$EM(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};k.elementStyles=[],k.shadowRootOptions={mode:"open"},k[b("elementProperties")]=new Map,k[b("finalized")]=new Map,y?.({ReactiveElement:k}),(g.reactiveElementVersions??=[]).push("2.1.2");const x=globalThis,A=t=>t,j=x.trustedTypes,z=j?j.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",E=`lit$${Math.random().toFixed(9).slice(2)}$`,C="?"+E,M=`<${C}>`,T=document,P=()=>T.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,O="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,H=/>/g,I=RegExp(`>|${O}(?:([^\\s"'>=/]+)(${O}*=${O}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),L=/'/g,B=/"/g,W=/^(?:script|style|textarea|title)$/i,F=(t=>(e,...s)=>({_$litType$:t,strings:e,values:s}))(1),V=Symbol.for("lit-noChange"),q=Symbol.for("lit-nothing"),Z=new WeakMap,Y=T.createTreeWalker(T,129);function K(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==z?z.createHTML(e):e}const G=(t,e)=>{const s=t.length-1,i=[];let r,o=2===e?"<svg>":3===e?"<math>":"",n=R;for(let e=0;e<s;e++){const s=t[e];let a,c,d=-1,h=0;for(;h<s.length&&(n.lastIndex=h,c=n.exec(s),null!==c);)h=n.lastIndex,n===R?"!--"===c[1]?n=U:void 0!==c[1]?n=H:void 0!==c[2]?(W.test(c[2])&&(r=RegExp("</"+c[2],"g")),n=I):void 0!==c[3]&&(n=I):n===I?">"===c[0]?(n=r??R,d=-1):void 0===c[1]?d=-2:(d=n.lastIndex-c[2].length,a=c[1],n=void 0===c[3]?I:'"'===c[3]?B:L):n===B||n===L?n=I:n===U||n===H?n=R:(n=I,r=void 0);const l=n===I&&t[e+1].startsWith("/>")?" ":"";o+=n===R?s+M:d>=0?(i.push(a),s.slice(0,d)+S+s.slice(d)+E+l):s+E+(-2===d?e:l)}return[K(t,o+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),i]};class J{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0;const n=t.length-1,a=this.parts,[c,d]=G(t,e);if(this.el=J.createElement(c,s),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(i=Y.nextNode())&&a.length<n;){if(1===i.nodeType){if(i.hasAttributes())for(const t of i.getAttributeNames())if(t.endsWith(S)){const e=d[o++],s=i.getAttribute(t).split(E),n=/([.?@])?(.*)/.exec(e);a.push({type:1,index:r,name:n[2],strings:s,ctor:"."===n[1]?st:"?"===n[1]?it:"@"===n[1]?rt:et}),i.removeAttribute(t)}else t.startsWith(E)&&(a.push({type:6,index:r}),i.removeAttribute(t));if(W.test(i.tagName)){const t=i.textContent.split(E),e=t.length-1;if(e>0){i.textContent=j?j.emptyScript:"";for(let s=0;s<e;s++)i.append(t[s],P()),Y.nextNode(),a.push({type:2,index:++r});i.append(t[e],P())}}}else if(8===i.nodeType)if(i.data===C)a.push({type:2,index:r});else{let t=-1;for(;-1!==(t=i.data.indexOf(E,t+1));)a.push({type:7,index:r}),t+=E.length-1}r++}}static createElement(t,e){const s=T.createElement("template");return s.innerHTML=t,s}}function Q(t,e,s=t,i){if(e===V)return e;let r=void 0!==i?s._$Co?.[i]:s._$Cl;const o=D(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,s,i)),void 0!==i?(s._$Co??=[])[i]=r:s._$Cl=r),void 0!==r&&(e=Q(t,r._$AS(t,e.values),r,i)),e}class X{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??T).importNode(e,!0);Y.currentNode=i;let r=Y.nextNode(),o=0,n=0,a=s[0];for(;void 0!==a;){if(o===a.index){let e;2===a.type?e=new tt(r,r.nextSibling,this,t):1===a.type?e=new a.ctor(r,a.name,a.strings,this,t):6===a.type&&(e=new ot(r,this,t)),this._$AV.push(e),a=s[++n]}o!==a?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=T,i}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class tt{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=q,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Q(this,t,e),D(t)?t===q||null==t||""===t?(this._$AH!==q&&this._$AR(),this._$AH=q):t!==this._$AH&&t!==V&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==q&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(T.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,i="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=J.createElement(K(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{const t=new X(i,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=Z.get(t.strings);return void 0===e&&Z.set(t.strings,e=new J(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new tt(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class et{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=q,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=q}_$AI(t,e=this,s,i){const r=this.strings;let o=!1;if(void 0===r)t=Q(this,t,e,0),o=!D(t)||t!==this._$AH&&t!==V,o&&(this._$AH=t);else{const i=t;let n,a;for(t=r[0],n=0;n<r.length-1;n++)a=Q(this,i[s+n],e,n),a===V&&(a=this._$AH[n]),o||=!D(a)||a!==this._$AH[n],a===q?t=q:t!==q&&(t+=(a??"")+r[n+1]),this._$AH[n]=a}o&&!i&&this.j(t)}j(t){t===q?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class st extends et{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===q?void 0:t}}class it extends et{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==q)}}class rt extends et{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=Q(this,t,e,0)??q)===V)return;const s=this._$AH,i=t===q&&s!==q||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==q&&(s===q||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class ot{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Q(this,t)}}const nt=x.litHtmlPolyfillSupport;nt?.(J,tt),(x.litHtmlVersions??=[]).push("3.3.3");const at=globalThis;class ct extends k{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const i=s?.renderBefore??e;let r=i._$litPart$;if(void 0===r){const t=s?.renderBefore??null;i._$litPart$=r=new tt(e.insertBefore(P(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}ct._$litElement$=!0,ct.finalized=!0,at.litElementHydrateSupport?.({LitElement:ct});const dt=at.litElementPolyfillSupport;dt?.({LitElement:ct}),(at.litElementVersions??=[]).push("4.2.2");const ht=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},lt={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:$},ut=(t=lt,e,s)=>{const{kind:i,metadata:r}=s;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),"setter"===i&&((t=Object.create(t)).wrapped=!0),o.set(s.name,t),"accessor"===i){const{name:i}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(i,r,t,!0,s)},init(e){return void 0!==e&&this.C(i,void 0,t,e),e}}}if("setter"===i){const{name:i}=s;return function(s){const r=this[i];e.call(this,s),this.requestUpdate(i,r,t,!0,s)}}throw Error("Unsupported decorator location: "+i)};function pt(t){return(e,s)=>"object"==typeof s?ut(t,e,s):((t,e,s)=>{const i=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),i?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}function _t(t){return pt({...t,state:!0,attribute:!1})}var gt={no_entity:"Vyberte entitu integrace Škola OnLine – Známky.",refresh:"Aktualizovat známky",no_marks:"Zatím žádné známky",history_empty:"Žádné známky k zobrazení.",history_error:"Nepodařilo se načíst historii známek."},mt={entity:"Entita (dítě)",title:"Vlastní název (nepovinné)",title_font_size:"Velikost písma nadpisu",subject_font_size:"Velikost písma názvu předmětu",marks_font_size:"Velikost písma známek",border_width:"Šířka barevného pruhu předmětu",size_by_weight:"Velikost podle váhy",size_by_weight_description:"Zvětší čtvereček známky podle toho, kde se její váha nachází mezi nejlehčí a nejtěžší váhou na kartě (funguje bez ohledu na to, jakou stupnici vah škola používá).",show_empty_subjects:"Zobrazovat předměty bez existujících známek",new_mark_days:"Zvýraznění nové známky",new_mark_days_unit:"dní",new_mark_days_description:"Kolik školních dní zůstane známka zvýrazněná jako nová (1 = jen dnešní; víkend se nepočítá, takže 2 v pondělí sahá až na pátek). Hodnota 0 zvýraznění úplně vypne.",subjects_heading:"Pořadí a barvy předmětů",subjects_description:"Přetažením změníte pořadí předmětů na kartě, kliknutím na barevný kroužek nastavíte barvu předmětu.",reset_color:"Zrušit vlastní barvu",hide_subject:"Skrýt předmět",show_subject:"Zobrazit předmět",no_entity:"Nejprve vyberte entitu."},ft={card:gt,editor:mt},yt={no_entity:"Select an entity from the Škola OnLine – Marks integration.",refresh:"Refresh marks",no_marks:"No marks yet",history_empty:"No marks to display.",history_error:"Failed to load mark history."},bt={entity:"Entity (child)",title:"Custom title (optional)",title_font_size:"Title font size",subject_font_size:"Subject name font size",marks_font_size:"Marks font size",border_width:"Subject color bar width",size_by_weight:"Size by weight",size_by_weight_description:"Scales a mark's chip size based on where its weight falls between the lightest and heaviest weight shown (works regardless of which weight scale the school uses).",show_empty_subjects:"Show subjects with no marks yet",new_mark_days:"New mark highlight",new_mark_days_unit:"days",new_mark_days_description:"How many school days a mark stays highlighted as new (1 = today only; weekends don't count, so 2 reaches back to last Friday on a Monday). 0 turns the highlight off entirely.",subjects_heading:"Subject order & colors",subjects_description:"Drag to reorder subjects on the card, click the color dot to set a subject's color.",reset_color:"Reset custom color",hide_subject:"Hide subject",show_subject:"Show subject",no_entity:"Select an entity first."},vt={card:yt,editor:bt};const $t={cs:Object.freeze({__proto__:null,card:gt,default:ft,editor:mt}),en:Object.freeze({__proto__:null,card:yt,default:vt,editor:bt})};function wt(t,e){const s=t.split(".").reduce((t,e)=>t&&"object"==typeof t?t[e]:void 0,$t[e]);return"string"==typeof s?s:void 0}function kt(t){return function(e){let s=wt(e,t?.locale.language??"en");return s||(s=wt(e,"en")),s||e}}function xt(t,e){const s=new Date(t);return Number.isNaN(s.getTime())?t.slice(0,10):new Intl.DateTimeFormat(e,{day:"numeric",month:"numeric",year:"numeric"}).format(s)}const At=[[1,[76,175,80]],[2,[139,195,74]],[3,[255,193,7]],[4,[255,152,0]],[5,[244,67,54]]];function jt(t){const e=/^[1-5]/.exec(t.trim());return e?Number(e[0]):null}function zt(t){const e=Math.min(5,Math.max(1,t)),s=Math.min(At.length-2,Math.floor(e-1)),[i,r]=At[s],[o,n]=At[s+1],a=(e-i)/(o-i),c=r.map((t,e)=>Math.round(t+(n[e]-t)*a));return`rgb(${c[0]}, ${c[1]}, ${c[2]})`}function St(t,e,s){const i=s-e;if(i<=0)return 1.8;return 1.8*(.7+Math.min(1,Math.max(0,(t-e)/i))*(1.6-.7))}async function Et(t,e,s){const i=function(t,e){const s=t.entities?.[e]?.device_id,i=s?t.devices?.[s]?.config_entries?.[0]:void 0;if(!i)throw new Error(`Could not resolve config_entry_id for ${e} via the device registry`);return i}(t,e),r={config_entry_id:i,student_id:s};return(await t.callWS({type:"call_service",domain:"skolaonline_znamky",service:"get_marks",service_data:r,return_response:!0})).response.marks}function Ct(t){return new Date(t.getFullYear(),t.getMonth(),t.getDate())}function Mt(t){const e=t.getDay();return 0===e||6===e}function Tt(t,e=new Date,s=1){if(s<=0)return!1;const i=new Date(t).getTime();if(Number.isNaN(i))return!1;const r=Ct(new Date(i)),o=Ct(e);return!(r>o)&&function(t,e){let s=0;const i=new Date(t);for(;i.getTime()<e.getTime();)i.setDate(i.getDate()+1),Mt(i)||s++;return s}(r,o)<s}function Pt(t,e){const s=new Map(t.subjects.map(t=>[t.subject_id,t])),i=e.subject_colors??{},r=new Set(e.subject_hidden??[]),o=new Set,n=[];for(const t of e.subject_order??[]){const e=s.get(t);e&&!o.has(t)&&(n.push(e),o.add(t))}const a=t.subjects.filter(t=>!o.has(t.subject_id)),c=new Intl.Collator("cs");return a.sort((e,s)=>c.compare(t.subject_names[e.subject_id]??e.subject_id,t.subject_names[s.subject_id]??s.subject_id)),[...n,...a].map(e=>({subject_id:e.subject_id,name:t.subject_names[e.subject_id]??e.subject_id,average:e.average,count:e.count,marks:e.marks,color:i[e.subject_id],hidden:r.has(e.subject_id)}))}const Dt=a`
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

  .header-right {
    display: flex;
    align-items: center;
    gap: 4px;
    flex-shrink: 0;
  }

  .refresh-button {
    --mdc-icon-button-size: 32px;
    --mdc-icon-size: 20px;
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
    gap: 12px;
  }

  /*
   * The colored "border" is really the outer element's own background,
   * revealed only on the left by the inner element's padding-left. The
   * outer clips to its own border-radius (overflow: hidden) so the inner
   * element's square corners are cropped to match instead of being drawn
   * separately, which is what left color slivers showing through the
   * top-right/bottom-right corners.
   */
  .subject-row {
    border-radius: 10px 0px 0px 10px;
    overflow: hidden;
  }

  .subject-row-inner {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 8px 10px;
    border-radius: 10px 0px 0px 10px;
    background: var(--card-background-color, #fff);
  }

  .subject-row-top,
  .marks {
    cursor: pointer;
  }

  .subject-row-top {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .subject-name {
    flex: 1;
    color: var(--primary-text-color);
    font-size: var(--soz-subject-font-size, 0.95em);
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

  .no-marks {
    color: var(--secondary-text-color);
    font-size: var(--soz-marks-font-size, 0.8em);
    font-style: italic;
  }

  .more-marks {
    color: var(--secondary-text-color);
    font-size: var(--soz-marks-font-size, 0.8em);
    padding-left: 2px;
    flex-shrink: 0;
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
    width: 2em;
  }

  .history-weight {
    color: var(--secondary-text-color);
    flex-shrink: 0;
    width: 2.5em;
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
`;var Nt,Ot,Rt,Ut,Ht;!function(t){t.language="language",t.system="system",t.comma_decimal="comma_decimal",t.decimal_comma="decimal_comma",t.space_comma="space_comma",t.none="none"}(Nt||(Nt={})),function(t){t.language="language",t.system="system",t.am_pm="12",t.twenty_four="24"}(Ot||(Ot={})),function(t){t.local="local",t.server="server"}(Rt||(Rt={})),function(t){t.language="language",t.system="system",t.DMY="DMY",t.MDY="MDY",t.YMD="YMD"}(Ut||(Ut={})),function(t){t.language="language",t.monday="monday",t.tuesday="tuesday",t.wednesday="wednesday",t.thursday="thursday",t.friday="friday",t.saturday="saturday",t.sunday="sunday"}(Ht||(Ht={}));const It=a`
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

  .list-item.dimmed {
    opacity: 0.45;
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
`;let Lt=class extends ct{constructor(){super(...arguments),this.items=[]}render(){return F` <div class="sortable-list">${this.items.map(t=>this.renderItem(t))}</div> `}renderItem(t){const e=this._draggedId===t.id,s=this._dropTarget?.id===t.id&&"top"===this._dropTarget.position,i=this._dropTarget?.id===t.id&&"bottom"===this._dropTarget.position;return F`
      <div
        class="list-item ${e?"dragging":""} ${t.dimmed?"dimmed":""}"
        draggable="true"
        @dragstart=${e=>this.onDragStart(e,t)}
        @dragend=${()=>this.onDragEnd()}
        @dragover=${e=>this.onDragOver(e,t)}
        @dragleave=${e=>this.onDragLeave(e,t)}
        @drop=${e=>this.onDrop(e,t)}
      >
        <div class="drop-indicator top ${s?"show":""}"></div>
        <div class="drop-indicator bottom ${i?"show":""}"></div>
        <span class="drag-handle">⋮⋮</span>
        ${this.renderLeading?F`<div class="item-leading">${this.renderLeading(t)}</div>`:""}
        <div class="item-content">${t.label}</div>
        ${this.renderTrailing?F`<div class="item-trailing">${this.renderTrailing(t)}</div>`:""}
      </div>
    `}onDragStart(t,e){this._draggedId=e.id,t.dataTransfer&&(t.dataTransfer.effectAllowed="move")}onDragEnd(){this._draggedId=void 0,this._dropTarget=void 0}onDragOver(t,e){if(t.preventDefault(),t.dataTransfer&&(t.dataTransfer.dropEffect="move"),e.id===this._draggedId)return;const s=t.currentTarget.getBoundingClientRect(),i=s.top+s.height/2;this._dropTarget={id:e.id,position:t.clientY<i?"top":"bottom"}}onDragLeave(t,e){this._dropTarget?.id===e.id&&t.target===t.currentTarget&&(this._dropTarget=void 0)}onDrop(t,e){t.preventDefault(),t.stopPropagation();const s=this._draggedId,i=this._dropTarget?.position;if(this._dropTarget=void 0,!s||s===e.id)return;const r=[...this.items],o=r.findIndex(t=>t.id===s);if(-1===o)return;const[n]=r.splice(o,1);let a=r.findIndex(t=>t.id===e.id);"bottom"===i&&(a+=1),r.splice(a,0,n),this.items=r,this.dispatchEvent(new CustomEvent("reorder",{detail:{items:r},bubbles:!0,composed:!0}))}static get styles(){return It}};e([pt({attribute:!1})],Lt.prototype,"items",void 0),e([pt({attribute:!1})],Lt.prototype,"renderLeading",void 0),e([pt({attribute:!1})],Lt.prototype,"renderTrailing",void 0),e([_t()],Lt.prototype,"_draggedId",void 0),e([_t()],Lt.prototype,"_dropTarget",void 0),Lt=e([ht("so-sortable-list")],Lt);let Bt=class extends ct{constructor(){super(...arguments),this._config={type:"custom:skolaonline-znamky-ui-marks-all-card",entity:""}}setConfig(t){this._config={...t}}get _attrs(){if(this.hass&&this._config.entity)return this.hass.states[this._config.entity]?.attributes}render(){if(!this.hass)return F``;const t=kt(this.hass);return F`
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
          .selector=${{number:{min:12,max:32,step:1,mode:"slider",unit_of_measurement:"px"}}}
          .value=${this._config.title_font_size??20}
          .label=${t("editor.title_font_size")}
          @value-changed=${this._titleFontSizeChanged}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:10,max:24,step:1,mode:"slider",unit_of_measurement:"px"}}}
          .value=${this._config.subject_font_size??15}
          .label=${t("editor.subject_font_size")}
          @value-changed=${this._subjectFontSizeChanged}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:8,max:24,step:1,mode:"slider",unit_of_measurement:"px"}}}
          .value=${this._config.marks_font_size??14}
          .label=${t("editor.marks_font_size")}
          @value-changed=${this._marksFontSizeChanged}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:2,max:20,step:1,mode:"slider",unit_of_measurement:"px"}}}
          .value=${this._config.border_width??8}
          .label=${t("editor.border_width")}
          @value-changed=${this._borderWidthChanged}
        ></ha-selector>

        <ha-formfield class="switch-row" .label=${t("editor.size_by_weight")}>
          <ha-switch .checked=${this._config.size_by_weight??!1} @change=${this._sizeByWeightChanged}></ha-switch>
        </ha-formfield>
        <div class="section-description">${t("editor.size_by_weight_description")}</div>

        <ha-formfield class="switch-row" .label=${t("editor.show_empty_subjects")}>
          <ha-switch .checked=${this._config.show_empty_subjects??!0} @change=${this._showEmptySubjectsChanged}></ha-switch>
        </ha-formfield>

        <ha-selector
          .hass=${this.hass}
          .selector=${{number:{min:0,max:30,step:1,mode:"slider",unit_of_measurement:t("editor.new_mark_days_unit")}}}
          .value=${this._config.new_mark_days??1}
          .label=${t("editor.new_mark_days")}
          @value-changed=${this._newMarkDaysChanged}
        ></ha-selector>
        <div class="section-description">${t("editor.new_mark_days_description")}</div>

        ${this._renderSubjects(t)}
      </div>
    `}_renderSubjects(t){const e=this._attrs;if(!e)return F`<div class="section-note">${t("editor.no_entity")}</div>`;const s=Pt(e,this._config),i=s.map(t=>({id:t.subject_id,label:t.name,dimmed:t.hidden}));return F`
      <div class="section-heading">${t("editor.subjects_heading")}</div>
      <div class="section-description">${t("editor.subjects_description")}</div>
      <so-sortable-list
        .items=${i}
        .renderLeading=${t=>this._renderColorSwatch(t,s)}
        .renderTrailing=${e=>this._renderRowActions(e,s,t)}
        @reorder=${this._onReorder}
      ></so-sortable-list>
    `}_renderColorSwatch(t,e){const s=e.find(e=>e.subject_id===t.id)?.color??"#3f51b5";return F`<input type="color" class="color-swatch" .value=${s} @click=${t=>t.stopPropagation()} @input=${e=>this._colorChanged(t.id,e)} />`}_renderRowActions(t,e,s){const i=e.find(e=>e.subject_id===t.id)?.hidden??!1;return F`
      <ha-icon-button .label=${s("editor.reset_color")} @click=${e=>this._resetColor(t.id,e)}>
        <ha-icon icon="mdi:restore"></ha-icon>
      </ha-icon-button>
      <ha-icon-button .label=${s(i?"editor.show_subject":"editor.hide_subject")} @click=${e=>this._toggleHidden(t.id,e)}>
        <ha-icon icon=${i?"mdi:eye-off":"mdi:eye"}></ha-icon>
      </ha-icon-button>
    `}_entityChanged(t){this._updateConfig({...this._config,entity:t.detail.value})}_titleChanged(t){const e=t.target.value;this._updateConfig({...this._config,title:e||void 0})}_titleFontSizeChanged(t){this._updateConfig({...this._config,title_font_size:t.detail.value})}_subjectFontSizeChanged(t){this._updateConfig({...this._config,subject_font_size:t.detail.value})}_marksFontSizeChanged(t){this._updateConfig({...this._config,marks_font_size:t.detail.value})}_borderWidthChanged(t){this._updateConfig({...this._config,border_width:t.detail.value})}_sizeByWeightChanged(t){const e=t.target.checked;this._updateConfig({...this._config,size_by_weight:e})}_showEmptySubjectsChanged(t){const e=t.target.checked;this._updateConfig({...this._config,show_empty_subjects:e})}_newMarkDaysChanged(t){this._updateConfig({...this._config,new_mark_days:t.detail.value})}_toggleHidden(t,e){e.stopPropagation();const s=new Set(this._config.subject_hidden??[]);s.has(t)?s.delete(t):s.add(t),this._updateConfig({...this._config,subject_hidden:[...s]})}_colorChanged(t,e){e.stopPropagation();const s=e.target.value;this._updateConfig({...this._config,subject_colors:{...this._config.subject_colors,[t]:s}})}_resetColor(t,e){e.stopPropagation();const s={...this._config.subject_colors};delete s[t],this._updateConfig({...this._config,subject_colors:s})}_onReorder(t){this._updateConfig({...this._config,subject_order:t.detail.items.map(t=>t.id)})}_updateConfig(t){this._config=t,((t,e,s,i)=>{i=i||{},s=s??{};const r=new Event(e,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});r.detail=s,t.dispatchEvent(r)})(this,"config-changed",{config:t})}static get styles(){return a`
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
    `}};e([pt({attribute:!1})],Bt.prototype,"hass",void 0),e([_t()],Bt.prototype,"_config",void 0),Bt=e([ht("skolaonline-znamky-ui-marks-all-editor")],Bt);const Wt="skolaonline-znamky-ui-marks-all-card",Ft="Škola OnLine – Známky";function Vt(t,e){return"skolaonline_znamky"===t.entities?.[e]?.platform}let qt=class extends ct{constructor(){super(...arguments),this._historyLoading=!1,this._newMarkIds=new Set,this._refreshing=!1}setConfig(t){if(!t?.entity)throw new Error('skolaonline-znamky-ui-marks-all-card: "entity" is required');this._config=t}getCardSize(){return 2+Math.max(1,this._visibleSubjects.length)}static getConfigElement(){return document.createElement("skolaonline-znamky-ui-marks-all-editor")}static getStubConfig(t,e,s){const i=[...e,...s].find(e=>Vt(t,e));if(!i)throw new Error("No skolaonline_znamky entity available");return{type:`custom:${Wt}`,entity:i}}static getEntitySuggestion(t,e){return Vt(t,e)?{label:Ft,config:{type:`custom:${Wt}`,entity:e}}:null}connectedCallback(){super.connectedCallback(),this._subscribeNewMarks()}disconnectedCallback(){super.disconnectedCallback(),this._unsubscribeEvents?.(),this._unsubscribeEvents=void 0}updated(t){t.has("hass")&&!this._unsubscribeEvents&&this._subscribeNewMarks()}async _subscribeNewMarks(){if(this.hass&&!this._unsubscribeEvents)try{this._unsubscribeEvents=await this.hass.connection.subscribeEvents(t=>this._onNewMarkEvent(t.data),"skolaonline_znamky_new_mark")}catch(t){console.error(`${Wt}: failed to subscribe to skolaonline_znamky_new_mark`,t)}}_onNewMarkEvent(t){t.student_id===this._attrs?.student_id&&(this._newMarkIds=new Set(this._newMarkIds).add(t.mark_id),this._invalidateMarksCache())}get _attrs(){if(this.hass&&this._config)return this.hass.states[this._config.entity]?.attributes}get _subjects(){const t=this._attrs;return t?Pt(t,this._config??{}):[]}get _visibleSubjects(){const t=this._config?.show_empty_subjects??!0;return this._subjects.filter(e=>!e.hidden&&(t||e.count>0))}get _referenceWeight(){const t=this._attrs;return t?0===(e=t.subjects.flatMap(t=>t.marks.map(t=>t.weight))).length?0:e.reduce((t,e)=>t+e,0)/e.length:0;var e}get _weightRange(){const t=this._attrs;return t?0===(e=t.subjects.flatMap(t=>t.marks.map(t=>t.weight))).length?{min:0,max:0}:{min:Math.min(...e),max:Math.max(...e)}:{min:0,max:0};var e}get _allMarks(){return this._marksCache?.marks??[]}_invalidateMarksCache(){this._marksCache=void 0,void 0!==this._expandedSubjectId&&this._ensureMarksLoaded()}render(){if(!this._config)return F``;const t=kt(this.hass),e=this._attrs;if(!e||!this.hass)return F`<ha-card><div class="empty">${t("card.no_entity")}</div></ha-card>`;const s=Number(this.hass.states[this._config.entity].state),i=`--soz-title-font-size:${this._config.title_font_size??20}px;--soz-subject-font-size:${this._config.subject_font_size??15}px;--soz-marks-font-size:${this._config.marks_font_size??14}px;`;return F`
      <ha-card style=${i}>
        <div class="header">
          <div>
            <div class="student-name">${this._config.title||e.student_name}</div>
            <div class="context">${e.school_year} · ${e.semester_name}</div>
          </div>
          <div class="header-right">
            <ha-icon-button class="refresh-button" .label=${t("card.refresh")} .disabled=${this._refreshing} @click=${()=>this._refresh()}>
              ${this._refreshing?F`<ha-spinner size="small"></ha-spinner>`:F`<ha-icon icon="mdi:reload"></ha-icon>`}
            </ha-icon-button>
            <div class="average" style="background:${zt(s)}">${Number.isFinite(s)?s.toFixed(2):"–"}</div>
          </div>
        </div>
        <div class="subjects">${this._visibleSubjects.map(e=>this._renderSubjectRow(e,t))}</div>
      </ha-card>
    `}_renderSubjectRow(t,e){const s=[...t.marks].sort((t,e)=>t.date<e.date?1:-1),i=t.count-s.length,r=this._referenceWeight,o=this._weightRange,n=this._config?.border_width??8,a=()=>this._toggleHistory(t.subject_id);return F`
      <div class="subject-row" style="background:${t.color??"var(--primary-color)"};padding-left:${n}px">
        <div class="subject-row-inner">
          <div class="subject-row-top" @click=${a}>
            <div class="subject-name">${t.name}</div>
            <div class="subject-average" style="color:${null===t.average?"var(--secondary-text-color)":zt(t.average)}">
              ${null===t.average?"–":t.average.toFixed(2)}
            </div>
          </div>
          <div class="marks" @click=${a}>
            ${s.length?F`${s.map(t=>this._renderMarkChip(t,r,o))} ${i>0?F`<div class="more-marks">+${i}</div>`:q}`:F`<div class="no-marks">${e("card.no_marks")}</div>`}
          </div>
          ${this._expandedSubjectId===t.subject_id?this._renderMarksList(this._allMarks.filter(e=>e.subject_id===t.subject_id),e):q}
        </div>
      </div>
    `}_renderMarkChip(t,e,s){const i=jt(t.value),r=null===i,o=r?"var(--disabled-text-color, #9e9e9e)":zt(i),n=function(t,e,s,i=1,r=new Date){return!(i<=0)&&(s.has(t)||Tt(e,r,i))}(t.id,t.date,this._newMarkIds,this._config?.new_mark_days??1),a=e>0&&!r&&t.weight>e,c=r?(s.min+s.max)/2:t.weight,d=this._config?.size_by_weight?`width:${St(c,s.min,s.max)}em;height:${St(c,s.min,s.max)}em;`:"",h=xt(t.date,this.hass?.locale.language);return F`
      <div class="mark-chip ${a?"heavy":""} ${n?"new":""}" style="background:${o};${d}" title="${h} - ${t.weight}">${t.value}</div>
    `}async _refresh(){if(this.hass&&this._config&&!this._refreshing){this._refreshing=!0,this._invalidateMarksCache();try{await async function(t,e){await t.callService("homeassistant","update_entity",void 0,{entity_id:e})}(this.hass,this._config.entity)}catch(t){console.error(`${Wt}: failed to refresh marks`,t)}finally{this._refreshing=!1}}}async _toggleHistory(t){this._expandedSubjectId!==t?(this._expandedSubjectId=t,await this._ensureMarksLoaded()):this._expandedSubjectId=void 0}async _ensureMarksLoaded(){const t=this._attrs;if(!this.hass||!this._config||!t)return;const e=this._marksCache;if(!(!!e&&e.semesterId===t.semester_id&&Date.now()-e.fetchedAt<18e5)){this._historyLoading=!0,this._historyError=void 0;try{const e=await Et(this.hass,this._config.entity,t.student_id);this._marksCache={fetchedAt:Date.now(),semesterId:t.semester_id,marks:e}}catch(t){this._historyError=t instanceof Error?t.message:String(t)}finally{this._historyLoading=!1}}}_renderMarksList(t,e){if(this._historyLoading)return F`<div class="history">
        <div class="history-loading"><ha-spinner size="small"></ha-spinner></div>
      </div>`;if(this._historyError)return F`<div class="history"><ha-alert alert-type="error">${this._historyError}</ha-alert></div>`;if(!t.length)return F`<div class="history"><div class="empty">${e("card.history_empty")}</div></div>`;const s=[...t].sort((t,e)=>t.date<e.date?1:-1);return F` <div class="history">${s.map(t=>this._renderHistoryRow(t))}</div> `}_renderHistoryRow(t){const e=jt(t.value),s=null===e?"inherit":zt(e);return F`
      <div class="history-row">
        <span class="history-date">${xt(t.date,this.hass?.locale.language)}</span>
        <span class="history-value" style="color:${s}">${t.value}</span>
        <span class="history-weight">${t.weight}</span>
        <span class="history-theme">${t.theme||t.verbal_evaluation||""}</span>
      </div>
    `}static get styles(){return Dt}};e([pt({attribute:!1})],qt.prototype,"hass",void 0),e([_t()],qt.prototype,"_config",void 0),e([_t()],qt.prototype,"_expandedSubjectId",void 0),e([_t()],qt.prototype,"_historyLoading",void 0),e([_t()],qt.prototype,"_historyError",void 0),e([_t()],qt.prototype,"_marksCache",void 0),e([_t()],qt.prototype,"_newMarkIds",void 0),e([_t()],qt.prototype,"_refreshing",void 0),qt=e([ht(Wt)],qt),window.customCards=window.customCards||[],window.customCards.push({type:Wt,name:Ft,description:"Karta se známkami dítěte z integrace skolaonline_znamky.",preview:!0,documentationURL:"https://github.com/hondzik/skolaonline-znamky-ui",getEntitySuggestion:(t,e)=>qt.getEntitySuggestion(t,e)}),function(){const e="padding: 2px 4px; font-family: Roboto,Verdana,Geneva,sans-serif;",s=`background-color: rgb(255, 127, 15); color: rgb(0, 0, 49); ${e}`,i=`background-color: rgb(0, 0, 49); color: rgb(255, 127, 15); ${e}`;console.groupCollapsed("%cLovelace Cards for skola-online-znamky integration%c1.0.1",s,i),console.info("Lovelace Cards for skola-online-znamky integration"),console.info(`Github: ${t}`),console.groupEnd()}();
