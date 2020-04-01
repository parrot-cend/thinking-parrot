# thinking-parrot

Server side of Vue template generator. Enpower PM to produce real source code!

For PM, For Front-End programmer.

## Roadmap

1. User and Project
2. Template to VNode

## Data transform

JSON config => Node => Vue Template code => fallback

| FrontEnd             | Server                        | Parser               | Node Factory      |
| -------------------- | ----------------------------- | -------------------- | ----------------- |
| Build JSON config -> |                               |                      |                   |
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
