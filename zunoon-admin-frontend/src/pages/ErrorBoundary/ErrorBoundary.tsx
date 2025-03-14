import React from "react";

interface IState {
  hasError: boolean;
}
type PropsType = {
  children: React.ReactNode;
};

export class ErrorBoundary extends React.Component<PropsType, IState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <h1>
          Something went wrong. Our developers have been informed, sorry for the
          inconvinience
        </h1>
      );
    }

    return this.props.children;
  }
}
