import React, { ReactNode } from 'react';
{{#importModels}}
{{{.}}}
{{/importModels}}
import Dispatcher from './dispatcher';
import initor from './Initor';

export const Context = React.createContext(
  {},
) as unknown as React.Context<Dispatcher>;

export const models = {
  {{#models}}
  {{.}}
  {{/models}}
};

export type ModelNamespace = keyof typeof models;

export type ModelType = typeof models;

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
