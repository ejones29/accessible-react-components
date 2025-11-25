import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../components/Modal/Modal";

// Happy DOM does not implement getComputedStyle by default in some cases
// but Vitest polyfills usually cover it.
// Ensure that window.getComputedStyle exists:
if (!window.getComputedStyle) {
  window.getComputedStyle = () => ({ display: "block" }) as any;
}

describe("Modal Accessibility & Behavior", () => {
  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
    document.body.innerHTML = ""; // reset portals
    document.body.style.overflow = "";
  });

  afterEach(() => {
    document.body.style.overflow = "";
  });

  const renderModal = (isOpen = true, props = {}) =>
    render(
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="My Modal"
        description="Description content"
        {...props}
      >
        <button>Inner button</button>
      </Modal>
    );

  // -------------------------------------------------------
  // Structure & ARIA Requirements
  // -------------------------------------------------------
  it("renders a dialog with required accessibility attributes", () => {
    renderModal(true);

    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeTruthy();

    expect(dialog.getAttribute("aria-modal")).toBe("true");

    // aria-labelledby should reference #modal-title
    expect(dialog.getAttribute("aria-labelledby")).toBe("modal-title");
    const title = document.getElementById("modal-title");
    expect(title).toBeTruthy();
    expect(title?.textContent).toBe("My Modal");

    // aria-describedby should reference #modal-description
    expect(dialog.getAttribute("aria-describedby")).toBe("modal-description");
    const description = document.getElementById("modal-description");
    expect(description).toBeTruthy();
    expect(description?.textContent).toBe("Description content");
  });

  it("does not render when isOpen=false", () => {
    renderModal(false);
    const dialog = screen.queryByRole("dialog");
    expect(dialog).toBeNull();
  });

  // -------------------------------------------------------
  // Overlay & Closing Behavior
  // -------------------------------------------------------
  it("closes when clicking on the backdrop", async () => {
    const user = userEvent.setup();
    renderModal(true);

    const backdrop = document.querySelector(".modal-backdrop");
    expect(backdrop).toBeTruthy();

    await user.click(backdrop as Element);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("does NOT close when clicking inside modal content", async () => {
    const user = userEvent.setup();
    renderModal(true);

    const dialog = screen.getByRole("dialog");
    await user.click(dialog);

    expect(onClose).toHaveBeenCalledTimes(0);
  });

  it("closes when clicking the close button", async () => {
    const user = userEvent.setup();
    renderModal(true);

    const btn = screen.getByLabelText("Close modal");
    await user.click(btn);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------
  // ESC Key Behavior
  // -------------------------------------------------------
  it("closes when pressing ESC key", async () => {
    const user = userEvent.setup();
    renderModal(true);

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // -------------------------------------------------------
  // Focus Behavior & Focus Lock
  // -------------------------------------------------------
  it("focuses the first tabbable element inside the modal when opened", async () => {
    renderModal(true);

    const firstButton = screen.getByText("Inner button");
    expect(document.activeElement).toBe(firstButton);
  });

  it("traps focus inside the modal (Tab cycles)", async () => {
    const user = userEvent.setup();
    renderModal(true);

    const insideButton = screen.getByText("Inner button");
    const closeButton = screen.getByLabelText("Close modal");

    // Focus starts at the 1st tabbable element — insideButton
    expect(document.activeElement).toBe(insideButton);

    // Tab → close button
    await user.keyboard("{Tab}");
    expect(document.activeElement).toBe(closeButton);

    // Tab again loops back to first (focus trap)
    await user.keyboard("{Tab}");
    expect(document.activeElement).toBe(insideButton);

    // Shift+Tab goes back to last element
    await user.keyboard("{Shift>}{Tab}{/Shift}");
    expect(document.activeElement).toBe(closeButton);
  });

  // -------------------------------------------------------
  // Scroll Lock
  // -------------------------------------------------------
  it("disables document scrolling when isOpen=true", () => {
    renderModal(true);
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("restores scrolling when closed", () => {
    const { rerender } = renderModal(true);

    rerender(<Modal isOpen={false} onClose={onClose} />);
    expect(document.body.style.overflow).toBe("");
  });
});
