import { ReactNode } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const PageLayout = ({ children }: { children: ReactNode }) => (
  <div className="min-h-screen bg-background flex flex-col">
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-14">
        <Link to="/" className="text-lg font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity">
          Primexia
        </Link>
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Home
        </Link>
      </div>
    </nav>
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
);

export default PageLayout;
