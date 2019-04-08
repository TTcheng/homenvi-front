# create project
## 生成项目并支持自定义配置
```shell
create-react-app homenvi-front
yarn add react-app-rewired customize-cra --dev
```
edit package.json replace all react-scripts to react-app-rewired
add config-overrides.js

## ant design和按需加载
```shell
yarn add antd
yarn add babel-plugin-import --dev
```
add fixBabelImports(...) in config-overrides.js

## less
```shell
yarn add less@2 less-loader
```
add addLessLoader(...) in config-overrides.js

## redux and it's devtools
```shell
yarn add react-redux redux redux-thunk
yarn add redux-devtools-extension --dev
```

## react-router
```shell
yarn add react-router-dom
```

## bootstrap
```shell
yarn add bootstrap popper.js
```

## decorators support
```shell
yarn add @babel/plugin-proposal-decorators
```
add addDecoratorsLegacy(...) in config-overrides.js to support decorators
