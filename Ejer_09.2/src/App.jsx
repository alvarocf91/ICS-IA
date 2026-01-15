import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import RootLayout from "./layouts/RootLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";

// Páginas
import HomePage from "./pages/HomePage.jsx";
import TaskListPage from "./pages/TaskListPage.jsx";
import TaskDetailPage from "./pages/TaskDetailPage.jsx";
import NewTaskPage from "./pages/NewTaskPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
const ProfilePage = lazy(() => import("./pages/ProfilePage.jsx"));

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "dashboard/*",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <TaskListPage /> },
          { path: "new", element: <NewTaskPage /> },
          { path: "task/:taskId", element: <TaskDetailPage /> },
        ],
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<p>Cargando...</p>}>
            <ProfilePage />
          </Suspense>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return (
    <Suspense fallback={<p>Cargando...</p>}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
