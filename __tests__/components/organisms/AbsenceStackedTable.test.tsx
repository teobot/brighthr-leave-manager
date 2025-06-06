import AbsenceStackedTable from "@/components/organisms/AbsenceStackedTable";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import kataDataExample from "../../example/kata.data.example.json";
import { Absence } from "@/common/types/kata.types";

describe("AbsenceStackedTable", () => {
  it("should render the absence stacked table", () => {
    render(<AbsenceStackedTable absences={[]} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Type")).toBeInTheDocument();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
    expect(screen.getByText("Approved")).toBeInTheDocument();
  });

  it("renders rows for each absence", () => {
    render(<AbsenceStackedTable absences={kataDataExample as Absence[]} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(kataDataExample.length + 1); // header + data rows
    // Skip the header row (rows[0])
    kataDataExample.forEach((absence, idx) => {
      const row = rows[idx + 1];
      expect(row).toHaveTextContent(
        `${absence.employee.firstName} ${absence.employee.lastName}`
      );
    });
  });

  it("filters absences by search input", async () => {
    render(<AbsenceStackedTable absences={kataDataExample as Absence[]} />);
    const input = screen.getByPlaceholderText(/start typing to search/i);
    await userEvent.type(input, kataDataExample[0].employee.firstName);
    expect(
      screen.getByText(kataDataExample[0].employee.firstName)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(kataDataExample[1].employee.firstName)
    ).not.toBeInTheDocument();
  });

  it("sorts absences by clicking header", async () => {
    render(<AbsenceStackedTable absences={kataDataExample as Absence[]} />);
    // Initial order: Alice, Bob (asc by name)
    let rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(kataDataExample[0].employee.firstName);
    expect(rows[2]).toHaveTextContent(kataDataExample[1].employee.firstName);
    // Click 'Name' header to sort desc
    const nameHeader = screen.getByText(/Name/);
    await userEvent.click(nameHeader);
    rows = screen.getAllByRole("row");
    expect(rows[1]).toHaveTextContent(kataDataExample[1].employee.firstName);
    expect(rows[2]).toHaveTextContent(kataDataExample[0].employee.firstName);
  });

  it("renders correctly with no absences", () => {
    render(<AbsenceStackedTable absences={[]} />);
    // Only header row should be present
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(
      screen.queryByText(kataDataExample[0].employee.firstName)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(kataDataExample[1].employee.firstName)
    ).not.toBeInTheDocument();
  });
});
