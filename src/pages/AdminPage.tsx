import { useState, useEffect } from "react";
import { Lock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { AnimatedHeading, AnimatedParagraph } from "@/components/AnimatedContent";

interface Submission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  created_at: string;
}

const AdminPage = () => {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("admin-submissions", {
        body: { password, action: "list" },
      });

      if (error) throw error;
      if (data?.error) {
        setAuthError(data.error);
        setLoading(false);
        return;
      }

      setSubmissions(data.submissions || []);
      setAuthenticated(true);
    } catch {
      setAuthError("Authentication failed. Please check your password.");
    }
    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <AnimatedHeading>
            <div className="text-center mb-8">
              <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
              <p className="mt-2 text-sm text-muted-foreground">Enter admin password to view submissions.</p>
            </div>
          </AnimatedHeading>

          <AnimatedParagraph delay={0.15}>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm"
              />
              {authError && <p className="text-xs text-destructive">{authError}</p>}
              <button
                type="submit"
                disabled={loading || !password}
                className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                Access Panel
              </button>
            </form>
          </AnimatedParagraph>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-6 md:px-10 pt-24 pb-20">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Contact Submissions</h1>
            <p className="text-sm text-muted-foreground mt-1">{submissions.length} entries</p>
          </div>
          <button
            onClick={() => { setAuthenticated(false); setPassword(""); }}
            className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Logout
          </button>
        </div>

        {submissions.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((sub) => (
              <div key={sub.id} className="rounded-lg border border-border bg-card p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <div>
                    <span className="font-semibold text-foreground">{sub.name}</span>
                    <span className="text-muted-foreground text-sm ml-3">{sub.email}</span>
                    {sub.company && (
                      <span className="text-muted-foreground/60 text-sm ml-3">{sub.company}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground/50">
                    {new Date(sub.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{sub.subject}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{sub.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
