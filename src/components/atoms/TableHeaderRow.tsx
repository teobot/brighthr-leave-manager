const TableHeaderRow = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  return (
    <th
      className={
        "p-3 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100 select-none"
      }
      onClick={onClick}
    >
      {children}
    </th>
  );
};

export default TableHeaderRow;
