# fm-reverse-proxy

## 安装

执行命令

`npm install fm-reverse-proxy --save-dev`

## 使用

```javascript
var proxy = require('fm-reverse-proxy');
proxy.start({
  port: 3001,
  prefixPath: '/',
  staticPath: 'static',
  target: 'http://127.0.0.1',
  filter: ''
});
```

`options` 参数
- port: 端口号，选填，默认 "3001"
- prefixPath: url 地址前缀，选填，默认 "/"
- staticPath: 静态目录，选填，默认 "static"
- target: 服务器host, 必填
- filter: 过滤条件，选填，默认为空

## 示例

```javascript
var proxy = require('fm-reverse-proxy');
proxy.start({
  port: 3001,
  staticPath: 'static',
  target: 'http://127.0.0.1'
});
```

运行：

`node proxy.js`

至此，看到 *Reverse Proxy listening at port 3001* ，说明反向代理服务器已启动。


修改 `port` 参数，可以更改端口号。


## License
[MIT](https://github.com/ifootmark/fm-reverse-proxy/blob/master/LICENSE)


© allmeet.net
