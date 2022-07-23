# vite-plugin-react-use-model 🚀

> 基于 `hooks` 的简易数据管理的 vite 插件

### 安装

```shell
$ pnpm add vite-plugin-react-use-model@ -D
```

### 配置

```ts
// vite.config.ts
import viteReactModelPlugin from 'vite-plugin-react-use-model';

export default {
  plugins: [viteReactModelPlugin()],
};
```

```js
// tsconfig.json
// 为了更好的 TS 类型提示，需要新增如下配置
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@vite-plugin-react-use-model": ["./src/.vite-plugin-react-use-model"]
    }
  }
}
```

此外，由于插件会生成运行时依赖，将临时文件所在目录 `.vite-plugin-react-use-model` 加入到 `.gitignore` 中即可。

### 使用

约定在 `src/models` 目录下的文件为项目定义的 model 文件。每个文件需要默认导出一个 function，该 function 定义了一个 Hook。
文件名则对应最终 model 的 name，你可以通过插件提供的 API 来消费 model 中的数据，所谓 hooks model 文件，就是自定义 hooks 模块。

```ts
// src/main.tsx
// Provider包裹整个项目
import { Provider } from '@vite-plugin-react-use-model';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

```ts
// src/models/useA.ts
import { useState } from 'react';

export default function useA() {
  const [a, setA] = useState(1);

  return [a, setA] as const;
}
```

> 多个组件中使用该 model 时，拿到的同一份状态

插件提供的 `useModel` 是一个 Hook，提供消费 Model 的能力，使用示例如下

```ts
import { useModel } from '@vite-plugin-react-use-model';
import { Button } from 'antd';

const PageA = () => {
  // 这里的useA就对应src/models/useA.ts的文件名
  const [a, setA] = useModel('useA');

  return (
    <div style={{ border: '1px solid green', height: 200 }}>
      <Button onClick={() => setA((_) => _ + 1)}>+1</Button>这是A: {a}
    </div>
  );
};

export default PageA;
```

### Options

```ts
export interface Options {
  /**
   * model目录，默认为 src/models
   */
  modelDir?: string;
}
```
