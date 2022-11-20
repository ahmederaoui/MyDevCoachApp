export default{
    setUser(state,payload){
        state.token = payload.token;
        state.userId=payload.userId;
        state.email = payload.email;
    },
    setAutoLogout(state){
        state.autoLogout = true
    }
}