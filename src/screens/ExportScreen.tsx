import React from 'react';
import { useStore } from '../Store';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronRight, Store, Package, Layers } from 'lucide-react';

export const ExportScreen = () => {
  const { queue, clearQueue, setCurrentView, lastSubmission, shopName } = useStore();

  const activeCount = lastSubmission?.itemsCount || queue.reduce((acc, item) => acc + item.selectedVariants.length, 0);
  const activeShop = lastSubmission?.shopName || shopName || 'Default Store';
  const activeItems = lastSubmission?.items || [];

  const handleDone = () => {
    clearQueue();
    setCurrentView('landing');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex-1 flex flex-col items-center justify-center py-12 max-w-3xl mx-auto w-full px-4"
    >
      <div className="w-full bg-white/90 backdrop-blur-xl border border-gray-200/80 rounded-3xl p-6 sm:p-10 text-center shadow-2xl shadow-gray-200/40 relative overflow-hidden space-y-6">
        
        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 space-y-4">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', bounce: 0.5, delay: 0.2 }}
            className="w-20 h-20 bg-gradient-to-br from-emerald-50 to-emerald-100/60 rounded-full flex items-center justify-center mx-auto text-emerald-600 border border-emerald-200/80 shadow-xl shadow-emerald-500/10"
          >
            <CheckCircle2 className="w-10 h-10" />
          </motion.div>
          
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-extrabold uppercase tracking-widest border border-emerald-200 mb-2">
              Successfully Logged & Recorded
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">
              Submission Confirmed
            </h2>
            <p className="text-gray-500 text-sm font-semibold mt-1">
              Your vendor batch has been submitted and added to the active operations log.
            </p>
          </div>
          
          {/* Submission Info Summary Box */}
          <div className="bg-gray-50 border border-gray-200/80 rounded-2xl p-5 text-left space-y-3">
            <div className="grid grid-cols-2 gap-3 border-b border-gray-200/60 pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Vendor Store</span>
                <span className="font-bold text-gray-900 text-xs truncate block mt-0.5">
                  {activeShop}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block">Variants Count</span>
                <span className="font-black text-[#F68B1E] text-sm block mt-0.5">
                  {activeCount} items
                </span>
              </div>
            </div>

            {/* Itemized List inside Submission Confirmation */}
            {activeItems.length > 0 && (
              <div className="pt-1">
                <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-wider block mb-2">Submitted Variant Items ({activeItems.length})</span>
                <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 font-sans text-xs">
                  {activeItems.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-white border border-gray-200/80 rounded-xl flex items-center justify-between gap-2">
                      <div className="truncate">
                        <span className="font-extrabold text-purple-700 bg-purple-50 px-1.5 py-0.5 rounded mr-1.5 text-[10px]">{item.brandName}</span>
                        <span className="font-bold text-gray-900">{item.modelName}</span>
                        <span className="text-gray-500 font-semibold ml-1">({item.variantId || item.colorName})</span>
                      </div>
                      <span className="text-gray-600 font-mono text-[11px] bg-gray-50 px-2 py-0.5 rounded border border-gray-200/60 shrink-0">
                        {item.storage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="pt-2">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDone}
              className="w-full flex items-center justify-center gap-2 bg-[#F68B1E] hover:bg-[#E87B10] text-white font-bold py-3.5 px-6 rounded-xl transition-all text-xs shadow-lg shadow-orange-500/20 cursor-pointer"
            >
              Start New Batch
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
