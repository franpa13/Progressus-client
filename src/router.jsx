import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components";
import App from "./App";
import {
  Profile,
  HomePage,
  MemberShip,
  Plans,
  Turns,
  Inventary,
  Stats,
  Notifications,
  MyPlans,
  CreateallExercise,
  Exercices,
  Contability,
  ShopSocio,
} from "./pages";
import { ProductPage } from "./pages/shopSocio/ProductPage";
import { Attendance } from "./pages/attendance/Attendance";
import { HomePlans } from "./pages/plans/HomePlans";
import { Users } from "./pages/usuarios/Users";
import { AddExercises } from "./pages/plans/createPlans/addExercises/AddExercises";
import { ViewPlan } from "./pages/plans/createPlans/viewPlan/ViewPlan";
import { CartPage } from "./pages/shopSocio/cartPage";
//RUTAS PROTEGIDAS
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",

    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "ENTRENADOR", "SOCIO"]}>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account",

    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "ENTRENADOR", "SOCIO"]}>
        <Profile />
      </ProtectedRoute>
    ),
  },
  // ROUTES PLANS
  {
    path: "/plans",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR", "SOCIO"]}>
        <Plans />
      </ProtectedRoute>
    ),
  },

  {
    path: "/plans/viewPlan",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR", "SOCIO"]}>
        <ViewPlan />
      </ProtectedRoute>
    ),
  },

  {
    path: "/plans/addExercices",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR"]}>
        <AddExercises />
      </ProtectedRoute>
    ),
  },

  {
    path: "/plans/createPlans/",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR"]}>
        <Plans />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans/createPlans/myPlans",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR", "SOCIO"]}>
        <MyPlans />
      </ProtectedRoute>
    ),
  },
  {
    path: "/plans/createallExercise",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR"]}>
        <CreateallExercise />
      </ProtectedRoute>
    ),
  },
  ////////////////////////////////////////////////////
  {
    path: "/attendance",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Attendance />
      </ProtectedRoute>
    ),
  },
  {
    path: "/membership",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "SOCIO"]}>
        <MemberShip />
      </ProtectedRoute>
    ),
  },
  {
    path: "/turns",
    element: (
      <ProtectedRoute allowedRoles={["SOCIO"]}>
        <Turns />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventary",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Inventary />
      </ProtectedRoute>
    ),
  },
  {
    path: "/stats",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "ENTRENADOR"]}>
        <Stats />
      </ProtectedRoute>
    ),
  },
  {
    path: "/exercices",
    element: (
      <ProtectedRoute allowedRoles={["ENTRENADOR"]}>
        <Exercices />
      </ProtectedRoute>
    ),
  },
  {
    path: "/contability",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Contability />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shopsocio",
    element: (
      <ProtectedRoute allowedRoles={["SOCIO"]}>
        <ShopSocio />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shopsocio/product/:id",
    element: (
      <ProtectedRoute allowedRoles={["SOCIO"]}>
        <ProductPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shopsocio/cart",
    element: (
      <ProtectedRoute allowedRoles={["SOCIO"]}>
        < CartPage/>
      </ProtectedRoute>
    ),
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <Users />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "SOCIO", "ENTRENADOR"]}>
        <Notifications />
      </ProtectedRoute>
    ),
  },
]);
