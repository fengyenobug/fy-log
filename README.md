# fy-log

一个美观的控制台日志工具，支持样式化输出。提供了多种预设样式，并支持自定义样式。

![fy-log](https://i.imgur.com/VaqeCdO.png)

## 特性

- 🎨 内置多种预设样式（success、error、warning、info、debug）
- 💅 支持自定义样式
- 🔍 优化的对象和数字显示
- 📦 轻量级，无依赖
- 📝 完整的 TypeScript 支持
- ⛓️ 支持链式调用

## 安装

```bash
npm install fy-log
```

## 使用方法

```typescript
import { log } from 'fy-log';

// 使用预设样式
log.success('操作成功');
log.error('发生错误');
log.warning('警告信息');
log.info('普通信息');
log.debug('调试信息');

// 支持多参数
log.info('用户', { id: 1, name: 'FengYe' }, '已登录');

// 数字会自动添加下划线样式
log.success('总计：', 100);

// 对象会自动格式化并高亮数字
log.info({
  name: 'FengYe',
  age: 25,
  scores: [98, 95, 100]
});

// 使用自定义样式
log.custom(
  {
    color: '#ff69b4',
    backgroundColor: '#fff0f5',
    padding: '2px 8px',
    borderRadius: '4px'
  }, 
  '自定义粉色主题'
);

// 使用原始 CSS 字符串
log.custom(
  'color: red; font-weight: bold; text-decoration: underline',
  '使用 CSS 字符串样式'
);

// 链式调用示例
log.success('第一步完成')
   .info('处理中...')
   .warning('注意！')
   .error('出错了')
   .debug('调试信息');
```

## API

### 预设样式方法

- `log.success(...messages: any[])`：成功信息，绿色主题
- `log.error(...messages: any[])`：错误信息，红色主题
- `log.warning(...messages: any[])`：警告信息，橙色主题
- `log.info(...messages: any[])`：普通信息，灰色主题
- `log.debug(...messages: any[])`：调试信息，蓝色主题

### 自定义样式

`log.custom(style: CustomLogStyle | string, ...messages: any[])`

style 可以是对象或 CSS 字符串：

```typescript
// 样式对象
interface LogStyle {
  color?: string
  backgroundColor?: string
  padding?: string
  borderRadius?: string
  fontWeight?: string
  textDecoration?: string
  [key: string]: string | undefined  // 支持其他 CSS 属性
}

// 或直接使用 CSS 字符串
log.custom('color: purple; font-size: 14px;', 'Hello World');
```

## 特殊处理

- 数字会自动添加下划线样式
- 对象会自动格式化并美化显示
- null 和 undefined 会直接显示为字符串
- 多参数之间会自动添加空格

## 许可证

[ISC](LICENSE)