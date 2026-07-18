/*
MID-LEVEL GOAL:
Build React applications that are accessible by default and understand ARIA, keyboard navigation, and screen reader concerns.

REAL WORLD USE CASE:
- Enterprise and government applications (legal requirements)
- Inclusive products that work for everyone
- Components that meet WCAG standards

CONCEPTS COVERED:
- Semantic HTML in JSX
- ARIA roles, states, and properties
- Keyboard navigation and focus management
- Screen reader testing
- Common anti-patterns
*/

// ============================================
// STEP 1: Semantic + ARIA
// ============================================

<button aria-pressed={isActive} onClick={toggle}>
  {label}
</button>

// ============================================
// STEP 2: Focus management
// ============================================

function Modal({ isOpen, onClose, children }) {
  const dialogRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
      // trap focus, handle Escape, etc.
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div role="dialog" aria-modal="true" ref={dialogRef} tabIndex={-1}>
      {children}
    </div>
  );
}

// ============================================
// STEP 3: Live regions for dynamic content
// ============================================

<div aria-live="polite">{statusMessage}</div>

/*
DEEPER BREAKDOWN:

Accessibility is not just adding alt text. It's about semantics, keyboard, focus order, announcements, and color contrast.

React makes it easy to do the right thing — and also easy to do the wrong thing with divs everywhere.

MID-LEVEL PERSPECTIVE:

Accessible components are a professional requirement. Tools like axe, WAVE, and screen readers should be part of your workflow.

COMMON PITFALLS:

- Using divs for everything instead of button, nav, main, etc.
- Custom components that don't announce state changes
- Broken focus management in modals and popovers
- Relying only on color to convey meaning

EXPERIMENTS:

1. Audit a component with the axe browser extension.
2. Navigate a complex UI using only the keyboard.
3. Implement roving tabindex for a toolbar.

MID-LEVEL CHALLENGE:

Take one of the earlier components (e.g. Tabs, Select, or Modal) and make it fully accessible:
- Proper roles and ARIA
- Full keyboard support (arrows, escape, enter)
- Focus restoration after close
- Screen reader announcements for state changes
*/