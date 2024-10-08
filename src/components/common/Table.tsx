interface TableProps {
  tableHeaders: {
    title: string;
    className?: string;
    colSpan?: number;
  }[];
  tableActions?: ((data: any) => JSX.Element)[];
  tableKeys: string[];
  tableData: any[];
}

function Table({
  tableHeaders,
  tableActions,
  tableKeys,
  tableData,
}: TableProps) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="bg-admin-primary text-white capitalize">
          <tr className="w-full flex justify-between items-center">
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`w-full px-4 py-2 font-medium ${
                  header?.className || ""
                }`}
                colSpan={header?.colSpan || 1}
              >
                {header.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData.map((data, index) => (
            <tr
              className="w-full border-b flex justify-between items-center"
              key={index}
            >
              {tableKeys.map((key, index) => (
                <td
                  scope="row"
                  className={`w-full px-6 py-2 font-medium text-dark-900 line-clamp-1 whitespace-nowrap`}
                  key={index}
                >
                  {data[key]}
                </td>
              ))}

              {/* table actions */}
              <td
                scope="row"
                className="w-full flex items-center px-6 py-2 font-medium space-x-2 whitespace-nowrap"
              >
                {tableActions &&
                  tableActions.map((action, index) => (
                    <span key={index}>{action(data)}</span>
                  ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
