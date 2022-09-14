import React, { memo } from "react";

class ToDos extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log("mounted");
  }

  componentWillUnmount() {
    console.log("unmounted");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("updated", prevProps, this.props);
  }

  render() {
    return (
      <div>
        {this.props.todos.map((todo, index) => (
          <div key={todo + "_" + index}>{todo}</div>
        ))}
      </div>
    );
  }
}

export default memo(ToDos);
