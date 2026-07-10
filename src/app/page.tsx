import { Header } from "@/components/layout/Header";
import { Layout } from "@/components/layout/Layout";
import { ProductSidebar } from "@/components/sidebar/ProductSidebar";
import { WorkspaceCanvas } from "@/components/canvas/WorkspaceCanvas";
import { SummaryPanel } from "@/components/summary/SummaryPanel";

export default function Home() {
  return (
    <>
      <Header />
      <Layout>
        <ProductSidebar />
        <WorkspaceCanvas />
        <SummaryPanel />
      </Layout>
    </>
  );
}
