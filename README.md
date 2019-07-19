# 会动的简历模板(抠脚版)

## 来源

启发于方应杭大佬的[一个会动的简历](https://github.com/jirengu-inc/animating-resume)以及黄轶大佬的 [Github](https://github.com/ustbhuangyi/resume) .

也应运于我此时最迫切的求职需求而生.

## 预览
预览地址: [点击这里](http://www.iiamego.com/resume)

![avatar](http://cdn.iiamego.com/resume.png)



## 使用

### 修改 resume.md

将 src/doc 路径下文件 resume.md 内容替换为个人简历内容(.md)即可

### 样式修改 style.css/styleMobile.css

进入 src/components/resume 文件夹路径下修改 style.css/styleMobile.css 即可

**ps: css文件中样式名要与元素匹配才能生效!!!**



## 原理解析

1. 代码输入展示

   通过 `raw-loader` 将 css/md 文件转换为字符串,然后利用 v-html 绑定变量,递归调用展示函数(`setTimeout`已改为`requestAnimationFrame`),更新变量对字符串的累加实现代码逐渐输入动画效果.

2. 代码输入和效果同步生效

   通过 <style> 标签同步将 css 代码插入页面

   ```javascript
   <div class="styleEditor" ref="container">
   	<div class="code" v-html="codeInStyleTag"></div>
       <pre class="" v-html="highlightCode"></pre>
   </div>
   
   computed: {
   	codeInStyleTag: function() {
       	return `<style>${this.code}</style>`;
       }
   }
   ```

3. 代码高亮

   通过 Prismjs 将字符串 html 转为被包裹标签的 html,然后添加 <style>

   ```css
   /* 代码高亮 */
   .token.selector { color: rgb(133,153,0); }
   .token.property { color: rgb(187,137,0); }
   .token.punctuation { color: yellow; }
   .token.function { color: rgb(42,161,152); }
   ```

4. .markdown 格式转换为 html

   通过 marked 将 .md 格式转换为 html 输出

5. 暂停和跳过的实现

   在 Resume.vue 中声明两个变量 `isPaused` 和 `isSkipped`

   暂停: 递归调用展示函数中写一个 `do while`, 当 `isPaused` 为 `true` 时,一直 delay

   ```javascript
   // 暂停
   do {
   	await Promise.delay(interval);
   } while (this.isPaused && !this.isSkipped)
   ```

   跳过: 递归调用展示函数中当 `isSkipped` 为 `true` 时, `reject` 出去一个 `new Error('SKIP IT')`,在总流程控制函数 `startAnimation` 中 `try catch` 到该错误则执行 `skipAnimation` 函数. 

   `skipAnimation` 函数一次性将所有字符串更新变量,流程函数调用

   ```javascript
   // 开始简历展示流程
   startAnimation: async function() {
   	try {
       	await this.progressivelyShowStyle(0);
       	...
       } catch (e) {
           if (e.message === 'SKIP IT') {
           	this.skipAnimation();
           }
       }
   },
   
   // 展示函数
   progressivelyShowStyle(n) {
   	return new Promise((resolve, reject) => {
   		...
           // 跳过动画
           if (this.isSkipped) {
               return reject(new Error('SKIP IT'));
           }
           ...
       });
   }
   ```

   

## 项目相关命令

依赖安装 Project setup

```
yarn install
```

本地预览(编译/热更新) Compiles and hot-reloads for development
```
yarn run serve
```

项目打包生产 Compiles and minifies for production
```
yarn run build
```

运行测试用例 Run your tests
```
yarn run test
```

运行代码检查 Lints and fixes files
```
yarn run lint
```

运行单元测试 Run your unit tests
```
yarn run test:unit
```

自定义配置 Customize configuration
查看官方文档[[Configuration Reference](https://cli.vuejs.org/config/)].