import { Header } from "@/components/layout/Header";
import { Layout } from "@/components/layout/Layout";
import { WorkspaceArea } from "@/components/workspace/WorkspaceArea";
import { ProductScroller } from "@/components/workspace/ProductScroller";
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
      workspace={<WorkspaceArea />}
      summary={<SummaryPanel />}
      scroller={<ProductScroller />}
    />
  );
}
