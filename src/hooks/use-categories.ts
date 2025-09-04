import { useQuery } from "@tanstack/react-query";
import type { Category } from "../../shared/schema";

export function useCategories() {
  const dummyCategories: Category[] = [
    { id: "1", name: "Food", type: "expense", icon: "fas fa-utensils", color: "#FF6347" },
    { id: "2", name: "Salary", type: "income", icon: "fas fa-money-bill-wave", color: "#3CB371" },
    { id: "3", name: "Transport", type: "expense", icon: "fas fa-bus", color: "#4682B4" },
    { id: "4", name: "Investments", type: "income", icon: "fas fa-chart-line", color: "#DAA520" },
  ];

  return useQuery<Category[]>({
    queryKey: ["/api/categories"],
    select: (data) => {
      // If data is empty or undefined, return dummy data for testing
      if (!data || data.length === 0) {
        return dummyCategories;
      }
      return data;
    },
  });
}