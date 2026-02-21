"use client";

import { useEffect, useState } from "react";
import { Lock, Loader2 } from "lucide-react";

interface Submission {
  id: string;
  name: string;
  email: string;
  company: string | null;
  subject: string;
  message: string;
  created_at: string;
}

interface Props {
  initiallyAuthenticated: boolean;
}

export default function AdminDashboard({ initiallyAuthenticated }: Props) {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(initiallyAuthenticated);
  const [authError, setAuthError] = useState("");
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSubmissions = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/submissions", { cache: "no-store" });
      const data = (await response.json()) as { submissions?: Submission[]; error?: string };
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to load submissions");
      }
      setSubmissions(data.submissions ?? []);
    } catch {
      setAuthError("Failed to load submissions.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (authenticated) {
      void loadSubmissions();
    }
  }, [authenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setLoading(true);
    setAttemptsRemaining(null);
    setIsLocked(false);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        attemptsRemaining?: number;
      };

      if (!response.ok) {
        if (response.status === 429) {
          setIsLocked(true);
          setAuthError(data.error ?? "Too many failed attempts. Please try again later.");
        } else {
          setAttemptsRemaining(data.attemptsRemaining ?? 0);
          setAuthError(data.error ?? "Authentication failed.");
        }
        setLoading(false);
        return;
      }

      if (!data.ok) {
        setAuthError(data.error ?? "Authentication failed.");
        setLoading(false);
        return;
      }

      setAuthenticated(true);
      setPassword("");
      setAttemptsRemaining(null);
      setIsLocked(false);
      setLoading(false);
    } catch {
      setAuthError("Authentication failed. Please check your password.");
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setPassword("");
    setSubmissions([]);
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <Lock className="w-10 h-10 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground">Admin Access</h1>
            <p className="mt-2 text-sm text-muted-foreground">Enter admin password to view submissions.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <label htmlFor="admin-password" className="sr-only">Admin password</label>
            <input
              id="admin-password"
              type="password"
              placeholder="Admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLocked}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 text-sm disabled:opacity-50"
            />
            {authError && (
              <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/30">
                <p className="text-xs text-destructive">{authError}</p>
              </div>
            )}
            {attemptsRemaining !== null && !isLocked && (
              <p className="text-xs text-amber-600 bg-amber-50 p-2 rounded">
                {attemptsRemaining > 0
                  ? `${attemptsRemaining} attempt${attemptsRemaining === 1 ? "" : "s"} remaining`
                  : "No attempts remaining"}
              </p>
            )}
            <button
              type="submit"
              disabled={loading || !password || isLocked}
              className="w-full px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              Access Panel
            </button>
          </form>
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
          <button onClick={handleLogout} className="px-4 py-2 rounded-full border border-border text-sm text-muted-foreground hover:text-foreground transition-colors">
            Logout
          </button>
        </div>

        {loading ? (
          <p className="text-muted-foreground">Loading submissions...</p>
        ) : submissions.length === 0 ? (
          <p className="text-muted-foreground">No submissions yet.</p>
        ) : (
          <div className="space-y-4">
            {submissions.map((submission) => (
              <article key={submission.id} className="rounded-lg border border-border bg-card p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-3">
                  <div>
                    <span className="font-semibold text-foreground">{submission.name}</span>
                    <span className="text-muted-foreground text-sm ml-3">{submission.email}</span>
                    {submission.company && (
                      <span className="text-muted-foreground/60 text-sm ml-3">{submission.company}</span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground/50">{new Date(submission.created_at).toLocaleString()}</span>
                </div>
                <p className="text-sm font-medium text-foreground mb-1">{submission.subject}</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">{submission.message}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
