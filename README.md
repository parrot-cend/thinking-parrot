# Parrot-element-compiler

## 目标: 加速产品原型输出与前端代码构建

### 产品侧

> 产品设计原型与具体框架无关, 所以应该仅配置少量公用选项:

1. 表单项的 **label**
2. 表单项的 **类型**:
   3. radio
   4. checkbox
   5. input
   6. select
   7. cascader
   8. switch
   9. slider
   10. timepicker
   11. datepicker
   12. datetimepicker
   13. upload
   14. rate
   15. colorpicker
   16. text & button
3. 表单的**操作按钮**: 确定 取消 重置 等
4. 配置完成后产品可以看到**预览**

### 程序侧

> 产品输出的原型直接转化为代码模板, 无需配置或仅需完善部分细节

具体表单项有具体配置, 参考 [element-ui 组件](https://element.eleme.cn/#/zh-CN/component/installation)

## 数据流转:

### Config => Node => Vue Template code => Preview

| FrontEnd             | Server                        | Parser               | Node Factory      |
| -------------------- | ----------------------------- | -------------------- | ----------------- |
| Build Node config -> |                               |                      |                   |
|                      | Pass config ->                |                      |                   |
|                      |                               | Form config ->       |                   |
|                      |                               | Form-Item config ->  |                   |
|                      |                               | Input config ->      |                   |
|                      |                               | ...other config ->   |                   |
|                      |                               |                      | <- Generate Nodes |
|                      |                               | `TemplateNode` +     |                   |
|                      |                               | `FormNode` +         |                   |
|                      |                               | `FormItemNode` +     |                   |
|                      |                               | `InputNode` +        |                   |
|                      |                               | `...otherNode` =     |                   |
|                      |                               | **Node Tree** ↓      |                   |
|                      |                               | <- `Root.toString()` |                   |
|                      | <- `<template>...</template>` |                      |                   |
| Render **Real form** |                               |                      |                   |
| Get **Real code**    |                               |                      |                   |

数据到达 parser 后

递归获取节点传入工厂函数, 生成的每种 VNode 对象与其属性挂钩

获得节点后组装

返回根节点
