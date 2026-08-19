import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

type FontScale = 1 | 1.15 | 1.3 | 1.5

interface A11ySettings {
  fontScale: FontScale
  highContrast: boolean
  dyslexiaFont: boolean
  reduceMotion: boolean
  underlineLinks: boolean
}

const DEFAULT_SETTINGS: A11ySettings = {
  fontScale: 1,
  highContrast: false,
  dyslexiaFont: false,
  reduceMotion: false,
  underlineLinks: false,
}

const STORAGE_KEY = 'a11y-settings'

function loadSettings(): A11ySettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      return { ...DEFAULT_SETTINGS, reduceMotion: prefersReduced }
    }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return DEFAULT_SETTINGS
  }
}

function applySettings(settings: A11ySettings) {
  const root = document.documentElement
  root.style.setProperty('--a11y-font-scale', String(settings.fontScale))
  root.classList.toggle('a11y-high-contrast', settings.highContrast)
  root.classList.toggle('a11y-dyslexia-font', settings.dyslexiaFont)
  root.classList.toggle('a11y-reduce-motion', settings.reduceMotion)
  root.classList.toggle('a11y-underline-links', settings.underlineLinks)
  root.setAttribute('data-reduce-motion', String(settings.reduceMotion))
}

const FONT_SCALES: { label: string; value: FontScale }[] = [
  { label: 'A', value: 1 },
  { label: 'A', value: 1.15 },
  { label: 'A', value: 1.3 },
  { label: 'A', value: 1.5 },
]

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false)
  const [settings, setSettings] = useState<A11ySettings>(DEFAULT_SETTINGS)
  const [mounted, setMounted] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // needed so createPortal only runs client-side (avoids SSR mismatch)
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const loaded = loadSettings()
    setSettings(loaded)
    applySettings(loaded)
  }, [])

  useEffect(() => {
    applySettings(settings)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      // ignore write errors (e.g. private browsing)
    }
  }, [settings])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onClick = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !triggerRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [open])

  const update = <K extends keyof A11ySettings>(key: K, value: A11ySettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  const reset = () => setSettings(DEFAULT_SETTINGS)

  const panel = (
    <div
      ref={panelRef}
      id="a11y-panel"
      role="dialog"
      aria-modal="false"
      aria-label="Accessibility options"
      className="fixed right-12 md:right-16 top-1/3 z-[10000] w-72 max-w-[calc(100vw-4rem)] rounded-xl bg-white text-[#0b1e3b] shadow-2xl ring-1 ring-black/10 p-4"
    >
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold">Accessibility</h2>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close accessibility panel"
          className="text-lg leading-none px-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#085484]"
        >
          ×
        </button>
      </div>

      <fieldset className="mb-3">
        <legend className="text-xs font-medium mb-1.5">Text size</legend>
        <div className="flex gap-1.5" role="group" aria-label="Text size">
          {FONT_SCALES.map(({ label, value }, i) => (
            <button
              key={value}
              type="button"
              aria-pressed={settings.fontScale === value}
              onClick={() => update('fontScale', value)}
              className={`flex-1 rounded-md border py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#085484] ${settings.fontScale === value
                  ? 'border-[#085484] bg-[#085484] text-white'
                  : 'border-gray-300 hover:border-[#085484]'
                }`}
              style={{ fontSize: `${0.75 + i * 0.1}rem` }}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="space-y-2 mb-3">
        <ToggleRow
          label="High contrast"
          checked={settings.highContrast}
          onChange={(v) => update('highContrast', v)}
        />
        <ToggleRow
          label="Dyslexia-friendly font"
          checked={settings.dyslexiaFont}
          onChange={(v) => update('dyslexiaFont', v)}
        />
        <ToggleRow
          label="Reduce motion"
          checked={settings.reduceMotion}
          onChange={(v) => update('reduceMotion', v)}
        />
        <ToggleRow
          label="Underline links"
          checked={settings.underlineLinks}
          onChange={(v) => update('underlineLinks', v)}
        />
      </div>

      <button
        type="button"
        onClick={reset}
        className="w-full text-xs text-[#085484] underline underline-offset-2 hover:text-[#0b1e3b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#085484] rounded"
      >
        Reset to defaults
      </button>
    </div>
  )

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label="Accessibility options"
        onClick={() => setOpen((v) => !v)}
        className="flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-l-[10px] md:rounded-l-[16px] bg-[#085484] shadow-lg transition hover:bg-[#0b1e3b] p-1.5 md:p-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <img src="/svg/access.svg" alt="" aria-hidden="true" className="w-full h-full object-contain" />
      </button>

      {open && mounted ? createPortal(panel, document.body) : null}
    </div>
  )
}

const ToggleRow = ({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) => {
  const labelId = `a11y-toggle-${label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className="flex items-center justify-between text-sm select-none">
      <span id={labelId}>{label}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-labelledby={labelId}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#085484] ${checked ? 'bg-[#085484]' : 'bg-gray-300'
          }`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${checked ? 'left-[20px]' : 'left-0.5'
            }`}
        />
      </button>

    </div>
  )
}

export default AccessibilityWidget