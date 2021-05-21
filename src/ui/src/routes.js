import VueRouter from "vue-router";
import LobbyPage from './components/pages/Lobby.vue'
import RoomPage from './components/pages/Room.vue'

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
    { path: "/", component: LobbyPage },
    { path: "/:roomId", component: RoomPage },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
export default new VueRouter({
    routes,
    mode: 'history'
});
