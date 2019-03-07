import React from "react";

export const Users = React.lazy(() => import("@/pages/users"));

export const Dashboard = React.lazy(() => import("@/pages/dashboard"));

export const Goods = React.lazy(() => import("@/pages/goods"));
