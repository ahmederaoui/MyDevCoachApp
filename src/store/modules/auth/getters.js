export default {
    userId(state){
        return state.userId
    },
    token(state){
        return state.token;
    },
    isAuthenticated(state){
        return !!state.token;
    },
    autoLogout(state){
        return state.autoLogout
    },
    getEmail(state){
        const email = state.email.split('@');
        console.log(email[0])
        return email[0];
    }
}