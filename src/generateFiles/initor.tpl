import { useEffect, useMemo, useRef } from 'react';
import { ModelNamespace, ModelType } from './Provider';

const Initor = <T extends ModelNamespace>({
  namespace,
  hook,
  onUpdate,
}: {
  namespace: T;
  hook: ModelType[T];
  onUpdate: (val: ReturnType<ModelType[T]>) => void;
}) => {
  console.log('【Initor】');

  const updateRef = useRef(onUpdate);

  updateRef.current = onUpdate;
  const initialLoad = useRef(false);

  const data = hook();

  // 首次执行时立刻返回初始值
  useMemo(() => {
    updateRef.current(data as ReturnType<ModelType[T]>);
    initialLoad.current = false;
  }, []);

  // React 16.13 后 update 函数用 useEffect 包裹
  useEffect(() => {
    if (initialLoad.current) {
      updateRef.current(data as ReturnType<ModelType[T]>);
    } else {
      initialLoad.current = true;
    }
  });

  return null;
};

export default Initor;
