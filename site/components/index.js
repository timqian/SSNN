// import Neuron from './Neuron';
//
// const canvas1 = document.getElementById('c1');
// const ctx1 = canvas1.getContext('2d');
// ctx1.fillStyle='#FF0000';
//
// function drawSpike1(time) {
//   ctx1.fillRect(time,0,1,20);
// }
//
// const canvas2 = document.getElementById('c2');
// const ctx2 = canvas2.getContext('2d');
// ctx2.fillStyle='#FF0000';
//
// function drawSpike2(time) {
//   ctx2.fillRect(time,0,1,20);
// }
//
// const canvas3 = document.getElementById('c3');
// const ctx3 = canvas3.getContext('2d');
// ctx3.fillStyle='#FF0000';
//
// function drawSpike3(time) {
//   ctx3.fillRect(time,0,1,20);
// }
// // const n1 = new Neuron();
// //
// // n1.isSensor = true;
// // n1.inI = 25;
// //
// // for (let i = 0; i < 1000; i++) {
// //   // console.log(n1._isSpiking);
// //   // console.log(n1._v);
// //
// //   if (n1._isSpiking) {
// //     drawSpike(i);
// //   }
// //   n1.update();
// // }
//
// const n1 = new Neuron();
// const n2 = new Neuron();
// const n3 = new Neuron();
//
// n1.isSensor = true;
// n2.isSensor = true;
// n1.inI = 4;
// n2.inI = 8;
// n1.project(n3, 3);
// n2.project(n3, 30);
//
// for (let i = 0; i < 1000; i++) {
//   // console.log(n1._v);
//   // console.log(n2._v);
//   if (n1._isSpiking) {
//     drawSpike1(i);
//   }
//   if (n2._isSpiking) {
//     drawSpike2(i);
//   }
//   if (n3._isSpiking) {
//     drawSpike3(i);
//   }
//
//   n1.update();
//   n2.update();
//   n3.update();
//   // console.log(n3);
//   // console.log(n2);
//   // console.log(n1);
// }

import layerNetwork from '../layerNetwork';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SpikeLine from './SpikeCanvas';
import Settings from './NetworkSettings';

const structure = [20, 5];
const type = 'allToAll';
const brain = new layerNetwork(structure, type);

class SpikingHistory extends Component {
  componentDidMount() {
    const canvas = document.getElementById('sensor1');
    console.log(canvas);
  }

  render() {
    const sensorsCanvas = [];
    for (let i = 0; i < structure[0]; i++) {
      sensorsCanvas.push(
        <div style={{whiteSpace: 'nowrap'}}>
          <span style={{width: '80px', display: 'inline-block'}}>{`sensor${i}`}:</span>
           <SpikeLine id={`sensor${i}`}/>
        </div>
      )
    }
    const innersCanvas = [];
    for (let i = 0; i < structure[1]; i++) {
      innersCanvas.push(
        <div style={{whiteSpace: 'nowrap'}}>
          <span style={{width: '80px', display: 'inline-block'}}>{`inner${i}`}:</span>
          <SpikeLine id={`inner${i}`}/>
        </div>
      )
    }
    return(
      <div>
        <Settings/>
        {sensorsCanvas}
        {innersCanvas}
      </div>
    );
  }
}


let rootElement = document.getElementById('root');
ReactDOM.render(
  <SpikingHistory/>,
  rootElement
);
