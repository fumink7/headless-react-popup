import { act, fireEvent, render } from "@testing-library/react";
import React, { useRef } from "react";
import usePopup from "../usePopup";

const TestComponent = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const focusItemFirstRef = useRef<HTMLInputElement>(null);
  const focusItemLastRef = useRef<HTMLInputElement>(null);
  const { isVisible, togglePopup } = usePopup(
    popupRef,
    buttonRef,
    focusItemFirstRef,
    focusItemLastRef,
  );

  return (
    <div>
      <button ref={buttonRef} onClick={togglePopup} type="button">
        Toggle Popup
      </button>
      <div
        ref={popupRef}
        style={{ visibility: isVisible ? "visible" : "hidden" }}
      >
        <input ref={focusItemFirstRef} />
        <input ref={focusItemLastRef} />
      </div>
    </div>
  );
};

describe("usePopup Custom Hooks Test", () => {
  test("Should toggle popup visibility", () => {
    const { getByText } = render(<TestComponent />);
    const toggleButton = getByText("Toggle Popup");

    act(() => {
      fireEvent.click(toggleButton);
    });

    const popup = toggleButton.nextElementSibling;
    expect(popup).toHaveStyle("visibility: visible");

    act(() => {
      fireEvent.click(toggleButton);
    });

    expect(popup).toHaveStyle("visibility: hidden");
  });

  test("Should focus on focusItemFirstRef when popup opens", async () => {
    const { getByText } = render(<TestComponent />);
    const toggleButton = getByText("Toggle Popup");

    act(() => {
      fireEvent.click(toggleButton);
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const firstFocusable =
      toggleButton.nextElementSibling?.querySelector("input");
    expect(document.activeElement).toBe(firstFocusable);
  });

  test("Should focus on focusItemFirstRef when Tab is pressed on focusItemLastRef", async () => {
    const { getByText } = render(<TestComponent />);
    const toggleButton = getByText("Toggle Popup");

    act(() => {
      fireEvent.click(toggleButton);
    });

    const lastFocusable =
      toggleButton.nextElementSibling?.querySelectorAll("input")[1];
    lastFocusable?.focus();

    const tabEvent = new KeyboardEvent("keydown", { key: "Tab" });
    act(() => {
      document.dispatchEvent(tabEvent);
    });

    await new Promise((resolve) => setTimeout(resolve, 100));

    const firstFocusable =
      toggleButton.nextElementSibling?.querySelector("input");
    expect(document.activeElement).toBe(firstFocusable);
  });
});
