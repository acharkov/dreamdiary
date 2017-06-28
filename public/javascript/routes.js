import Home from './components/Home.vue';
import Login from './components/Login.vue';
import About from './components/About.vue';
import Dreams from './components/Dreams.vue';

export const routes = [
    { path: '/',      component: Home },
    { path: '/login', component: Login},
    { path: '/about', component: About},
    { path: '/dreams', component: Dreams}
]