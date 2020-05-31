<img src="./static/zhihu.png" alt="logo" width="160" height="160" align="right">

# 仿知乎RESTful接口

![](https://img.shields.io/badge/runtime-Node.js-blue.svg)
![](https://img.shields.io/badge/version-v1.0.0-skygrey.svg)
![](https://img.shields.io/badge/platform-Linux|MacOS|Windows-orange.svg)

此项目用于学习RESTful规范，并基于Koa实现的仿知乎服务端API项目🧢。

## 异常处理

异常处理也叫错误处理，是编程语言或计算机硬件中的一种机制，也或者是处理软件或信息系统中出现的异常状况。

**RESTful中，异常状况如下：**

- 运行时错误，都返回500。
- 逻辑错误，如找不到资源404、先决条件失败412、无法处理的实体（例如参数格式不正确，422）等。

**处理理由：**

- 防止程序挂掉，保证程序健壮性
- 告知用户错误信息，避免出现使用问题
- 便于开发者进行错误定位和程序调试

项目使用 koa-json-error 中间件处理，可以将错误信息自动处理成 JSON 格式。需要注意的是返回的信息区分生产开发环境，生产环境不需要返回堆栈调用信息：

```js
app.use(error({
  postFormat: (err, { stack, ...rest }) => (
    process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
  )
}))
```

开发环境下：

```json
{
  "stack": "NotFoundError: Not Found\n at Object.throw xxxxxxx",
  "message": "Not Found",
  "name": "NotFoundError",
  "status": 404
}
```

生产环境下：

```json
{
  "message": "Not Found",
  "name": "NotFoundError",
  "status": 404
}
```

## NoSQL

> 项目采用 NoSQL 管理数据。MongoDB，来源于英文单词 “Humongous”，中文含义为庞大

MongoDB是文档存储数据库，项目以学习规范为主，因此不考虑其他因素的情况下，选择 NoSQL 有以下优点：

- 简单（没有原子性、一致性、隔离性等复杂规范）
- 便于横向拓展（增加服务器数量，存储容量等）
- 适合超大规模的数据存储
- 很灵活的存储复杂结构的数据（Schema Free）

选择 MongoDB 有如下理由：

- 性能好（内存计算）
- 大规模数据存储（可拓展性）
- 可靠安全（本地复制、自动故障转移）
- 方便存储复杂的数据结构（Schema Free）

> 项目使用 MongoDB Atlas 作为数据库服务
