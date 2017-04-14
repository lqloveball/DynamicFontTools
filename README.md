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
- 导出字体绘制路径描述文件 (Ds.createjs.CJSLoadFontsModel 动态字体基于这个输出)


```
gulp ExportOriginalPath --font 自定义字体.ttf
```


- 导出SVG


```
gulp SVGOutput --font 自定义字体.ttf
```


- 导出SVG路径Txt


```
gulp ExportAnalysisPath --font 自定义字体.ttf
```


