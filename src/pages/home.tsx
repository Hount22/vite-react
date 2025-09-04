import { useState } from "react";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import TransactionTable from "@/components/transaction-table";
import BudgetView from "@/components/budget-view";
import ReportsView from "@/components/reports-view";
import GoalsView from "@/components/goals-view";
import TransactionModal from "@/components/transaction-modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQuery } from "@tanstack/react-query";
import { useCategories } from "@/hooks/use-categories";

// This interface should ideally be in a shared types file
interface SummaryData {
  balance: number;
  totalIncome: number;
  totalExpenses: number;
  categoryBreakdown: { [category: string]: number };
}

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("transactions");
  const isMobile = useIsMobile();

  const { data: categories = [] } = useCategories();
  const { data: summary, isLoading: isLoadingSummary } = useQuery<SummaryData>({
    queryKey: ["/api/analytics/summary"],
  });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header onNewTransaction={() => setIsModalOpen(true)} />
      
      <div className="flex-1 flex">
        {!isMobile && (
          isLoadingSummary ? (
            <aside className="w-80 bg-card border-r border-border flex flex-col p-6">
              <h2 className="text-lg font-semibold text-foreground mb-4">ภาพรวม</h2>
              <div className="space-y-2">
                <div className="h-16 bg-muted rounded-lg animate-pulse"></div>
                <div className="h-16 bg-muted rounded-lg animate-pulse"></div>
                <div className="h-16 bg-muted rounded-lg animate-pulse"></div>
              </div>
            </aside>
          ) : summary ? (
            <Sidebar summary={summary} categories={categories} />
          ) : (
            <aside className="w-80 bg-card border-r border-border flex flex-col p-6">
              <h2 className="text-lg font-semibold text-foreground">ภาพรวม</h2>
              <p className="text-sm text-muted-foreground">ไม่สามารถโหลดข้อมูลได้</p>
            </aside>
          )
        )}
        
        <main className="flex-1 flex flex-col bg-background">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="bg-card border-b border-border">
              <div className="flex items-center px-6">
                <TabsList className="h-auto bg-transparent p-0">
                  <TabsTrigger 
                    value="transactions" 
                    className="px-4 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none"
                    data-testid="tab-transactions"
                  >
                    <i className="fas fa-exchange-alt mr-2"></i>รายการเงิน
                  </TabsTrigger>
                  <TabsTrigger 
                    value="budget" 
                    className="px-4 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none"
                    data-testid="tab-budget"
                  >
                    <i className="fas fa-chart-pie mr-2"></i>งบประมาณ
                  </TabsTrigger>
                  <TabsTrigger 
                    value="reports" 
                    className="px-4 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none"
                    data-testid="tab-reports"
                  >
                    <i className="fas fa-chart-bar mr-2"></i>รายงาน
                  </TabsTrigger>
                  <TabsTrigger 
                    value="goals" 
                    className="px-4 py-3 text-sm font-medium border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent rounded-none"
                    data-testid="tab-goals"
                  >
                    <i className="fas fa-target mr-2"></i>เป้าหมาย
                  </TabsTrigger>
                </TabsList>
              </div>
            </div>

            <TabsContent value="transactions" className="flex-1 flex flex-col m-0">
              <TransactionTable />
            </TabsContent>
            
            <TabsContent value="budget" className="flex-1 m-0">
              <BudgetView />
            </TabsContent>
            
            <TabsContent value="reports" className="flex-1 m-0">
              <ReportsView />
            </TabsContent>
            
            <TabsContent value="goals" className="flex-1 m-0">
              <GoalsView />
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
          <div className="grid grid-cols-4 py-2">
            <button 
              onClick={() => setActiveTab("transactions")}
              className={`flex flex-col items-center py-2 px-1 ${activeTab === "transactions" ? "text-primary" : "text-muted-foreground"}`}
              data-testid="mobile-tab-transactions"
            >
              <i className="fas fa-exchange-alt text-sm mb-1"></i>
              <span className="text-xs">รายการเงิน</span>
            </button>
            <button 
              onClick={() => setActiveTab("budget")}
              className={`flex flex-col items-center py-2 px-1 ${activeTab === "budget" ? "text-primary" : "text-muted-foreground"}`}
              data-testid="mobile-tab-budget"
            >
              <i className="fas fa-chart-pie text-sm mb-1"></i>
              <span className="text-xs">งบประมาณ</span>
            </button>
            <button 
              onClick={() => setActiveTab("reports")}
              className={`flex flex-col items-center py-2 px-1 ${activeTab === "reports" ? "text-primary" : "text-muted-foreground"}`}
              data-testid="mobile-tab-reports"
            >
              <i className="fas fa-chart-bar text-sm mb-1"></i>
              <span className="text-xs">รายงาน</span>
            </button>
            <button 
              onClick={() => setActiveTab("goals")}
              className={`flex flex-col items-center py-2 px-1 ${activeTab === "goals" ? "text-primary" : "text-muted-foreground"}`}
              data-testid="mobile-tab-goals"
            >
              <i className="fas fa-target text-sm mb-1"></i>
              <span className="text-xs">เป้าหมาย</span>
            </button>
          </div>
        </div>
      )}

      <TransactionModal 
        open={isModalOpen} 
        onOpenChange={setIsModalOpen} 
      />
    </div>
  );
}