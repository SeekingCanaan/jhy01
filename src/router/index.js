import Vue from 'vue'
import VueRouter from 'vue-router'
import ListArticle from "@/views/ListArticle";
import CreateArticle from "@/views/CreateArticle";
import EditArticle from "@/views/EditArticle";
import register from "@/views/register";
import firstPage from "@/views/firstPage";
import login from "@/views/login";
import menu from "@/views/menu";
import fu from "@/components/fu";


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/login'
  },
  {
    path: '/articles/index',
    name: 'list-article',
    component: ListArticle
  },
  {
    path: '/articles/create',
    name: 'create-article',
    component: CreateArticle
  },
  {
    path: '/articles/:id/edit',
    name: 'edit-articles',
    component: EditArticle
  },
  {
    path: '/register',
    name: '注册',
    component: register
  },
  {
    path: '/firstPage',
    name: '',
    component: firstPage
  },
  {
    path: '/login',
    name: '',
    component: login
  },
  {
    path: '/menu1',
    name: '',
    component: menu
  },
  {
    path: '/fu',
    component: fu
  }
]

const router = new VueRouter({
  routes
})

export default router
