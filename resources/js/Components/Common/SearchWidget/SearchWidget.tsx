import { router, usePage } from '@inertiajs/react'
import React, { useEffect, useRef, useState } from 'react'
import { Language } from '../../../ui/ui_interfaces'

const SearchWidget = () => {
  const { lang = 'en' } = usePage().props as unknown as { lang: Language }
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  const doSearch = () => {
    const trimmed = query.trim()
    if (!trimmed) return
    router.get('/search', { search: trimmed, lang })
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    doSearch()
  }

  const handleButtonClick = () => {
    if (!open) {
      setOpen(true)
      return
    }
    doSearch()
  }

  return (
    <div className='relative h-8 w-8 md:h-12 md:w-12'>
      <form
        onSubmit={submit}
        className={`absolute right-0 top-0 flex h-8 md:h-12 items-center overflow-hidden rounded-l-[10px] md:rounded-l-[16px] bg-[#085484] shadow-lg transition-all duration-300 ease-in-out ${
          open ? 'w-40 md:w-64 px-3 pr-10 md:pr-14' : 'w-8 md:w-12 px-0'
        }`}
      >
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onBlur={() => {
            if (!query) setOpen(false)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false)
          }}
          placeholder='Search...'
          className={`w-full bg-transparent text-sm text-white placeholder-white/60 outline-none transition-opacity duration-200 ${
            open ? 'opacity-100 delay-150' : 'opacity-0'
          }`}
        />
      </form>

      <button
        type='button'
        aria-label='Search'
        onClick={handleButtonClick}
        className='absolute right-0 top-0 z-10 flex h-8 w-8 md:h-12 md:w-12 items-center justify-center rounded-l-[10px] md:rounded-l-[16px] bg-[#085484] shadow-lg transition hover:bg-[#0b1e3b] p-1.5 md:p-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
      >
        <img src='/svg/search.svg' alt='' aria-hidden='true' className='w-full h-full object-contain' />
      </button>
    </div>
  )
}

export default SearchWidget