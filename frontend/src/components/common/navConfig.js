import {
  LayoutDashboard,
  Activity,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

/**
 * Single source of truth for primary navigation.
 * Add new destinations here — Sidebar renders this list directly,
 * so no JSX changes are needed elsewhere.
 */
export const navItems = [
  {
    label: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    label: "Predictions",
    path: "/predictions",
    icon: Activity,
  },
  {
    label: "Analytics",
    path: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Reports",
    path: "/reports",
    icon: FileText,
  },
  {
    label: "Settings",
    path: "/settings",
    icon: Settings,
  },
];
