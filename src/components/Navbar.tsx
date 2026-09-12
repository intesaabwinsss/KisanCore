import React, { useState } from 'react';
import { 
  Sprout, 
  Sparkles, 
  ShoppingBag, 
  Menu, 
  X, 
  TrendingUp,
  Tractor,
  Building2,
  Store,
  Truck,
  ShieldCheck,
  Languages,
  ChevronDown,
  Bell,
  User,
  LogOut
} from 'lucide-react';
import { RoleType, Language, CartItem } from '../types';
import { MULTILINGUAL_TRANSLATIONS, MOCK_MANDI_TICKERS } from '../data/mockData';
import { usePriceAlerts } from '../context/PriceAlertContext';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeRole: RoleType;
  onSelectRole: (role: RoleType) => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  onOpenAdvisory: () => void;
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeRole,
  onSelectRole,
  currentLanguage,
  onSelectLanguage,
  onOpenAdvisory,
  cartItems,
  onOpenCart,
  onOpenAuth,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [dashboardMenuOpen, setDashboardMenuOpen] = useState(false);
  const [authMenuOpen, setAuthMenuOpen] = useState(false);

  const { unreadCount, setIsNotificationCenterOpen, openCreateAlertModal } = usePriceAlerts();
  const { currentUser, logout } = useAuth();

  const handleLanguageChange = (code: Language) => {
    onSelectLanguage(code);
    setLangMenuOpen(false);

    // Trigger Google Translate script
    const googleTranslateCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
    if (googleTranslateCombo) {
      googleTranslateCombo.value = code;
      googleTranslateCombo.dispatchEvent(new Event('change'));
    }
  };

  const t = MULTILINGUAL_TRANSLATIONS[currentLanguage] || MULTILINGUAL_TRANSLATIONS.en;
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantityKg, 0);


  const navRoles: { id: RoleType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'government', label: 'Govt. Supply Chain Monitor 🏛️', icon: <Building2 className="w-4 h-4 text-emerald-800" /> },
    { id: 'distress_demo', label: 'CROP DISTRESS ENGINE 🚨', icon: <Sparkles className="w-4 h-4 text-red-500" /> },
    { id: 'consumer', label: 'Consumer Marketplace 🛒', icon: <ShoppingBag className="w-4 h-4 text-emerald-600" /> },
    { id: 'matching', label: 'Smart Matches 🤖', icon: <Sparkles className="w-4 h-4 text-amber-500" /> },
    { id: 'farmer', label: t.farmerPortal || 'Farmer (Kisan)', icon: <Tractor className="w-4 h-4" /> },
    { id: 'b2b', label: t.b2bPortal || 'B2B Procurement', icon: <Building2 className="w-4 h-4" /> },
    { id: 'retail', label: t.retailPortal || 'Retail Market', icon: <Store className="w-4 h-4" /> },
    { id: 'logistics', label: t.logisticsPortal || 'Cold Logistics', icon: <Truck className="w-4 h-4" /> },
    { id: 'admin', label: t.adminPortal || 'APMC Admin', icon: <ShieldCheck className="w-4 h-4" /> },
  ];

  const languagesList: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिन्दी' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  const getRoleBadge = (role: RoleType) => {
    switch (role) {
      case 'landing': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-200/50 text-emerald-800 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(16,185,129,0.2)]">Direct Farmgate</span>;
      case 'government': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-200/50 text-indigo-700 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(99,102,241,0.2)]">Govt Monitor</span>;
      case 'farmer': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-200/50 text-emerald-800 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(16,185,129,0.2)]">Farmer Portal</span>;
      case 'b2b': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-200/50 text-blue-800 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(59,130,246,0.2)]">B2B Trade</span>;
      case 'consumer': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-teal-500/10 border border-teal-200/50 text-teal-800 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(20,184,166,0.2)]">Consumer</span>;
      case 'retail': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-200/50 text-amber-800 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(245,158,11,0.2)]">Retail</span>;
      case 'logistics': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-cyan-500/10 border border-cyan-200/50 text-cyan-800 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(6,182,212,0.2)]">Logistics</span>;
      case 'matching': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-purple-500/10 border border-purple-200/50 text-purple-800 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(168,85,247,0.2)]">AI Match Engine</span>;
      case 'admin': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-slate-500/10 gradient-border-organic border-0/50 text-slate-800 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(100,116,139,0.2)]">APMC Admin</span>;
      case 'distress_demo': return <span className="hidden sm:inline-flex px-2 py-0.5 rounded-md bg-red-500/10 border border-red-200/50 text-red-800 text-[9px] uppercase tracking-widest font-black shadow-[0_0_10px_rgba(239,68,68,0.2)]">Distress Alert</span>;
      default: return null;
    }
  };

  return (
    <div className="sticky top-0 z-50 pt-4 sm:pt-6 px-4 w-full max-w-7xl mx-auto">
      <header className="bg-gradient-to-br from-white/80 via-slate-50/50 to-emerald-50/40 backdrop-blur-xl hover:border-emerald-400/60 hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)]  transition-all duration-500 rounded-[2rem] border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300">
      {/* Main Navigation Bar */}
      <div className="px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-3">
          {/* Logo & Brand */}
          <div 
            onClick={() => onSelectRole('landing')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-400 rounded-xl animate-ping opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-b from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-[0_4px_14px_rgba(4,120,87,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] group- group-hover:shadow-[0_6px_20px_rgba(4,120,87,0.4)] transition-all duration-300">
                <Sprout className="w-5 h-5 text-emerald-50 drop-shadow-sm" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span translate="no" className="notranslate text-xl font-display font-black bg-gradient-to-r from-emerald-700 to-emerald-500 bg-clip-text text-transparent tracking-tighter drop-shadow-sm">
                  KisanDirect
                </span>
                {getRoleBadge(activeRole)}
              </div>
            </div>
          </div>

          {/* Desktop Navigation - Clean Naked Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-5">
            <button
              onClick={() => onSelectRole('landing')}
              className={`text-sm font-medium transition-colors ${
                activeRole === 'landing' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Overview
            </button>

            <button
              onClick={() => onSelectRole('government')}
              className={`text-sm font-medium transition-colors ${
                activeRole === 'government'
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Govt Monitor
            </button>

            <button
              onClick={() => onSelectRole('consumer')}
              className={`text-sm font-medium transition-colors ${
                activeRole === 'consumer'
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Consumer
            </button>

            <button
              onClick={() => onSelectRole('matching')}
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                activeRole === 'matching'
                  ? 'text-emerald-700 font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Matches
              <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            </button>

            <div className="relative">
              <button
                onClick={() => setDashboardMenuOpen(!dashboardMenuOpen)}
                className={`flex items-center gap-1.5 text-sm transition-colors ${
                  activeRole !== 'landing' ? 'text-emerald-700 font-bold' : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              >
                <span>Dashboard</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {dashboardMenuOpen && (
                <div className="absolute top-full mt-2 w-56 bg-white/95 backdrop-blur-xl border border-emerald-900/10 rounded-2xl shadow-xl py-2 z-50 max-h-[60vh] overflow-y-auto animate-in fade-in zoom-in-95">
                  {navRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        onSelectRole(role.id);
                        setDashboardMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 transition-colors ${
                        activeRole === role.id
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {role.icon}
                      <span>{role.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 xl:gap-3 ml-auto border-l border-slate-200/50 pl-2 xl:pl-4 shrink-0">
            {/* Quick Set Price Alert Button (Minimal Ghost Button) */}
            <button
              onClick={() => openCreateAlertModal()}
              className="hidden sm:flex items-center gap-1.5 px-2 py-1.5 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100/50 text-xs font-bold transition-all active:scale-95"
              title="Set Target Commodity Price Alert"
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* AI Advisor Button (Primary Singular CTA) */}
            <button
              onClick={onOpenAdvisory}
              className="hidden md:flex items-center gap-1.5 px-2 xl:px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-bold shadow-md shadow-emerald-900/20 transition-all hover:scale-105 active:scale-95"
              title="Live APMC Mandi Intelligence & AI Advisor (Google Search Grounded)"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              <span className="hidden xl:inline">KisanMitra AI</span>
            </button>

            {/* Notification Bell Button */}
            <button
              onClick={() => setIsNotificationCenterOpen(true)}
              className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              title="Market Notifications & Price Alerts"
            >
              <Bell className="w-5 h-5 text-slate-800" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
              title="Open Procurement Cart"
            >
              <ShoppingBag className="w-5 h-5 text-slate-800" />
              {totalCartCount > 0 && (
                <span className="absolute top-1 right-1 min-w-4 h-4 px-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* Auth / User Menu */}
            <div className="relative">
              {currentUser ? (
                <div>
                  <button
                    onClick={() => setAuthMenuOpen(!authMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                  >
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                      {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="hidden sm:block lg:hidden xl:block text-left">
                      <div className="text-[10px] font-bold text-emerald-900 leading-tight truncate max-w-[80px]">{currentUser.name}</div>
                      <div className="text-[9px] text-emerald-700 capitalize">{currentUser.role}</div>
                    </div>
                  </button>
                  {authMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl border border-emerald-900/10 rounded-2xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95">
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-900 truncate">{currentUser.name}</p>
                        <p className="text-xs text-slate-500 truncate">{currentUser.mobile}</p>
                        {currentUser.role === 'farmer' && currentUser.walletBalance !== undefined && (
                          <div className="mt-2 bg-emerald-50 p-2 rounded-lg border border-emerald-100">
                            <p className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Kisan Wallet</p>
                            <p className="text-sm font-black text-emerald-600">₹{currentUser.walletBalance.toLocaleString('en-IN')}</p>
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          logout();
                          setAuthMenuOpen(false);
                          onSelectRole('landing');
                        }}
                        className="w-full text-left px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-semibold transition-colors mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenAuth}
                  className="flex items-center gap-1.5 px-2 xl:px-3 py-2 rounded-xl text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors shadow-sm"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline lg:hidden xl:inline">Login / Register</span>
                </button>
              )}
            </div>

            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-1.5 xl:px-2 py-2 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-100"
              >
                <Languages className="w-4 h-4 text-emerald-700" />
                <span className="hidden sm:inline lg:hidden xl:inline uppercase text-[10px] font-bold">{currentLanguage}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white/95 backdrop-blur-xl border border-emerald-900/10 rounded-2xl shadow-xl py-2 z-50 max-h-[60vh] overflow-y-auto animate-in fade-in zoom-in-95">
                  {languagesList.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => handleLanguageChange(item.code)}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition-colors ${
                        currentLanguage === item.code
                          ? 'bg-emerald-50 text-emerald-800 font-bold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.native}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-100 space-y-1">
            <button
              onClick={() => {
                onSelectRole('landing');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeRole === 'landing' ? 'bg-emerald-50 text-emerald-800' : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => {
                onSelectRole('matching');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-colors ${
                activeRole === 'matching' ? 'bg-emerald-50 text-emerald-800 font-bold' : 'text-slate-700 hover:bg-slate-50 font-medium'
              }`}
            >
              <Sparkles className={`w-5 h-5 ${activeRole === 'matching' ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>Smart Matches</span>
            </button>

            <button
              onClick={() => {
                onOpenAdvisory();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-md shadow-emerald-900/20 mt-2"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
                <span>KisanMitra AI Advisor</span>
              </div>
            </button>

            <button
              onClick={() => {
                setIsNotificationCenterOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-emerald-700" />
                <span>Price Alerts & Notifications</span>
              </div>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-xs font-bold">
                  {unreadCount} new
                </span>
              )}
            </button>

            <div className="pt-2 pb-1 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Dashboards
            </div>
            <div className="space-y-1">
              {navRoles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => {
                    onSelectRole(role.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    activeRole === role.id
                      ? 'bg-emerald-50 text-emerald-800'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {role.icon}
                  <span>{role.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
    </div>
  );
};
