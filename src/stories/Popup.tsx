import React, { type FC, useRef, type CSSProperties } from "react";
import { usePopup } from "../index";

const Popup: FC = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const focusItemFirstRef = useRef<HTMLAnchorElement>(null);
  const focusItemLastRef = useRef<HTMLButtonElement>(null);

  const { isVisible, hidePopup } = usePopup(
    popupRef,
    buttonRef,
    focusItemFirstRef,
    focusItemLastRef,
  );

  const popupStyle: CSSProperties = {
    visibility: isVisible ? "visible" : "hidden",
    padding: "1rem",
    border: "1px solid gray",
  };

  return (
    <aside aria-label="List Popup">
      <button
        ref={buttonRef}
        type="button"
        aria-label={isVisible ? "open" : "close"}
        aria-expanded="false"
        aria-haspopup="true"
      >
        {isVisible ? "Close" : "Open"}
      </button>
      <div
        ref={popupRef}
        style={popupStyle}
        aria-hidden="true"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="popup-title"
      >
        <h2 id="popup-title">Popup Title</h2>
        <ul>
          <li>
            <a ref={focusItemFirstRef} href="/">
              link1
            </a>
          </li>
          <li>
            <a href="/">link2</a>
          </li>
          <li>
            <a href="/">link3</a>
          </li>
          <li>
            <button ref={focusItemLastRef} onClick={hidePopup} type="button">
              Close
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Popup;
