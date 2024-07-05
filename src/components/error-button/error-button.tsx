import { Component, ReactNode } from 'react';
import classes from './error-button.module.scss';

export class ErrorButton extends Component {
  state = {
    hasError: false,
  };

  handleGetError = (): void => {
    this.setState({ hasError: true });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      throw new Error('An error was created');
    }

    return (
      <button
        className={classes.errorButton}
        onClick={this.handleGetError}
        type="button"
        title="Get an error"
      >
        Error button
      </button>
    );
  }
}

export default ErrorButton;
