import { type RefObject, useEffect, useRef, useState } from "react";

/**
 * Manages the visibility of a popup.
 * @param {React.RefObject} popupRef - The popup contents.
 * @param {React.RefObject} buttonRef - The button that toggles the popup.
 * @param {React.RefObject} focusItemFirstRef - The first focusable item ref in the popup.
 * @param {React.RefObject} focusItemLastRef - The last focusable item ref in the popup.
 * @returns {Object} An object with methods and state related to popup visibility.
 * @returns {boolean} return.isVisible - Whether the popup is visible.
 * @returns {function} return.togglePopup - Toggles the visibility of the popup.
 * @returns {function} return.showPopup - Shows the popup.
 * @returns {function} return.hidePopup - Hides the popup.
 */
const usePopup = (
  popupRef: RefObject<HTMLElement>,
  buttonRef: RefObject<HTMLElement>,
  focusItemFirstRef: RefObject<HTMLElement>,
  focusItemLastRef: RefObject<HTMLElement>,
) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        isVisible &&
        !popupRef.current?.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        hidePopup();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isVisible) return;

      if (event.key === "Escape") {
        hidePopup();
        return;
      }

      if (event.key !== "Tab") return;

      if (
        event.shiftKey &&
        document.activeElement === focusItemFirstRef.current
      ) {
        event.preventDefault();
        focusItemLastRef.current?.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === focusItemLastRef.current
      ) {
        event.preventDefault();
        focusItemFirstRef.current?.focus();
      }
    };

    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleKeyDown);
    buttonRef.current?.addEventListener("click", togglePopup);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
      document.removeEventListener("keydown", handleKeyDown);
      buttonRef.current?.removeEventListener("click", togglePopup);
    };
  }, [isVisible, popupRef, buttonRef, focusItemFirstRef, focusItemLastRef]);

  const showPopup = () => {
    setIsVisible(true);
    setTimeout(() => {
      popupRef.current?.setAttribute("aria-hidden", "false");
      popupRef.current?.setAttribute("tabindex", "0");
      buttonRef.current?.setAttribute("expanded", "true");
      focusItemFirstRef.current?.focus();
    }, 100);
  };

  const hidePopup = () => {
    setIsVisible(false);
    setTimeout(() => {
      popupRef.current?.setAttribute("aria-hidden", "true");
      popupRef.current?.setAttribute("tabindex", "-1");
      buttonRef.current?.setAttribute("expanded", "false");
      buttonRef.current?.focus();
    }, 100);
  };

  const togglePopup = () => {
    if (isVisible) {
      hidePopup();
    } else {
      showPopup();
    }
  };

  return {
    isVisible,
    togglePopup,
    showPopup,
    hidePopup,
  };
};

export default usePopup;
