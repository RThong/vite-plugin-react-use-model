import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { useModel } from '@vite-plugin-react-use-model';

const Test = () => {
  console.log('@@@@@');

  const { a, setA } = useModel('useA');

  console.log('【Test渲染】', a);

  return (
    <div>
      {a}
      <button onClick={() => setA((_) => _ + 1)}>click</button>
      <ComA />
      <ComB />
    </div>
  );
};

const ComA = () => {
  const { a, setA } = useModel('useA');
  console.log('【ComA渲染】', a);

  return (
    <div style={{ border: '1px solid pink' }}>
      a: {a}
      <div>
        <button onClick={() => setA((_) => _ + 1)}>更新a</button>
      </div>
    </div>
  );
};

const ComB = () => {
  const { b, setB } = useModel('useB');
  console.log('【ComB渲染】', b);

  return (
    <div style={{ border: '1px solid blue' }}>
      b: {b}
      <div>
        <button onClick={() => setB((_) => _ + 1)}>更新b</button>
      </div>
    </div>
  );
};

export default Test;
