// Libs
import Link from 'next/link';

const LINKS = [
  { href: '/chat', label: 'chat' },
  { href: '/tours', label: 'tours' },
  { href: '/tours/new-tour', label: 'new tour' },
  { href: '/profile', label: 'profile' },
];

const NavLinks = () => {
  return (
    <ul className="menu text-base-content gap-1">
      {LINKS.map(link => (
        <li key={link.href}>
          <Link href={link.href} className="capitalize">
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
