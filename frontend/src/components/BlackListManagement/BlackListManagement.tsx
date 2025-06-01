import { useState } from "react";
import { BlackListTable } from "../table/BlackList"; // ﬁnal section below
import { FaTrash } from "react-icons/fa";
import "./BlacklistManagement.scss";

interface BlacklistEntry {
  id: string | number;
  website: string;
}

export default function BlacklistManagement() {
    /***** Dummy data for the table *****/

  const [data, setData] = useState<BlacklistEntry[]>([
  { id: 1, website: "malicious.com" },
  { id: 2, website: "phishing.net" },
  { id: 3, website: "spam.org" },
]);

const columns = [
  {
    key: "id" as keyof BlacklistEntry,
    label: "#",
    render: (row: BlacklistEntry) => row.id,
  },
  {
    key: "website" as keyof BlacklistEntry,
    label: "Website Address",
  },
  {
    key: "actions" as "actions",
    label: "Actions",
    render: (row: BlacklistEntry) => (
      <button
        className="actions"
        title="Remove"
        onClick={() => alert(`Remove ${row.website}`)}
      >
        <FaTrash />
      </button>
    ),
  },
];

  /***** Form state for “Add new” *****/
  const [website, setWebsite] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  /***** Handler for “Add to blacklist” *****/
  const handleAdd = () => {
    // In a real app, you’d validate + submit to API here.
    // For now, just append a new row to `data`:
    const newEntry: BlacklistEntry = {
      id: data.length + 1,
      website: website,
    };
    setData((prev) => [newEntry, ...prev]);
    // Clear form fields
    setWebsite("");
  };

  /***** Filtered data for search (simple “contains” on customerName/email) *****/
  const filteredData = data.filter((row) => {
    const lc = searchTerm.toLowerCase();
    return (
      row.website.toLowerCase().includes(lc)
    );
  });

  return (
    <div className="blacklist-page-container">
      {/* ─────────────────────────────────────
          Heading + “Add new” form
      ───────────────────────────────────── */}
      <div className="blacklist-header-card">
        <h2 className="blacklist-title">Blacklist management</h2>
        <div className="add-new-label">Add new</div>
        <div className="add-new-subtext">
          You can add only customer name, phone number or email address or either
          all.
        </div>

        <div className="add-new-form">

          {/* Website Address */}
          <div className="form-row">
            <label className="form-label">Website Address</label>
            <input
              type="email"
              className="text-input full-width"
              placeholder="Enter email address"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* “Add to blacklist” Button */}
          <div className="form-row button-row">
            <button className="btn-add" onClick={handleAdd}>
              Add to blacklist
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────
          Tabs + Search
      ───────────────────────────────────── */}
      <div className="tabs-search-row">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter to search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn-search" onClick={() => {}}>
            Search
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────
          Table (wrapped in a card)
      ───────────────────────────────────── */}
      <div className="table-card">
        <BlackListTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
