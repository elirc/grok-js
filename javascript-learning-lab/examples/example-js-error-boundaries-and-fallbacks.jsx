/*
Example: React Error Boundaries for Graceful Degradation
*/

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    logErrorToService(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackUI />;
    }
    return this.props.children;
  }
}

/*
Error boundaries catch JavaScript errors anywhere in their child tree during rendering. They let you show a nice fallback instead of a blank white screen.

They only work for render-time errors in class components (or via libraries). They do not catch errors in event handlers, async code, or the boundary itself.

A junior React developer should wrap major sections (routes, complex widgets) in error boundaries so one bad component does not destroy the whole app.
*/
