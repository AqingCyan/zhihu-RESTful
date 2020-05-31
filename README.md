# 仿知乎RESTful接口

此项目用于学习RESTful规范，并基于Koa实现的仿知乎服务端API项目。

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
