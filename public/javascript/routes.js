import Home from './components/Home.vue';
import Signin from './components/Signin.vue';
import Signup from './components/Signup.vue';
import About from './components/About.vue';
import Dreams from './components/Dreams.vue';

export const routes = [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/about', component: About },
    { path: '/dreams', component: Dreams },
    { path: '/signup', component: Signup },
]