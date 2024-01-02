'use client';

// Libs
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/chat', label: 'chat' },
  { href: '/tours', label: 'tours' },
  { href: '/tours/new-tour', label: 'new tour' },
  { href: '/profile', label: 'profile' },
];
const HREF_SET = new Set(LINKS.map(link => link.href));

const NavLinks = () => {
  const pathname = usePathname();
  const matchedHref = HREF_SET.has(pathname) ? pathname : '/tours';

  return (
    <ul className="menu text-base-content gap-1">
      {LINKS.map(link => (
        <li key={link.href}>
          <Link href={link.href} className={`capitalize ${matchedHref === link.href ? 'active' : undefined}`}>
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
