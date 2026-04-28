import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { toast } from "sonner";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("https://mail-api-khaki.vercel.app/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("adminToken", data.token);
        toast.success("Login successful!");
        navigate("/admin/dashboard");
      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4">
      {/* Animated Gradient Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/20 blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
      
      <div className="relative z-10 w-full max-w-md bg-card/60 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-inner border border-primary/20">
            <Lock className="text-primary" size={28} />
          </div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground mb-2">Admin Portal</h1>
          <p className="text-muted-foreground text-sm">Secure access to the dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative group">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full bg-background/50 border border-border/50 rounded-xl pl-11 pr-4 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-background"
            />
          </div>

          <div className="relative group">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-background/50 border border-border/50 rounded-xl pl-11 pr-11 py-3.5 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 focus:bg-background"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex items-center justify-between text-sm mt-2 mb-6">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input type="checkbox" className="rounded border-border text-primary focus:ring-primary/50" />
              <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full relative overflow-hidden bg-primary text-primary-foreground py-3.5 rounded-xl font-heading font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-primary/25 flex items-center justify-center gap-2 group"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Secure Login</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-xl mix-blend-overlay"></div>
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
};

export default AdminLogin;
