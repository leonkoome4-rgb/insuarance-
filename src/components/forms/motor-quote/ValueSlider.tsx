"use client";

import { Minus, Plus } from "lucide-react";
import { VALUE_MAX, VALUE_MIN, VALUE_STEP, formatKES } from "@/lib/motor-quote";

export default function ValueSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  function clamp(next: number) {
    return Math.min(VALUE_MAX, Math.max(VALUE_MIN, next));
  }

  return (
    <div>
      <div className="text-center font-display text-3xl font-semibold text-metro-navy-800">
        {formatKES(value)}
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(clamp(value - VALUE_STEP))}
          aria-label="Decrease estimated value"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-metro-grey-300 text-metro-navy-800 hover:border-metro-orange-500 hover:text-metro-orange-600"
        >
          <Minus size={16} />
        </button>

        <input
          type="range"
          min={VALUE_MIN}
          max={VALUE_MAX}
          step={VALUE_STEP}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value)))}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-metro-grey-100 accent-metro-orange-500"
        />

        <button
          type="button"
          onClick={() => onChange(clamp(value + VALUE_STEP))}
          aria-label="Increase estimated value"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-metro-grey-300 text-metro-navy-800 hover:border-metro-orange-500 hover:text-metro-orange-600"
        >
          <Plus size={16} />
        </button>
      </div>

      <input
        type="number"
        min={VALUE_MIN}
        max={VALUE_MAX}
        step={VALUE_STEP}
        value={value}
        onChange={(e) => onChange(clamp(Number(e.target.value) || VALUE_MIN))}
        className="mt-3 w-full rounded-lg border border-metro-grey-300 bg-white px-4 py-2.5 text-center text-sm text-metro-grey-900 outline-none transition-colors duration-200 focus:border-metro-orange-500 focus:ring-2 focus:ring-metro-orange-500/20"
      />

      <div className="mt-2 flex justify-between text-xs text-metro-grey-500">
        <span>Min: {formatKES(VALUE_MIN)}</span>
        <span>Max: {formatKES(VALUE_MAX)}</span>
      </div>
    </div>
  );
}
