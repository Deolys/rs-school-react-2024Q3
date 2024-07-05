import { Component, ReactNode } from 'react';

export class ErrorButton extends Component {
  render(): ReactNode {
    return (
      <button type="button" title="Get an error">
        Error button
      </button>
    );
  }
}

export default ErrorButton;
