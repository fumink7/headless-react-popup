
# Headless React Popup

This project provides a versatile and accessible headless popup custom hook for React applications.

## Features

- Toggle popup visibility
- Manage focus for accessibility
- Lightweight and flexible

## Usage

Here's a simple example of how to use the `usePopup` hook in your React component:

```tsx
import React, { useRef } from 'react';
import { usePopup } from 'headless-react-popup';

const ExampleComponent = () => {
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const focusItemFirstRef = useRef<HTMLAnchorElement>(null);

  const { isVisible, togglePopup } = usePopup(
    popupRef,
    buttonRef,
    focusItemFirstRef,
    buttonRef // focusItemLastRef
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

export default ExampleComponent;
```

---

## Installation

To install the dependencies, run the following command:

```bash
npm install
```

## Storybook

To run the Storybook, use the following command:

```bash
npm storybook
```

## Testing

To run the tests, use the following command:

```bash
npm test
```

## Lint

To run the lint, use the following command:

```bash
npm lint
npm lint-fix
```

## License

This project is licensed under the ISC License.
