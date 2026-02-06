import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import RootLayout from './routes/RootLayout';
import HomePage from './routes/HomePage';
import ProjectsPage, { loader as projectsLoader } from './routes/ProjectsPage';
import ProjectDetailsPage, { loader as detailLoader, action as detailAction } from './routes/ProjectDetailsPage';
import NewProjectPage, { action as newProjectAction } from './routes/NewProjectPage';
import NewTaskPage, { action as newTaskAction } from './routes/NewTaskPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'projects', element: <ProjectsPage />, loader: projectsLoader },
      { path: 'projects/new', element: <NewProjectPage />, action: newProjectAction },
      { path: 'projects/:projectId', element: <ProjectDetailsPage />, loader: detailLoader, action: detailAction },
      { path: 'projects/:projectId/new-task', element: <NewTaskPage />, action: newTaskAction },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><RouterProvider router={router} /></React.StrictMode>
);