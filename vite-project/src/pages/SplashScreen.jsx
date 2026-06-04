import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // Show splash screen for 2.5 seconds then redirect to login
    const timer = setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-surface-secondary flex flex-col items-center justify-center relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-brand-teal/40 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="relative z-10 flex flex-col items-center animate-slide-up">
        {/* Logo Container */}
        <div className="w-32 h-32 bg-white rounded-3xl shadow-soft flex items-center justify-center mb-8 p-4 animate-bounce-subtle">
          <img src="/logo.png" alt="MMPlaza Logo" className="w-full h-full object-contain" />
        </div>
        
        {/* Brand Name */}
        <h1 className="text-4xl md:text-5xl font-bold font-display text-brand-text mb-4 tracking-tight">
          ProductHub
        </h1>
        
        <p className="text-brand-muted font-medium tracking-wide">
          MMPlaza Marketplace System
        </p>

        {/* Loading Indicator */}
        <div className="flex items-center gap-2 mt-12">
          <div className="w-2.5 h-2.5 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2.5 h-2.5 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2.5 h-2.5 bg-brand-green rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}
