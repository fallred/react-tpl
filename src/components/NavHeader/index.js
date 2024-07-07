import {LeftOutlined} from '@ant-design/icons';
import './index.less'
import { goBack } from "redux-first-history";
import {connect} from 'react-redux';
function NavHeader(props){
    //LeftOutlined左箭头  props.children组件的儿子
    //goBack方法执行后会返回一个action,用来返回路径
    return (
        <div className='nav-header'>
            <LeftOutlined onClick={()=>props.dispatch(goBack())}/>
            {props.children}
        </div>
    )
}
//connect第1个参数必须传递，
//第2个参数可以不传，如果不传的话，会把dispatch作为组件的属性传进来
//state 有 home cart profile router
export default connect(
    state=>state
)(NavHeader);
//如果classic JSX会被 编译成React.createElement()
//就需要你在当前的模块中自己手工引入React

//如果配置的 runtime:'automatic'
//import jsx from 'jsx';
//jsx()