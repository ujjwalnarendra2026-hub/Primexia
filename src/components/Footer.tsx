import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="py-8 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Primexia. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms & Conditions
          </Link>
          <a href="mailto:careers@primexia.co" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            careers@primexia.co
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
