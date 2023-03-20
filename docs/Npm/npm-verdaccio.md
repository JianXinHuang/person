# window上搭建npm私仓（verdaccio）

## 安装 verdaccio

```shell
npm install -g verdaccio --unsafe-perm
```

## 启动 verdaccio
```shell
verdaccio
```

观察输出, 找到配置文件的路径
```shell
info --- Creating default config file in D:\Users\W9011499\AppData\Roaming\verdaccio\config.yaml
## 这里显示了配置文件的所在目录
warn --- config file  - D:\Users\W9011499\AppData\Roaming\verdaccio\config.yaml
warn --- Plugin successfully loaded: verdaccio-htpasswd
warn --- Plugin successfully loaded: verdaccio-audit
## 这里显示了监听的端口为: 4873, 可通过 http://localhost:4873/ 访问, 后续还需要可以修改配置文件, 让其他人可访问
warn --- http address - http://localhost:4873/ - verdaccio/5.0.4
```

原始配置文件`config.yaml`内容，地址（`C:\Users\Admin\AppData\Roaming\verdaccio`）
```yaml
#
# This is the default config file. It allows all users to do anything,
# so don't use it on production systems.
#
# Look here for more config file examples:
# https://github.com/verdaccio/verdaccio/tree/master/conf
#

# path to a directory with all packages
storage: ./storage
# path to a directory with plugins to include
plugins: ./plugins

web:
  title: Verdaccio
  # comment out to disable gravatar support
  # gravatar: false
  # by default packages are ordercer ascendant (asc|desc)
  # sort_packages: asc
  # convert your UI to the dark side
  # darkMode: true
  # logo: http://somedomain/somelogo.png
  # favicon: http://somedomain/favicon.ico | /path/favicon.ico

# translate your registry, api i18n not available yet
# i18n:
# list of the available translations https://github.com/verdaccio/ui/tree/master/i18n/translations
#   web: en-US

auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    # max_users: 1000

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    #
    # you can specify usernames/groupnames (depending on your auth plugin)
    # and three keywords: "$all", "$anonymous", "$authenticated"
    access: $all

    # allow all known users to publish/publish packages
    # (anyone can register by default, remember?)
    publish: $authenticated
    unpublish: $authenticated

    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: npmjs

# You can specify HTTP/1.1 server keep alive timeout in seconds for incoming connections.
# A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.
# WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enough.
server:
  keepAliveTimeout: 60

middlewares:
  audit:
    enabled: true

# log settings
logs: { type: stdout, format: pretty, level: http }

#experiments:
#  # support for npm token command
#  token: false
#  # support for the new v1 search endpoint, functional by incomplete read more on ticket 1732
#  search: false
#  # disable writing body size to logs, read more on ticket 1912
#  bytesin_off: false

# This affect the web and api (not developed yet)
#i18n:
#web: en-US
```

在配置文件`config.yaml`的末尾添加 `listen: 0.0.0.0:4873`，配置此选项则是允许任何外部的所有IP都可以访问到此服务

修改npm仓库的实际存储位置. 如: `D:/npm-repo`
```yaml
#
# This is the default config file. It allows all users to do anything,
# so don't use it on production systems.
#
# Look here for more config file examples:
# https://github.com/verdaccio/verdaccio/tree/master/conf
#

# path to a directory with all packages
storage: D:/npm-repo
# path to a directory with plugins to include
plugins: ./plugins

web:
  title: Verdaccio
  # comment out to disable gravatar support
  # gravatar: false
  # by default packages are ordercer ascendant (asc|desc)
  # sort_packages: asc
  # convert your UI to the dark side
  # darkMode: true
  # logo: http://somedomain/somelogo.png
  # favicon: http://somedomain/favicon.ico | /path/favicon.ico

# translate your registry, api i18n not available yet
# i18n:
# list of the available translations https://github.com/verdaccio/ui/tree/master/i18n/translations
#   web: en-US

auth:
  htpasswd:
    file: ./htpasswd
    # Maximum amount of users allowed to register, defaults to "+inf".
    # You can set this to -1 to disable registration.
    # max_users: 1000

# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/

packages:
  '@*/*':
    # scoped packages
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

  '**':
    # allow all users (including non-authenticated users) to read and
    # publish all packages
    #
    # you can specify usernames/groupnames (depending on your auth plugin)
    # and three keywords: "$all", "$anonymous", "$authenticated"
    access: $all

    # allow all known users to publish/publish packages
    # (anyone can register by default, remember?)
    publish: $authenticated
    unpublish: $authenticated

    # if package is not available locally, proxy requests to 'npmjs' registry
    proxy: npmjs

# You can specify HTTP/1.1 server keep alive timeout in seconds for incoming connections.
# A value of 0 makes the http server behave similarly to Node.js versions prior to 8.0.0, which did not have a keep-alive timeout.
# WORKAROUND: Through given configuration you can workaround following issue https://github.com/verdaccio/verdaccio/issues/301. Set to 0 in case 60 is not enough.
server:
  keepAliveTimeout: 60

middlewares:
  audit:
    enabled: true

# log settings
logs: { type: stdout, format: pretty, level: http }

#experiments:
#  # support for npm token command
#  token: false
#  # support for the new v1 search endpoint, functional by incomplete read more on ticket 1732
#  search: false
#  # disable writing body size to logs, read more on ticket 1912
#  bytesin_off: false

# This affect the web and api (not developed yet)
#i18n:
#web: en-US
listen: 0.0.0.0:4873
```

## 安装nrm用来管理npm源

安装nrm用来管理npm源，添加和切换很方便，使用`npm install -g nrm`安装

执行`nrm ls`查看有哪些npm源
此时win10环境可能会报错

```shell
internal/validators.js:124
    throw new ERR_INVALID_ARG_TYPE(name, 'string', value);
    ^

[TypeError [ERR_INVALID_ARG_TYPE]: The "path" argument must be of type string. Received undefined
  at validateString (internal/validators.js:124:11)
  at Object.join (path.js:375:7)
  at Object.<anonymous> (D:\Users\W9011499\AppData\Roaming\npm\node_modules\nrm\cli.js:17:20)
  at Module._compile (internal/modules/cjs/loader.js:1063:30)
  at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
  at Module.load (internal/modules/cjs/loader.js:928:32)
  at Function.Module._load (internal/modules/cjs/loader.js:769:14)
  at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12)
  at internal/main/run_main_module.js:17:47
] {
  code: 'ERR_INVALID_ARG_TYPE'
}
```

打开`C:\Users\Administrator\AppData\Roaming\npm\node_modules\nrm\cli.js`(17行左右)
把
```js
// const NRMRC = path.join(process.env.HOME, '.nrmrc');
改成下面这样既可
const NRMRC = path.join(process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'], '.nrmrc');
```

再次执行: `nrm ls`
```shell
* npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
```

由于电脑的Ip是自动获取的，当电脑重启IP有可能会改变，因此最好需要手动设置一个IP，然后使用
`nrm add localnpm http://192.168.1.250:4873`添加到npm源中

```shell
D:\Users\W9011499>nrm add localnpm http://172.17.206.246:4873

    add registry localnpm success
```

然后通过nrm ls来查看有哪些源，带*号的表示目前正在使用的源

```shell
D:\Users\W9011499>nrm ls

* npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
  localnpm --- http://172.17.206.246:4873/
```

通过`nrm use localnpm`来切换源，如下图所示，我们就切换到我们刚刚添加的源了
```shell
D:\Users\W9011499>nrm use localnpm


   Registry has been set to: http://172.17.206.246:4873/

D:\Users\W9011499>nrm ls

  npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
* localnpm --- http://172.17.206.246:4873/
```

## 新建用户

然后通过`npm adduser --registry http://localhost:4873/`来新建一个用户

```shell
D:\Users\W9011499>nrm ls

  npm -------- https://registry.npmjs.org/
  yarn ------- https://registry.yarnpkg.com/
  cnpm ------- http://r.cnpmjs.org/
  taobao ----- https://registry.npm.taobao.org/
  nj --------- https://registry.nodejitsu.com/
  npmMirror -- https://skimdb.npmjs.com/registry/
  edunpm ----- http://registry.enpmjs.org/
* localnpm --- http://172.17.206.246:4873/


Username: pan
Password:
Email: (this IS public) sd40150700@126.com
Logged in as pan on http://172.17.206.246:4873/.
```

## 新建一个项目，并发布
```shell
mkdir testdemo
cd testdemo
npm init
# 创建webpack配置文件
touch webpack.config.js
# 创建src目录
mkdir src
cd src
# 在src目录创建hello.js文件
touch hello.js
cd ..src
# 在项目根目录进行打包
webpack
```

```js
// hello.js
function hello(str){
    alert(str);
}
```

修改`package.json`, 增加`files`配置, 将`src`目录与`dist`目录一同发布到`npm`仓库

```json
{
  "name": "testdemo",
  "version": "1.0.0",
  "description": "",
  "private": false,
  "main": "dist/index.js",
  "files":[
    "dist",
    "src"
  ],
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "webpack": "^5.37.1",
    "webpack-cli": "^4.7.0"
  }
}
```

`npm` 登录: `npm login`

npm发布: `npm publish`

查看已发布的npm资源

`http://localhost:4873`

### 附注

如果本地源没有会向外网去寻找下载，配置外网的npm是找到`config.yaml`配置文件找到`uplinks`，填写上一级`npm`仓库的地址，如下所示：

```yaml
# a list of other known repositories we can talk to
uplinks:
  npmjs:
    url: https://registry.npmjs.org/
```

参考链接：[window上搭建npm私仓（verdaccio）](https://www.jianshu.com/p/b5e68aaad191)