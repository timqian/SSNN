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

## 先算出神经的反应, 再画出来

# design

## layerNetwork:

public methods:
- [x] 构建函数([网络结构], 其他参数): 初始化 network
- [x] `setInIs([])`: 设置输入电流
- [x] `think(time)`: 运行 network 'time' ms, (是否需要返回所有神经的激发数列用以显示?)
- [?] `getWeights()`: 获取 weights 矩阵(还是使用 property ?)

基于这些函数, 就可以试着 让神经网络做一些工作了!!!
algo(基于这篇 paper: []()):

1. 将 MINSET 转化成  两个json文件(训练集, 测试集) (是否有性能问题?)
  ```json
  [
    {
      label: 3,
      Is: [0, 2, 3, 5, 5, ...],
    },
    ...
  ]
  ```

2. 用该json来训练网络
  1. 把一张图片给网络看 __ ms,
  2. 休息 __ ms
  3. 重复步骤1,2, 直到训练集中图片用完
  4. 重复步骤1,2,3 __ 遍

3. 为每个标定神经(名字需要 reconsider, )决定归属(1-10)
  1. 停止 STDP 学习(固定 weight) (learningRate 设为 0)
  2. 把一张图片给网络看 __ ms, 记录下网络中标定神经们的(名字需要 reconsider, ) spike 次数(取频率怎么样? 取频率稳定之后的次数? 是否能稳定? 需要测试)
  3. (假设第二步频率会稳定) 重复步骤2 , 对每个 neuron 算出它对各个数字总得 spike 次数, spike 最多的那个数字作为该 neuron 的归属

4. 测试训练成果
  1. 把一张图片给 网络看
  2. 记录标定神经们的反应, 然后呢???? TODO

## TODO:

- [ ] test using [esdoc](https://github.com/esdoc/esdoc) to write comments, another  reference: http://jonathancreamer.com/document-es6-with-esdoc/

## Thoughts

- class 的实例(怎么称呼? Object?) 其实是一堆数据, 和一些对这些数据做操作的函数. Object 是带有函数的数据结构, 这种设计思想,
把相关的数据, 操作集中在一个 object 中, 有利于 __(?)
- class 的设计服务于算法!!!

## Refs

- [Simple Model of Spiking Neurons (by Izhikevich)](http://www.izhikevich.org/publications/spikes.pdf)
- [Polychronization: Computation with Spikes (by Izhikevich)](http://izhikevich.org/publications/spnet.pdf)
- [A Minimal Spiking Neural Network to Rapidly Train
and Classify Handwritten Digits in Binary and 10-
Digit Tasks](http://thesai.org/Downloads/IJARAI/Volume4No7/Paper_1-A_Minimal_Spiking_Neural_Network_to_Rapidly_Train.pdf)