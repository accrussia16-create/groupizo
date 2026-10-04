import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext.tsx';
import { Palette, Sun, Moon, Check, Sparkles, RefreshCw } from 'lucide-react';

export const AppearanceSettings: React.FC = () => {
  const { appearance, updateAppearance, showToast } = useAdmin();

  const colorPresets = [
    { name: 'WhatsApp Emerald', hex: '#25D366' },
    { name: 'Cyber Mint', hex: '#00F5A0' },
    { name: 'Vibrant Cyan', hex: '#00C9FF' },
    { name: 'Electric Purple', hex: '#9d4edd' },
    { name: 'Amber Gold', hex: '#FFB700' },
    { name: 'Crimson Rose', hex: '#f72585' }
  ];

  const fontOptions = ['Plus Jakarta Sans', 'Inter', 'Roboto', 'Outfit', 'Montserrat'];

  const [siteName, setSiteName] = useState(appearance.siteName || 'Groupizo.');
  const [logoText, setLogoText] = useState(appearance.logoText || 'Groupizo Directory');
  const [selectedColor, setSelectedColor] = useState(appearance.primaryColor || '#25D366');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>(appearance.theme || 'dark');
  const [selectedFont, setSelectedFont] = useState(appearance.fontFamily || 'Plus Jakarta Sans');
  const [borderRadius, setBorderRadius] = useState(appearance.borderRadius || 'rounded-xl');

  const handleSave = () => {
    updateAppearance({
      siteName,
      logoText,
      primaryColor: selectedColor,
      theme: themeMode,
      fontFamily: selectedFont,
      borderRadius: borderRadius as any
    });
    showToast('Appearance settings saved. Applied across dashboard and directory.');
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white">Website Appearance &amp; Styling</h1>
          <p className="text-xs text-gray-400 mt-1">
            Global theme colors, typography, border curvatures, and UI theme options
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5a] text-black font-extrabold text-xs shadow-md shadow-[#25D366]/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          Save Appearance
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Styling Controls */}
        <div className="lg:col-span-2 bg-[#14171d] border border-white/10 rounded-2xl p-6 space-y-6 shadow-xl text-xs">
          
          {/* Light / Dark Mode Toggle */}
          <div>
            <label className="block text-gray-300 font-bold mb-2">Base Color Scheme</label>
            <div className="grid grid-cols-2 gap-3 max-w-sm">
              <button
                type="button"
                onClick={() => setThemeMode('dark')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-colors ${
                  themeMode === 'dark'
                    ? 'border-[#25D366] bg-[#25D366]/10 text-white'
                    : 'border-white/10 bg-[#1b1f28] text-gray-400 hover:text-white'
                }`}
              >
                <Moon className="w-4 h-4 text-[#25D366]" />
                <span>Dark Theme (Default)</span>
              </button>

              <button
                type="button"
                onClick={() => setThemeMode('light')}
                className={`p-3 rounded-xl border flex items-center justify-center gap-2 font-bold cursor-pointer transition-colors ${
                  themeMode === 'light'
                    ? 'border-[#25D366] bg-[#25D366]/10 text-white'
                    : 'border-white/10 bg-[#1b1f28] text-gray-400 hover:text-white'
                }`}
              >
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Light Theme</span>
              </button>
            </div>
          </div>

          {/* Primary Accent Color Presets */}
          <div>
            <label className="block text-gray-300 font-bold mb-2">Brand Accent Color</label>
            <div className="flex flex-wrap items-center gap-3">
              {colorPresets.map((c) => (
                <button
                  key={c.hex}
                  type="button"
                  onClick={() => setSelectedColor(c.hex)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
                    selectedColor === c.hex
                      ? 'border-white text-white font-bold bg-white/10'
                      : 'border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full shadow-sm flex items-center justify-center"
                    style={{ backgroundColor: c.hex }}
                  >
                    {selectedColor === c.hex && <Check className="w-2.5 h-2.5 text-black stroke-[3]" />}
                  </span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Typography */}
          <div>
            <label className="block text-gray-300 font-bold mb-2">Display Font Family</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {fontOptions.map((font) => (
                <button
                  key={font}
                  type="button"
                  onClick={() => setSelectedFont(font)}
                  className={`p-2.5 rounded-xl border text-center font-bold cursor-pointer transition-colors ${
                    selectedFont === font
                      ? 'border-[#25D366] text-[#25D366] bg-[#25D366]/10'
                      : 'border-white/10 text-gray-300 hover:border-white/20'
                  }`}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>

          {/* Border Curvature */}
          <div>
            <label className="block text-gray-300 font-bold mb-2">Card &amp; Button Radius</label>
            <div className="grid grid-cols-3 gap-3">
              {([
                { label: 'Subtle Rounded (8px)', val: 'rounded-md' },
                { label: 'Standard (12px)', val: 'rounded-xl' },
                { label: 'Modern Pill (24px)', val: 'rounded-3xl' }
              ] as const).map((r) => (
                <button
                  key={r.val}
                  type="button"
                  onClick={() => setBorderRadius(r.val)}
                  className={`p-3 border text-center font-bold cursor-pointer transition-colors ${r.val} ${
                    borderRadius === r.val
                      ? 'border-[#25D366] text-[#25D366] bg-[#25D366]/10'
                      : 'border-white/10 text-gray-300 hover:border-white/20'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Live UI Preview Card */}
        <div className="bg-[#14171d] border border-white/10 rounded-2xl p-6 shadow-xl flex flex-col">
          <h2 className="text-base font-extrabold text-white mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#25D366]" /> Live Directory Component Preview
          </h2>
          <p className="text-xs text-gray-400 mb-5">Card rendering with current chosen palette</p>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex-1 flex flex-col justify-center">
            {/* Mock Group Card */}
            <div className={`bg-[#1e1e1e] border border-white/10 overflow-hidden shadow-xl ${borderRadius}`}>
              <div className="h-28 bg-[#111] relative">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&auto=format&fit=crop&q=80"
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <span 
                  className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-black text-black"
                  style={{ backgroundColor: selectedColor }}
                >
                  Featured
                </span>
              </div>

              <div className="p-4">
                <h4 className="font-extrabold text-white text-sm mb-1" style={{ fontFamily: selectedFont }}>
                  Sample WhatsApp Group
                </h4>
                <p className="text-xs text-gray-400 mb-3 line-clamp-1">
                  Verified community preview with customized button &amp; badge styling.
                </p>

                <button
                  type="button"
                  className={`w-full py-2 font-black text-xs text-black cursor-pointer shadow-md ${borderRadius}`}
                  style={{ backgroundColor: selectedColor, fontFamily: selectedFont }}
                >
                  Join WhatsApp Group
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
