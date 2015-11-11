# the model

## Neurons

The neurons model is based on [Izhikevich's paper](http://www.izhikevich.org/publications/spikes.pdf)

## STDP

The STDP rule is based on [Izhikevich's another paper](http://izhikevich.org/publications/spnet.pdf).
Difference is that update weight directory insted of through dirivetive.

- 当 input neuron fire 时, 根据自己的 STDP 值, 减少 weight
- 当本 neuron fire 时,  根据 input neuron 的 STDP 值增加 weight

## 如何生成网络

1. 手工 project
2. 自动生成

自动生成参数:
1. inputLayer: num
2. secondLayer: num
3. connectionType: random / all


## 如何训练网络

提供信号, learning rate 让网络自己 STDP

## 如何使用网络

learning rate 设为0
