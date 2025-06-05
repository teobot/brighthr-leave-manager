import CancelIcon from "../icons/CancelIcon";

export default function SearchInput({
  label,
  placeholder,
  value = "",
  onChange = () => {},
  type = "text",
  cancelButton = false,
}: {
  label: string;
  placeholder: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  cancelButton?: boolean;
}) {
  return (
    <div className="relative flex flex-row gap-2">
      <label
        htmlFor={label}
        className="absolute -top-2 left-2 inline-block rounded-lg bg-white px-2 text-xs font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        id={label}
        name={label}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="block w-full rounded-md bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
      />
      {cancelButton && (
        <button
          className="cursor-pointer"
          title="Cancel search"
          onClick={() =>
            onChange({
              target: { value: "" },
            } as React.ChangeEvent<HTMLInputElement>)
          }
        >
          <CancelIcon />
        </button>
      )}
    </div>
  );
}
