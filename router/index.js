import Vue from 'vue';
import VueRouter from 'vue-router';

import Shows from '@/components/Shows.vue';
import Edit from '@/components/Shows/Edit.vue'
import Details from '@/components/Shows/Details.vue';
import NotFound from '@/components/NotFound.vue'

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/', 
      component: Shows,
      name: 'shows'
    },
    {
      path: '/shows/:id',
      component: Details
    },
    {
      path: '/shows/:id/edit',
      component: Edit,
      props: true
    },
    {
      path: '*',
      component: NotFound
    }
  ]
})