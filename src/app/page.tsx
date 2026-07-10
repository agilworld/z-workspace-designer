import { Header } from "@/components/layout/Header";
import { Layout } from "@/components/layout/Layout";
import { RentCta } from "@/components/layout/RentCta";
import { ProductSidebar } from "@/components/sidebar/ProductSidebar";
import { WorkspaceCanvas } from "@/components/canvas/WorkspaceCanvas";
import { SummaryPanel } from "@/components/summary/SummaryPanel";

export default function Home() {
  return (
    <Layout
      header={<Header />}
      title={
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Design Your Workspace!
          </h1>
          <p className="text-base text-slate-500">
            Create Your Perfect Setup!
          </p>
        </div>
      }
      sidebar={<ProductSidebar />}
      canvas={<WorkspaceCanvas />}
      summary={<SummaryPanel />}
      cta={<RentCta />}
    />
  );
}
