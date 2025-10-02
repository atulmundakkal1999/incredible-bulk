import { ReactNode, useState, useCallback } from "react";
import { Frame, Navigation } from "@shopify/polaris";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HomeIcon,
  OrderIcon,
  ProductIcon,
  ImportIcon,
  ClockIcon,
  SettingsIcon,
  QuestionCircleIcon,
} from "@shopify/polaris-icons";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileNavigationActive, setMobileNavigationActive] = useState(false);

  const toggleMobileNavigationActive = useCallback(
    () =>
      setMobileNavigationActive(
        (mobileNavigationActive) => !mobileNavigationActive
      ),
    []
  );

  const navigationMarkup = (
    <Navigation location={location.pathname}>
      <Navigation.Section
        items={[
          {
            url: "/",
            label: "Dashboard",
            icon: HomeIcon,
            onClick: () => navigate("/"),
            selected: location.pathname === "/",
          },
          {
            url: "/editor",
            label: "Spreadsheet Editor",
            icon: OrderIcon,
            onClick: () => navigate("/editor"),
            selected: location.pathname === "/editor",
          },
          {
            url: "/products",
            label: "Product Browser",
            icon: ProductIcon,
            onClick: () => navigate("/products"),
            selected: location.pathname === "/products",
          },
          {
            url: "/import-export",
            label: "Import/Export",
            icon: ImportIcon,
            onClick: () => navigate("/import-export"),
            selected: location.pathname === "/import-export",
          },
          {
            url: "/history",
            label: "History",
            icon: ClockIcon,
            onClick: () => navigate("/history"),
            selected: location.pathname === "/history",
          },
        ]}
      />
      <Navigation.Section
        items={[
          {
            url: "/settings",
            label: "Settings",
            icon: SettingsIcon,
            onClick: () => navigate("/settings"),
            selected: location.pathname === "/settings",
          },
          {
            url: "/help",
            label: "Help",
            icon: QuestionCircleIcon,
            onClick: () => navigate("/help"),
            selected: location.pathname === "/help",
          },
        ]}
        separator
      />
    </Navigation>
  );

  return (
    <Frame
      navigation={navigationMarkup}
      showMobileNavigation={mobileNavigationActive}
      onNavigationDismiss={toggleMobileNavigationActive}
    >
      {children}
    </Frame>
  );
}
