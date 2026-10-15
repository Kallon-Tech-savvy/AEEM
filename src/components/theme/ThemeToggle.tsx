import React from 'react';
import { useTheme } from '../../ThemeProvider';
import { Sun, Moon, Monitor } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const optionsId = React.useId();

  const closeOptions = (restoreFocus = false) => {
    setIsOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  };

  const toggleOptions = [
    { value: 'light', icon: Sun, label: 'Light' },
    { value: 'dark', icon: Moon, label: 'Dark' },
    { value: 'system', icon: Monitor, label: 'System' },
  ] as const;

  const currentIcon = theme === 'system'
    ? Monitor
    : (theme === 'dark' ? Moon : Sun);

  const Icon = currentIcon;

  return (
    <div
      className="relative"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && isOpen) {
          event.stopPropagation();
          closeOptions(true);
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-aeem-charcoal/15 dark:bg-white/20 text-aeem-charcoal dark:text-aeem-white hover:bg-aeem-gold/10 dark:hover:bg-aeem-gold/20 transition-colors"
        aria-label="Color theme"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls={optionsId}
      >
        <Icon size={20} aria-hidden="true" className="text-aeem-blue dark:text-aeem-gold-light" />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" aria-hidden="true" onClick={() => closeOptions()} />
          <div
            id={optionsId}
            role="group"
            aria-label="Color theme options"
            className="absolute right-0 mt-2 p-2 bg-white dark:bg-aeem-charcoal border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl z-20 min-w-[140px] origin-top-right motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:slide-in-from-top-1 motion-safe:duration-150"
          >
            {toggleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setTheme(option.value);
                  closeOptions(true);
                }}
                aria-pressed={theme === option.value}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                  theme === option.value
                    ? 'bg-aeem-gold/10 text-aeem-gold'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5'
                }`}
              >
                <option.icon size={16} aria-hidden="true" />
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ThemeToggle;