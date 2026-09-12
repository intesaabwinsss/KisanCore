import React from 'react';
import { 
  X, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  Thermometer, 
  Droplets, 
  Sprout, 
  Printer, 
  Award,
  Truck
} from 'lucide-react';
import { ProduceListing, Language } from '../types';

interface TraceabilityModalProps {
  produce: ProduceListing;
  onClose: () => void;
  currentLanguage: Language;
}

export const TraceabilityModal: React.FC<TraceabilityModalProps> = ({
  produce,
  onClose,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-gradient-to-br from-white/80 via-slate-50/50 to-emerald-50/40 backdrop-blur-xl hover:border-emerald-400/60 hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)] hover:-translate-y-0.5 transition-all duration-500 gradient-border-organic border-0 rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 gradient-border-organic border-0 shadow-2xl relative my-8 animate-in zoom-in-95">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 pr-8">
          <div className="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center shadow-xs">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-display font-extrabold text-slate-900">
                Farm-to-Fork Traceability Passport
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Grade {produce.grade}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Lot #{produce.lotNumber} • Hash: {produce.traceabilityHash}
            </p>
          </div>
        </div>

        {/* Produce Snapshot */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-2xl gradient-border-organic border-0">
          <div className="sm:col-span-1 aspect-4/3 rounded-xl overflow-hidden bg-slate-900">
            <img
              src={produce.image}
              alt={produce.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="sm:col-span-2 space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 text-sm">{produce.title}</h3>
            <div className="text-slate-600">
              <strong>Crop & Variety:</strong> {produce.cropName} ({produce.variety})
            </div>
            <div className="text-slate-600">
              <strong>Harvest Date:</strong> {produce.harvestDate} ({produce.shelfLifeDays} days shelf life)
            </div>
            <div className="text-slate-600">
              <strong>Batch Moisture:</strong> {produce.moisturePercentage}% (Optimal cure standard)
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="px-2 py-0.5 rounded-md bg-emerald-700 text-white text-[10px] font-bold">
                {produce.freshnessScore}% Freshness Verified
              </span>
              {produce.chemicalFree && (
                <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 text-[10px] font-bold">
                  Zero Chemical Residue
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Farmer & Farm Location */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Farmer Identity & Geo-Provenance
          </h4>
          <div className="p-4 rounded-2xl gradient-border-organic border-0 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                <Sprout className="w-4 h-4 text-emerald-700" />
                {produce.farmerName}
              </div>
              <span className="text-emerald-700 font-semibold text-[11px] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                FPO Registry Verified
              </span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
              <span>{produce.farmLocation}, {produce.district}, {produce.state} (India)</span>
            </div>
            <div className="text-slate-500 text-[11px]">
              Direct contact: {produce.farmerPhone} • Verified APMC Producer
            </div>
          </div>
        </div>

        {/* Cold-Chain Transit Telemetry Log */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Cold-Chain Transit Log
          </h4>
          <div className="p-4 rounded-2xl bg-cyan-50/60 border border-cyan-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-cyan-950 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-cyan-700" />
                IoT Reefer Transit Verification
              </span>
              <span className="text-cyan-800 font-semibold text-[11px]">Compliant (0 Excursions)</span>
            </div>
            <p className="text-[11px] text-cyan-900/80 leading-relaxed">
              Maintained within target bounds (+/- 1.0°C) with continuous GPS and humidity logging from village packhouse to retail terminal.
            </p>
          </div>
        </div>

        {/* Bottom Actions & QR Verification */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
          <div className="text-[11px] text-slate-400 font-mono">
            KisanMandi Cryptographic ID: <span className="text-slate-700 font-bold">{produce.traceabilityHash}</span>
          </div>
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print QR Sticker</span>
          </button>
        </div>
      </div>
    </div>
  );
};
