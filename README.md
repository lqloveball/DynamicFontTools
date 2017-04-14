动态字体输出工具
====
环境需求：node 6.0以上 

目录结构说明

```
build/                          //工作目录
|
|-----gulpfile.js               //gulp配置
|--source/                      //导出字体的源文件目录
|--bin/                         //导出字体资源目录
|
example/                        //使用例子目录
node_modules/                   //node模块
package.json                    //node模块packge.json配置
```

---

命令行执行导出
==
在build目录下执行对应的导出命令

- 导出SVG

gulp SVGOutput --font 汉仪跳跳体简.ttf

- 导出路径描述Txt

gulp ExportOriginalPath --font 汉仪跳跳体简.ttf