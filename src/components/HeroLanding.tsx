import React, { useState } from 'react';
import { 
  Tractor, 
  Building2, 
  Store, 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  QrCode,
  Coins,
  Shield,
  Thermometer,
  Plus,
  Minus,
  Check,
  Info,
  X,
  TrendingUp,
  Search,
  Bell
} from 'lucide-react';
import { RoleType, Language, ProduceListing } from '../types';
import { MULTILINGUAL_TRANSLATIONS, MOCK_PRODUCE_LISTINGS } from '../data/mockData';
import { usePriceAlerts } from '../context/PriceAlertContext';


interface HeroLandingProps {
  onSelectRole: (role: RoleType) => void;
  onOpenAdvisory: () => void;
  onInspectTraceability: (produce: ProduceListing) => void;
  onInspectPriceBreakdown?: (produce: ProduceListing) => void;
  onAddToCart: (produce: ProduceListing) => void;
  currentLanguage: Language;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onSelectRole,
  onOpenAdvisory,
  onInspectTraceability,
  onInspectPriceBreakdown,
  onAddToCart,
  currentLanguage,
}) => {
  const { openCreateAlertModal } = usePriceAlerts();
  const t = MULTILINGUAL_TRANSLATIONS[currentLanguage] || MULTILINGUAL_TRANSLATIONS.en;

  // Interactive State
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const [activeMetricModal, setActiveMetricModal] = useState<{
    title: string;
    value: string;
    description: string;
    details: string[];
  } | null>(null);

  const roleCards = [
    {
      id: 'government' as RoleType,
      title: 'Govt. Supply Chain Monitor',
      subtitle: 'Regional supply/demand intelligence, farmer uplift & fraud security.',
      icon: <Building2 className="w-5 h-5 text-emerald-800" />,
      cta: 'Launch Command Center',
    },
    {
      id: 'farmer' as RoleType,
      title: 'Farmer & FPO',
      subtitle: 'List harvest lots, scan with AI for grade & fair price.',
      icon: <Tractor className="w-5 h-5 text-emerald-700" />,
      cta: 'Enter Portal',
    },
    {
      id: 'b2b' as RoleType,
      title: 'B2B Procurement',
      subtitle: 'Bulk sourcing for supermarkets & exporters. Post RFQs.',
      icon: <Building2 className="w-5 h-5 text-emerald-700" />,
      cta: 'Explore RFQs',
    },
    {
      id: 'retail' as RoleType,
      title: 'Retail Market',
      subtitle: 'Farm-fresh vegetables & fruits delivered to consumers.',
      icon: <Store className="w-5 h-5 text-emerald-700" />,
      cta: 'Shop Fresh',
    },
    {
      id: 'logistics' as RoleType,
      title: 'Cold-Chain Logistics',
      subtitle: 'IoT refrigerated reefer dispatch & telemetry.',
      icon: <Truck className="w-5 h-5 text-emerald-700" />,
      cta: 'Monitor Fleet',
    },
    {
      id: 'admin' as RoleType,
      title: 'APMC Admin',
      subtitle: 'Market arrivals oversight and MSP protection alerts.',
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />,
      cta: 'Open Admin',
    },
  ];

  const metricsData = [
    {
      value: '+22%',
      label: 'Farmer Profit vs Mandi',
      detailsTitle: 'Direct Buyer Auction vs APMC Middlemen',
      description: 'Farmers earn 22% higher net realization by selling directly to pre-verified retail and B2B buyers.',
      points: [
        'Elimination of 6.5% - 8.5% commission agent (Adathiya) cuts',
        'Transparent AI computer vision grading eliminates arbitrary quality deductions',
        'Direct UPI settlement within 2 hours of arrival scan'
      ]
    },
    {
      value: '0%',
      label: 'Farmer Commission (2% Buyer Fee)',
      detailsTitle: '0% Farmer Commission • 2.0% Buyer Facilitation Fee',
      description: 'Under the Option A revenue model, farmers and FPOs keep 100% of their listed farmgate earnings with zero commission deductions. Buyers pay a transparent 2.0% facilitation fee to cover digital escrow and AI quality assaying.',
      points: [
        '0% deduction for farmers: 100% of listed price transferred directly to farmer bank accounts',
        '2.0% buyer platform facilitation fee charged at checkout to fund instant UPI escrow & AI computer vision assay',
        'Saves buyers 6% - 8% compared to traditional APMC commission agent (Adathiya) cuts',
        'Generates sustainable platform revenue while empowering growers'
      ]
    },
    {
      value: '<2.4%',
      label: 'Transit Spoilage Loss',
      detailsTitle: 'IoT Cold-Chain & Reefer Telemetry',
      description: 'Active temperature and humidity sensors ensure fresh perishables stay crisp from farm packhouse to fork.',
      points: [
        'Average open-truck mandi transit spoilage is ~25-30%',
        'KisanMandi multi-temp reefers maintain 2°C to 12°C uninterrupted',
        'Automated driver SMS alerts when internal Reefer RH drops below threshold'
      ]
    },
    {
      value: '100%',
      label: 'Farm-to-Fork Traceable',
      detailsTitle: 'Blockchain Provenance & AGMARK Testing',
      description: 'Scan any QR code to inspect seed variety, harvest date, GPS coordinates, pesticide residue test, and transit history.',
      points: [
        'Geotagged farm lot certificates with satellite soil moisture logs',
        'Automated AI inspection grading timestamped before dispatch',
        'Full tamper-proof cold-transit log readable on any smartphone'
      ]
    },
  ];

  const filteredProduce = MOCK_PRODUCE_LISTINGS.filter((item) => {
    const matchesCat = selectedCategory === 'All' || 
                       (selectedCategory === 'Grains' ? item.category === 'Grains & Pulses' : item.category === selectedCategory);
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.cropName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 1;
      const next = Math.max(1, Math.min(50, current + delta));
      return { ...prev, [id]: next };
    });
  };

  const handleAddToCartWithFeedback = (produce: ProduceListing) => {
    onAddToCart(produce);
    setAddedItemIds(prev => ({ ...prev, [produce.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [produce.id]: false }));
    }, 1800);
  };

  return (
    <div className="relative space-y-24 pb-24 min-h-[calc(100vh-4rem)]">
      {/* Minimalist Hero Section */}
      <section className="relative z-10 pt-28 pb-16 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50/80 backdrop-blur-sm border border-emerald-200/60 text-emerald-700 text-[10px] font-black uppercase tracking-widest mb-8 shadow-[inset_0_1px_0_rgba(255,255,255,1)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Platform Active
        </div>
        
        <h1 className="text-5xl sm:text-7xl font-display font-black tracking-tighter text-slate-900 leading-[1.1] mb-6 drop-shadow-sm">
          Fair Mandi Prices. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500">Direct to Buyers.</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto font-medium mb-10 tracking-tight">
          {t.subTagline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onSelectRole('farmer')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-b from-emerald-600 to-emerald-800 text-white text-sm font-bold transition-all shadow-[0_8px_30px_rgb(4,120,87,0.2)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(4,120,87,0.3)] hover:from-emerald-500 hover:to-emerald-700 border border-emerald-900/20 flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <span>List Produce & Scan</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onSelectRole('b2b')}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white text-slate-900 text-sm font-bold transition-all gradient-border-organic border-0 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] active:scale-[0.98] cursor-pointer"
          >
            Procure Wholesale B2B
          </button>
        </div>

        {/* Minimalist Interactive Metrics */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-200/60 pt-10 text-left">
          {metricsData.map((metric, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveMetricModal({
                title: metric.detailsTitle,
                value: metric.value,
                description: metric.description,
                details: metric.points,
              })}
              className="p-5 -m-5 rounded-3xl hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-100 transition-all duration-300 cursor-pointer group border border-transparent"
              title="Click to view breakdown"
            >
              <div className="flex items-center justify-between">
                <div className="text-4xl font-black text-slate-900 group-hover:text-emerald-800 transition-colors tracking-tighter tabular-nums">
                  {metric.value}
                </div>
                <Info className="w-5 h-5 text-slate-300 group-hover:text-emerald-600 transition-colors opacity-0 group-hover:opacity-100" />
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mt-2 flex items-center gap-1 group-hover:text-slate-600">
                {metric.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Clean Role Switcher Grid */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-black tracking-tighter text-slate-900 drop-shadow-sm">
            Select Your Role
          </h2>
          <p className="text-slate-500 mt-2 tracking-tight">Access tailored tools for your part of the ecosystem.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roleCards.map((card) => (
            <div
              key={card.id}
              onClick={() => onSelectRole(card.id)}
              className="relative p-8 rounded-[2rem] bg-gradient-to-br from-white/80 via-slate-50/50 to-emerald-50/40 backdrop-blur-xl hover:border-emerald-400/60 hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)] hover:-translate-y-0.5 transition-all duration-500 hover:bg-white transition-all duration-500 cursor-pointer group flex flex-col items-start gradient-border-organic border-0/60 hover:border-emerald-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(4,120,87,0.08)] hover:-translate-y-1 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-50/50 group-hover:to-transparent transition-all duration-500 pointer-events-none"></div>
              
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-b from-slate-50 to-white border border-slate-100 shadow-sm group-hover:shadow-md flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                {card.icon}
              </div>
              <h3 className="relative z-10 text-xl font-black text-slate-900 mb-2 group-hover:text-emerald-800 transition-colors tracking-tight">
                {card.title}
              </h3>
              <p className="relative z-10 text-sm text-slate-500 tracking-tight leading-relaxed flex-1">
                {card.subtitle}
              </p>
              <div className="relative z-10 mt-8 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity">
                <span>{card.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}

          <div 
            onClick={onOpenAdvisory}
            className="relative p-8 rounded-[2rem] bg-gradient-to-b from-emerald-800 to-emerald-950 text-white hover:from-emerald-700 hover:to-emerald-900 transition-all duration-500 cursor-pointer group flex flex-col items-start shadow-[0_8px_30px_rgb(4,120,87,0.2)] hover:shadow-[0_20px_40px_rgb(4,120,87,0.3)] hover:-translate-y-1 overflow-hidden border border-emerald-700/50"
          >
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-500 rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="relative z-10 w-14 h-14 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
              <Sparkles className="w-6 h-6 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.8)]" />
            </div>
            <h3 className="relative z-10 text-xl font-black text-white mb-2 flex items-center gap-2 tracking-tight">
              <span>KisanMitra AI</span>
              <span className="text-[10px] bg-amber-400 text-amber-950 px-2 py-0.5 rounded-md font-black uppercase tracking-widest">Live</span>
            </h3>
            <p className="relative z-10 text-sm text-emerald-100 tracking-tight leading-relaxed flex-1">
              Real-time APMC Mandi vegetable prices, AGMARK grading computer vision, and multilingual agronomy advice.
            </p>
            <div className="relative z-10 mt-8 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-emerald-200">
              <span>Check Any Vegetable Price</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* Verified Produce Minimalist View with Interactive Filters */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900">
              Verified Harvests
            </h2>
            <p className="text-xs text-slate-500 mt-1">Direct from farms with certified AGMARK quality score</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {['All', 'Vegetables', 'Fruits', 'Grains'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}

            <button
              onClick={() => onSelectRole('retail')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 ml-2 whitespace-nowrap"
            >
              View Full Market →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProduce.slice(0, 8).map((produce) => {
            const qty = quantities[produce.id] || 1;
            const isAdded = addedItemIds[produce.id];

            return (
              <div
                key={produce.id}
                className="group flex flex-col bg-gradient-to-br from-white/80 via-slate-50/50 to-emerald-50/40 backdrop-blur-xl hover:border-emerald-400/60 hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)] hover:-translate-y-0.5 transition-all duration-500 gradient-border-organic border-0 rounded-3xl p-3 border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all"
              >
                <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-slate-100 mb-4">
                  <img
                    src={produce.image}
                    alt={produce.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold shadow-xs">
                      Grade {produce.grade}
                    </span>
                    {produce.isOrganic && (
                      <span className="px-2 py-0.5 rounded-lg bg-emerald-700 text-white text-[10px] font-bold shadow-xs">
                        Organic
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        openCreateAlertModal({
                          commodityName: produce.cropName,
                          variety: produce.variety,
                          targetPrice: produce.pricePerKg,
                          unit: '₹/kg',
                          condition: 'BELOW_OR_EQUAL',
                          priceType: 'KISAN_DIRECT',
                        })
                      }
                      className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-700 transition-colors shadow-xs"
                      title="Set Target Price Alert for this Commodity"
                    >
                      <Bell className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onInspectTraceability(produce)}
                      className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-700 transition-colors shadow-xs"
                      title="Inspect Blockchain Traceability"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => onInspectPriceBreakdown?.(produce)}
                      className="p-2 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-emerald-700 transition-colors shadow-xs"
                      title="Inspect Direct Price Transparency & Intermediary Breakdown"
                    >
                      <Coins className="w-3.5 h-3.5 text-emerald-600" />
                    </button>
                  </div>
                </div>

                <div className="flex items-start justify-between gap-2 mb-1 px-1">
                  <h3 className="text-base font-bold text-slate-900 line-clamp-1">
                    {produce.title}
                  </h3>
                  <span className="text-base font-extrabold text-emerald-800 shrink-0">₹{produce.pricePerKg}/kg</span>
                </div>
                
                <p className="text-xs text-slate-500 mb-3 px-1">
                  {produce.district}, {produce.state} • {produce.variety}
                </p>

                {/* Interactive Quantity and Direct Add */}
                <div className="mt-auto space-y-2 pt-2 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                    <span>Quantity:</span>
                    <div className="flex items-center gap-2 bg-slate-50 gradient-border-organic border-0 rounded-lg px-1.5 py-0.5">
                      <button
                        onClick={() => handleQtyChange(produce.id, -1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-emerald-700 font-bold"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-slate-900 min-w-4 text-center">{qty} kg</span>
                      <button
                        onClick={() => handleQtyChange(produce.id, 1)}
                        className="w-5 h-5 flex items-center justify-center text-slate-600 hover:text-emerald-700 font-bold"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddToCartWithFeedback(produce)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-900 hover:bg-emerald-700 text-white active:scale-98'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <span>Add (₹{produce.pricePerKg * qty})</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Minimalist Bottom Banner */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="p-10 rounded-[2rem] bg-emerald-50 text-center flex flex-col items-center border border-emerald-100">
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-6">
            <CheckCircle2 className="w-6 h-6 text-emerald-700" />
          </div>
          <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">
            Direct, Fair, & Traceable
          </h3>
          <p className="text-slate-600 mb-8 max-w-lg">
            Eliminate predatory middleman cuts. Connect directly with India's growers through transparent AI grading.
          </p>
          <button
            onClick={() => onSelectRole('farmer')}
            className="px-8 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-all active:scale-98 cursor-pointer"
          >
            Join as a Farmer today
          </button>
        </div>
      </section>

      {/* Interactive Metric Breakdown Modal */}
      {activeMetricModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white/80 via-slate-50/50 to-emerald-50/40 backdrop-blur-xl hover:border-emerald-400/60 hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)] hover:-translate-y-0.5 transition-all duration-500 gradient-border-organic border-0 rounded-3xl max-w-md w-full p-6 shadow-2xl gradient-border-organic border-0 animate-in zoom-in-95 relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl font-extrabold text-emerald-700">{activeMetricModal.value}</span>
                <h3 className="text-base font-bold text-slate-900">{activeMetricModal.title}</h3>
              </div>
              <button
                onClick={() => setActiveMetricModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {activeMetricModal.description}
            </p>

            <div className="space-y-2.5 bg-emerald-50/60 p-4 rounded-2xl border border-emerald-100 mb-5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900">Key Pillars:</span>
              {activeMetricModal.details.map((point, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-emerald-950 font-medium">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveMetricModal(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

