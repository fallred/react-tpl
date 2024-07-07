import { connect } from 'react-redux';
import { increment, decrement } from './store';
function Counter(props){
	return <div>
		<p>{props.number}</p>
		<button onClick={()=>props.dispatch(increment())}>+</button>
		<button onClick={()=>props.dispatch(decrement())}>-</button>
	</div>
}
export default  connect(state=>({number:state}))(Counter);