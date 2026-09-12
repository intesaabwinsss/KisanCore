import React, { useState } from 'react';
import {
  Layers,
  Sparkles,
  MapPin,
  Truck,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Tractor,
  ArrowRight,
  PackageCheck,
  ChevronDown,
  ChevronUp,
  Coins,
} from 'lucide-react';
import { MultiFarmerBundle } from '../types';
import { useSmartMatching } from '../context/SmartMatchingContext';

interface MultiFarmerBundleCardProps {
  bundle: MultiFarmerBundle;
}

export const MultiFarmerBundleCard: React.FC<MultiFarmerBundleCardProps> = ({ bundle }) => {
  const { acceptBundle } = useSmartMatching();
  const [expanded, setExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAccept = async () => {
    setIsSubmitting(true);
    await acceptBundle(bundle.id);
    setIsSubmitting(false);
  };

  return (
    <div className="bg-gradient-to-br from-white/80 via-slate-50/50 to-emerald-50/40 backdrop-blur-xl hover:border-emerald-400/60 hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)] hover:-translate-y-0.5 transition-all duration-500 gradient-border-organic border-0 rounded-3xl border-2 border-purple-200 shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-purple-900 via-indigo-900 to-slate-900 p-5 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-purple-500/30 text-purple-200 border border-purple-400/40 flex items-center gap-1.5 backdrop-blur-xs">
              <Layers className="w-3.5 h-3.5 text-amber-300" />
              <span>Multi-Farmer Synergy Bundle</span>
            </span>
            <span className="text-xs font-semibold text-purple-200">
              {bundle.buyerRequirement.cropRequired}
            </span>
          </div>

          <div className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>Combined Score: {bundle.combinedMatchScore}%</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-3 pt-3 border-t border-purple-800/60">
          <div>
            <div className="text-[10px] text-purple-300 font-semibold uppercase">Procuring Institution</div>
            <div className="text-sm font-bold text-white flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-purple-300 shrink-0" />
              <span>{bundle.buyerRequirement.buyerCompany}</span>
            </div>
            <div className="text-xs text-purple-200/80 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-purple-400" />
              <span>{bundle.buyerRequirement.deliveryLocation.name}</span>
            </div>
          </div>

          <div className="text-left sm:text-right bg-purple-950/60 p-2.5 rounded-xl border border-purple-800/50">
            <div className="text-[10px] text-purple-300 font-semibold uppercase">Fulfilled Volume</div>
            <div className="text-base font-black text-white">
              {bundle.totalMatchedKg.toLocaleString()} kg
              <span className="text-xs font-normal text-purple-300 ml-1">
                / {bundle.totalRequiredKg.toLocaleString()} kg ({bundle.fulfillmentPct}%)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Aggregated Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          <div className="p-3 rounded-2xl bg-purple-50/70 border border-purple-100">
            <div className="text-[10px] text-purple-700 font-bold uppercase flex items-center gap-1">
              <Tractor className="w-3 h-3 text-purple-700" />
              <span>Co-Suppliers</span>
            </div>
            <div className="text-base font-extrabold text-purple-950 mt-0.5">
              {bundle.farmersCount} Farmers
            </div>
            <div className="text-[10px] text-purple-700">Combined Delivery Pool</div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100">
            <div className="text-[10px] text-emerald-700 font-bold uppercase flex items-center gap-1">
              <Coins className="w-3 h-3 text-emerald-700" />
              <span>Weighted Avg Price</span>
            </div>
            <div className="text-base font-extrabold text-emerald-950 mt-0.5">
              ₹{bundle.weightedAvgPricePerKg}/kg
            </div>
            <div className="text-[10px] text-emerald-700">Fair Farmgate Avg</div>
          </div>

          <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100">
            <div className="text-[10px] text-blue-700 font-bold uppercase flex items-center gap-1">
              <Truck className="w-3 h-3 text-blue-700" />
              <span>Pooled Freight</span>
            </div>
            <div className="text-base font-extrabold text-blue-950 mt-0.5">
              ₹{bundle.totalDeliveryCost.toLocaleString()}
            </div>
            <div className="text-[10px] text-blue-700">Avg {bundle.avgDistanceKm} km Radius</div>
          </div>

          <div className="p-3 rounded-2xl bg-amber-50/70 border border-amber-100">
            <div className="text-[10px] text-amber-700 font-bold uppercase flex items-center gap-1">
              <PackageCheck className="w-3 h-3 text-amber-700" />
              <span>Total Contract Value</span>
            </div>
            <div className="text-base font-extrabold text-amber-950 mt-0.5">
              ₹{(bundle.totalMatchedKg * bundle.weightedAvgPricePerKg).toLocaleString()}
            </div>
            <div className="text-[10px] text-amber-700">Single Escrow Pool</div>
          </div>
        </div>

        {/* Narrative Box */}
        <div className="p-3.5 rounded-2xl bg-slate-50 gradient-border-organic border-0 text-xs text-slate-700 space-y-1">
          <div className="font-bold text-slate-900 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Supply Consolidation Rationale</span>
          </div>
          <p className="leading-relaxed text-slate-600">{bundle.bundleExplanation}</p>
        </div>

        {/* Participating Farmers Table */}
        <div className="gradient-border-organic border-0 rounded-2xl overflow-hidden text-xs">
          <div className="bg-slate-100 px-4 py-2.5 font-bold text-slate-800 flex items-center justify-between">
            <span>Contributing Farmers ({bundle.farmersCount})</span>
            <span className="text-[11px] text-slate-500 font-normal">Sourced within {bundle.avgDistanceKm} km</span>
          </div>

          <div className="divide-y divide-slate-100">
            {bundle.participatingMatches.map((m, idx) => (
              <div key={idx} className="p-3 sm:px-4 flex flex-wrap items-center justify-between gap-3 bg-white hover:bg-slate-50">
                <div className="flex items-center gap-2.5 min-w-[200px]">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{m.farmerListing.farmerName}</div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{m.farmerListing.location.name} ({m.distanceKm} km)</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-left sm:text-right">
                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Allocation</div>
                    <div className="font-extrabold text-slate-900 font-mono">
                      {m.matchedQuantityKg.toLocaleString()} kg
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Agreed Rate</div>
                    <div className="font-extrabold text-emerald-800 font-mono">
                      ₹{m.estimatedPricePerKg}/kg
                    </div>
                  </div>

                  <div>
                    <div className="text-[10px] text-slate-400 font-semibold uppercase">Score</div>
                    <div className="font-extrabold text-purple-700 font-mono">
                      {m.matchScore}%
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-700" />
          <span>Unified B2B Escrow Invoice with Multi-Farmgate Truck Routing</span>
        </div>

        <button
          onClick={handleAccept}
          disabled={isSubmitting || bundle.status === 'accepted'}
          className="px-6 py-2.5 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-2 disabled:opacity-60"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>{bundle.status === 'accepted' ? 'Bundle Confirmed in Escrow' : 'Accept Multi-Farmer Bundle'}</span>
        </button>
      </div>
    </div>
  );
};
