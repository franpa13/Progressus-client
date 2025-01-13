import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components";
import App from "./App";
import { TbRulerMeasure } from "react-icons/tb";
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
  ShopAdmin,
  Metrics,
  CartPage,
  Benefits,
  NutritionPlans,
 Food
} from "./pages";
import { ProductPage } from "./pages/shopSocio/ProductPage";
import { Attendance } from "./pages/attendance/Attendance";
import { HomePlans } from "./pages/plans/HomePlans";
import { Users } from "./pages/usuarios/Users";
import { AddExercises } from "./pages/plans/createPlans/addExercises/AddExercises";
import { ViewPlan } from "./pages/plans/createPlans/viewPlan/ViewPlan";
import { Checkout } from "./pages/checkout/Checkout";


//RUTAS PROTEGIDAS
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",

    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "ENTRENADOR", "SOCIO", "NUTRICIONISTA"]}>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/account",

    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "ENTRENADOR", "SOCIO", "NUTRICIONISTA"]}>
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
        <CartPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shopAdmin",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN"]}>
        <ShopAdmin />
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
    path: "/metrics",
    element: (
      <ProtectedRoute allowedRoles={["SOCIO"]}>
        <Metrics />
      </ProtectedRoute>
    ),
  },
  {
    path: "/benefits",
    element: (
      <ProtectedRoute allowedRoles={["SOCIO"]}>
        <Benefits />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shopsocio/cart/checkout",
    element: (
      <ProtectedRoute allowedRoles={["SOCIO"]}>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/notifications",
    element: (
      <ProtectedRoute allowedRoles={["ADMIN", "SOCIO", "ENTRENADOR", "NUTRICIONISTA"]}>
        <Notifications />
      </ProtectedRoute>
    ),
  },
  // NUTRICIONISTA
  {
    path: "/nutritionalplans",
    element: (
      <ProtectedRoute allowedRoles={["NUTRICIONISTA"]}>
        <NutritionPlans />
      </ProtectedRoute>
    ),
  },
  {
    path: "/food",
    element: (
      <ProtectedRoute allowedRoles={["NUTRICIONISTA"]}>
        <Food />
      </ProtectedRoute>
    ),
  },
])