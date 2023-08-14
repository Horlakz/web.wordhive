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
          <tr>
            {tableHeaders.map((header, index) => (
              <th
                key={index}
                scope="col"
                className={`px-4 py-2 font-medium ${header?.className || ""}`}
                colSpan={header?.colSpan || 1}
              >
                {header.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tableData?.map((data, index) => (
            <tr className="border-b" key={index}>
              {tableKeys.map((key, index) => (
                <th
                  scope="row"
                  className={`px-6 py-4 font-medium text-dark-900 whitespace-nowrap`}
                  key={index}
                >
                  {data[key]}
                </th>
              ))}

              {/* table actions */}
              <th
                scope="row"
                className="flex items-center px-6 py-4 font-medium space-x-2 whitespace-nowrap"
              >
                {tableActions &&
                  tableActions.map((action, index) => (
                    <span key={index}>{action(data)}</span>
                  ))}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
