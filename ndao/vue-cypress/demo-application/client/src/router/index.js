import { createRouter, createWebHistory } from 'vue-router'
import { Dashboard, ListEvents, CreateEvent, EventDetails } from '../views'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Dashboard
  },
  {
    path: '/list-events',
    name: 'List Events',
    component: ListEvents
  },
  {
    path: '/create-event',
    name: 'Create Event',
    component: CreateEvent
  },
  {
    path: '/event/:id',
    name: 'Event Details',
    component: EventDetails
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
