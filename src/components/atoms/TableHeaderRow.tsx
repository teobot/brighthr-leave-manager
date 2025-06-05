import { twMerge } from "tailwind-merge";

const TableHeaderRow = ({
  onClick,
  children,
}: {
  onClick: () => void;
  children: React.ReactNode;
}) => {
  const tableHeaderClasses =
    "py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 cursor-pointer hover:bg-gray-100 select-none";
  return (
    <th scope="col" className={twMerge(tableHeaderClasses)} onClick={onClick}>
      {children}
    </th>
  );
};

export default TableHeaderRow;
