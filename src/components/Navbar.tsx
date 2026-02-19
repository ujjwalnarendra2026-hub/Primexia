const navLinks = [
  { label: "Media", href: "#media" },
  { label: "Advertising", href: "#advertising" },
  { label: "Funding", href: "#funding" },
  { label: "Trading", href: "#trading" },
  { label: "Infrastructure", href: "#infrastructure" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-center h-14">
        <ul className="flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
