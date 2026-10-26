import { Children, cloneElement, useEffect, useRef, useState } from 'react';
import { AlertTriangle, ArrowRight, BookOpen, Check, ChevronLeft, ChevronRight, Clock3, CreditCard, FileCheck2, ListChecks, Mail, MonitorSmartphone, PackageCheck, Calculator, Scale, Flame, ClipboardList, ShoppingBasket, ShieldCheck } from 'lucide-react';
import { content } from './content.js';
import { comercial } from './comercial.js';
const painIcons=[ShoppingBasket,Scale,Flame,Calculator,ClipboardList,AlertTriangle];
const mechanismIcons=[BookOpen,Scale,Calculator,ListChecks];
function CTA({label='QUERO O KIT COMPLETO',href='#oferta'}) {return <a className="btn" href={href}>{label}<ArrowRight size={19} aria-hidden="true"/></a>;}
function SectionTitle({children,lead}) {return <header className="section-title"><h2>{children}</h2>{lead&&<p>{lead}</p>}</header>;}
function ProductComposition({variant='hero'}) {
 const compact=variant==='compact';const collection=variant==='collection';
 return <div className={`product-composition product-composition--${variant}`} role="group" aria-label="Capa e páginas reais do Espetinho do Zero">
  <img className="product-sheet product-sheet--left" src="/assets/receita-bovina-v3.webp" alt="Receita real de bovino alho e sal" width="720" height="1480" loading={compact||collection?'lazy':undefined}/>
  <img className="product-sheet product-sheet--middle" src="/assets/ficha-lote-v3.webp" alt="Ficha de registro da produção" width="720" height="1480" loading={compact||collection?'lazy':undefined}/>
  <img className="product-sheet product-sheet--right" src="/assets/lista-compras-v3.webp" alt="Lista de compra para um lote de 30 unidades" width="720" height="1480" loading={compact||collection?'lazy':undefined}/>
  <img className="product-cover" src="/assets/capa-v3.webp" alt="Capa oficial Espetinho do Zero" width="720" height="1480" loading={compact||collection?'lazy':undefined} fetchPriority={compact||collection?undefined:'high'}/>
  {variant==='hero'&&<div className="phone-mockup"><img src="/assets/receita-frango-v3.webp" alt="Página de receita consultada em dispositivo" width="720" height="1480"/></div>}
  {!compact&&<div className="quantity-seal"><strong>12</strong><span>RECEITAS</span></div>}
 </div>;
}
function SpreadsheetComposition(){
 const [view,setView]=useState('painel');
 const screens={painel:{src:'/assets/planilha-painel-v3.webp',alt:'Painel real do XLSX entregue: custo por unidade, preço sugerido, margem e simulação mensal'},inicio:{src:'/assets/planilha-inicio-v3.webp',alt:'Tela Início real do XLSX entregue, com os atalhos de navegação'}};
 return <div className="spreadsheet-preview"><div className="preview-tabs" role="group" aria-label="Escolha uma tela real da planilha"><button type="button" aria-pressed={view==='painel'} onClick={()=>setView('painel')}>Painel de preços</button><button type="button" aria-pressed={view==='inicio'} onClick={()=>setView('inicio')}>Tela inicial</button></div><div className="spreadsheet-composition" role="group" aria-label="Captura real da planilha entregue"><img className="support-sheet" src="/assets/ficha-lote-v3.webp" alt="Ficha de registro do lote piloto incluída no manual" loading="lazy" width="720" height="1480"/><div className="laptop"><div className="laptop-screen"><img src={screens[view].src} alt={screens[view].alt} loading="lazy" width="1440" height="1240"/></div><div className="laptop-base"/></div></div><a className="preview-enlarge" href={screens[view].src} target="_blank" rel="noopener noreferrer">Ampliar esta tela ↗</a></div>;
}
function ScrollRail({ children, label, className = '', auto = false, interval = 2800 }) {
  const ref = useRef(null);
  const pausedRef = useRef(false);
  const [stopped, setStopped] = useState(false);
  const stoppedRef = useRef(false);
  const dragRef = useRef(null);
  const visibleRef = useRef(false);
  const resumeTimerRef = useRef(null);
  const normalizeTimerRef = useRef(null);
  const items = Children.toArray(children);
  const renderedItems = auto
    ? [...items, ...items.map((child, index) => cloneElement(child, { key: `loop-${index}`, 'aria-hidden': true }))]
    : items;

  const cycleWidth = () => {
    const rail = ref.current;
    if (!rail || rail.children.length <= items.length) return 0;
    return rail.children[items.length].offsetLeft - rail.children[0].offsetLeft;
  };

  const normalize = () => {
    const rail = ref.current;
    const width = cycleWidth();
    if (!rail || !width) return;
    if (rail.scrollLeft >= width) rail.scrollLeft -= width;
  };

  const pauseTemporarily = () => {
    pausedRef.current = true;
    window.clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = window.setTimeout(() => { pausedRef.current = false; }, 4200);
  };

  const scheduleNormalize = () => {
    window.clearTimeout(normalizeTimerRef.current);
    normalizeTimerRef.current = window.setTimeout(normalize, 700);
  };

  const move = direction => {
    const rail = ref.current;
    if (!rail) return;
    pauseTemporarily();
    const width = cycleWidth();
    if (direction < 0 && width && rail.scrollLeft <= 2) rail.scrollLeft = width;
    rail.scrollBy({ left: direction * rail.clientWidth * .82, behavior: 'smooth' });
    scheduleNormalize();
  };

  useEffect(() => {
    if (!auto || !ref.current) return undefined;
    const rail = ref.current;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const observer = new IntersectionObserver(([entry]) => { visibleRef.current = entry.isIntersecting; }, { threshold: .18 });
    observer.observe(rail);
    const timer = window.setInterval(() => {
      if (reduceMotion.matches || stoppedRef.current || pausedRef.current || !visibleRef.current || document.hidden) return;
      const firstItem = rail.children[0];
      const secondItem = rail.children[1];
      const step = secondItem ? secondItem.offsetLeft - firstItem.offsetLeft : rail.clientWidth * .82;
      rail.scrollBy({ left: step, behavior: 'smooth' });
      scheduleNormalize();
    }, interval);
    return () => {
      observer.disconnect();
      window.clearInterval(timer);
      window.clearTimeout(resumeTimerRef.current);
      window.clearTimeout(normalizeTimerRef.current);
    };
  }, [auto, interval, items.length]);

  return <div className={`rail-stage ${className}`}>
    <button type="button" className="rail-arrow rail-arrow--left" onClick={() => move(-1)} aria-label={`Ver anteriores em ${label}`}><ChevronLeft /></button>
    <div
      className={`rail${auto ? ' rail--loop' : ''}`}
      ref={ref}
      tabIndex="0"
      aria-label={label}
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      onFocus={() => { pausedRef.current = true; }}
      onBlur={() => { pausedRef.current = false; }}
      onKeyDown={e => { if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){ e.preventDefault(); move(e.key === 'ArrowRight' ? 1 : -1); } }}
      onPointerDown={e => { pausedRef.current = true; if(e.pointerType==='mouse'){dragRef.current={x:e.clientX,left:ref.current.scrollLeft};e.currentTarget.setPointerCapture(e.pointerId);} }}
      onPointerMove={e => {if(dragRef.current) ref.current.scrollLeft=dragRef.current.left+dragRef.current.x-e.clientX;}}
      onPointerUp={() => {dragRef.current=null;pauseTemporarily();}}
      onPointerCancel={() => {dragRef.current=null;pauseTemporarily();}}
      onTouchEnd={pauseTemporarily}
    >{renderedItems}</div>
    {auto && <button className="rail-pause" type="button" aria-pressed={stopped} onClick={() => {stoppedRef.current=!stopped;setStopped(!stopped);}}>{stopped ? "Retomar movimento" : "Pausar movimento"}</button>}
    <button type="button" className="rail-arrow rail-arrow--right" onClick={() => move(1)} aria-label={`Ver próximos em ${label}`}><ChevronRight /></button>
  </div>;
}


function checkoutUrl(){if(!/^https:\/\//.test(comercial.checkoutUrl))return '';try{const u=new URL(comercial.checkoutUrl);for(const[k,v]of new URLSearchParams(window.location.search))if(/^utm_|^(fbclid|gclid)$/.test(k))u.searchParams.set(k,v);return u.href;}catch{return '';}}
export default function App(){const checkout=checkoutUrl();return <>
 <main>
 <section className="hero"><div className="content content--860 hero-flow">
  <p className="hero-pill">{content.hero.badge}</p>
  <h1>{content.hero.titleBefore}<em>{content.hero.titleEmphasis}</em>{content.hero.titleAfter}</h1>
  <div className="hero-media"><ProductComposition/></div>
  <p className="hero-sub">{content.hero.subtitle.map(([t,b],i)=>b?<strong key={i}>{t}</strong>:<span key={i}>{t}</span>)}</p>
  <CTA label="QUERO CONHECER O KIT" href="#previas"/>
  <ul className="hero-bullets">{content.hero.bullets.map(t=><li key={t}><Check size={20} aria-hidden="true"/><span>{t}</span></li>)}</ul>
  <p className="hero-amplitude">PDF ilustrado + planilha de precificação <span>•</span> R$37, pagamento único</p>
 </div></section>
 <section className="section pain"><div className="content content--880 section-flow">
  <SectionTitle>{content.pain.title} <span className="title-accent">{content.pain.emphasis}</span></SectionTitle>
  <div className="pain-grid">{content.pains.map((t,i)=>{const Icon=painIcons[i];return <div className="pain-chip" key={t}><Icon size={20} aria-hidden="true"/><span>{t}</span></div>;})}</div>
  <p className="bridge">{content.pain.bridge.map(([t,b],i)=>b?<strong key={i}>{t}</strong>:<span key={i}>{t}</span>)}</p>
 </div></section>
 <section className="section section--tint gallery" id="previas"><div className="content content--1180 section-flow">
  <SectionTitle lead={content.gallerySection.lead}>{content.gallerySection.title}</SectionTitle>
  <ScrollRail label="Páginas reais do kit" className="gallery-rail">{content.gallery.map(([src,t])=><figure className="gallery-card" key={src}><a className="gallery-page-link" href={src} target="_blank" rel="noopener noreferrer" aria-label={`Ampliar: ${t}`}><img src={src} alt={t} loading="lazy" width="720" height="1480" draggable="false"/><span className="gallery-open">Ver página inteira ↗</span></a><figcaption>{t}</figcaption></figure>)}</ScrollRail>
  <p className="sample-caption">{content.gallerySection.caption}</p>
 </div></section>
 <section className="section mechanism"><div className="content content--1120 section-flow">
  <SectionTitle lead={content.mechanismSection.lead}>{content.mechanismSection.title}</SectionTitle>
  <div className="mechanism-proof"><img src="/assets/receita-bovina-v3.webp" alt="Página final da receita com ingredientes, medidas e base do lote" loading="lazy" width="720" height="1480"/><div className="mechanism-grid">{content.mechanism.map(([h,t],i)=>{const Icon=mechanismIcons[i];return <article key={h}><span className="mechanism-icon"><Icon size={25} aria-hidden="true"/></span><h3><span className="step-number">{i+1}.</span> {h}</h3><p>{t}</p></article>;})}</div></div>
  <p className="mechanism-close">{content.mechanismClose}</p><CTA/>
 </div></section>
 <section className="section mid-pitch"><div className="content content--1040 mid-pitch-grid">
  <div><div className="mid-pitch-media"><SpreadsheetComposition/></div><p className="sample-caption">{content.midPitch.caption}</p></div>
  <div className="mid-pitch-copy"><h2>{content.midPitch.title}</h2><p>{content.midPitch.text}</p><CTA/></div>
 </div></section>
 <section className="section audiences"><div className="content content--1040 section-flow">
  <SectionTitle lead={content.audienceSection.lead}>{content.audienceSection.title}</SectionTitle>
  <div className="audience-grid">{content.audiences.map(([h,t])=><article key={h}><span><Check size={18} aria-hidden="true"/></span><div><h3>{h}</h3><p>{t}</p></div></article>)}</div>
 </div></section>
 <section className="section section--tint receive"><div className="content content--1000 section-flow">
  <SectionTitle>{content.benefitsSection.title}</SectionTitle>
  <div className="receive-media"><ProductComposition variant="collection"/></div>
  <article className="receive-card"><p className="access-badge">{content.offer.badge}</p><h3>{content.offer.name}</h3><p>{content.benefitsSection.summary}</p><ul>{content.benefits.map(t=><li key={t}><Check size={20} aria-hidden="true"/><span>{t}</span></li>)}</ul></article>
 </div></section>
 <section className="section offer" id="oferta"><div className="content content--720 section-flow">
  <SectionTitle>{content.offer.title}</SectionTitle>
  <div className="value-stack" aria-label="Conteúdo incluído no preço"><p>UM PAGAMENTO PELO CONJUNTO</p><ul>{comercial.valueStack.map(([t,v])=><li key={t}><span>{t}</span><strong>{v}</strong></li>)}</ul><div><strong>PREÇO DO KIT</strong><span>{comercial.price}</span></div></div>
  <article className="plan-card" id="checkout"><p className="plan-badge">{content.offer.badge}</p><h3>{content.offer.name}</h3><p className="plan-subtitle">Receitas, produção e preço certo.</p><div className="plan-mockup"><ProductComposition variant="compact"/></div>
  <ul>{content.included.map(t=><li key={t}><Check size={20} aria-hidden="true"/><span>{t}</span></li>)}</ul>
  <div className="price"><small>Pagamento único</small><strong>{comercial.price}</strong><span>Sem mensalidade. Produto digital.</span></div>
  {checkout?<CTA href={checkout}/>:<button className="btn btn--unavailable" type="button" disabled>QUERO O KIT COMPLETO<ArrowRight size={18} aria-hidden="true"/></button>}
  {!checkout&&<p className="checkout-pending" role="status">Compras ainda não abertas nesta prévia.</p>}
  <div className="payment-trust"><span><PackageCheck size={19} aria-hidden="true"/>Entrega digital</span><span><CreditCard size={19} aria-hidden="true"/>Pagamento único</span><span><FileCheck2 size={19} aria-hidden="true"/>PDF + planilha XLSX</span></div>
  </article><p className="offer-close">{content.offer.noTrick}</p>
 </div></section>
 <section className="section purchase-safety" id="condicoes"><div className="content content--1000 safety-layout">
  <article className="guarantee-card"><ShieldCheck size={48} aria-hidden="true"/><h2>Confira as condições antes de comprar.</h2><p>Consulte no checkout os dados do vendedor, o prazo de acesso, o suporte e a política de reembolso.</p><a className="text-link" href="/politicas.html">Ler informações da compra</a></article>
  <div className="safety-cards"><article><MonitorSmartphone size={30} aria-hidden="true"/><div><h3>Saiba o formato da entrega.</h3><p>Manual em PDF e planilha XLSX. Sem aulas em vídeo, ingredientes ou equipamentos.</p></div></article><article><Calculator size={30} aria-hidden="true"/><div><h3>Use seus custos reais.</h3><p>Os exemplos orientam o preenchimento. O cálculo depende dos valores informados e não garante lucro.</p></div></article></div>
 </div></section>
 <section className="section section--tint access-steps"><div className="content content--980 section-flow">
  <SectionTitle>Da compra ao seu primeiro lote.</SectionTitle>
  <div className="steps-grid"><article><span>1</span><CreditCard aria-hidden="true"/><h3>Conclua o pagamento.</h3><p>Confira o valor e as condições apresentados pela plataforma antes de confirmar.</p></article><article><span>2</span><Mail aria-hidden="true"/><h3>Receba o acesso digital.</h3><p>{comercial.access}</p></article><article><span>3</span><ClipboardList aria-hidden="true"/><h3>Prepare e registre.</h3><p>Leia o manual, faça um lote piloto e preencha a planilha com seus dados.</p></article></div><CTA/>
 </div></section>
 <section className="section faq"><div className="content content--780 section-flow"><SectionTitle>Antes de decidir, tire suas dúvidas.</SectionTitle><div className="faq-list">{content.faqs.map(([q,a])=><details key={q}><summary>{q}<ChevronRight size={18} aria-hidden="true"/></summary><p>{a}</p></details>)}</div></div></section>
 <section className="closing"><div className="content content--860 closing-inner"><h2>{content.closing.titleBefore}<em>{content.closing.titleEmphasis}</em>{content.closing.titleAfter}</h2><p className="closing-lead">{content.closing.lead}</p><CTA/><small>Kit digital por R$37. Resultados dependem da aplicação e da operação.</small></div></section>
 </main>
 <footer className="footer"><div className="footer-inner"><p className="footer-brand">ESPETINHO DO ZERO</p>{comercial.company&&<p>{comercial.company}{comercial.document?' • '+comercial.document:''}</p>}{comercial.supportEmail&&<p>Suporte: {comercial.supportEmail}</p>}<p className="footer-legal">Conteúdo educativo. Rendimentos culinários estimados. Faça um lote piloto e siga as exigências sanitárias da sua operação.</p><nav aria-label="Informações legais"><a href="/politicas.html">Termos e privacidade</a></nav></div></footer>
 </>;
}
