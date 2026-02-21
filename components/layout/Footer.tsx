import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-5 px-6 md:px-10 border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Primexia Private Limited</p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
          <Link href="/legal" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Legal
          </Link>
          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}
