import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./BlackList.scss";
import { getBlackList, addBlackListItem, removeBlackListItem } from "../../services/UserService";

interface BlacklistEntry {
  id: string;
  website: string;
}

export default function Blacklist() {
  const [data, setData] = useState<BlacklistEntry[]>([]);
  const [website, setWebsite] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blacklist from backend on mount
  useEffect(() => {
    setLoading(true);
    getBlackList()
      .then((list: string[]) => {
        setData(list.map((w) => ({ id: w, website: w })));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blacklist:", err);
        setError(err.message || "Failed to load blacklist");
        setLoading(false);
      });
  }, []);

  // Add to blacklist
  const handleAdd = async () => {
    if (!website.trim()) return;
    setLoading(true);
    try {
      await addBlackListItem(website);
      setData((prev) => [{ id: website, website }, ...prev]);
      setWebsite("");
    } catch (err: any) {
      setError(err.message || "Failed to add to blacklist");
    } finally {
      setLoading(false);
    }
  };

  // Remove from blacklist
  const handleRemove = async (website: string) => {
    setLoading(true);
    try {
      await removeBlackListItem(website);
      setData((prev) => prev.filter((entry) => entry.website !== website));
    } catch (err: any) {
      setError(err.message || "Failed to remove from blacklist");
    } finally {
      setLoading(false);
    }
  };

  // Filtered data for search
  const filteredData = data.filter((row) => {
    const lc = searchTerm.toLowerCase();
    return row.website.toLowerCase().includes(lc);
  });

  return (
    <div className="blacklist-page-container">
      <div className="blacklist-header-card">
        <h2 className="blacklist-title">Blacklist management</h2>
        <div className="add-new-label">Add new</div>
        <div className="add-new-subtext">
          You can add only website addresses to the blacklist.
        </div>
        <div className="add-new-form">
          <div className="form-row">
            <label className="form-label">Website Address</label>
            <input
              type="text"
              className="text-input full-width"
              placeholder="Enter website address"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="form-row button-row">
            <button className="btn-add" onClick={handleAdd} disabled={loading}>
              Add to blacklist
            </button>
          </div>
        </div>
      </div>
      <div className="tabs-search-row">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={loading}
          />
          <button className="btn-search" onClick={() => {}} disabled={loading}>
            Search
          </button>
        </div>
      </div>
      {error && <div className="error-message">{error}</div>}
      {loading ? (
        <div className="loading-message">Loading...</div>
      ) : (
        <table className="blacklist-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Website Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, idx) => (
              <tr key={row.id}>
                <td>{idx + 1}</td>
                <td>{row.website}</td>
                <td>
                  <button
                    className="actions"
                    title="Remove"
                    onClick={() => handleRemove(row.website)}
                    disabled={loading}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
