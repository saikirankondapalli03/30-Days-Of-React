import React from 'react'
import ReactDOM from 'react-dom'
import asabenehImage from './images/asabeneh.jpg'

class LifecycleDemo extends React.Component {
  constructor(props) {
    super(props);
    console.log('1. constructor: initialize state');
    this.state = {
      count: 0,
      hasError: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('2. getDerivedStateFromProps: sync props to state if needed');
    return null; // no state update here
  }

  componentDidMount() {
    console.log('4. componentDidMount: Component mounted');
    this.timer = setInterval(() => {
      console.log('Timer tick');
    }, 1);
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('5. shouldComponentUpdate: Decide if re-render is needed');
    return true; // allow all updates
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('6.getSnapshotBeforeUpdate: Before DOM update');
    return null; // no scroll or DOM position needed
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('7.componentDidUpdate: After update');
  }

  componentWillUnmount() {
    console.log('8.componentWillUnmount: Cleanup before unmount');
    clearInterval(this.timer);
  }

  static getDerivedStateFromError(error) {
    console.log('9.getDerivedStateFromError: Catch error, show fallback UI');
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log('10. componentDidCatch: Log error info', info);
  }

  triggerError = () => {
    throw new Error('Manually triggered error!');
  };

  render() {
    console.log('3. render: Render UI');
    if (this.state.hasError) {
      return <h2>Something went wrong!</h2>;
    }

    return (
      <div>
        <h1>React Lifecycle Demo</h1>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
        <button onClick={this.triggerError}>Trigger Error</button>
      </div>
    );
  }
}

export default LifecycleDemo;

const rootElement = document.getElementById('root')
ReactDOM.render(<LifecycleDemo />, rootElement)
