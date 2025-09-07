const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "about", component: () => import("pages/OigriPage.vue") },
      { path: "likovi", component: () => import("pages/LikoviPage.vue") },
      { path: "onama", component: () => import("pages/ONamaPage.vue") },
      { path: "notes", component: () => import("pages/DeveloperNotesPage.vue") },
      { path: "kontakti", component: () => import("pages/KontaktiPage.vue") },
      { path: "community", component: () => import("pages/CommunityPage.vue") },
      { path: "download", component: () => import("pages/DownloadPage.vue") },
      { path: "login", component: () => import("pages/LoginPage.vue") },
      { path: "register", component: () => import("pages/RegisterPage.vue") },
      {
        path: "admin",
        component: () => import("pages/AdminPage.vue"),
        meta: { requiresAdmin: true },
      },
      { path: "logout", component: () => import("pages/LogoutPage.vue") },
      { path: "trgovina", component: () => import("pages/TrgovinaPage.vue") },
    ],
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;