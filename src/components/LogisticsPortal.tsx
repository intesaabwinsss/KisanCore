import React, { useState } from 'react';
import { 
  Truck, 
  Thermometer, 
  Droplets, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  Plus, 
  ShieldCheck,
  Navigation,
  FileText
} from 'lucide-react';
import { Shipment, Language } from '../types';
import { MOCK_SHIPMENTS } from '../data/mockData';

interface LogisticsPortalProps {
  currentLanguage: Language;
}

export const LogisticsPortal: React.FC<LogisticsPortalProps> = () => {
  const [shipments, setShipments] = useState<Shipment[]>(MOCK_SHIPMENTS);
  const [isDispatchModalOpen, setIsDispatchModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newCrop, setNewCrop] = useState('Fresh Green Chillies');
  const [newOrigin, setNewOrigin] = useState('Guntur Packhouse Yard');
  const [newDest, setNewDest] = useState('Azadpur Terminal Cold Store');
  const [newTargetTemp, setNewTargetTemp] = useState(12);
  const [newVehicle, setNewVehicle] = useState('AP-07-TT-8890 (Reefer 24ft)');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDispatchShipment = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Shipment = {
      id: `shp-${Date.now()}`,
      lotId: `LOT-${Math.floor(100 + Math.random() * 900)}`,
      cropName: newCrop,
      quantityMT: 16,
      originFarm: newOrigin,
      destinationHub: newDest,
      driverName: 'Suresh Kumar',
      driverPhone: '+91 98480 33119',
      vehicleNumber: newVehicle,
      temperatureC: Number(newTargetTemp) + 0.2,
      targetTempC: Number(newTargetTemp),
      humidityPct: 75,
      transitStatus: 'In Transit',
      departureTime: (() => {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      })(),
      eta: 'Tomorrow 08:00',
      routeProgressPct: 15,
      coldChainCompliant: true,
    };

    setShipments([created, ...shipments]);
    setIsDispatchModalOpen(false);
    showToast(`Consignment ${newVehicle} dispatched successfully.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl border border-emerald-500/60 shadow-2xl flex items-center gap-2.5 text-xs animate-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-700/80 border border-emerald-400/40 flex items-center justify-center text-white shrink-0">
            <Truck className="w-8 h-8 text-emerald-200" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-extrabold text-white">
                Refrigerated Cold-Chain Telemetry
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30">
                IoT Live Fleet
              </span>
            </div>
            <p className="text-xs text-emerald-200/80 mt-1">
              Active temperature-controlled reefers ensuring produce freshness from farm packhouse to urban terminals.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsDispatchModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Dispatch New Reefer Trip</span>
        </button>
      </div>

      {/* Fleet Stats Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white gradient-border-organic border-0 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold uppercase">Reefers in Transit</div>
          <div className="text-2xl font-extrabold text-emerald-900 mt-1">
            {shipments.filter(s => s.transitStatus === 'In Transit').length} Vehicles
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">86 MT Produce Protected</div>
        </div>
        <div className="p-5 rounded-2xl bg-white gradient-border-organic border-0 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold uppercase">Temp Compliance</div>
          <div className="text-2xl font-extrabold text-emerald-700 mt-1">99.4%</div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">Zero thermal excursion alerts</div>
        </div>
        <div className="p-5 rounded-2xl bg-white gradient-border-organic border-0 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold uppercase">Transit Spoilage</div>
          <div className="text-2xl font-extrabold text-teal-900 mt-1">1.8%</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-0.5">Industry avg: 18% - 24%</div>
        </div>
        <div className="p-5 rounded-2xl bg-white gradient-border-organic border-0 shadow-2xs">
          <div className="text-xs text-slate-500 font-semibold uppercase">e-Way Bill Compliance</div>
          <div className="text-2xl font-extrabold text-emerald-900 mt-1">100%</div>
          <div className="text-[11px] text-slate-400 font-medium mt-0.5">Instant GST & FASTag linked</div>
        </div>
      </div>

      {/* Active Reefer Cards Grid */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900">
          Live Reefer Fleet Status
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {shipments.map((shipment) => {
            const isTempCompliant = Math.abs(shipment.temperatureC - shipment.targetTempC) <= 1.0;
            return (
              <div
                key={shipment.id}
                className="bg-gradient-to-br from-white/80 via-slate-50/50 to-emerald-50/40 backdrop-blur-xl hover:border-emerald-400/60 hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)] hover:-translate-y-0.5 transition-all duration-500 rounded-3xl gradient-border-organic border-0 p-6 shadow-2xs space-y-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {shipment.vehicleNumber}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 mt-2">
                      {shipment.cropName}
                    </h3>
                    <div className="text-xs text-slate-500">
                      Driver: {shipment.driverName} ({shipment.driverPhone})
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                    shipment.transitStatus === 'In Transit'
                      ? 'bg-teal-100 text-teal-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}>
                    <Navigation className="w-3.5 h-3.5" />
                    {shipment.transitStatus}
                  </span>
                </div>

                {/* IoT Telemetry Gauges */}
                <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      isTempCompliant ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      <Thermometer className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase">Reefer Temperature</div>
                      <div className="text-base font-extrabold text-slate-900">
                        {shipment.temperatureC}°C
                        <span className="text-[11px] font-normal text-slate-400 ml-1">
                          (Target: {shipment.targetTempC}°C)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-teal-100 text-teal-800">
                      <Droplets className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500 font-semibold uppercase">Relative Humidity</div>
                      <div className="text-base font-extrabold text-slate-900">
                        {shipment.humidityPct}% RH
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route & Progress */}
                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex justify-between font-medium">
                    <span className="truncate">Origin: {shipment.originFarm}</span>
                    <span className="truncate">Hub: {shipment.destinationHub}</span>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all"
                      style={{ width: `${shipment.routeProgressPct}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Departed: {shipment.departureTime}</span>
                    <span className="font-bold text-slate-700">ETA: {shipment.eta} ({shipment.routeProgressPct}% complete)</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dispatch Trip Modal */}
      {isDispatchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-gradient-to-br from-white/80 via-slate-50/50 to-emerald-50/40 backdrop-blur-xl hover:border-emerald-400/60 hover:shadow-[0_8px_32px_rgba(52,211,153,0.15)] hover:-translate-y-0.5 transition-all duration-500 gradient-border-organic border-0 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 gradient-border-organic border-0 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="text-lg font-bold text-slate-900">
                Dispatch Refrigerated Reefer Consignment
              </h3>
              <button
                onClick={() => setIsDispatchModalOpen(false)}
                className="text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleDispatchShipment} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Produce Cargo & Quantity
                </label>
                <input
                  type="text"
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-emerald-600"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Origin Farm / Packhouse
                  </label>
                  <input
                    type="text"
                    value={newOrigin}
                    onChange={(e) => setNewOrigin(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Destination APMC Hub
                  </label>
                  <input
                    type="text"
                    value={newDest}
                    onChange={(e) => setNewDest(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-emerald-600"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Vehicle Number & Type
                  </label>
                  <input
                    type="text"
                    value={newVehicle}
                    onChange={(e) => setNewVehicle(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-emerald-600"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Target Temp (°C)
                  </label>
                  <input
                    type="number"
                    value={newTargetTemp}
                    onChange={(e) => setNewTargetTemp(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-emerald-600"
                    required
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsDispatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-sm"
                >
                  Confirm Dispatch & Start IoT Stream
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
