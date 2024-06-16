import React, { type FC, useRef } from "react";
import { usePopup } from "../index";

const Popup: FC = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const focusItemFirstRef = useRef<HTMLAnchorElement>(null);

  const { isVisible, togglePopup } = usePopup(
    popupRef,
    buttonRef,
    focusItemFirstRef,
    buttonRef
  );

  return (
    <aside aria-label="List Popup">
      <div
        ref={popupRef}
        style={{ visibility: isVisible ? "visible" : "hidden" }}
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
        </ul>
      </div>
      <button
        ref={buttonRef}
        type="button"
        aria-label={isVisible ? "open" : "close"}
        aria-expanded="false"
        aria-haspopup="true"
      >
        Button
      </button>
    </aside>
  );
};

export default Popup;
