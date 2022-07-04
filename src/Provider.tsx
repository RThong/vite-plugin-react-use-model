import React, { ReactNode } from 'react';

import useA from '../examples/vite-react/src/models/useA';
import useB from '../examples/vite-react/src/models/useB';
import Dispatcher from './dispatcher';
import initor from './Initor';
import type { ModelNamespace, ModelType } from './useModel';

export const Context = React.createContext(
  {},
) as unknown as React.Context<Dispatcher>;

export const models = { useA: useA, useB: useB };

const Exe = initor;
const dispatcher = new Dispatcher();

const Provider = (props: { children: ReactNode }) => {
  return (
    <Context.Provider value={dispatcher}>
      {(
        Object.entries(models) as Array<
          [ModelNamespace, ModelType[ModelNamespace]]
        >
      ).map((pair) => (
        <Exe
          key={pair[0]}
          namespace={pair[0]}
          hook={pair[1]}
          onUpdate={(val) => {
            const [ns] = pair;

            dispatcher.bindModel(ns, val);
            dispatcher.trigger(ns);
          }}
        />
      ))}
      {props.children}
    </Context.Provider>
  );
};

export default Provider;
