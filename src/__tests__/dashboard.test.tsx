import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectList from "@/components/dashboard/ProjectList";
import type { Project } from "@/lib/db";

// Mock next/link
vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
    [key: string]: unknown;
  }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}));

const mockProjects: Project[] = [
  {
    $id: "proj-1",
    name: "CNC Bracket",
    userId: "user-123",
    createdAt: "2026-05-01T10:00:00.000Z",
    updatedAt: "2026-05-01T10:00:00.000Z",
  },
  {
    $id: "proj-2",
    name: "Gear Assembly",
    userId: "user-123",
    createdAt: "2026-05-02T12:00:00.000Z",
    updatedAt: "2026-05-02T12:00:00.000Z",
  },
];

describe("ProjectList", () => {
  it("renders a list of projects", () => {
    render(<ProjectList projects={mockProjects} />);

    expect(screen.getByText("CNC Bracket")).toBeInTheDocument();
    expect(screen.getByText("Gear Assembly")).toBeInTheDocument();
  });

  it("renders formatted dates", () => {
    render(<ProjectList projects={mockProjects} />);

    expect(screen.getByText("May 1, 2026")).toBeInTheDocument();
    expect(screen.getByText("May 2, 2026")).toBeInTheDocument();
  });

  it("links each project to /project/[id]", () => {
    render(<ProjectList projects={mockProjects} />);

    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveAttribute("href", "/project/proj-1");
    expect(links[1]).toHaveAttribute("href", "/project/proj-2");
  });

  it("renders empty when no projects", () => {
    const { container } = render(<ProjectList projects={[]} />);
    expect(container.querySelectorAll("a")).toHaveLength(0);
  });
});
