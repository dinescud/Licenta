import { GenericTable } from "../../../components/table/BlackList";
import { FaTrash } from "react-icons/fa";

interface BlacklistEntry {
  id: string | number;
  website: string;
}

const blacklistData: BlacklistEntry[] = [
  { id: 1, website: "malicious.com" },
  { id: 2, website: "phishing.net" },
  { id: 3, website: "spam.org" },
];

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
        style={{ background: "none", border: "none", cursor: "pointer", color: "#e93636" }}
      >
        <FaTrash />
      </button>
    ),
  },
];

export default function Settings() {
  return (
    <div style={{ padding: 24 }}>
      <h2>Blacklist</h2>
      <GenericTable
        columns={columns}
        data={blacklistData}
      />
    </div>
  );
}