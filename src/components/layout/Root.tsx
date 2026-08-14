import { useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from './Header'
import { FloatingAIButton } from './FloatingAIButton'
import { SiteFooter } from './Footer'

export function Root() {
  const [mobileOpen, setMobileOpen] = useState(false)
  return (
    <div style={{ backgroundColor: '#F4F9F8', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @keyframes floatBob { 0%,100%{transform:translateY(0px) rotate(-2deg);}50%{transform:translateY(-8px) rotate(2deg);} }
        @keyframes ripple { 0%{transform:scale(1);opacity:0.6;}100%{transform:scale(2.2);opacity:0;} }
        @keyframes slideInUp { from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);} }
        @keyframes fadeIn { from{opacity:0;}to{opacity:1;} }
        @keyframes pulse { 0%,100%{opacity:1;}50%{opacity:0.3;} }
        @keyframes float { 0%,100%{transform:translateY(0px);}50%{transform:translateY(-10px);} }
        @keyframes floatSlow { 0%,100%{transform:translateY(0px) rotate(0deg);}50%{transform:translateY(-16px) rotate(3deg);} }
        @keyframes blink { 0%,100%{opacity:1;}50%{opacity:0;} }
        .reveal-hidden{opacity:0;transform:translateY(28px);transition:opacity 0.6s ease,transform 0.6s ease;}
        .reveal-visible{opacity:1;transform:translateY(0);}
        button:active{transform:scale(0.97)!important;}
        input:focus,textarea:focus,select:focus{outline:none!important;border-color:#00B894!important;box-shadow:0 0 0 3px rgba(0,184,148,0.12)!important;}
      `}</style>
      <Header mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <Outlet />
      <FloatingAIButton />
      <SiteFooter />
    </div>
  )
}
