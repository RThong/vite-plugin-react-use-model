import { useContext, useEffect, useRef, useState } from 'react';

import type Dispatcher from './dispatcher';
import type { models } from './Provider';
import { Context } from './Provider';

export type ModelNamespace = keyof typeof models;

export type ModelType = typeof models;

const useModel = <T extends ModelNamespace>(namespace: T) => {
  const dispatcher = useContext(Context) as Dispatcher<T>;
  console.log('useModel', namespace, dispatcher);

  const [state, setState] = useState(
    () => dispatcher.data[namespace] as ReturnType<ModelType[T]>,
  );

  const stateRef = useRef(state);
  stateRef.current = state;

  useEffect(() => {
    console.log('【useModel useLayoutEffect 】');

    const render = (value: ReturnType<ModelType[T]>) => {
      const currentState = value;
      const previousState = stateRef.current;

      if (currentState === previousState) {
        return;
      }

      setState(currentState);
    };

    const unregister = dispatcher.register(namespace, render);
    dispatcher.trigger(namespace);

    return () => {
      unregister();
    };
  }, [dispatcher, namespace]);

  return state;
};

export default useModel;
