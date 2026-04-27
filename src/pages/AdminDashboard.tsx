import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, RefreshCcw, Table, Trash2 } from "lucide-react";
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

  return (
    <main className="min-h-screen bg-background pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">Manage form submissions and leads</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={fetchSubmissions}
              className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:opacity-80 transition-opacity text-sm font-medium"
            >
              <RefreshCcw size={16} /> Refresh
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-medium"
            >
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : submissions.length === 0 ? (
          <div className="bg-card rounded-xl p-12 text-center border border-dashed border-border">
            <Table className="mx-auto text-muted-foreground mb-4" size={48} />
            <h3 className="text-lg font-semibold">No submissions yet</h3>
            <p className="text-muted-foreground text-sm">Once users fill out forms, they will appear here.</p>
          </div>
        ) : (
          <div className="bg-card rounded-xl shadow-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Details</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-wider">Sender Info</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {submissions.map((sub) => (
                    <tr key={sub._id} className="hover:bg-muted/20 transition-colors">
                      <td className="px-6 py-4 align-top whitespace-nowrap">
                        <div className="text-sm font-medium">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(sub.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 space-y-2">
                        {Object.entries(sub.data).map(([key, value]) => (
                          <div key={key} className="text-sm">
                            <span className="font-semibold capitalize text-primary/70">{key}:</span>{" "}
                            <span className="text-muted-foreground">{String(value)}</span>
                          </div>
                        ))}
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="text-xs text-muted-foreground bg-secondary/50 p-2 rounded border border-border space-y-1">
                          <div><span className="font-bold">IP:</span> {sub.ip}</div>
                          <div className="truncate max-w-[200px]" title={sub.userAgent}>
                            <span className="font-bold">Browser:</span> {sub.userAgent}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default AdminDashboard;
