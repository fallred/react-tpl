
const mapStateToProps = state=>state.profile

let store = {
    getState(){
        return {profile:{user:{id:1}}}
    }
}
let state = store.getState();
let props = mapStateToProps(state);
