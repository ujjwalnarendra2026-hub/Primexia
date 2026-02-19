const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          careers@primexia.co
        </p>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Primexia. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
