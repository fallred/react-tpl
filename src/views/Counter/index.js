import React from 'react';
import {connect} from 'react-redux';
import './index.less'
class Counter extends React.Component{
    render(){
        console.log('this.props',this.props)
        return (
            <div className='counter'>
                <p>{this.props.number}</p>
                <button onClick={()=>this.props.dispatch({type:'ADD'})}>+</button>
            </div>
        )
    }
}
export default connect(
    state=>state.counter
)(Counter);