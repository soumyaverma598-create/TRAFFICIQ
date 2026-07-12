import {
  LayoutDashboard,
  Activity,
  BarChart3,
  FileText,
  Settings,
} from "lucide-react";

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
