import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CreateProjectModal from "@/components/dashboard/CreateProjectModal";

// Polyfill HTMLDialogElement for jsdom
beforeEach(() => {
  // jsdom doesn't implement showModal/close natively
  HTMLDialogElement.prototype.showModal =
    HTMLDialogElement.prototype.showModal ||
    function (this: HTMLDialogElement) {
      this.setAttribute("open", "");
    };
  HTMLDialogElement.prototype.close =
    HTMLDialogElement.prototype.close ||
    function (this: HTMLDialogElement) {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
});

describe("CreateProjectModal", () => {
  const mockOnClose = vi.fn();
  const mockOnCreate = vi.fn().mockResolvedValue(undefined);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders modal when open", () => {
    render(
      <CreateProjectModal
        open={true}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    expect(screen.getByText("New Project")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("e.g. CNC Bracket Assembly")).toBeInTheDocument();
  });

  it("does not show content when closed", () => {
    render(
      <CreateProjectModal
        open={false}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    // Dialog exists in DOM but is not open
    const dialog = document.querySelector("dialog");
    expect(dialog).not.toHaveAttribute("open");
  });

  it("accepts text input", async () => {
    const user = userEvent.setup();
    render(
      <CreateProjectModal
        open={true}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    const input = screen.getByPlaceholderText("e.g. CNC Bracket Assembly");
    await user.type(input, "My Test Project");
    expect(input).toHaveValue("My Test Project");
  });

  it("calls onCreate when submitted", async () => {
    const user = userEvent.setup();
    render(
      <CreateProjectModal
        open={true}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    const input = screen.getByPlaceholderText("e.g. CNC Bracket Assembly");
    await user.type(input, "New Project Name");
    await user.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(mockOnCreate).toHaveBeenCalledWith("New Project Name");
    });
  });

  it("disables submit when name is only whitespace", async () => {
    const user = userEvent.setup();
    render(
      <CreateProjectModal
        open={true}
        onClose={mockOnClose}
        onCreate={mockOnCreate}
      />
    );

    const input = screen.getByPlaceholderText("e.g. CNC Bracket Assembly");
    await user.type(input, "   ");

    const submitBtn = screen.getByText("Create");
    expect(submitBtn).toBeDisabled();
    expect(mockOnCreate).not.toHaveBeenCalled();
  });

  it("disables submit when creating", async () => {
    // Make onCreate hang
    const slowCreate = vi.fn().mockImplementation(
      () => new Promise(() => {}) // never resolves
    );
    const user = userEvent.setup();
    render(
      <CreateProjectModal
        open={true}
        onClose={mockOnClose}
        onCreate={slowCreate}
      />
    );

    const input = screen.getByPlaceholderText("e.g. CNC Bracket Assembly");
    await user.type(input, "Test");
    await user.click(screen.getByText("Create"));

    await waitFor(() => {
      expect(screen.getByText("Creating…")).toBeInTheDocument();
    });
  });
});
