import { useState, useRef } from 'react'
import Filter from '@/components/Icons/Filter'
import useClickOutside from 'hooks/useClickOutside'
import Link from '@/components/Link'

let menuLinks = [
  {
    id: 1,
    href: 'explore',
    linkName: 'Explore',
  },
  {
    id: 2,
    href: 'upload',
    linkName: 'Upload',
  },
]

const Menu = () => {
  const $menu = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useClickOutside($menu, () => setMenuOpen(false))

  return (
    <div ref={$menu}>
      <button
        className="fixed bottom-6 right-5 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-forestGreen500 shadow-md transition hover:bg-forestGreen500/90 xl:h-16 xl:w-16"
        onClick={() => setMenuOpen(!menuOpen)}
        title="Menu to upload"
      >
        <Filter className="w-9 text-white/80 transition hover:text-white/50 xl:w-10" />
      </button>

      <menu
        className={`fixed bottom-20 right-5 mb-5 flex w-48 flex-col gap-2 rounded-lg bg-forestGreen500 p-5 shadow-md transition ${
          menuOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`z-10 flex cursor-pointer flex-col justify-between rounded-full px-3 py-1 text-straw-100 transition hover:text-white`}
        >
          {menuLinks?.map((link) => (
            <div
              key={link}
              className={`rounded-fullpx-3 z-10 cursor-pointer py-1 transition hover:text-white ${
                link ? 'text-details' : 'text-white/50'
              }`}
            >
              <Link href={link.href}>{link.linkName}</Link>
            </div>
          ))}
        </div>
      </menu>
    </div>
  )
}

export default Menu
