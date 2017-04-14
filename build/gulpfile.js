var gulp = require('gulp');
var fs = require('fs');
var Fontmin = require('fontmin');
var fontCarrier = require('font-carrier');
/**
	选择一个ttf 输出导出所有字体的svg
	1、执行命令 导出代码中默认的字体
	gulp SVGOutput --font 汉仪跳跳体简.ttf
**/

gulp.task('SVGOutput', function() {
    var sourcePath = './source/'; // 字体源文件
    var binPath = './bin/'; // 需要输出的字体svg地址
    var font, ttfName;
    // console.log(gulp.env)
    //没参数不执行
    if (gulp.env.font) {
        //有指定字体原文件
        font = gulp.env.font;
        ttfName = font.slice(0, font.lastIndexOf('.'));
    } else {
        console.warn('没有输入导出的字体');
        return;
    }
    //字体路径
    var fontPath = sourcePath + font;
    //准备开始解析字体
    var transFont = fontCarrier.transfer(fontPath);
    //创建导出目录
    if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
    binPath = binPath + ttfName + '/';
    if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
    binPath = binPath + '/svg/';
    if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
    /*
    //transFont.allGlyph是所有的字体字形
    '&#x24;':
       { options:
          { unicode: '&#x24;',
            glyphName: 'uni24',
            d: 'M304 375Q343 361 375.50 345.50Q408 330 432 309Q456 288 469 260Q482 232 482 193Q482 145 464 107Q446 69 414 42Q382 15 336.50 0.50Q291-14 236-14L224-84L204-84L216-13Q157-9 108.50 16.50Q60 42 37 79L53 92Q72 62 115.50 36.50Q159 11 220 6L282 360Q248 372 218.50 385Q189 398 167 416.50Q145 435 132.50 461.50Q120 488 120 526Q120 574 140 610Q160 646 192.50 670.50Q225 695 265 708Q305 721 345 723L357 792L377 792L365 723Q433 721 479.50 697Q526 673 547 639L531 625Q513 659 465.50 680.50Q418 702 361 703L304 375M240 5Q288 5 328.50 17.50Q369 30 398.50 54Q428 78 444.50 112.50Q461 147 461 192Q461 226 449 251Q437 276 415.50 294.50Q394 313 364.50 327Q335 341 301 353L240 5M341 703Q308 701 273 690Q238 679 209 657.50Q180 636 161 604Q142 572 142 527Q142 494 152 471Q162 448 181 432Q200 416 226.50 404.50Q253 393 285 381L341 703Z',
            horizAdvX: 560,
            vertAdvY: 1000,
            name: 'dollar' },
            __font: { __glyphs: [Circular], __fontface: [Object], options: [Object] }
        }
    */
    var allGlyph = transFont.allGlyph();
    var glyphs = [];
    var list = '';
    for (var index in allGlyph) {
        var glyph = allGlyph[index];
        glyphs.push(glyph);
        var unicode = glyph.options.glyphName;
        unicode = Number('0x' + unicode.slice(3)) + '';
        list += unicode + ';';
        //设置输出路径
        var svgPath = binPath + unicode + '.svg';
        glyph.toSvg(svgPath, {
            path: svgPath
        });
    }
    // fs.writeFileSync(path+ttfName+'.txt',list,'utf-8');
    console.log('SVGOutput 输出所有字体svg完成');
});

/*
进行分析导出字体的路径描述文件

命令行参考:
gulp ExportAnalysisPath --font 汉仪跳跳体简.ttf

执行结果:
./bin/[字体名称]/....txt   	所有包含的字型列表
*/
gulp.task('ExportAnalysisPath', function() {
    var sourcePath = './source/'; // 字体源文件
    var binPath = './bin/'; // 需要输出的字体svg地址
    var font, ttfName;
    // console.log(gulp.env)
    //没参数不执行
    if (gulp.env.font) {
        //有指定字体原文件
        font = gulp.env.font;
        ttfName = font.slice(0, font.lastIndexOf('.'));
    } else {
        console.warn('没有输入导出的字体');
        return;
    }
    //字体路径
    var fontPath = sourcePath + font;
    //准备开始解析字体
    var transFont = fontCarrier.transfer(fontPath);
    //创建导出目录
    if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
    binPath = binPath + ttfName + '/';
    if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
    binPath = binPath + '/txt/';
    if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
    /*
    //transFont.allGlyph  是所有的字体字形
    '&#x24;':
       { options:
          { unicode: '&#x24;',
            glyphName: 'uni24',
            d: 'M304 375Q343 361 375.50 345.50Q408 330 432 309Q456 288 469 260Q482 232 482 193Q482 145 464 107Q446 69 414 42Q382 15 336.50 0.50Q291-14 236-14L224-84L204-84L216-13Q157-9 108.50 16.50Q60 42 37 79L53 92Q72 62 115.50 36.50Q159 11 220 6L282 360Q248 372 218.50 385Q189 398 167 416.50Q145 435 132.50 461.50Q120 488 120 526Q120 574 140 610Q160 646 192.50 670.50Q225 695 265 708Q305 721 345 723L357 792L377 792L365 723Q433 721 479.50 697Q526 673 547 639L531 625Q513 659 465.50 680.50Q418 702 361 703L304 375M240 5Q288 5 328.50 17.50Q369 30 398.50 54Q428 78 444.50 112.50Q461 147 461 192Q461 226 449 251Q437 276 415.50 294.50Q394 313 364.50 327Q335 341 301 353L240 5M341 703Q308 701 273 690Q238 679 209 657.50Q180 636 161 604Q142 572 142 527Q142 494 152 471Q162 448 181 432Q200 416 226.50 404.50Q253 393 285 381L341 703Z',
            horizAdvX: 560,
            vertAdvY: 1000,
            name: 'dollar' },
            __font: { __glyphs: [Circular], __fontface: [Object], options: [Object] }
        }
    */
    var allGlyph = transFont.allGlyph();
    var glyphs = [];
    var list = '';
    for (var index in allGlyph) {
        list += index;
        var glyph = allGlyph[index];
        glyphs.push(glyph);
        var unicode = glyph.options.glyphName;
        unicode = Number('0x' + unicode.slice(3)) + '';
        list += unicode + ';';
        //设置输出路径
        var svgPath = binPath + unicode + '.txt';
        /*
         这个是我修改添加了font-carrier里面的方法，在node_modules/font-carrier/lib/class/glyph.js内
         获取一个分析过后的路径数据
        */
        glyph.toAnalysisPath(svgPath, {
            path: svgPath,
						width:100,
						height:100,
        });

    }
    //fs.writeFileSync(outPath + ttfName + '.txt', list, 'utf-8');
    console.log('ExportAnalysisPath  输出所有字体路径描述txt完成');
});

/*
进行分析导出字体的路径描述文件

命令行参考:
gulp ExportOriginalPath --font 汉仪跳跳体简.ttf

执行结果:
./bin/[字体名称]/....txt   	所有包含的字型列表
*/
gulp.task('ExportOriginalPath', function() {
    var sourcePath = './source/'; // 字体源文件
    var binPath = './bin/'; // 需要输出的字体svg地址
    var font, ttfName;
    // console.log(gulp.env)
    //没参数不执行
    if (gulp.env.font) {
        //有指定字体原文件
        font = gulp.env.font;
        ttfName = font.slice(0, font.lastIndexOf('.'));
    } else {
        console.warn('没有输入导出的字体');
        return;
    }
    //字体路径
    var fontPath = sourcePath + font;
    //准备开始解析字体
    var transFont = fontCarrier.transfer(fontPath);
    //创建导出目录
    if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
    binPath = binPath + ttfName + '/';
    if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
    binPath = binPath + '/otxt/';
    if (!fs.existsSync(binPath)) fs.mkdirSync(binPath);
    /*
    //transFont.allGlyph  是所有的字体字形
    '&#x24;':
       { options:
          { unicode: '&#x24;',
            glyphName: 'uni24',
            d: 'M304 375Q343 361 375.50 345.50Q408 330 432 309Q456 288 469 260Q482 232 482 193Q482 145 464 107Q446 69 414 42Q382 15 336.50 0.50Q291-14 236-14L224-84L204-84L216-13Q157-9 108.50 16.50Q60 42 37 79L53 92Q72 62 115.50 36.50Q159 11 220 6L282 360Q248 372 218.50 385Q189 398 167 416.50Q145 435 132.50 461.50Q120 488 120 526Q120 574 140 610Q160 646 192.50 670.50Q225 695 265 708Q305 721 345 723L357 792L377 792L365 723Q433 721 479.50 697Q526 673 547 639L531 625Q513 659 465.50 680.50Q418 702 361 703L304 375M240 5Q288 5 328.50 17.50Q369 30 398.50 54Q428 78 444.50 112.50Q461 147 461 192Q461 226 449 251Q437 276 415.50 294.50Q394 313 364.50 327Q335 341 301 353L240 5M341 703Q308 701 273 690Q238 679 209 657.50Q180 636 161 604Q142 572 142 527Q142 494 152 471Q162 448 181 432Q200 416 226.50 404.50Q253 393 285 381L341 703Z',
            horizAdvX: 560,
            vertAdvY: 1000,
            name: 'dollar' },
            __font: { __glyphs: [Circular], __fontface: [Object], options: [Object] }
        }
    */
    var allGlyph = transFont.allGlyph();
    var glyphs = [];
    var list = '';
    for (var index in allGlyph) {
        list += index;
        var glyph = allGlyph[index];
        glyphs.push(glyph);
        var unicode = glyph.options.glyphName;
        unicode = Number('0x' + unicode.slice(3)) + '';
        list += unicode + ';';
        //设置输出路径
        var svgPath = binPath + unicode + '.txt';
        /*
         这个是我修改添加了font-carrier里面的方法，在node_modules/font-carrier/lib/class/glyph.js内
         获取一个分析过后的路径数据
        */
        glyph.toOriginalPath(svgPath, {
            path: svgPath
        });

    }
    //fs.writeFileSync(outPath + ttfName + '.txt', list, 'utf-8');
    console.log('ExportOriginalPath  输出所有字体路径描述txt完成');
});
