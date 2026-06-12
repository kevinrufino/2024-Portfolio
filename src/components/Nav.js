import PropTypes from 'prop-types';

const NAV_LINKS = [
  { label: 'Home', href: '/#home' },
  { label: 'Intro', href: '/#intro' },
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#contact' },
];

export const NavBar = ({ setCursor }) => {
  return (
    <nav
      className="mix-blend-difference fixed top-2 left-2 md:top-3 md:left-3 text-white z-10"
      onMouseEnter={() => {
        setCursor('');
      }}
    >
      <ul className="flex flex-row md:flex-col flex-wrap gap-x-4 gap-y-1 font-offbit101Bold text-xl md:text-3xl lg:text-4xl">
        {NAV_LINKS.map((link, i) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="group flex items-baseline gap-1.5 px-1"
            >
              <span className="font-offbitDot text-[9px] md:text-xs tracking-widest opacity-60">
                0{i + 1}
              </span>
              <span className="group-hover:underline underline-offset-4 decoration-2">
                {link.label}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

NavBar.propTypes = {
  setCursor: PropTypes.func.isRequired,
};
