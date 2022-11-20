let timer;

export default {
  async login(context, payload) {
    context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC5KZqZYvEudh7m0tUSjrCxHtPYmx8YQR4";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC5KZqZYvEudh7m0tUSjrCxHtPYmx8YQR4";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || "failed to authenticate. Check your login data."
      );
      throw error;
    }
    const expiresIn = +responseData.expiresIn *1000;
    const expirationDate = new Date().getTime()+expiresIn;
    timer = setTimeout(function(){
        context.dispatch('autoLogout');
    },expiresIn)

    localStorage.setItem('token',responseData.idToken)
    localStorage.setItem('userId',responseData.userId)
    localStorage.setItem('tokenExpiration',expirationDate)
    localStorage.setItem('email',responseData.email)
    context.commit("setUser", {
      token: responseData.idToken,
      userId: responseData.localId,
      email: responseData.email,
    });
  },
  tryLogin(context){
    const token =localStorage.getItem('token');
    const userId =localStorage.getItem('userId');
    const email = localStorage.getItem('email');
    const tokenExpiration=localStorage.getItem('tokenExpiration');
    const expiresIn=+tokenExpiration - new Date().getTime();
    if(expiresIn < 10000){
        return;
    }
    timer = setTimeout(function(){
        context.dispatch('autoLogout');
    },expiresIn)
    if(token && userId){
        context.commit('setUser',{
            token:token,
            userId : userId,
            email:email
        })
    }
  },
  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('tokenExpiration');
    clearTimeout(timer);
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
  autoLogout(context){
    context.commit('setAutoLogout');
    context.dispatch('logout');
    
  }
};
