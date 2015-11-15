// creact a canvas to draw spike lines
import React, { Component } from 'React';

export default class Settings extends Component {
  render() {
    const { name } = this.props;

    return (
      <form className="pure-form">
        <fieldset>
          <h3><legend>Network Settings:</legend></h3>
          <input type="number" placeholder="Sensor number"/>
          <input type="number" placeholder="Inner neuron number"/>
          <select id="connectionType">
            <option>allToAll</option>
            <option>random</option>
          </select>
          <button type="submit" className="pure-button pure-button-primary">Generate Network</button>
        </fieldset>
      </form>
    );
  }
}
