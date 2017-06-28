const LOGIN_URL = 'http://localhost:3000/login';

export default {
    user: {
        authenticated: false
    },

    login(context, creds, cb) {
        context.$http.post(LOGIN_URL, creds).then(response => {
            console.log("login successfull");

            this.user.authenticated = true
            cb()
        }).then(err => {
            context.error = err
        })
    },

    updateAuth() {
        this.user.authenticated = true
    }
}