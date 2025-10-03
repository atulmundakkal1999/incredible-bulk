import { AppProvider } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import SpreadsheetEditor from "./pages/SpreadsheetEditor";
import ProductBrowser from "./pages/ProductBrowser";
import ImportExport from "./pages/ImportExport";
import History from "./pages/History";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import ShopifyCallback from "./pages/ShopifyCallback";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider i18n={{}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          } />
          <Route path="/editor" element={
            <AppLayout>
              <SpreadsheetEditor />
            </AppLayout>
          } />
          <Route path="/products" element={
            <AppLayout>
              <ProductBrowser />
            </AppLayout>
          } />
          <Route path="/import-export" element={
            <AppLayout>
              <ImportExport />
            </AppLayout>
          } />
          <Route path="/history" element={
            <AppLayout>
              <History />
            </AppLayout>
          } />
          <Route path="/settings" element={
            <AppLayout>
              <Settings />
            </AppLayout>
          } />
          <Route path="/help" element={
            <AppLayout>
              <Help />
            </AppLayout>
          } />
          <Route path="/auth/callback" element={<ShopifyCallback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </QueryClientProvider>
);

export default App;