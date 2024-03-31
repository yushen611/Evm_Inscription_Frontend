## Project Intro  
[PPT for this project](https://gamma.app/docs/SemiToken-Inscription-on-EVM-25abptmvmyjwgf2?mode=doc)

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# 已有功能

1. 发送data
2. 根据tx hash 读 event .data

# 合约地址

0x6cc328b0cd930baf74258c571bf67b8814ee9027

# 任务

前端

<img src="https://gitee.com/yushen611/img/raw/master/image-20240127144026699.png" alt="image-20240127144026699" style="zoom:50%;" />

1. 发送data（前端实现）

 后端实现（python）

1. 根据contract地址 获取所有的events
   * 根据contract地址 获取所有的txs
   * 再根据tx hash 读 event .data（建个csv增量读）
2. 识别是发币，交易，挖矿的
   1. json格式合法检测代码
   2. json交易合法检测代码
   3. json挖矿合法检测代码
   4. json发币合法检测代码
3. 当前拥有某个币的地址以及该币数量，以及交易记录
   1. 某个币的交易记录
   2. 某个币拥有者有该币的数量

# .env文件写什么
例子
```
VITE_PRIVATE_KEY=xxxx4dfbd82a72fcxxxxxxxxxxx
```
