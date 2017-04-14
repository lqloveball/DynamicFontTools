// 创建createjs 模块
var _Root, _Stage, _CJSModel;
_CJSModel = ccjs.CCJSModel.Create({
    appendTo: $('#cjsBox')[0],//canvat添加到div中
    width: 500,//宽
    height: 500,//高
    fps: 30//刷新率
});
_Root = _CJSModel.Root;
_Stage = _CJSModel.Stage;

//字体排列容器
var _FontsContainer=new createjs.Container();
_Root.addChild(_FontsContainer);
_FontsContainer.x=_FontsContainer.y=50;

//创建动态字体类
var _FontsModel=new Ds.createjs.CJSLoadFontsModel('./fonts/HYTT/');
_FontsModel.on('loadFontsComplete',LoadFontsComplete);

//需要加载的动态字体加载完成
function LoadFontsComplete(){
  // console.log('loadFontsComplete');
  // console.log(_FontsModel.GetFontData('我'));
  // console.log(_FontsModel.GetFontPathData('测'));
  _InitInfo=_UserSend[0].value;
  _FontsContainer.removeAllChildren();
  var _all=_InitInfo.length;
  for (var i = 0; i < _all; i++) {
    var _info=_InitInfo[i];
    // console.log(_info);
    var _font=_FontsModel.GetShapeFont(_info,'#000000',_FontSize);
    _FontsContainer.addChild(_font);
    _font.x=_FontSize*i;
  }
}
//输入框更新
function ChangeTextShow(){
  _InitInfo=_UserSend[0].value;
  _FontsModel.LoadUserWordFonts(_InitInfo);
}
//
var _InitInfo,_FontSize=20;
var _UserSend=$('#userSend');
_UserSend.on('change',ChangeTextShow);

//默认执行一个更新文本
ChangeTextShow();
