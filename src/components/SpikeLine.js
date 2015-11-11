// creact a canvas to draw spike lines
import React, { Component } from 'React';

export default class SpikeLine extends Component {
  render() {
    const { id } = this.props;
    const canvasStyle = {
      display: 'inline-block',
      verticalAlign: 'text-top',
    }
    return (
      <canvas id={id} style={canvasStyle} height="20" width="5000"></canvas>
    );
  }
}
