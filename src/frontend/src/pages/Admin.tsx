import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  Clock,
  Eye,
  EyeOff,
  Loader2,
  LogOut,
  Printer,
  RefreshCw,
  Search,
  Shield,
  Trash2,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { QuoteRequest } from "../backend.d";
import { useActor } from "../hooks/useActor";

// ─── Constants ────────────────────────────────────────────────
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 min
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 min
const SESSION_KEY = "aurex-admin-session";
const ATTEMPTS_KEY = "aurex-admin-attempts";
const LOCKOUT_KEY = "aurex-admin-lockout-until";

type Step = "credentials" | "security" | "dashboard";

// ─── Helpers ──────────────────────────────────────────────────
function getAttempts() {
  return Number.parseInt(localStorage.getItem(ATTEMPTS_KEY) || "0", 10);
}
function getLockoutUntil() {
  return Number.parseInt(localStorage.getItem(LOCKOUT_KEY) || "0", 10);
}
function bumpAttempts() {
  const a = getAttempts() + 1;
  localStorage.setItem(ATTEMPTS_KEY, String(a));
  if (a >= MAX_ATTEMPTS) {
    localStorage.setItem(LOCKOUT_KEY, String(Date.now() + LOCKOUT_DURATION));
  }
  return a;
}
function clearAttempts() {
  localStorage.removeItem(ATTEMPTS_KEY);
  localStorage.removeItem(LOCKOUT_KEY);
}
function isLockedOut() {
  const until = getLockoutUntil();
  return until > Date.now();
}
function lockoutRemaining() {
  return Math.max(0, getLockoutUntil() - Date.now());
}

// ─── Apply theme from localStorage ────────────────────────────
function ensureTheme() {
  const saved = localStorage.getItem("aurex-theme");
  const isDark = saved ? saved === "dark" : true;
  if (isDark) document.documentElement.classList.remove("light-mode");
  else document.documentElement.classList.add("light-mode");
}

// ─── Root ─────────────────────────────────────────────────────
export default function Admin() {
  const { actor } = useActor();
  const [step, setStep] = useState<Step>("credentials");

  useEffect(() => {
    ensureTheme();
    // Check existing session
    const session = Number.parseInt(
      localStorage.getItem(SESSION_KEY) || "0",
      10,
    );
    if (session && Date.now() - session < SESSION_TIMEOUT) {
      setStep("dashboard");
    }
  }, []);

  const handleCredentialsOk = () => setStep("security");
  const handleSecurityOk = () => {
    localStorage.setItem(SESSION_KEY, String(Date.now()));
    clearAttempts();
    setStep("dashboard");
  };
  const handleLogout = () => {
    localStorage.removeItem(SESSION_KEY);
    setStep("credentials");
  };

  return (
    <div className="min-h-screen cinematic-bg flex flex-col">
      {step === "credentials" && (
        <CredentialsStep actor={actor} onSuccess={handleCredentialsOk} />
      )}
      {step === "security" && <SecurityStep onSuccess={handleSecurityOk} />}
      {step === "dashboard" && (
        <Dashboard actor={actor} onLogout={handleLogout} />
      )}
    </div>
  );
}

// ─── Step 1: Credentials ──────────────────────────────────────
function CredentialsStep({
  actor,
  onSuccess,
}: {
  actor: ReturnType<typeof useActor>["actor"] | null;
  onSuccess: () => void;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  // Lockout countdown ticker
  useEffect(() => {
    if (!isLockedOut()) return;
    const tick = () => {
      const rem = lockoutRemaining();
      setCountdown(rem);
      if (rem <= 0) setCountdown(0);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLockedOut()) return;
    if (!actor) {
      setError("Connecting to backend…");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const ok = await actor.checkAdminCredentials(username, password);
      if (ok) {
        onSuccess();
      } else {
        const a = bumpAttempts();
        if (isLockedOut()) {
          setError("Too many failed attempts. Locked for 15 minutes.");
          setCountdown(lockoutRemaining());
        } else {
          setError(
            `Invalid credentials. ${MAX_ATTEMPTS - a} attempt(s) remaining.`,
          );
        }
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const locked = isLockedOut() || countdown > 0;
  const mins = Math.floor(countdown / 60000);
  const secs = Math.floor((countdown % 60000) / 1000);

  return (
    <LoginShell
      title="Admin Login"
      subtitle="Enter your credentials to continue"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        data-ocid="admin.panel"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="a-user">Username</Label>
          <Input
            id="a-user"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="aurexadmin"
            autoComplete="username"
            disabled={locked}
            className="bg-input/50"
            data-ocid="admin.input"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="a-pass">Password</Label>
          <div className="relative">
            <Input
              id="a-pass"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              disabled={locked}
              className="bg-input/50 pr-10"
              data-ocid="admin.input"
            />
            <button
              type="button"
              onClick={() => setShowPw((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              tabIndex={-1}
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {error && (
          <div
            className="flex items-center gap-2 text-destructive text-sm"
            data-ocid="admin.error_state"
          >
            <AlertCircle size={15} /> {error}
          </div>
        )}

        {locked && countdown > 0 && (
          <div className="flex items-center gap-2 text-amber-400 text-sm">
            <Clock size={15} /> Locked: {mins}m {secs}s remaining
          </div>
        )}

        <Button
          type="submit"
          disabled={loading || locked}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon-sm"
          data-ocid="admin.submit_button"
        >
          {loading ? (
            <>
              <Loader2 size={15} className="mr-2 animate-spin" /> Verifying…
            </>
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </LoginShell>
  );
}

// ─── Step 2: Security Question ────────────────────────────────
function SecurityStep({ onSuccess }: { onSuccess: () => void }) {
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim().toLowerCase() === "aurex") {
      onSuccess();
    } else {
      bumpAttempts();
      setError("Incorrect answer. Please try again.");
    }
  };

  return (
    <LoginShell title="Security Question" subtitle="One more verification step">
      <form
        onSubmit={handleSubmit}
        className="space-y-4"
        data-ocid="admin.panel"
      >
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sec-q">What is your studio name?</Label>
          <Input
            id="sec-q"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter studio name"
            className="bg-input/50"
            data-ocid="admin.input"
          />
        </div>

        {error && (
          <div
            className="flex items-center gap-2 text-destructive text-sm"
            data-ocid="admin.error_state"
          >
            <AlertCircle size={15} /> {error}
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-neon-sm"
          data-ocid="admin.submit_button"
        >
          Verify & Access Dashboard
        </Button>
      </form>
    </LoginShell>
  );
}

// ─── Dashboard ────────────────────────────────────────────────
type QuoteRow = QuoteRequest & { _id: string };

function Dashboard({
  actor,
  onLogout,
}: {
  actor: ReturnType<typeof useActor>["actor"] | null;
  onLogout: () => void;
}) {
  const [quotes, setQuotes] = useState<QuoteRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [error, setError] = useState("");
  const sessionStart = useRef(
    Number.parseInt(localStorage.getItem(SESSION_KEY) || "0", 10),
  );

  // Session timeout watcher
  useEffect(() => {
    const t = setInterval(() => {
      if (Date.now() - sessionStart.current > SESSION_TIMEOUT) {
        onLogout();
      }
    }, 10000);
    return () => clearInterval(t);
  }, [onLogout]);

  // Reset session timer on activity
  useEffect(() => {
    const reset = () => {
      sessionStart.current = Date.now();
      localStorage.setItem(SESSION_KEY, String(Date.now()));
    };
    window.addEventListener("mousemove", reset);
    window.addEventListener("keydown", reset);
    return () => {
      window.removeEventListener("mousemove", reset);
      window.removeEventListener("keydown", reset);
    };
  }, []);

  const loadQuotes = useCallback(async () => {
    if (!actor) return;
    setLoading(true);
    setError("");
    try {
      const data = await actor.getAllQuotes();
      const rows: QuoteRow[] = data.map((q) => ({
        ...q,
        _id: String(q.created_at),
      }));
      rows.sort((a, b) => (b.created_at > a.created_at ? 1 : -1));
      setQuotes(rows);
    } catch {
      setError("Failed to load quotes.");
    } finally {
      setLoading(false);
    }
  }, [actor]);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  const handleStatusChange = async (quoteId: bigint, newStatus: string) => {
    if (!actor) return;
    try {
      await actor.updateQuoteStatus(quoteId, newStatus);
      setQuotes((prev) =>
        prev.map((q) =>
          q.created_at === quoteId ? { ...q, status: newStatus } : q,
        ),
      );
    } catch {
      setError("Failed to update status.");
    }
  };

  const handleDelete = async (quoteId: bigint) => {
    if (
      !window.confirm(
        "Delete this quote request? This action cannot be undone.",
      )
    )
      return;
    if (!actor) return;
    try {
      await actor.deleteQuote(quoteId);
      setQuotes((prev) => prev.filter((q) => q.created_at !== quoteId));
    } catch {
      setError("Failed to delete quote.");
    }
  };

  const filtered = quotes.filter((q) => {
    const matchSearch =
      !search ||
      q.name.toLowerCase().includes(search.toLowerCase()) ||
      q.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || q.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const formatDate = (ts: bigint) => {
    const ms = Number(ts / BigInt(1_000_000));
    return new Date(ms).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const shortId = (ts: bigint) => String(ts).slice(-8);

  const statusColor = (s: string) => {
    if (s === "completed") return "text-green-400";
    if (s === "contacted") return "text-amber-400";
    return "text-blue-400";
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="glass border-b border-border/40 px-4 sm:px-8 py-4 flex items-center justify-between no-print">
        <div className="flex items-center gap-3">
          <Shield size={20} className="neon-purple" />
          <h1 className="font-display font-bold text-lg tracking-wide text-foreground">
            Admin Dashboard
          </h1>
          <span className="text-xs text-muted-foreground hidden sm:inline">
            — Aurex Studio
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.print()}
            className="hidden sm:flex gap-2"
            data-ocid="admin.secondary_button"
          >
            <Printer size={14} /> Print / PDF
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={loadQuotes}
            disabled={loading}
            data-ocid="admin.secondary_button"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onLogout}
            className="gap-2"
            data-ocid="admin.button"
          >
            <LogOut size={14} /> Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 px-4 sm:px-8 py-8 max-w-[1400px] w-full mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {(["pending", "contacted", "completed"] as const).map((s) => (
            <div key={s} className="glass-card p-4 text-center">
              <div
                className={`text-2xl font-display font-bold ${statusColor(s)}`}
              >
                {quotes.filter((q) => q.status === s).length}
              </div>
              <div className="text-xs text-muted-foreground capitalize mt-1">
                {s}
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6 no-print">
          <div className="relative flex-1">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email…"
              className="pl-9 bg-input/50"
              data-ocid="admin.search_input"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger
              className="w-44 bg-input/50"
              data-ocid="admin.select"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {error && (
          <div
            className="flex items-center gap-2 text-destructive text-sm mb-4"
            data-ocid="admin.error_state"
          >
            <AlertCircle size={15} /> {error}
          </div>
        )}

        {/* Table */}
        {loading ? (
          <div
            className="flex items-center justify-center py-20 gap-3 text-muted-foreground"
            data-ocid="admin.loading_state"
          >
            <Loader2 size={20} className="animate-spin" /> Loading quotes…
          </div>
        ) : filtered.length === 0 ? (
          <div
            className="text-center py-20 text-muted-foreground"
            data-ocid="admin.empty_state"
          >
            <p className="text-lg">No quote requests found.</p>
            <p className="text-sm mt-1">Try adjusting the search or filter.</p>
          </div>
        ) : (
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/40">
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      ID
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Name
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Email
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Video Length
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Description
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Status
                    </TableHead>
                    <TableHead className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Created At
                    </TableHead>
                    <TableHead className="no-print text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((q, i) => (
                    <TableRow
                      key={q._id}
                      className="border-border/20 hover:bg-card/50"
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell className="font-mono text-xs text-muted-foreground">
                        #{shortId(q.created_at)}
                      </TableCell>
                      <TableCell className="font-medium text-foreground text-sm whitespace-nowrap">
                        {q.name}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {q.email}
                      </TableCell>
                      <TableCell className="text-sm text-foreground whitespace-nowrap">
                        {q.videoLength}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground max-w-[200px]">
                        <p className="truncate" title={q.description}>
                          {q.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        <Select
                          value={q.status}
                          onValueChange={(val) =>
                            handleStatusChange(q.created_at, val)
                          }
                        >
                          <SelectTrigger
                            className={`h-7 w-[120px] text-xs border-0 bg-transparent px-2 ${statusColor(q.status)}`}
                            data-ocid="admin.select"
                          >
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(q.created_at)}
                      </TableCell>
                      <TableCell className="no-print">
                        <button
                          type="button"
                          onClick={() => handleDelete(q.created_at)}
                          className="p-1.5 rounded text-destructive hover:bg-destructive/10 transition-colors"
                          aria-label="Delete quote"
                          data-ocid="admin.delete_button"
                        >
                          <Trash2 size={14} />
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="px-4 py-3 border-t border-border/20 text-xs text-muted-foreground">
              Showing {filtered.length} of {quotes.length} quote
              {quotes.length !== 1 ? "s" : ""}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// ─── Login Shell ──────────────────────────────────────────────
function LoginShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 flex items-center justify-center px-4 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card w-full max-w-md p-8"
      >
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-4"
            style={{
              background: "oklch(0.58 0.22 292 / 0.15)",
              border: "1px solid oklch(0.58 0.22 292 / 0.3)",
            }}
          >
            <Shield size={24} style={{ color: "oklch(0.7 0.22 292)" }} />
          </div>
          <h2 className="font-display font-bold text-2xl text-foreground">
            {title}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        </div>
        {children}
        <p className="text-center mt-6 text-xs text-muted-foreground">
          <a href="/" className="hover:text-foreground transition-colors">
            ← Back to website
          </a>
        </p>
      </motion.div>
    </div>
  );
}
