import type { ModelNamespace, ModelType } from './Provider';

class Dispatcher<T extends ModelNamespace = ModelNamespace> {
  public data: { [key in ModelNamespace]?: ReturnType<ModelType[key]> } = {};
  public callbackList: {
    [key in ModelNamespace]?: Array<(val: ReturnType<ModelType[key]>) => void>;
  } = {};

  public bindModel = (namespace: T, value: ReturnType<ModelType[T]>) => {
    this.data = {
      ...this.data,
      [namespace]: value,
    };
  };

  public trigger = (namespace: T) => {
    (this.callbackList[namespace] ?? []).forEach((callback) => {
      if (this.data?.[namespace] === undefined) {
        return;
      }
      callback(this.data[namespace] as ReturnType<ModelType[T]>);
    });
  };

  public register = (
    namespace: T,
    callback: (val: ReturnType<ModelType[T]>) => void,
  ) => {
    const temp = this.callbackList[namespace] ?? [];
    this.callbackList = {
      ...this.callbackList,
      [namespace]: [...temp, callback],
    };

    return () => {
      this.callbackList = {
        ...this.callbackList,
        [namespace]: temp.filter((cb) => cb !== callback),
      };
    };
  };
}

export default Dispatcher;
