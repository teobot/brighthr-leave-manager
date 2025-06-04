import { render, screen } from "@testing-library/react";
import Badge from "@/components/atoms/Badge";

const badgeVariants = [
  { variant: "primary", bg: "bg-blue-50", text: "text-blue-700" },
  { variant: "success", bg: "bg-green-50", text: "text-green-700" },
  { variant: "warning", bg: "bg-yellow-50", text: "text-yellow-800" },
  { variant: "danger", bg: "bg-red-50", text: "text-red-700" },
] as const;

describe("Badge", () => {
  it("renders the provided text", () => {
    render(<Badge text="Test Badge" variant="primary" />);
    expect(screen.getByText("Test Badge")).toBeInTheDocument();
  });

  badgeVariants.forEach(({ variant, bg, text }) => {
    it(`applies correct classes for variant '${variant}'`, () => {
      render(<Badge text="Badge" variant={variant} />);
      const badge = screen.getByText("Badge");
      expect(badge.className).toContain(bg);
      expect(badge.className).toContain(text);
    });
  });
});
