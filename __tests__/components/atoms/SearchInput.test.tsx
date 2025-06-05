import SearchInput from "@/components/atoms/SearchInput";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SearchInput", () => {
  it("should render", () => {
    render(
      <SearchInput label="Search" placeholder="Search" onChange={() => {}} />
    );
  });

  it("should render label and placeholder", () => {
    render(
      <SearchInput
        label="Search"
        placeholder="Type here..."
        onChange={() => {}}
      />
    );
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type here...")).toBeInTheDocument();
  });

  it("should call onChange when typing", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <SearchInput
        label="Search"
        placeholder="Type here..."
        onChange={handleChange}
      />
    );
    const input = screen.getByLabelText("Search");
    await user.type(input, "abc");
    expect(handleChange).toHaveBeenCalled();
  });

  it("should render cancel button if cancelButton is true", () => {
    render(
      <SearchInput
        label="Search"
        placeholder="Type here..."
        onChange={() => {}}
        cancelButton
      />
    );
    expect(screen.getByTitle("Cancel search")).toBeInTheDocument();
  });

  it("should clear input when cancel button is clicked", async () => {
    const user = userEvent.setup();
    const handleChange = jest.fn();
    render(
      <SearchInput
        label="Search"
        placeholder="Type here..."
        value="something"
        onChange={handleChange}
        cancelButton
      />
    );
    const button = screen.getByTitle("Cancel search");
    await user.click(button);
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({ value: "" }),
      })
    );
  });
});
