import React, { useEffect, useState } from 'react';
import parse, { attributesToProps, domToReact } from 'html-react-parser';
import pages from './content/pages.json';
import copy from './content/copy.json';
import answers from './content/faq.json';
import { site } from './content/site.js';
import './source.css';

const hasClass = (node, name) => node.attribs?.class?.split(' ').includes(name);
const textOf = node => node.type === 'text' ? node.data : (node.children || []).map(textOf).join('');

function Faq({ node }) {
  const question = Object.keys(answers).find(q => textOf(node).startsWith(q));
  const [open, setOpen] = useState(question === Object.keys(answers)[0]);
  const props = attributesToProps(node.attribs);
  const title = node.children.find(n => n.attribs?.['data-framer-name'] === 'Title');
  return <div {...props} className={`${props.className.replace(/framer-v-\S+/, open ? 'framer-v-1ghiahe' : 'framer-v-cuizou')} ported-faq`} data-open={open}>
    <div className="framer-2uce7y" role="button" tabIndex={0} aria-expanded={open} onClick={() => setOpen(!open)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}>
      {domToReact(title?.children || [], renderOptions())}
    </div>
    {open && <div className="framer-1h4hqtz"><p className="framer-text framer-styles-preset-1iedl9x">{copy[answers[question]] || answers[question]}</p></div>}
  </div>;
}

function MobileNavigation({ node }) {
  const [open, setOpen] = useState(false);
  const props = attributesToProps(node.attribs);
  return <nav {...props} className={props.className.replace(/framer-v-\S+/, open ? 'framer-v-ktjk3h' : 'framer-v-1kfg39n')} data-framer-name={open ? 'Phone Opened' : 'Phone Closed'}>
    {domToReact(node.children, renderOptions({ toggleMenu: () => setOpen(!open), open }))}
  </nav>;
}

function ContactForm({ node }) {
  const [status, setStatus] = useState('');
  return <form {...attributesToProps(node.attribs)} onSubmit={event => {
    event.preventDefault();
    if (!site.contactEmail) { setStatus('Message delivery is not configured yet. Please use your preferred contact channel.'); return; }
    const data = new FormData(event.currentTarget);
    const values = Array.from(data.values()).filter(v => typeof v === 'string');
    const body = encodeURIComponent(values.join('\n\n'));
    window.location.href = `mailto:${site.contactEmail}?subject=Portfolio%20enquiry&body=${body}`;
    setStatus('Your email app will open with a draft. Send it there to deliver your message.');
  }}>
    {domToReact(node.children, renderOptions())}
    {status && <p role="status" className="form-status">{status}</p>}
  </form>;
}

function renderOptions(context = {}) {
  return { replace(node) {
    if (node.type === 'text' && Object.hasOwn(copy, node.data)) return <>{copy[node.data]}</>;
    if (!node.attribs) return;
    if (hasClass(node, 'framer-YZJkT')) return <Faq node={node} />;
    if (node.name === 'nav' && node.attribs['data-framer-name']?.startsWith('Phone')) return <MobileNavigation node={node} />;
    if (context.toggleMenu && hasClass(node, 'framer-o65npq-container')) return <button {...attributesToProps(node.attribs)} type="button" aria-label={context.open ? 'Close navigation' : 'Open navigation'} aria-expanded={context.open} onClick={context.toggleMenu}>{domToReact(node.children, renderOptions())}</button>;
    if (node.name === 'form') return <ContactForm node={node} />;
    if (node.name === 'script') return <></>;
    if (node.name === 'a' && node.attribs.href?.startsWith('mailto:')) {
      const props = attributesToProps(node.attribs);
      return <a {...props} href={site.contactEmail ? `mailto:${site.contactEmail}` : '/contact'} target={undefined}>{domToReact(node.children, renderOptions())}</a>;
    }
    if (node.name === 'img' && site.portrait && node.attribs.alt === 'Oshada Nilendra') return <img {...attributesToProps(node.attribs)} src={site.portrait} srcSet={undefined} />;
  }};
}

export function App() {
  const [path, setPath] = useState(window.location.pathname.replace(/\/$/, '') || '/');
  const [phone, setPhone] = useState(window.matchMedia('(max-width: 809px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 809px)');
    const resize = () => setPhone(media.matches);
    const pop = () => setPath(window.location.pathname.replace(/\/$/, '') || '/');
    media.addEventListener('change', resize); window.addEventListener('popstate', pop);
    return () => { media.removeEventListener('change', resize); window.removeEventListener('popstate', pop); };
  }, []);
  useEffect(() => { document.title = path === '/' ? `${site.name} — Portfolio` : `${site.name} — ${path === '/works' ? 'Work' : path === '/about' ? 'About' : path === '/contact' ? 'Contact' : pages[path]?.title?.replace('Works - ', '') || 'Not found'}`; }, [path]);
  const navigate = event => {
    const anchor = event.target.closest('a');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin || url.hash || !pages[url.pathname.replace(/\/$/, '') || '/']) return;
    event.preventDefault();
    window.history.pushState({}, '', url.pathname); setPath(url.pathname.replace(/\/$/, '') || '/'); window.scrollTo({top: 0, behavior: 'instant'});
  };
  const page = pages[path];
  return <div onClick={navigate} key={`${path}-${phone}`}>
    {page ? parse(page[phone ? 'mobile' : 'desktop'] || page.desktop, renderOptions()) : <main className="not-found"><h1>Page not found</h1><a href="/">Back home</a></main>}
  </div>;
}
