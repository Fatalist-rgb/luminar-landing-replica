'use client';

import type { EditStep } from '@/data/steps';

type Props = {
  steps: EditStep[];
  value: number;
  onChange: (index: number) => void;
  className?: string;
};

/**
 * Пошаговый ползунок под секциями «Just 4 steps…» и «Retouch portrait…».
 * Заливка до текущего шага — акцентная, дальше — серая. Подписи кликабельны.
 */
export function StepSlider({ steps, value, onChange, className = '' }: Props) {
  const last = steps.length - 1;
  const percent = last > 0 ? (value / last) * 100 : 0;

  return (
    <div className={className} data-testid="step-slider">
      <input
        type="range"
        min={0}
        max={last}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label="Шаг обработки"
        aria-valuetext={steps[value]?.label}
        className="step-range h-[6px] w-full cursor-pointer appearance-none rounded-full outline-none"
        style={{
          background: `linear-gradient(to right, var(--color-accent) ${percent}%, #2b2b2b ${percent}%)`,
        }}
      />

      <ul className="mt-[14px] flex justify-between">
        {steps.map((step, i) => {
          const passed = i <= value;
          return (
            <li key={step.label} className="flex flex-1 flex-col items-center">
              <button
                type="button"
                onClick={() => onChange(i)}
                aria-pressed={i === value}
                className="flex flex-col items-center gap-[8px] px-1"
              >
                <span
                  className={`block h-[6px] w-[6px] rounded-full transition-colors ${
                    passed ? 'bg-[var(--color-accent)]' : 'bg-white/25'
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`text-[14px] leading-none font-semibold whitespace-nowrap transition-colors ${
                    passed ? 'text-white' : 'text-white/40'
                  }`}
                >
                  {step.label}
                  {step.superscript && <sup className="text-[9px]">{step.superscript}</sup>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        .step-range::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid var(--color-accent);
          cursor: grab;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }
        .step-range::-webkit-slider-thumb:active {
          cursor: grabbing;
        }
        .step-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #fff;
          border: 3px solid var(--color-accent);
          cursor: grab;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
        }
        .step-range::-moz-range-track {
          background: transparent;
        }
      `}</style>
    </div>
  );
}
