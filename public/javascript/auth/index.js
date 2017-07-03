const LOGIN_URL = 'http://localhost:3000/signin';

export default {
    user: {
        authenticated: false
    },

    setAuthState(authState, token) {
        if (authState === true) {
            //signin
            if (token) {
                localStorage.setItem('id_token', token)
            }
        }
        else {
            localStorage.removeItem('id_token')
        }
        console.log('user state moved: ' + this.user.authenticated + '->' + authState)
        this.user.authenticated = authState
    },

    checkAuth() {
        var jwt = localStorage.getItem('id_token')
        if (jwt) {
            this.user.authenticated = true
        }
        else {
            this.user.authenticated = false
        }
    },

    getAuthHeader() {
        return localStorage.getItem('id_token')
    }
}