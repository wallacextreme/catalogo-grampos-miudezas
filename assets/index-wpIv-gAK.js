(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=s(o);fetch(o.href,n)}})();const c={search:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>`,box:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
      <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
      <line x1="12" y1="22.08" x2="12" y2="12"></line>
    </svg>`,tag:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
      <line x1="7" y1="7" x2="7.01" y2="7"></line>
    </svg>`,edit:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
    </svg>`,copy:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
    </svg>`,image:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
      <circle cx="8.5" cy="8.5" r="1.5"></circle>
      <polyline points="21 15 16 10 5 21"></polyline>
    </svg>`,zoomIn:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="11" y1="8" x2="11" y2="14"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>`,zoomOut:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      <line x1="8" y1="11" x2="14" y2="11"></line>
    </svg>`,close:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>`,filter:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>`,sun:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="5"></circle>
      <line x1="12" y1="1" x2="12" y2="3"></line>
      <line x1="12" y1="21" x2="12" y2="23"></line>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
      <line x1="1" y1="12" x2="3" y2="12"></line>
      <line x1="21" y1="12" x2="23" y2="12"></line>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>`,moon:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>`,eye:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>`,eyeOff:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>`,plus:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>`,check:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>`,refreshCw:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="23 4 23 10 17 10"></polyline>
      <polyline points="1 20 1 14 7 14"></polyline>
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
    </svg>`,grid:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
    </svg>`,layoutGrid:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2"></rect>
      <line x1="3" y1="9" x2="21" y2="9"></line>
      <line x1="9" y1="21" x2="9" y2="9"></line>
    </svg>`,download:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="7 10 12 15 17 10"></polyline>
      <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>`,upload:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
      <polyline points="17 8 12 3 7 8"></polyline>
      <line x1="12" y1="3" x2="12" y2="15"></line>
    </svg>`,printer:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 6 2 18 2 18 9"></polyline>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
      <rect x="6" y="14" width="12" height="8"></rect>
    </svg>`,trash:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="3 6 5 6 21 6"></polyline>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    </svg>`,alertCircle:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12" y2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>`,car:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2.1 11.2 2 11.6 2 12v4c0 .6.4 1 1 1h2"></path>
      <circle cx="7" cy="17" r="2"></circle>
      <path d="M9 17h6"></path>
      <circle cx="17" cy="17" r="2"></circle>
    </svg>`,wrench:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
    </svg>`,chevronLeft:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="15 18 9 12 15 6"></polyline>
    </svg>`,chevronRight:(t="w-5 h-5")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>`,chevronDown:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>`,camera:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
      <circle cx="12" cy="13" r="4"></circle>
    </svg>`,layers:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
      <polyline points="2 17 12 22 22 17"></polyline>
      <polyline points="2 12 12 17 22 12"></polyline>
    </svg>`,zap:(t="w-4 h-4")=>`
    <svg class="${t}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>`};function f(t){return t?t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9]/g," ").replace(/\s+/g," ").trim():""}function k(t){return t?t.toLowerCase().replace(/[^a-z0-9]/g,""):""}class j{items=[];constructor(e=[]){this.indexProducts(e)}indexProducts(e){this.items=e.map(s=>{const r=f(s.boxNumber),o=k(s.boxNumber),n=f(s.internalCode),a=k(s.internalCode),d=(s.refCodes||[]).map(f),i=(s.refCodes||[]).map(k),u=f(s.description+" "+(s.cleanDescription||"")),l=f(s.category),h=(s.carmakers||[]).map(f),m=(s.technicalSpecs||[]).map(f),p=[r,o,n,a,...d,...i,u,l,...h,...m].join(" ");return{product:s,normBox:r,cleanBox:o,normInternalCode:n,cleanInternalCode:a,normRefCodes:d,cleanRefCodes:i,normDescription:u,normCategory:l,normCarmakers:h,normSpecs:m,fullSearchBlob:p}})}search(e,s){const r=e.trim();if(!r&&(!s||!s.category&&!s.carmaker&&(!s.status||s.status==="all")))return this.items.map(l=>l.product);const o=f(r),n=k(r),a=o.split(" ").filter(Boolean),d=r.match(/^(?:cx\.?|caixa)\s*([a-z0-9]+)$/i),i=d?k(d[1]):null,u=[];for(const l of this.items){if(s?.category&&s.category!=="all"&&l.product.category!==s.category||s?.carmaker&&s.carmaker!=="all"&&!(l.product.carmakers||[]).includes(s.carmaker))continue;if(s?.status&&s.status!=="all"){const g=l.product.images&&l.product.images.length>0;if(s.status==="with-photo"&&!g||s.status==="without-photo"&&g||s.status==="needs-review"&&!l.product.needsDescriptionReview)continue}if(!r){u.push({product:l.product,score:1});continue}let h=0;i&&(l.cleanBox===i||l.cleanBox.includes(i))?h+=1500:n&&l.cleanBox===n?h+=1200:n&&l.cleanBox.startsWith(n)&&(h+=800),n&&l.cleanInternalCode===n?h+=1e3:n&&l.cleanInternalCode.includes(n)&&(h+=600);for(const g of l.cleanRefCodes)if(n&&g===n){h+=900;break}else if(n&&g.includes(n)){h+=500;break}let m=!0,p=0;for(const g of a)if(l.fullSearchBlob.includes(g))p+=50,l.normDescription.includes(g)&&(p+=50),l.normBox.includes(g)&&(p+=100);else{m=!1;break}m&&(h+=p),h>0&&u.push({product:l.product,score:h})}return u.sort((l,h)=>h.score-l.score),u.map(l=>l.product)}}const S="./catalog-images/placeholder.webp";function v(t){return t?/^(data:|blob:|https?:|\.\/|\.\.\/)/i.test(t)?t:t.startsWith("/catalog-images/")?"."+t:t.startsWith("catalog-images/")?"./"+t:t:""}function E(t){const e=Array.isArray(t.images)?t.images.map(o=>v(o)):[],s=v(t.thumbnail);return s!==(t.thumbnail||"")||!Array.isArray(t.images)||e.some((o,n)=>o!==t.images[n])?{...t,images:e,thumbnail:s}:t}function q(t,e,s,r,o){const n=document.createElement("div");n.className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600 dark:hover:border-blue-500 shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden";const a=t.boxNumber||"S/N",d=t.internalCode?`MU: ${t.internalCode}`:"",i=v(t.thumbnail||t.images&&t.images[0])||S,u=t.images&&t.images.length>0,l=t.images?t.images.length:0;let h="bg-blue-600 text-white";return a.toUpperCase().includes("GAVETA")?h="bg-amber-600 text-white":a.startsWith("10")&&(h="bg-emerald-600 text-white"),n.innerHTML=`
    <!-- Topo: Bloco Gigante de Caixa e Código Interno -->
    <div class="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xl sm:text-2xl font-black tracking-tight ${h} shadow-sm">
          ${c.box("w-5 h-5 text-white/90")}
          <span>CX ${a}</span>
        </span>
      </div>
      
      <div class="flex items-center gap-1.5">
        ${d?`
          <button class="btn-copy-code inline-flex items-center gap-1 px-2.5 py-1 rounded-lg font-mono text-xs font-bold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors" title="Clique para copiar código interno">
            <span>${d}</span>
            ${c.copy("w-3.5 h-3.5 text-slate-500")}
          </button>
        `:""}

        <button class="btn-quick-edit p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Editar / Adicionar Foto (Ctrl+V)" aria-label="Editar">
          ${c.edit("w-4 h-4")}
        </button>
      </div>
    </div>

    <!-- Foto Ampla da Peça (Centro) -->
    <div class="relative w-full h-52 bg-white flex items-center justify-center p-3 cursor-pointer group-hover:scale-[1.02] transition-transform duration-200 overflow-hidden border-b border-slate-100 dark:border-slate-700/50">
      <img src="${i}" alt="${t.description}" class="img-preview max-w-full max-h-full object-contain filter drop-shadow-sm select-none" loading="lazy" />

      <!-- Indicador de Múltiplos Ângulos -->
      ${l>1?`
        <span class="absolute bottom-2 right-2 px-2 py-0.5 rounded-md font-mono text-[11px] font-bold bg-slate-900/80 text-white backdrop-blur-sm flex items-center gap-1">
          ${c.image("w-3 h-3 text-amber-400")}
          <span>${l} fotos</span>
        </span>
      `:""}

      <!-- Badge de Revisão se for Apenas Foto + Caixa -->
      ${t.needsDescriptionReview?`
        <span class="absolute top-2 left-2 px-2 py-0.5 rounded-md font-mono text-[10px] font-bold bg-amber-500/90 text-white shadow-sm flex items-center gap-1">
          ${c.alertCircle("w-3 h-3 text-white")}
          <span>Identificação Visual</span>
        </span>
      `:""}

      <div class="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span class="p-2 rounded-full bg-slate-900/70 text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
          ${c.zoomIn("w-5 h-5")}
        </span>
      </div>
    </div>

    <!-- Detalhes, Referências e Aplicação -->
    <div class="p-4 flex-1 flex flex-col justify-between gap-3">
      <div>
        <!-- Categoria -->
        <span class="text-[11px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 font-mono line-clamp-1 mb-1">
          ${t.category}
        </span>

        <!-- Descrição Principal Limpa -->
        <h3 class="text-sm font-semibold text-slate-800 dark:text-slate-100 leading-snug line-clamp-2" title="${t.description}">
          ${t.cleanDescription||t.description}
        </h3>
      </div>

      <!-- Códigos de Referência de Fabricantes -->
      ${t.refCodes&&t.refCodes.length>0?`
        <div class="flex flex-wrap gap-1.5 pt-1">
          ${t.refCodes.slice(0,4).map(x=>`
            <button class="btn-copy-ref inline-flex items-center gap-1 px-2 py-0.5 rounded font-mono text-[11px] font-bold bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600 hover:border-blue-500 transition-colors" data-code="${x}" title="Copiar ${x}">
              <span>${x}</span>
              ${c.copy("w-2.5 h-2.5 text-slate-400")}
            </button>
          `).join("")}
        </div>
      `:""}

      <!-- Montadoras e Medidas Técnicas -->
      <div class="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400">
        <div class="flex items-center gap-1.5 font-medium line-clamp-1">
          ${c.car("w-3.5 h-3.5 text-slate-400")}
          <span>${(t.carmakers||["Universal"]).join(", ")}</span>
        </div>

        ${e&&t.price!==null?`
          <span class="font-mono font-black text-sm text-emerald-600 dark:text-emerald-400">
            R$ ${t.price.toFixed(2)}
          </span>
        `:""}
      </div>
    </div>
  `,n.querySelector(".img-preview").parentElement?.addEventListener("click",()=>{u&&s(t.images,0,`CX ${a} — ${t.cleanDescription||t.description}`)}),n.querySelector(".btn-quick-edit")?.addEventListener("click",x=>{x.stopPropagation(),r(t)}),n.querySelector(".btn-copy-code")?.addEventListener("click",x=>{x.stopPropagation(),t.internalCode&&o(t.internalCode,"Código Interno")}),n.querySelectorAll(".btn-copy-ref").forEach(x=>{x.addEventListener("click",M=>{M.stopPropagation();const I=x.dataset.code;I&&o(I,"Código de Referência")})}),n}function T(t,e,s){const r=document.createElement("div");r.className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-2xl border-2 border-slate-200 dark:border-slate-700 hover:border-amber-500 shadow-sm hover:shadow-2xl transition-all duration-200 overflow-hidden cursor-pointer";const o=t.boxNumber||"S/N",n=v(t.thumbnail||t.images&&t.images[0])||S,a=t.images&&t.images.length>0;return r.innerHTML=`
    <!-- Foto Gigante Central -->
    <div class="relative w-full aspect-square bg-white flex items-center justify-center p-3 overflow-hidden">
      <img src="${n}" alt="${t.description}" class="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-200 filter drop-shadow-sm select-none" loading="lazy" />

      <!-- BADGE GIGANTE DA CAIXA NO TOPO -->
      <div class="absolute top-2 left-2 z-10">
        <span class="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl font-mono text-xl sm:text-2xl font-black bg-blue-600 text-white shadow-lg tracking-tight">
          CX ${o}
        </span>
      </div>

      ${t.internalCode?`
        <div class="absolute top-2 right-2 z-10">
          <span class="px-2 py-1 rounded-lg font-mono text-xs font-black bg-slate-900/80 text-white backdrop-blur-sm shadow-sm">
            ${t.internalCode}
          </span>
        </div>
      `:""}

      <div class="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span class="p-3 rounded-full bg-slate-900/80 text-white shadow-xl transform scale-90 group-hover:scale-110 transition-transform">
          ${c.zoomIn("w-6 h-6 text-amber-400")}
        </span>
      </div>
    </div>

    <!-- Rodapé Compacto -->
    <div class="p-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between gap-2 bg-slate-50 dark:bg-slate-800/80">
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
          ${t.cleanDescription||t.description}
        </p>
        <span class="text-[10px] font-mono text-slate-500 dark:text-slate-400">
          ${(t.refCodes||[]).slice(0,2).join(" | ")||t.category}
        </span>
      </div>
      <button class="btn-mural-edit p-1.5 text-slate-400 hover:text-blue-600 rounded-lg transition-colors" title="Editar" aria-label="Editar">
        ${c.edit("w-4 h-4")}
      </button>
    </div>
  `,r.addEventListener("click",()=>{a&&e(t.images,0,`CX ${o} — ${t.cleanDescription||t.description}`)}),r.querySelector(".btn-mural-edit")?.addEventListener("click",i=>{i.stopPropagation(),s(t)}),r}class A{container;imgElement;currentZoom=1;images=[];currentIndex=0;isDragging=!1;startX=0;startY=0;translateX=0;translateY=0;constructor(){this.container=document.createElement("div"),this.container.id="counter-lightbox",this.container.className="fixed inset-0 z-50 hidden bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 select-none",this.container.innerHTML=`
      <!-- Barra Superior -->
      <div class="w-full flex items-center justify-between text-white z-10 px-4 py-2 bg-slate-900/60 rounded-xl backdrop-blur-sm">
        <div class="flex items-center gap-3">
          <span class="font-mono text-sm tracking-wider font-bold text-amber-400" id="lb-counter">1 / 1</span>
          <span class="text-xs text-slate-400" id="lb-title"></span>
        </div>
        <div class="flex items-center gap-2">
          <button id="lb-zoom-out" class="p-2 hover:bg-slate-700 rounded-lg transition-colors title='Diminuir Zoom'" aria-label="Diminuir Zoom">
            ${c.zoomOut("w-5 h-5 text-slate-200")}
          </button>
          <span id="lb-zoom-level" class="font-mono text-xs font-bold text-slate-300 w-12 text-center">100%</span>
          <button id="lb-zoom-in" class="p-2 hover:bg-slate-700 rounded-lg transition-colors title='Aumentar Zoom'" aria-label="Aumentar Zoom">
            ${c.zoomIn("w-5 h-5 text-slate-200")}
          </button>
          <button id="lb-zoom-reset" class="px-2 py-1 text-xs font-mono bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors">
            Reset
          </button>
          <div class="h-5 w-px bg-slate-700 mx-1"></div>
          <button id="lb-close" class="p-2 hover:bg-red-600 rounded-lg transition-colors text-white" aria-label="Fechar">
            ${c.close("w-6 h-6")}
          </button>
        </div>
      </div>

      <!-- Área Central de Imagem -->
      <div id="lb-viewport" class="relative flex-1 w-full flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing">
        <img id="lb-img" src="" alt="Peça em Alta Resolução" class="max-w-[90vw] max-h-[80vh] object-contain transition-transform duration-75 origin-center shadow-2xl rounded-lg bg-white" draggable="false" />
        
        <!-- Navegação Anterior / Próximo -->
        <button id="lb-prev" class="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/70 hover:bg-blue-600 text-white rounded-full transition-colors hidden" aria-label="Foto Anterior">
          ${c.chevronLeft("w-6 h-6")}
        </button>
        <button id="lb-next" class="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-slate-900/70 hover:bg-blue-600 text-white rounded-full transition-colors hidden" aria-label="Próxima Foto">
          ${c.chevronRight("w-6 h-6")}
        </button>
      </div>

      <!-- Barra Inferior de Dica -->
      <div class="text-xs text-slate-400 font-mono py-1">
        Use a roda do mouse ou os botões para zoom (50% a 400%). Arraste para mover. Tecla ESC para sair.
      </div>
    `,document.body.appendChild(this.container),this.imgElement=this.container.querySelector("#lb-img"),this.bindEvents()}bindEvents(){this.container.querySelector("#lb-close").addEventListener("click",()=>this.close()),this.container.querySelector("#lb-zoom-in").addEventListener("click",()=>this.adjustZoom(.25)),this.container.querySelector("#lb-zoom-out").addEventListener("click",()=>this.adjustZoom(-.25)),this.container.querySelector("#lb-zoom-reset").addEventListener("click",()=>this.resetZoom()),this.container.querySelector("#lb-prev").addEventListener("click",()=>this.navigate(-1)),this.container.querySelector("#lb-next").addEventListener("click",()=>this.navigate(1));const d=this.container.querySelector("#lb-viewport");d.addEventListener("wheel",i=>{const u=i;u.preventDefault();const l=u.deltaY<0?.2:-.2;this.adjustZoom(l)},{passive:!1}),d.addEventListener("mousedown",i=>{const u=i;this.currentZoom>1&&(this.isDragging=!0,this.startX=u.clientX-this.translateX,this.startY=u.clientY-this.translateY)}),window.addEventListener("mousemove",i=>{this.isDragging&&(this.translateX=i.clientX-this.startX,this.translateY=i.clientY-this.startY,this.updateTransform())}),window.addEventListener("mouseup",()=>{this.isDragging=!1}),window.addEventListener("keydown",i=>{this.container.classList.contains("hidden")||(i.key==="Escape"&&this.close(),i.key==="ArrowLeft"&&this.navigate(-1),i.key==="ArrowRight"&&this.navigate(1))})}open(e,s=0,r=""){if(!e||e.length===0)return;this.images=e,this.currentIndex=Math.max(0,Math.min(s,e.length-1));const o=this.container.querySelector("#lb-title");o.textContent=r,this.resetZoom(),this.updateImage(),this.container.classList.remove("hidden")}close(){this.container.classList.add("hidden"),this.resetZoom()}updateImage(){this.imgElement.src=v(this.images[this.currentIndex]);const e=this.container.querySelector("#lb-counter");e.textContent=`${this.currentIndex+1} / ${this.images.length}`;const s=this.container.querySelector("#lb-prev"),r=this.container.querySelector("#lb-next");this.images.length>1?(s.classList.remove("hidden"),r.classList.remove("hidden")):(s.classList.add("hidden"),r.classList.add("hidden"))}navigate(e){this.images.length<=1||(this.currentIndex=(this.currentIndex+e+this.images.length)%this.images.length,this.resetZoom(),this.updateImage())}adjustZoom(e){this.currentZoom=Math.min(4,Math.max(.5,this.currentZoom+e)),this.currentZoom===1&&(this.translateX=0,this.translateY=0),this.updateTransform()}resetZoom(){this.currentZoom=1,this.translateX=0,this.translateY=0,this.updateTransform()}updateTransform(){this.imgElement.style.transform=`translate(${this.translateX}px, ${this.translateY}px) scale(${this.currentZoom})`;const e=this.container.querySelector("#lb-zoom-level");e.textContent=`${Math.round(this.currentZoom*100)}%`}}async function P(t){const e=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(e)).map(r=>r.toString(16).padStart(2,"0")).join("")}function D(t){return new Promise((e,s)=>{const r=new FileReader;r.onload=()=>e(r.result),r.onerror=s,r.readAsDataURL(t)})}async function $(t,e=.96,s=1200){const r=await createImageBitmap(t);let{width:o,height:n}=r;(o>s||n>s)&&(o>n?(n=Math.round(n*s/o),o=s):(o=Math.round(o*s/n),n=s));const a=document.createElement("canvas");a.width=o,a.height=n;const d=a.getContext("2d");if(!d)throw new Error("Falha ao obter contexto 2D do Canvas");d.fillStyle="#FFFFFF",d.fillRect(0,0,o,n),d.drawImage(r,0,0,o,n);const i=await new Promise((m,p)=>{a.toBlob(g=>{g?m(g):p(new Error("Falha na conversão para WebP"))},"image/webp",e)}),u=await i.arrayBuffer(),l=await P(u),h=await D(i);return{webpBlob:i,dataUrl:h,sha256:l,width:o,height:n}}async function F(t,e=.9,s=320){return(await $(t,e,s)).dataUrl}const R="BalcaoMiudezasDB",z=1,b="products",B="custom_images";let C=null;function w(){return C?Promise.resolve(C):new Promise((t,e)=>{const s=indexedDB.open(R,z);s.onupgradeneeded=r=>{const o=r.target.result;if(!o.objectStoreNames.contains(b)){const n=o.createObjectStore(b,{keyPath:"id"});n.createIndex("boxNumber","boxNumber",{unique:!1}),n.createIndex("internalCode","internalCode",{unique:!1}),n.createIndex("category","category",{unique:!1})}o.objectStoreNames.contains(B)||o.createObjectStore(B,{keyPath:"sha256"})},s.onsuccess=r=>{C=r.target.result,t(C)},s.onerror=()=>{e(new Error("Erro ao abrir banco IndexedDB: "+s.error))}})}async function N(t){const e=await w();return new Promise((s,r)=>{const o=e.transaction([b],"readwrite"),n=o.objectStore(b),a=n.getAll();a.onsuccess=()=>{const d=a.result||[],i=new Map;for(const l of d)i.set(l.id,l);const u=[];for(const l of t){const h=E(l),m=i.get(h.id),p=m?E(m):void 0;p?(p.userEdited||p.isCustom?(p!==m&&n.put(p),u.push(p)):(n.put(h),u.push(h)),i.delete(h.id)):(n.put(h),u.push(h))}for(const l of i.values()){const h=E(l);h!==l&&n.put(h),u.push(h)}o.oncomplete=()=>s(u),o.onerror=()=>r(o.error)},a.onerror=()=>r(a.error)})}async function L(){const t=await w();return new Promise((e,s)=>{const n=t.transaction(b,"readonly").objectStore(b).getAll();n.onsuccess=()=>e((n.result||[]).map(a=>E(a))),n.onerror=()=>s(n.error)})}async function O(t){const e=await w();return new Promise((s,r)=>{const n=e.transaction(b,"readwrite").objectStore(b),a={...t,userEdited:!0,updatedAt:new Date().toISOString()},d=n.put(a);d.onsuccess=()=>s(),d.onerror=()=>r(d.error)})}async function H(t){const e=await w();return new Promise((s,r)=>{const a=e.transaction(b,"readwrite").objectStore(b).delete(t);a.onsuccess=()=>s(),a.onerror=()=>r(a.error)})}async function U(t,e){const s=await w();return new Promise((r,o)=>{const d=s.transaction(B,"readwrite").objectStore(B).put({sha256:t,dataUrl:e,createdAt:new Date().toISOString()});d.onsuccess=()=>r(),d.onerror=()=>o(d.error)})}async function V(){const t=await L(),e=new Map;for(const r of t){const o=r.boxNumber||"SEM CAIXA";e.has(o)||e.set(o,{items:[],categories:new Set,thumb:r.thumbnail||r.images[0]||S});const n=e.get(o);n.items.push(r),r.category&&n.categories.add(r.category),!n.thumb&&r.thumbnail&&(n.thumb=r.thumbnail)}const s=[];for(const[r,o]of e.entries())s.push({boxNumber:r,itemCount:o.items.length,categories:Array.from(o.categories),items:o.items,sampleThumbnail:o.thumb});return s.sort((r,o)=>r.boxNumber.localeCompare(o.boxNumber,void 0,{numeric:!0}))}async function Z(){const t=await L(),e={backupVersion:"1.0.0",exportedAt:new Date().toISOString(),totalItems:t.length,products:t},s=JSON.stringify(e,null,2),r=new TextEncoder,o=await P(r.encode(s));return{jsonString:s,sha256:o,totalItems:t.length}}async function W(t){try{const e=JSON.parse(t);if(!e||!Array.isArray(e.products))return{success:!1,importedCount:0,error:"Arquivo de backup inválido: lista de produtos não encontrada"};const r=(await w()).transaction(b,"readwrite"),o=r.objectStore(b);for(const n of e.products)n.id&&o.put(n);return await new Promise((n,a)=>{r.oncomplete=()=>n(),r.onerror=()=>a(r.error)}),{success:!0,importedCount:e.products.length}}catch(e){return{success:!1,importedCount:0,error:e instanceof Error?e.message:String(e)}}}class X{container;currentProduct=null;currentImages=[];onSaveCallback;onDeleteCallback;constructor(e,s,r){this.onSaveCallback=s,this.onDeleteCallback=r,this.container=document.createElement("div"),this.container.id="product-crud-modal",this.container.className="fixed inset-0 z-50 hidden bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto";const o=e.map(n=>`<option value="${n}">${n}</option>`).join("");this.container.innerHTML=`
      <div class="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden my-8">
        <!-- Cabeçalho -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
          <div class="flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-600 text-white">
              ${c.edit("w-5 h-5")}
            </span>
            <div>
              <h2 id="modal-title" class="text-lg font-black text-slate-800 dark:text-slate-100">
                Editar Produto de Balcão
              </h2>
              <span id="modal-id" class="font-mono text-xs text-slate-400">ID: Novo</span>
            </div>
          </div>
          <button id="modal-close" class="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl transition-colors" aria-label="Fechar">
            ${c.close("w-5 h-5")}
          </button>
        </div>

        <!-- Formulário -->
        <form id="product-form" class="p-6 space-y-5">
          <!-- Linha 1: Caixa e Código Interno (Destaque Maior) -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="block text-xs font-black tracking-wider uppercase text-blue-600 dark:text-blue-400">
                Número da Caixa / Gaveta *
              </label>
              <div class="relative">
                <input type="text" id="input-box" required placeholder="Ex: 940, 10309, 1048B, GAVETA"
                  class="w-full px-4 py-2.5 rounded-xl border-2 border-blue-500/40 focus:border-blue-600 bg-slate-50 dark:bg-slate-900 font-mono text-lg font-black text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-black tracking-wider uppercase text-slate-600 dark:text-slate-300">
                Código Interno da Loja
              </label>
              <input type="text" id="input-internal-code" placeholder="Ex: MU392, MU10309, LT-2340"
                class="w-full px-4 py-2.5 rounded-xl border-2 border-slate-300 dark:border-slate-600 focus:border-blue-600 bg-slate-50 dark:bg-slate-900 font-mono text-lg font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          <!-- Linha 2: Categoria e Preço -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="sm:col-span-2 space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Categoria / Seção
              </label>
              <select id="input-category" class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                ${o}
              </select>
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Preço Unitário (R$)
              </label>
              <input type="number" step="0.01" min="0" id="input-price" placeholder="0.00"
                class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-sm font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          <!-- Linha 3: Descrição Completa -->
          <div class="space-y-1.5">
            <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
              Descrição e Aplicação da Peça *
            </label>
            <textarea id="input-description" rows="2" required placeholder="Ex: Grampo Superior Bagagito Linha Citroën C3 / C4"
              class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"></textarea>
          </div>

          <!-- Linha 4: Códigos de Referência e Montadoras -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Códigos de Referência (separados por vírgula)
              </label>
              <input type="text" id="input-refcodes" placeholder="Ex: P-185, LF0437, JAHU 08271-9"
                class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>

            <div class="space-y-1.5">
              <label class="block text-xs font-bold text-slate-600 dark:text-slate-300">
                Montadoras (separadas por vírgula)
              </label>
              <input type="text" id="input-carmakers" placeholder="Ex: VW, GM, Fiat, Ford, Toyota"
                class="w-full px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
          </div>

          <!-- Galeria de Fotos Multi-Ângulos (Ctrl+V / Drag & Drop) -->
          <div class="space-y-2">
            <label class="block text-xs font-black tracking-wider uppercase text-slate-700 dark:text-slate-300">
              Fotos da Peça (Colar com Ctrl+V ou Arrastar)
            </label>

            <!-- Zona de Drop e Cola -->
            <div id="drop-zone" tabindex="0" class="relative border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-4 text-center cursor-pointer transition-colors focus:outline-none focus:border-blue-600">
              <input type="file" id="file-input" accept="image/*" multiple class="hidden" />
              <div class="flex flex-col items-center justify-center gap-1.5 text-slate-500 dark:text-slate-400">
                ${c.camera("w-7 h-7 text-blue-500")}
                <p class="text-xs font-semibold text-slate-700 dark:text-slate-200">
                  Clique para anexar, arraste arquivos ou <span class="text-blue-600 dark:text-blue-400 font-black">Cole com Ctrl+V</span>
                </p>
                <p class="text-[11px] text-slate-400">
                  Conversão automática para WebP (quality=96) sobre fundo branco puro
                </p>
              </div>
            </div>

            <!-- Lista de Miniaturas -->
            <div id="thumbnails-list" class="flex flex-wrap gap-2.5 pt-2 min-h-[60px]"></div>
          </div>

          <!-- Rodapé com Botões de Ação -->
          <div class="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
            <div>
              <button type="button" id="btn-delete" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors hidden">
                ${c.trash("w-4 h-4")}
                <span>Excluir</span>
              </button>
              <button type="button" id="btn-duplicate" class="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors hidden">
                ${c.copy("w-4 h-4")}
                <span>Duplicar Peça</span>
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button type="button" id="btn-cancel" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                Cancelar
              </button>
              <button type="submit" id="btn-save" class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-black shadow-md transition-colors">
                ${c.check("w-4 h-4")}
                <span>Salvar Alterações</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    `,document.body.appendChild(this.container),this.bindEvents()}bindEvents(){this.container.querySelector("#modal-close").addEventListener("click",()=>this.close()),this.container.querySelector("#btn-cancel").addEventListener("click",()=>this.close()),this.container.querySelector("#product-form").addEventListener("submit",i=>{i.preventDefault(),this.handleSave()}),this.container.querySelector("#btn-delete").addEventListener("click",()=>{this.currentProduct&&confirm("Deseja realmente excluir esta peça do catálogo?")&&(this.onDeleteCallback(this.currentProduct.id),H(this.currentProduct.id),this.close())}),this.container.querySelector("#btn-duplicate").addEventListener("click",()=>{this.currentProduct&&this.openNew({...this.currentProduct,id:`custom_${Date.now()}`,description:`[CÓPIA] ${this.currentProduct.description}`,isCustom:!0})});const a=this.container.querySelector("#drop-zone"),d=this.container.querySelector("#file-input");a.addEventListener("click",()=>d.click()),d.addEventListener("change",async()=>{if(d.files)for(let i=0;i<d.files.length;i++)await this.processImageFile(d.files[i]);d.value=""}),a.addEventListener("dragover",i=>{i.preventDefault(),a.classList.add("border-blue-600","bg-blue-50/20")}),a.addEventListener("dragleave",()=>{a.classList.remove("border-blue-600","bg-blue-50/20")}),a.addEventListener("drop",async i=>{const u=i;if(u.preventDefault(),a.classList.remove("border-blue-600","bg-blue-50/20"),u.dataTransfer?.files)for(let l=0;l<u.dataTransfer.files.length;l++)await this.processImageFile(u.dataTransfer.files[l])}),this.container.addEventListener("paste",async i=>{const u=i,l=u.clipboardData?.items;if(l){for(let h=0;h<l.length;h++)if(l[h].type.startsWith("image/")){const m=l[h].getAsFile();m&&(u.preventDefault(),await this.processImageFile(m))}}})}async processImageFile(e){try{const s=await $(e,.96);await U(s.sha256,s.dataUrl),this.currentImages.push(s.dataUrl),this.renderThumbnails()}catch(s){alert("Erro ao converter imagem para WebP: "+s)}}renderThumbnails(){const e=this.container.querySelector("#thumbnails-list");if(e.innerHTML="",this.currentImages.length===0){e.innerHTML='<span class="text-xs text-slate-400 italic">Nenhuma foto anexada. Use Ctrl+V para colar.</span>';return}this.currentImages.forEach((s,r)=>{const o=document.createElement("div");o.className="relative w-16 h-16 rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden bg-white shadow-sm group",o.innerHTML=`
        <img src="${v(s)}" class="w-full h-full object-contain p-1" />
        <button type="button" class="btn-remove-thumb absolute top-0.5 right-0.5 p-1 bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity" data-idx="${r}" title="Remover Foto">
          ${c.close("w-3 h-3")}
        </button>
      `,o.querySelector(".btn-remove-thumb").addEventListener("click",a=>{a.stopPropagation(),this.currentImages.splice(r,1),this.renderThumbnails()}),e.appendChild(o)})}openEdit(e){this.currentProduct=e,this.currentImages=[...e.images||[]];const s=this.container.querySelector("#modal-title");s.textContent="Editar Peça de Balcão";const r=this.container.querySelector("#modal-id");r.textContent=`ID: ${e.id}`,this.container.querySelector("#input-box").value=e.boxNumber||"",this.container.querySelector("#input-internal-code").value=e.internalCode||"",this.container.querySelector("#input-category").value=e.category||"",this.container.querySelector("#input-description").value=e.description||"",this.container.querySelector("#input-refcodes").value=(e.refCodes||[]).join(", "),this.container.querySelector("#input-carmakers").value=(e.carmakers||[]).join(", "),this.container.querySelector("#input-price").value=e.price!==null&&e.price!==void 0?String(e.price):"",this.container.querySelector("#btn-delete")?.classList.remove("hidden"),this.container.querySelector("#btn-duplicate")?.classList.remove("hidden"),this.renderThumbnails(),this.container.classList.remove("hidden")}openNew(e){this.currentProduct=null,this.currentImages=e?.images?[...e.images]:[];const s=this.container.querySelector("#modal-title");s.textContent="Cadastrar Nova Peça no Balcão";const r=this.container.querySelector("#modal-id");r.textContent="ID: Novo (Automático)",this.container.querySelector("#input-box").value=e?.boxNumber||"",this.container.querySelector("#input-internal-code").value=e?.internalCode||"",this.container.querySelector("#input-category").value=e?.category||"",this.container.querySelector("#input-description").value=e?.description||"",this.container.querySelector("#input-refcodes").value=(e?.refCodes||[]).join(", "),this.container.querySelector("#input-carmakers").value=(e?.carmakers||[]).join(", "),this.container.querySelector("#input-price").value=e?.price!==null&&e?.price!==void 0?String(e.price):"",this.container.querySelector("#btn-delete")?.classList.add("hidden"),this.container.querySelector("#btn-duplicate")?.classList.add("hidden"),this.renderThumbnails(),this.container.classList.remove("hidden")}close(){this.container.classList.add("hidden"),this.currentProduct=null,this.currentImages=[]}async handleSave(){const e=this.container.querySelector("#input-box").value.trim(),s=this.container.querySelector("#input-internal-code").value.trim(),r=this.container.querySelector("#input-category").value,o=this.container.querySelector("#input-description").value.trim(),n=this.container.querySelector("#input-refcodes").value.trim(),a=this.container.querySelector("#input-carmakers").value.trim(),d=this.container.querySelector("#input-price").value.trim(),i=n?n.split(",").map(y=>y.trim()).filter(Boolean):[],u=a?a.split(",").map(y=>y.trim()).filter(Boolean):["Universal"],l=d?parseFloat(d):null;let h=this.currentImages[0]||S;if(this.currentImages[0]&&this.currentImages[0].startsWith("data:"))try{const x=await(await fetch(this.currentImages[0])).blob();h=await F(x,.9,320)}catch{h=this.currentImages[0]}const m=this.currentProduct?this.currentProduct.id:`custom_${Date.now()}`,p=this.currentProduct?this.currentProduct.sourceDoc:"Cadastro Manual de Balcão",g={id:m,sourceDoc:p,category:r,boxNumber:e,internalCode:s,refCodes:i,description:o,cleanDescription:o,carmakers:u,technicalSpecs:this.currentProduct?.technicalSpecs||[],images:this.currentImages,thumbnail:h,needsDescriptionReview:!1,price:l,updatedAt:new Date().toISOString(),userEdited:!0,isCustom:this.currentProduct?this.currentProduct.isCustom:!0};await O(g),this.onSaveCallback(g),this.close()}}class G{container;onSelectBoxCallback;constructor(e){this.onSelectBoxCallback=e,this.container=document.createElement("div"),this.container.id="box-map-modal",this.container.className="fixed inset-0 z-50 hidden bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto",this.container.innerHTML=`
      <div class="relative w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        <!-- Topo -->
        <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80">
          <div class="flex items-center gap-3">
            <span class="p-2 rounded-xl bg-blue-600 text-white">
              ${c.box("w-6 h-6")}
            </span>
            <div>
              <h2 class="text-lg font-black text-slate-800 dark:text-slate-100">
                Mapa Físico de Caixas e Gavetas
              </h2>
              <span id="box-map-count" class="font-mono text-xs text-slate-500">Carregando caixas...</span>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-print-boxes" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-600 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              ${c.printer("w-4 h-4")}
              <span>Imprimir Mapa</span>
            </button>
            <button id="box-map-close" class="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-xl transition-colors" aria-label="Fechar">
              ${c.close("w-5 h-5")}
            </button>
          </div>
        </div>

        <!-- Filtro Rápido de Caixas -->
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
          <div class="relative">
            <input type="text" id="box-filter-input" placeholder="Filtrar por número da caixa..."
              class="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-sm font-mono font-bold text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <span class="absolute left-3 top-2.5 text-slate-400">
              ${c.search("w-4 h-4")}
            </span>
          </div>
        </div>

        <!-- Grade de Caixas -->
        <div id="boxes-grid" class="p-6 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5">
          <!-- Renderizado dinamicamente -->
        </div>
      </div>
    `,document.body.appendChild(this.container),this.bindEvents()}bindEvents(){this.container.querySelector("#box-map-close").addEventListener("click",()=>this.close()),this.container.querySelector("#btn-print-boxes").addEventListener("click",()=>window.print());const r=this.container.querySelector("#box-filter-input");r.addEventListener("input",()=>{this.filterBoxes(r.value.trim().toLowerCase())})}async open(){this.container.classList.remove("hidden");const e=await V();this.renderBoxes(e)}close(){this.container.classList.add("hidden")}currentBoxes=[];renderBoxes(e){this.currentBoxes=e;const s=this.container.querySelector("#box-map-count");s.textContent=`${e.length} caixas físicas registradas no balcão`,this.filterBoxes("")}filterBoxes(e){const s=this.container.querySelector("#boxes-grid");s.innerHTML="";const r=this.currentBoxes.filter(o=>!e||o.boxNumber.toLowerCase().includes(e)||o.categories.some(n=>n.toLowerCase().includes(e)));if(r.length===0){s.innerHTML='<div class="col-span-full py-12 text-center text-sm text-slate-400 font-mono">Nenhuma caixa encontrada com este filtro.</div>';return}r.forEach(o=>{const n=document.createElement("div");n.className="group relative flex flex-col items-center justify-between p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 hover:border-blue-600 transition-all cursor-pointer shadow-sm hover:shadow-md",n.innerHTML=`
        <div class="w-full flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
          <span class="px-2.5 py-1 rounded-lg font-mono text-sm font-black bg-blue-600 text-white shadow-sm">
            CX ${o.boxNumber}
          </span>
          <span class="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
            ${o.itemCount} ${o.itemCount===1?"item":"itens"}
          </span>
        </div>

        <div class="w-16 h-16 my-2 flex items-center justify-center overflow-hidden rounded-xl bg-white p-1">
          <img src="${v(o.sampleThumbnail)}" alt="Caixa ${o.boxNumber}" class="max-w-full max-h-full object-contain filter drop-shadow-sm" loading="lazy" />
        </div>

        <div class="w-full text-center">
          <p class="text-[11px] font-semibold text-slate-600 dark:text-slate-300 truncate" title="${o.categories.join(", ")}">
            ${o.categories[0]||"Miudezas"}
          </p>
        </div>
      `,n.addEventListener("click",()=>{this.onSelectBoxCallback(o.boxNumber),this.close()}),s.appendChild(n)})}}class _{allProducts=[];filteredProducts=[];searchEngine=new j;lightbox;productModal=null;boxMapModal;deferredInstallPrompt=null;state={query:"",category:"all",carmaker:"all",status:"all",viewMode:"grid",showPrices:!0,theme:"light"};constructor(){this.lightbox=new A,this.boxMapModal=new G(e=>{this.filterByBox(e)})}async init(){this.initTheme(),this.bindDOMEvents(),this.setupPWA();try{const o=(await(await fetch("./catalog-master-seed.json")).json()).items||[];this.allProducts=await N(o)}catch{this.allProducts=await L()}this.populateCategories(),this.searchEngine.indexProducts(this.allProducts);const e=Array.from(new Set(this.allProducts.map(s=>s.category))).sort();this.productModal=new X(e,s=>this.handleProductSaved(s),s=>this.handleProductDeleted(s)),this.applyFilters()}initTheme(){const e=localStorage.getItem("balcao_theme");this.state.theme=e||"light",this.applyTheme()}applyTheme(){const e=document.documentElement,s=document.getElementById("theme-icon"),r=document.getElementById("theme-icon-mobile");this.state.theme==="dark"?(e.classList.add("dark"),s&&(s.innerHTML=c.sun("w-4 h-4 text-amber-400")),r&&(r.innerHTML=c.sun("w-5 h-5 text-amber-400"))):(e.classList.remove("dark"),s&&(s.innerHTML=c.moon("w-4 h-4 text-slate-700")),r&&(r.innerHTML=c.moon("w-5 h-5 text-slate-700"))),localStorage.setItem("balcao_theme",this.state.theme)}toggleTheme(){this.state.theme=this.state.theme==="light"?"dark":"light",this.applyTheme()}populateCategories(){const e=document.getElementById("filter-category");if(!e)return;const s=Array.from(new Set(this.allProducts.map(r=>r.category))).sort();e.innerHTML='<option value="all">Todas as Seções (15 Categorias)</option>',s.forEach(r=>{const o=document.createElement("option");o.value=r,o.textContent=r,e.appendChild(o)})}bindDOMEvents(){const e=document.getElementById("omnibox-search"),s=document.getElementById("btn-clear-search");e?.addEventListener("input",()=>{this.state.query=e.value,this.state.query?s.classList.remove("hidden"):s.classList.add("hidden"),this.applyFilters()}),s?.addEventListener("click",()=>{e.value="",this.state.query="",s.classList.add("hidden"),e.focus(),this.applyFilters()}),window.addEventListener("keydown",i=>{i.key==="/"&&document.activeElement!==e&&(i.preventDefault(),e.focus(),e.select())});const r=document.getElementById("filter-category");r?.addEventListener("change",()=>{this.state.category=r.value,this.applyFilters()});const o=document.getElementById("filter-carmaker");o?.addEventListener("change",()=>{this.state.carmaker=o.value,this.applyFilters()});const n=document.getElementById("filter-status");n?.addEventListener("change",()=>{this.state.status=n.value,this.applyFilters()});const a=document.getElementById("btn-toggle-view");this.updateViewModeButton(),a?.addEventListener("click",()=>{this.state.viewMode=this.state.viewMode==="grid"?"mural":"grid",this.updateViewModeButton(),this.renderProducts()});const d=document.getElementById("btn-toggle-prices");this.updatePricesButton(),d?.addEventListener("click",()=>{this.state.showPrices=!this.state.showPrices,this.updatePricesButton(),this.renderProducts(),this.showToast(this.state.showPrices?"Preços visíveis na tela":"Preços ocultados (Modo Balcão)",this.state.showPrices?c.eye("w-4 h-4 text-emerald-400"):c.eyeOff("w-4 h-4 text-amber-400"))}),document.getElementById("btn-box-map")?.addEventListener("click",()=>{this.boxMapModal.open()}),document.getElementById("btn-toggle-theme")?.addEventListener("click",()=>this.toggleTheme()),document.getElementById("btn-theme-mobile")?.addEventListener("click",()=>this.toggleTheme()),document.getElementById("btn-new-item")?.addEventListener("click",()=>{this.productModal?.openNew()}),document.getElementById("btn-new-item-mobile")?.addEventListener("click",()=>{this.productModal?.openNew()}),document.getElementById("btn-clear-filters")?.addEventListener("click",()=>{this.clearAllFilters()}),document.getElementById("btn-backup")?.addEventListener("click",()=>{this.handleBackupPrompt()})}updateViewModeButton(){const e=document.getElementById("view-mode-icon"),s=document.getElementById("view-mode-text");this.state.viewMode==="grid"?(e&&(e.innerHTML=c.layoutGrid("w-4 h-4 text-blue-600")),s&&(s.textContent="Mural Visual")):(e&&(e.innerHTML=c.grid("w-4 h-4 text-amber-500")),s&&(s.textContent="Grade Padrão"))}updatePricesButton(){const e=document.getElementById("prices-icon");e&&(e.innerHTML=this.state.showPrices?c.eye("w-4 h-4 text-slate-700 dark:text-slate-200"):c.eyeOff("w-4 h-4 text-amber-500"))}applyFilters(){const e=performance.now();this.filteredProducts=this.searchEngine.search(this.state.query,{category:this.state.category,carmaker:this.state.carmaker,status:this.state.status});const s=performance.now()-e;this.updateStats(s),this.renderProducts()}updateStats(e){const s=document.getElementById("results-count"),r=document.getElementById("search-latency");s&&(s.textContent=`${this.filteredProducts.length} ${this.filteredProducts.length===1?"peça":"peças"}`),r&&(r.textContent=`${e.toFixed(1)}ms`)}renderProducts(){const e=document.getElementById("products-grid"),s=document.getElementById("empty-state");if(e.innerHTML="",this.filteredProducts.length===0){s.classList.remove("hidden"),e.classList.add("hidden");return}s.classList.add("hidden"),e.classList.remove("hidden"),this.state.viewMode==="mural"?e.className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4":e.className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6";const r=this.filteredProducts.slice(0,150),o=(i,u,l)=>{this.lightbox.open(i,u,l)},n=i=>{this.productModal?.openEdit(i)},a=(i,u)=>{navigator.clipboard.writeText(i),this.showToast(`${u} copiado: ${i}`,c.check("w-4 h-4 text-emerald-400"))},d=document.createDocumentFragment();r.forEach(i=>{let u;this.state.viewMode==="mural"?u=T(i,o,n):u=q(i,this.state.showPrices,o,n,a),d.appendChild(u)}),e.appendChild(d)}filterByBox(e){const s=document.getElementById("omnibox-search");s&&(s.value=`cx ${e}`,this.state.query=`cx ${e}`,document.getElementById("btn-clear-search")?.classList.remove("hidden")),this.applyFilters()}clearAllFilters(){const e=document.getElementById("omnibox-search"),s=document.getElementById("filter-category"),r=document.getElementById("filter-carmaker"),o=document.getElementById("filter-status");e&&(e.value=""),s&&(s.value="all"),r&&(r.value="all"),o&&(o.value="all"),this.state.query="",this.state.category="all",this.state.carmaker="all",this.state.status="all",document.getElementById("btn-clear-search")?.classList.add("hidden"),this.applyFilters()}handleProductSaved(e){const s=this.allProducts.findIndex(r=>r.id===e.id);s>=0?this.allProducts[s]=e:this.allProducts.unshift(e),this.searchEngine.indexProducts(this.allProducts),this.applyFilters(),this.showToast("Peça salva no catálogo com sucesso!",c.check("w-4 h-4 text-emerald-400"))}handleProductDeleted(e){this.allProducts=this.allProducts.filter(s=>s.id!==e),this.searchEngine.indexProducts(this.allProducts),this.applyFilters(),this.showToast("Peça removida do catálogo.",c.trash("w-4 h-4 text-red-400"))}async handleBackupPrompt(){if(confirm(`DESEJA EXPORTAR OU RESTAURAR O BACKUP?

[OK] = Exportar Backup Completo com Hash SHA-256 (.json)
[Cancelar] = Selecionar arquivo para Restaurar Backup`)){const s=await Z(),r=new Blob([s.jsonString],{type:"application/json"}),o=URL.createObjectURL(r),n=document.createElement("a");n.href=o,n.download=`backup_catalogo_miudezas_${new Date().toISOString().slice(0,10)}.json`,n.click(),URL.revokeObjectURL(o),this.showToast(`Backup de ${s.totalItems} itens gerado (SHA-256 verificado)`,c.download("w-4 h-4 text-blue-400"))}else{const s=document.createElement("input");s.type="file",s.accept=".json",s.onchange=async()=>{if(s.files?.[0]){const r=await s.files[0].text(),o=await W(r);o.success?(this.allProducts=await L(),this.searchEngine.indexProducts(this.allProducts),this.applyFilters(),this.showToast(`${o.importedCount} itens restaurados com sucesso!`,c.check("w-4 h-4 text-emerald-400"))):alert("Falha na restauração do backup: "+o.error)}},s.click()}}showToast(e,s){const r=document.getElementById("toast"),o=document.getElementById("toast-message"),n=document.getElementById("toast-icon");o.textContent=e,n.innerHTML=s,r.classList.remove("translate-y-20","opacity-0"),r.classList.add("translate-y-0","opacity-100"),setTimeout(()=>{r.classList.add("translate-y-20","opacity-0"),r.classList.remove("translate-y-0","opacity-100")},2800)}setupPWA(){"serviceWorker"in navigator&&window.location.protocol.startsWith("http")&&navigator.serviceWorker.register("./sw.js").then(n=>{n.addEventListener("updatefound",()=>{const a=n.installing;a&&a.addEventListener("statechange",()=>{a.state==="installed"&&navigator.serviceWorker.controller&&this.showToast("Nova versão disponível! Recarregue para atualizar.",c.refreshCw("w-4 h-4 text-blue-400"))})})}).catch(n=>{console.warn("Falha ao registrar Service Worker:",n)});const e=document.getElementById("btn-install-pwa"),s=document.getElementById("btn-install-pwa-mobile");if(window.matchMedia("(display-mode: standalone)").matches||window.navigator.standalone===!0){e?.classList.add("hidden"),s?.classList.add("hidden");return}window.addEventListener("beforeinstallprompt",n=>{n.preventDefault(),this.deferredInstallPrompt=n,e?.classList.remove("hidden"),s?.classList.remove("hidden")});const o=async()=>{if(!this.deferredInstallPrompt)return;this.deferredInstallPrompt.prompt(),(await this.deferredInstallPrompt.userChoice).outcome==="accepted"&&this.showToast("Instalação iniciada!",c.check("w-4 h-4 text-emerald-400")),this.deferredInstallPrompt=null,e?.classList.add("hidden"),s?.classList.add("hidden")};e?.addEventListener("click",o),s?.addEventListener("click",o),window.addEventListener("appinstalled",()=>{this.showToast("Aplicativo de Balcão instalado com sucesso!",c.check("w-4 h-4 text-emerald-400")),e?.classList.add("hidden"),s?.classList.add("hidden"),this.deferredInstallPrompt=null})}}window.addEventListener("DOMContentLoaded",()=>{new _().init()});
