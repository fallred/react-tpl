## mode
打包的模式
开发模式 development 不会压缩代码
生产模式 production  会压缩代码

NODE_ENV=production 设置环境变量
设置完了以后在Node.js代码中可以通过process.env.NODE_ENV获取它的值

window里设置环境变量
set NODE_ENV=development

node
> process.env.NODE_ENV
'development'

MAC里设置环境
export NODE_ENV=development

cross-env 可以实现跨越环境设置变量
内部会判断当前的系统
window set
Mac export

historyApiFallback
因为我们开发的是单页应用，所以只有一个页面 index.html
但是如果我们用的是html5和history api的话，
history.pushStat(null,null,'/a');
路径会变成/a
这个时候如果刷新页面，会向服务器请求/a这个路径
但是我们服务端只有一个页面，无法响应 /a的请求无法返回对应的内容
所以只会返回404，就是页面未找到
把所有的404重新定向到index.html路径中去


##  静态文件
有些时候我们会在项目中使用一些静态的文件
这些文件不需要打包，但是需要能够在打外后的项目中访问

copy
因为静态文件不需要参与打包，所以我们需要手工拷贝到输出目录里
index.html模板里需要手工引入JS脚本，另外脚本的是地址是打包后或者说拷贝的地址

相对路径和绝对路径
/不加/

/表示绝对路径
不加/表示相对路径，就是相对于自己的相对路径


目录结构
源文件放在src目录中
src
src\index.js 打包的和运行的入口文件
src\index.html html的模板文件
src\history.js 创建历史对象文件

src\views指的是我们页面级的组件  Home Cart Profile
src\views\Home\index.js 
Home组件的子组件
src\views\Home\components\HomeHeader\index.js

存放我们公共样式
src\styles\global.less

创建仓库的入口文件
src\store\index.js
动作类型
src\store\action-types.js
状态处理器 home状态分片的处理器
src\store\reducers\home.js

派发动作的动作创建者 
src\store\actionCreators\home.js


老师执行setCurrentCategory函数,在各个组件中的运行传递的顺序不太理解

src\views\Home\index.js
 <button onClick={()=>props.setCurrentCategory('react')}>修改分类</button>

src\store\actionCreators\home.js
```js
setCurrentCategory(currentCategory){
      return {
          type:actionTypes.SET_CURRENT_CATEGORY,
          payload:currentCategory
      }
      store.dispatch({
          type:actionTypes.SET_CURRENT_CATEGORY,
          payload:currentCategory
      });
}
```

src\store\reducers\home.js

```js
const initialState = {
    currentCategory:'all'
}
export default function(state=initialState,action){
    switch(action.type){
        //如果需要设置当前的分类的话
        case actionTypes.SET_CURRENT_CATEGORY:
            //返回一个新的状态对象，用动作中的payload设置或者覆盖分为中的currentCategory
            return {...state,currentCategory:action.payload};
        default:
            return state;
    }
}
```

## React动画
当进入的时候，如何切换状态
1.立刻变成 exited  {opacity:0}
2.立刻又变成 entering {opacity:1}
3.等1秒后又变成了entered {opacity:1}

当离开的时候，如何切换状态
1.先立刻变成entered {opacity:1}
2.再马上变成exiting {opacity:0}
3.1s以后再变成 exited {opacity:0}


automatic auto imports the functions that JSX transpiles to. classic does not automatic import anything.

@babel/preset-react 选项中的 runtime:'automatic'
会自动引入可以编译JSX的函数
 runtime:'classic' 不会引入任何东西

##  跳转路径
- 在路由项目中，如果想跳转路径有几种方式
- Link 跳到哪个路径上去 to
- useNavigate navigate 指定路径
- 


## 如何实现用户登录

首先用户在登录框中输入用户名和密码
输入完成后向服务器发送登录请求，如果服务器验证成功，也就是说登录成功
服务器会返回一个令牌，也就是token.用户中以把此token保存在本地 localStorage
以后当此客户端再请求服务器的时候，就可以携带此token
服务器就知道此客户端登录过了，返回此token对应的用户信息了


-  封装axios src\api\index.js
-  编写请求函数 src\api\profile.js validate
-  编写actionCreators调用此接口 src\store\actionCreators\profile.js
当此对象绑定到组件是这后，调用validate方法就会派发此动作
{
    type:actionTypes.VALIDATE,
    payload:validate()
}
-  redux-promise可以拦截此动作，等待promise validate()完成
完成后会再次派发动作
{
    type:actionTypes.VALIDATE,
    payload:AxiosError
}
交给仓库里的reducer进行处理 src\store\reducers\profile.js




TypeError: Failed to execute 'createObjectURL' on 'URL': 
Overload resolution failed.

maxCount={1} 最大上传图片的数量 
accept="images/jpg,images/jpeg,images/gif,images/png"  可以上传的图片的类型
imageFit='fit' 图像的填充方式 contain fit scale-down
value={fileList} 图片的内容，是一个图像的url地址的数组
upload={uploadImage} 上传头像的方法
onDelete={()=>setFileList([])} 当点击删除按钮的时候执行此函数进行删除，
beforeUpload={beforeUpload} 在上传头像前执行一些校验，如果通过了则返回file继续上传，如果失败了则提一下错误，终止上传

开发一个新的组件套路
1.定义保存在仓库中的数据结构
src\store\reducers\home.js
lessons:{
        list:[],//保存课程列表信息
        offset:0,//下一次加载从哪个索引开始加载
        limit:5,//第次加载多少条
        hasMore:true,//是否后面还有更多的数据,加载完成就是false,没加载就是true
        loading:false//当前是否正在加载数据中
    }

2.定义获取数据的接口
src\api\home.js
export function getLessons(currentCategory='all',offset,limit){}

3.定义获取数据的接口和方法
src\store\actionCreators\home.js
 getLessons(){}
   let result = await getLessons(currentCategory,offset,limit);
                //派发SET_LESSONS动作，把得到到课程列表数据保存到仓库中 {hasMore,list}
                dispatch({type:actionTypes.SET_LESSONS,payload:result.data});

4. 在组件里调用
function Home(props){
     lessons,getLessons} = props;
     }
     <LessonList
              lessons={lessons}
              getLessons={getLessons}
            />
5.在课程列表组件是读取和请求数据
 if(lessons.list.length === 0){
      getLessons();
    }
        {
          lessons.list.map((lesson)=>(）         


##  使用本地接口
因为网络存在波动，可能不稳定 ，所以开发的时候可以使用本地服务器，本地接口

1.安装mongodb服务器
https://www.mongodb.com/try/download/community
下载 window或者mac服务器
2.下载代码
https://gitee.com/zhang_renyang/zhufengreactsystem/tree/master/react-tpl/reference/api
后端服务器代码
下载到一个目录中，然后执行npm install安装环境

npm start启动  http://localhost:9898

回到前台代码中
src\api\index.js
把基准路径改为本地接口地址
axios.defaults.baseURL = 'http://localhost:9898';


### 项目优化
- 路由懒加载
- immer 不可变数据
- 数据持久化

原来写的有问题
一种是写法的代码
一种是运行性能的问题

因为 redux是有规定，更改的时候一定要返回一个新的引用地址，不能直接修改老的对象
是为实现性能优化PureComponent shouldComponentUpdate React.memo();
在更新的时候，会获取新属性或对象的值，然后和老的值进行对比，如果一样的，就不更新
shallowEqual(); 
## immer



redux-persist 是一个用于在redux中存储持久化部分或全部状态的库
当你刷新页面的时候或者重新的加载应用的时候，可以帮你保持状态
它的机制是将状态保存在本地存储中localStorage,并在应用初化的时候恢复这些状态
