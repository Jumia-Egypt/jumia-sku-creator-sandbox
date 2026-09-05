import React, { useState, useMemo } from 'react';
import { useStore } from '../Store';
import { modelFamilies, brands } from '../data';
import { motion } from 'motion/react';
import {
  Sparkles, Tag, Search, X,
  Smartphone, SlidersHorizontal, Trash2
} from 'lucide-react';

export const PhoneTagsManager: React.FC = () => {
  const { 
    modelTags, 
    getModelTags, 
    toggleModelTag, 
    clearAllModelTags
  } = useStore();

  const [selectedBrand, setSelectedBrand] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<'all' | 'tagged'>('all');

  const handleToggle = (modelId: string, modelName: string, tag: string) => {
    toggleModelTag(modelId, tag);
  };

  // Filtered phone models
  const filteredModels = useMemo(() => {
    // No brand picked yet — show nothing until the user clicks one.
    if (!selectedBrand) return [];
    return modelFamilies.filter(model => {
      // Brand filter
      if (model.brandId !== selectedBrand) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const brand = brands.find(b => b.id === model.brandId);
        const matchName = model.name.toLowerCase().includes(q);
        const matchId = model.id.toLowerCase().includes(q);
        const matchBrand = brand ? brand.name.toLowerCase().includes(q) : false;
        if (!matchName && !matchId && !matchBrand) return false;
      }
      // Tag filter
      const tags = getModelTags(model.id);
      if (tagFilter === 'tagged' && tags.length === 0) return false;

      return true;
    });
  }, [selectedBrand, searchQuery, tagFilter, modelTags, getModelTags]);

  const totalTaggedCount = useMemo(() => {
    return modelFamilies.filter(m => (modelTags[m.id] || []).length > 0).length;
  }, [modelTags]);

  return (
    <div className="space-y-6">
      {/* Header card with summary & stats */}
      <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 border border-gray-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-1 rounded-lg bg-orange-100/70 text-[#F68B1E] font-black text-[11px] tracking-wide uppercase flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5" /> Catalog Tagging & Badges
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-bold text-gray-500">Live Store Updates</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 tracking-tight">Product Badges & Tags Manager</h2>
          <p className="text-xs text-gray-500 font-medium max-w-xl mt-1">
            Toggle <strong>New Launch</strong> badges to feature top smartphones for vendors in real-time.
          </p>
        </div>

        {/* Quick Stats Pills & Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="px-3.5 py-2 rounded-2xl bg-gray-100 border border-gray-200 text-xs font-extrabold text-gray-700 flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-gray-500" />
            <span>{totalTaggedCount} Tagged</span>
          </div>

          {/* Clear Whole Tags Button */}
          <button
            type="button"
            onClick={() => {
              if (totalTaggedCount === 0) return;
              clearAllModelTags();
            }}
            disabled={totalTaggedCount === 0}
            className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold flex items-center gap-1.5 transition-all ${
              totalTaggedCount > 0
                ? 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200/80 shadow-xs cursor-pointer active:scale-95'
                : 'bg-gray-100 text-gray-400 border border-gray-200/50 cursor-not-allowed opacity-60'
            }`}
            title="Clear all tags across all devices"
          >
            <Trash2 className="w-3.5 h-3.5 text-rose-500" />
            <span>Clear All Device Tags {totalTaggedCount > 0 ? `(${totalTaggedCount})` : ''}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search phone model (e.g. A07, X6c, S25, Ultra...)"
              className="w-full pl-10 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-2xl text-xs font-bold text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#F68B1E]/30 focus:border-[#F68B1E] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Tag status filter pills */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider pl-1 mr-1 shrink-0 flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" /> Filter:
            </span>
            <button
              onClick={() => setTagFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 ${
                tagFilter === 'all' 
                  ? 'bg-gray-900 text-white shadow-xs' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All ({modelFamilies.length})
            </button>
            <button
              onClick={() => setTagFilter('tagged')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                tagFilter === 'tagged' 
                  ? 'bg-[#F68B1E] text-white shadow-xs' 
                  : 'bg-orange-50 text-[#F68B1E] hover:bg-orange-100 border border-orange-200/60'
              }`}
            >
              <Tag className="w-3 h-3" />
              <span>Tagged ({totalTaggedCount})</span>
            </button>
          </div>
        </div>

        {/* Brand Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-gray-100">
          {brands.map(brand => {
            const count = modelFamilies.filter(m => m.brandId === brand.id).length;
            if (count === 0) return null;
            return (
              <button
                key={brand.id}
                onClick={() => setSelectedBrand(brand.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-1.5 ${
                  selectedBrand === brand.id
                    ? 'bg-gray-900 text-white shadow-xs'
                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200/60'
                }`}
              >
                <span>{brand.name}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  selectedBrand === brand.id ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredModels.map(model => {
          const brand = brands.find(b => b.id === model.brandId);
          const activeTags = getModelTags(model.id);
          const hasNewLaunch = activeTags.includes('New Launch');

          return (
            <motion.div
              key={model.id}
              className={`animate-fade-in-safe bg-white rounded-3xl p-5 border transition-all shadow-xs flex flex-col justify-between ${
                hasNewLaunch
                  ? 'border-amber-300 ring-2 ring-amber-400/20 bg-amber-50/20 shadow-sm'
                  : 'border-gray-200/80 hover:border-gray-300'
              }`}
            >
              <div>
                {/* Card Top: Brand and Model Name */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-2xl bg-gray-100 text-gray-700 flex items-center justify-center shrink-0 border border-gray-200/60">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400">
                        {brand?.name || model.brandId}
                      </span>
                      <h3 className="text-base font-black text-gray-900 tracking-tight leading-snug">
                        {model.name}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Model ID tag */}
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-lg bg-gray-100 text-gray-500 border border-gray-200/60 shrink-0">
                    {model.id}
                  </span>
                </div>

                {/* 1-Click New Launch Toggle Button */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => handleToggle(model.id, model.name, 'New Launch')}
                    className={`w-full px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      hasNewLaunch
                        ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20 hover:bg-amber-600 active:scale-98'
                        : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-amber-50 hover:text-amber-800 hover:border-amber-200 active:scale-98'
                    }`}
                  >
                    <Sparkles className={`w-3.5 h-3.5 ${hasNewLaunch ? 'text-white' : 'text-amber-500'}`} />
                    <span>{hasNewLaunch ? '✓ New Launch' : '+ New Launch'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {!selectedBrand && (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-xs space-y-3">
          <Smartphone className="w-10 h-10 text-gray-300 mx-auto" />
          <h4 className="text-base font-black text-gray-800">Select a brand above</h4>
          <p className="text-xs text-gray-400 font-medium">Choose a brand from the list to view and tag its phone models.</p>
        </div>
      )}

      {selectedBrand && filteredModels.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200/80 shadow-xs space-y-3">
          <Smartphone className="w-10 h-10 text-gray-300 mx-auto" />
          <h4 className="text-base font-black text-gray-800">No matching phone models found</h4>
          <p className="text-xs text-gray-400 font-medium">Try adjusting your search terms or filter criteria</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setTagFilter('all');
            }}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-xl transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
