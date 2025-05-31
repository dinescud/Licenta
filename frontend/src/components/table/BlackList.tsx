import React from "react";

interface Column<T> {
  key: string | "actions";
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function GenericTable<T extends { id: string | number; [key: string]: any }>({
  columns,
  data,
}: GenericTableProps<T>) {
  return (
    <table className="generic-table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key as string}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            {columns.map(col => (
              <td key={col.key as string}>
                {col.render ? col.render(row) : (col.key === "actions" ? null : (row[col.key] as React.ReactNode))}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}