import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, RefreshCcw, Table, Trash2, Search, Download, ExternalLink } from "lucide-react";
import { toast } from "sonner";

interface Submission {
  _id: string;
  data: Record<string, any>;
  ip: string;
  userAgent: string;
  createdAt: string;
}

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchSubmissions = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    try {
      const response = await fetch("https://mail-api-khaki.vercel.app/api/admin/submissions", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
        return;
      }

      const data = await response.json();
      if (data.success) {
        setSubmissions(data.data);
      } else {
        toast.error("Failed to fetch submissions");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this submission? This action cannot be undone.")) {
      return;
    }

    const token = localStorage.getItem("adminToken");
    try {
      const response = await fetch(`https://mail-api-khaki.vercel.app/api/admin/submissions/delete/${id}`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        toast.success("Submission deleted");
        setSubmissions(submissions.filter(sub => sub._id !== id));
      } else {
        toast.error(data.message || "Failed to delete");
      }
    } catch (error) {
      toast.error("Error deleting submission");
    }
  };

  const filteredSubmissions = useMemo(() => {
    return submissions.filter(sub => {
      const searchStr = JSON.stringify(sub.data).toLowerCase();
      return searchStr.includes(searchQuery.toLowerCase());
    });
  }, [submissions, searchQuery]);

  const exportToCSV = () => {
    if (submissions.length === 0) return;

    // Get all unique keys from all submissions
    const allKeys = Array.from(new Set(submissions.flatMap(sub => Object.keys(sub.data))));
    const headers = ["Date", ...allKeys, "IP", "User Agent"];
    
    const csvRows = [
      headers.join(","),
      ...submissions.map(sub => {
        const rowData = [
          new Date(sub.createdAt).toLocaleString().replace(/,/g, ""),
          ...allKeys.map(key => String(sub.data[key] || "").replace(/,/g, " ")),
          sub.ip,
          sub.userAgent.replace(/,/g, " ")
        ];
        return rowData.join(",");
      })
    ];

    const blob = new Blob([csvRows.join("\n")], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", `insectura_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <main className="min-h-screen bg-[#fafafa] pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-heading font-bold tracking-widest text-primary/60 uppercase">Admin Portal</span>
            </div>
            <h1 className="font-display text-4xl font-bold text-primary">Leads Management</h1>
            <p className="text-muted-foreground max-w-md">Track, search, and manage all form submissions from your website.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={exportToCSV}
              className="group flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all font-heading text-sm font-semibold shadow-lg shadow-primary/10"
            >
              <Download size={16} className="group-hover:-translate-y-0.5 transition-transform" /> Export CSV
            </button>
            <button
              onClick={fetchSubmissions}
              className="flex items-center gap-2 px-5 py-2.5 bg-card border border-border text-primary rounded-full hover:bg-muted/50 transition-all font-heading text-sm font-semibold"
            >
              <RefreshCcw size={16} className={isLoading ? "animate-spin" : ""} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500/5 text-red-600 border border-red-500/10 rounded-full hover:bg-red-500/10 transition-all font-heading text-sm font-semibold"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {/* Stats & Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search leads by name, email, message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:ring-4 focus:ring-accent/10 focus:border-accent/50 transition-all shadow-sm"
            />
          </div>
          <div className="bg-primary rounded-2xl p-4 flex items-center justify-between shadow-xl shadow-primary/10 text-primary-foreground">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Table size={20} />
              </div>
              <div>
                <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Total Leads</p>
                <p className="text-2xl font-display font-bold leading-none">{submissions.length}</p>
              </div>
            </div>
            {filteredSubmissions.length !== submissions.length && (
              <div className="text-right">
                <p className="text-xs text-white/60 font-bold uppercase tracking-wider">Filtered</p>
                <p className="text-lg font-display font-bold leading-none">{filteredSubmissions.length}</p>
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-96 space-y-4">
            <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin"></div>
            <p className="text-sm font-heading font-medium text-muted-foreground animate-pulse">Fetching leads...</p>
          </div>
        ) : filteredSubmissions.length === 0 ? (
          <div className="bg-card rounded-3xl p-20 text-center border border-dashed border-border shadow-sm">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-primary/40" size={40} />
            </div>
            <h3 className="text-2xl font-display font-bold mb-2">No leads found</h3>
            <p className="text-muted-foreground max-w-xs mx-auto">
              {searchQuery ? "No matches for your search criteria. Try a different term." : "Your lead database is currently empty. They will appear here once users submit forms."}
            </p>
          </div>
        ) : (
          <div className="bg-card rounded-3xl shadow-xl shadow-black/5 border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-primary/5 border-b border-border">
                    <th className="px-8 py-5 text-xs font-heading font-bold uppercase tracking-widest text-primary/70">Date & Time</th>
                    <th className="px-8 py-5 text-xs font-heading font-bold uppercase tracking-widest text-primary/70">Submission Content</th>
                    <th className="px-8 py-5 text-xs font-heading font-bold uppercase tracking-widest text-primary/70">Metadata</th>
                    <th className="px-8 py-5 text-xs font-heading font-bold uppercase tracking-widest text-primary/70 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredSubmissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-accent/[0.02] transition-colors group">
                      <td className="px-8 py-6 align-top whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-muted/50 flex flex-col items-center justify-center text-primary/60">
                             <span className="text-[10px] font-bold uppercase">{new Date(sub.createdAt).toLocaleString('default', { month: 'short' })}</span>
                             <span className="text-sm font-bold leading-none">{new Date(sub.createdAt).getDate()}</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-primary">{new Date(sub.createdAt).toLocaleDateString()}</p>
                            <p className="text-xs text-muted-foreground font-medium">{new Date(sub.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
                          {Object.entries(sub.data).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 mb-0.5">{key}</span>
                              <span className="text-sm text-primary/90 font-medium break-words max-w-xs">{String(value)}</span>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-6 align-top">
                        <div className="space-y-4">
                           <div className="flex items-center gap-2 group/ip">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              <span className="text-xs font-mono text-muted-foreground font-medium">{sub.ip}</span>
                           </div>
                           <div className="flex items-start gap-2 max-w-[200px]" title={sub.userAgent}>
                              <ExternalLink size={12} className="text-muted-foreground/50 mt-0.5 shrink-0" />
                              <span className="text-[10px] text-muted-foreground/70 leading-relaxed font-medium line-clamp-2">{sub.userAgent}</span>
                           </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 align-top text-right">
                        <button
                          onClick={() => handleDelete(sub._id)}
                          className="p-2.5 text-muted-foreground hover:text-red-600 hover:bg-red-50 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                          title="Delete submission"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-muted/30 px-8 py-4 border-t border-border">
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-center">
                Secure Administrator Session • Showing {filteredSubmissions.length} of {submissions.length} total leads
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
