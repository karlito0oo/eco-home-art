import React from "react";

const Table = ({
  columns,
  data,
  loading,
  onEdit,
  onDelete,
  actions = true,
}) => {
  return (
    <table className="min-w-full bg-white rounded shadow">
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className="px-4 py-2">
              {column.label}
            </th>
          ))}
          {actions && <th className="px-4 py-2">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <tr>
            <td
              colSpan={columns.length + (actions ? 1 : 0)}
              className="text-center py-8 text-gray-500"
            >
              Loading...
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td
              colSpan={columns.length + (actions ? 1 : 0)}
              className="text-center py-8 text-gray-500"
            >
              No data found.
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id} className="border-t">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-2">
                  {column.render
                    ? column.render(item[column.key], item)
                    : item[column.key]}
                </td>
              ))}
              {actions && (
                <td className="px-4 py-2">
                  {onEdit && (
                    <button
                      className="text-blue-600 mr-2"
                      onClick={() => onEdit(item)}
                    >
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      className="text-red-600"
                      onClick={() => onDelete(item.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
