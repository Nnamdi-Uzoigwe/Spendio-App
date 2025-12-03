// import { create } from "zustand";

// interface Transaction {
//   id: string;
//   description: string;
//   category: string;
//   amount: number;
//   isExpense: boolean;
//   date: string;
// }

// interface FinanceState {
//   income: number;
//   expenses: number;
//   balance: number;
//   loading: boolean;
//   error: string;
//   recentTransactions: Transaction[];

//   fetchMonthlyFinance: () => Promise<void>;
//   fetchRecentTransactions: () => Promise<void>;
// }

// function decodeToken(token: string) {
//   try {
//     const base64Url = token.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//         .join("")
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//     return null;
//   }
// }

// export const useFinanceStore = create<FinanceState>((set) => ({
//   income: 0,
//   expenses: 0,
//   balance: 0,
//   loading: false,
//   error: "",
//   recentTransactions: [],

//   fetchMonthlyFinance: async () => {
//     // Only run on client
//     if (typeof window === "undefined") return;

//     try {
//       set({ loading: true, error: "" });

//       const token = localStorage.getItem("token");
//       if (!token) {
//         set({ error: "Not authenticated", loading: false });
//         return;
//       }

//       let userId = localStorage.getItem("userId");
//       if (!userId) {
//         const decoded = decodeToken(token);
//         userId = decoded?.userId || decoded?.id || decoded?.sub;
//         if (!userId) {
//           set({ error: "Could not extract userId from token", loading: false });
//           return;
//         }
//       }

//       const incomeRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/income/monthly?userId=${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const incomeData = await incomeRes.json();

//       const expenseRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/expense/monthly?userId=${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const expenseData = await expenseRes.json();

//       const income = incomeData.total || 0;
//       const expenses = expenseData.total || 0;
//       const balance = income - expenses;

//       set({ income, expenses, balance, loading: false });
//     } catch (error: any) {
//       console.error("Finance fetch error:", error);
//       set({
//         loading: false,
//         error: error.message || "Failed to fetch finance data",
//       });
//     }
//   },
// fetchRecentTransactions: async () => {
//     if (typeof window === "undefined") return;

//     try {
//       const token = localStorage.getItem("token");

//       if (!token) {
//         console.warn("No token found");
//         return;
//       }

//       console.log("🔍 Fetching recent transactions..."); // Debug log

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/transactions/recent`, // ✅ NO userId query param
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = await res.json();
//       console.log("📦 API Response:", data); // Debug log

//       if (data.success) {
//         set({ recentTransactions: data.data });
//         console.log("✅ Transactions loaded:", data.data.length);
//       } else {
//         console.error("❌ API returned failure:", data.message);
//       }
//     } catch (error) {
//       console.error("❌ Failed to fetch recent transactions:", error);
//     }
//   },
// }));



// import { create } from "zustand";

// interface Transaction {
//   id: string;
//   description: string;
//   category: string;
//   amount: number;
//   isExpense: boolean;
//   date: string;
// }

// interface CategoryBreakdown {
//   category: string;
//   amount: number;
//   percentage: number;
//   count: number;
// }

// interface MonthlyTrend {
//   month: string;
//   income: number;
//   expenses: number;
// }

// interface FinanceState {
//   income: number;
//   expenses: number;
//   balance: number;
//   loading: boolean;
//   error: string;
//   recentTransactions: Transaction[];
  
//   // Analytics-specific data
//   previousMonthIncome: number;
//   previousMonthExpenses: number;
//   categoryBreakdown: CategoryBreakdown[];
//   monthlyTrends: MonthlyTrend[];

//   fetchMonthlyFinance: () => Promise<void>;
//   fetchRecentTransactions: () => Promise<void>;
//   fetchCategoryBreakdown: () => Promise<void>;
//   fetchMonthlyTrends: (months?: number) => Promise<void>;
//   fetchPreviousMonthData: () => Promise<void>;
// }

// function decodeToken(token: string) {
//   try {
//     const base64Url = token.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
//         .join("")
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//     return null;
//   }
// }

// function getUserId(): string | null {
//   if (typeof window === "undefined") return null;
  
//   const token = localStorage.getItem("token");
//   if (!token) return null;

//   let userId = localStorage.getItem("userId");
//   if (!userId) {
//     const decoded = decodeToken(token);
//     userId = decoded?.userId || decoded?.id || decoded?.sub;
//   }
//   return userId;
// }

// export const useFinanceStore = create<FinanceState>((set, get) => ({
//   income: 0,
//   expenses: 0,
//   balance: 0,
//   loading: false,
//   error: "",
//   recentTransactions: [],
//   previousMonthIncome: 0,
//   previousMonthExpenses: 0,
//   categoryBreakdown: [],
//   monthlyTrends: [],

//   fetchMonthlyFinance: async () => {
//     if (typeof window === "undefined") return;

//     try {
//       set({ loading: true, error: "" });

//       const token = localStorage.getItem("token");
//       if (!token) {
//         set({ error: "Not authenticated", loading: false });
//         return;
//       }

//       const userId = getUserId();
//       if (!userId) {
//         set({ error: "Could not extract userId from token", loading: false });
//         return;
//       }

//       const incomeRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/income/monthly?userId=${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const incomeData = await incomeRes.json();

//       const expenseRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/expense/monthly?userId=${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       const expenseData = await expenseRes.json();

//       const income = incomeData.total || 0;
//       const expenses = expenseData.total || 0;
//       const balance = income - expenses;

//       set({ income, expenses, balance, loading: false });
//     } catch (error: any) {
//       console.error("Finance fetch error:", error);
//       set({
//         loading: false,
//         error: error.message || "Failed to fetch finance data",
//       });
//     }
//   },

//   fetchRecentTransactions: async () => {
//     if (typeof window === "undefined") return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         console.warn("No token found");
//         return;
//       }

//       console.log("🔍 Fetching recent transactions...");

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/transactions/recent`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       const data = await res.json();
//       console.log("📦 API Response:", data);

//       if (data.success) {
//         set({ recentTransactions: data.data });
//         console.log("✅ Transactions loaded:", data.data.length);
//       } else {
//         console.error("❌ API returned failure:", data.message);
//       }
//     } catch (error) {
//       console.error("❌ Failed to fetch recent transactions:", error);
//     }
//   },

//   fetchPreviousMonthData: async () => {
//     if (typeof window === "undefined") return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const userId = getUserId();
//       if (!userId) return;

//       // Calculate previous month
//       const now = new Date();
//       const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//       const year = lastMonth.getFullYear();
//       const month = lastMonth.getMonth() + 1;

//       const [incomeRes, expenseRes] = await Promise.all([
//         fetch(
//           `${process.env.NEXT_PUBLIC_API}/api/income/by-month?userId=${userId}&year=${year}&month=${month}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         ),
//         fetch(
//           `${process.env.NEXT_PUBLIC_API}/api/expense/by-month?userId=${userId}&year=${year}&month=${month}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         ),
//       ]);

//       const incomeData = await incomeRes.json();
//       const expenseData = await expenseRes.json();

//       const previousMonthIncome = incomeData.total || 0;
//       const previousMonthExpenses = expenseData.total || 0;

//       set({ previousMonthIncome, previousMonthExpenses });
//     } catch (error) {
//       console.error("Failed to fetch previous month data:", error);
//     }
//   },

//   fetchCategoryBreakdown: async () => {
//     if (typeof window === "undefined") return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const userId = getUserId();
//       if (!userId) return;

//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/expense/monthly?userId=${userId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const data = await res.json();

//       if (data.expenses && Array.isArray(data.expenses)) {
//         // Group by category
//         const categoryMap = new Map<string, { amount: number; count: number }>();
//         let total = 0;

//         data.expenses.forEach((expense: any) => {
//           const category = expense.category || "Uncategorized";
//           const amount = expense.amount || 0;
//           total += amount;

//           if (categoryMap.has(category)) {
//             const existing = categoryMap.get(category)!;
//             categoryMap.set(category, {
//               amount: existing.amount + amount,
//               count: existing.count + 1,
//             });
//           } else {
//             categoryMap.set(category, { amount, count: 1 });
//           }
//         });

//         const breakdown: CategoryBreakdown[] = Array.from(categoryMap.entries())
//           .map(([category, data]) => ({
//             category,
//             amount: data.amount,
//             percentage: total > 0 ? (data.amount / total) * 100 : 0,
//             count: data.count,
//           }))
//           .sort((a, b) => b.amount - a.amount);

//         set({ categoryBreakdown: breakdown });
//       }
//     } catch (error) {
//       console.error("Failed to fetch category breakdown:", error);
//     }
//   },

//   fetchMonthlyTrends: async (months: number = 6) => {
//     if (typeof window === "undefined") return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const userId = getUserId();
//       if (!userId) return;

//       const trends: MonthlyTrend[] = [];
//       const now = new Date();

//       // Fetch data for each month
//       const promises = [];
//       for (let i = months - 1; i >= 0; i--) {
//         const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
//         const year = date.getFullYear();
//         const month = date.getMonth() + 1;
        
//         promises.push(
//           Promise.all([
//             fetch(
//               `${process.env.NEXT_PUBLIC_API}/api/income/by-month?userId=${userId}&year=${year}&month=${month}`,
//               { headers: { Authorization: `Bearer ${token}` } }
//             ).then(res => res.json()),
//             fetch(
//               `${process.env.NEXT_PUBLIC_API}/api/expense/by-month?userId=${userId}&year=${year}&month=${month}`,
//               { headers: { Authorization: `Bearer ${token}` } }
//             ).then(res => res.json())
//           ]).then(([incomeData, expenseData]) => ({
//             month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
//             income: incomeData.total || 0,
//             expenses: expenseData.total || 0,
//           }))
//         );
//       }

//       const results = await Promise.all(promises);
//       set({ monthlyTrends: results });
//     } catch (error) {
//       console.error("Failed to fetch monthly trends:", error);
//     }
//   },
// }));



import { create } from "zustand";

interface Transaction {
  id: string;
  description: string;
  category: string;
  amount: number;
  isExpense: boolean;
  date: string;
}

interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
  count: number;
}

interface MonthlyTrend {
  month: string;
  income: number;
  expenses: number;
}

interface FinanceState {
  income: number;
  expenses: number;
  balance: number;
  loading: boolean;
  error: string;
  recentTransactions: Transaction[];
  
  // Analytics-specific data
  previousMonthIncome: number;
  previousMonthExpenses: number;
  categoryBreakdown: CategoryBreakdown[];
  monthlyTrends: MonthlyTrend[];

  fetchMonthlyFinance: () => Promise<void>;
  fetchRecentTransactions: () => Promise<void>;
  fetchCategoryBreakdown: () => Promise<void>;
  fetchMonthlyTrends: (months?: number) => Promise<void>;
  fetchPreviousMonthData: () => Promise<void>;
}

function decodeToken(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}

function getUserId(): string | null {
  if (typeof window === "undefined") return null;
  
  const token = localStorage.getItem("token");
  if (!token) return null;

  let userId = localStorage.getItem("userId");
  if (!userId) {
    const decoded = decodeToken(token);
    userId = decoded?.userId || decoded?.id || decoded?.sub;
  }
  return userId;
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  income: 0,
  expenses: 0,
  balance: 0,
  loading: false,
  error: "",
  recentTransactions: [],
  previousMonthIncome: 0,
  previousMonthExpenses: 0,
  categoryBreakdown: [],
  monthlyTrends: [],

  fetchMonthlyFinance: async () => {
    if (typeof window === "undefined") return;

    try {
      set({ loading: true, error: "" });

      const token = localStorage.getItem("token");
      if (!token) {
        set({ error: "Not authenticated", loading: false });
        return;
      }

      const userId = getUserId();
      if (!userId) {
        set({ error: "Could not extract userId from token", loading: false });
        return;
      }

      const incomeRes = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/income/monthly?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const incomeData = await incomeRes.json();

      const expenseRes = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/expense/monthly?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const expenseData = await expenseRes.json();

      const income = incomeData.total || 0;
      const expenses = expenseData.total || 0;
      const balance = income - expenses;

      set({ income, expenses, balance, loading: false });
    } catch (error: any) {
      console.error("Finance fetch error:", error);
      set({
        loading: false,
        error: error.message || "Failed to fetch finance data",
      });
    }
  },

  fetchRecentTransactions: async () => {
    if (typeof window === "undefined") return;

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("No token found");
        return;
      }

      console.log("🔍 Fetching recent transactions...");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/transactions/recent`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      console.log("📦 API Response:", data);

      if (data.success) {
        set({ recentTransactions: data.data });
        console.log("✅ Transactions loaded:", data.data.length);
      } else {
        console.error("❌ API returned failure:", data.message);
      }
    } catch (error) {
      console.error("❌ Failed to fetch recent transactions:", error);
    }
  },

  fetchPreviousMonthData: async () => {
    if (typeof window === "undefined") return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userId = getUserId();
      if (!userId) return;

      // Calculate previous month date range
      const now = new Date();
      const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const startDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1)
        .toISOString()
        .split('T')[0];
      const endDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth() + 1, 0)
        .toISOString()
        .split('T')[0];

      console.log("🔍 Fetching previous month data:", { startDate, endDate });

      // Use the /api/income and /api/expense endpoints with date filters
      const [incomeRes, expenseRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_API}/api/income?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_API}/api/expense?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
          { headers: { Authorization: `Bearer ${token}` } }
        ),
      ]);

      const incomeData = await incomeRes.json();
      const expenseData = await expenseRes.json();

      console.log("📊 Previous month income:", incomeData);
      console.log("📊 Previous month expenses:", expenseData);

      const previousMonthIncome = incomeData.total || 0;
      const previousMonthExpenses = expenseData.total || 0;

      set({ previousMonthIncome, previousMonthExpenses });
    } catch (error) {
      console.error("Failed to fetch previous month data:", error);
    }
  },

  fetchCategoryBreakdown: async () => {
    if (typeof window === "undefined") return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userId = getUserId();
      if (!userId) return;

      console.log("🔍 Fetching category breakdown for userId:", userId);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/expense/monthly?userId=${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = await res.json();
      console.log("📦 Category breakdown API response:", data);

      // Check different possible response formats
      const expenses = data.expenses || data.data || [];
      console.log("💰 Expenses array:", expenses);

      if (expenses && Array.isArray(expenses) && expenses.length > 0) {
        // Group by category
        const categoryMap = new Map<string, { amount: number; count: number }>();
        let total = 0;

        expenses.forEach((expense: any) => {
          const category = expense.category || "Uncategorized";
          const amount = expense.amount || 0;
          total += amount;

          if (categoryMap.has(category)) {
            const existing = categoryMap.get(category)!;
            categoryMap.set(category, {
              amount: existing.amount + amount,
              count: existing.count + 1,
            });
          } else {
            categoryMap.set(category, { amount, count: 1 });
          }
        });

        const breakdown: CategoryBreakdown[] = Array.from(categoryMap.entries())
          .map(([category, data]) => ({
            category,
            amount: data.amount,
            percentage: total > 0 ? (data.amount / total) * 100 : 0,
            count: data.count,
          }))
          .sort((a, b) => b.amount - a.amount);

        console.log("✅ Category breakdown calculated:", breakdown);
        set({ categoryBreakdown: breakdown });
      } else {
        console.warn("⚠️ No expenses found in response");
      }
    } catch (error) {
      console.error("❌ Failed to fetch category breakdown:", error);
    }
  },

  fetchMonthlyTrends: async (months: number = 6) => {
    if (typeof window === "undefined") return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const userId = getUserId();
      if (!userId) return;

      const trends: MonthlyTrend[] = [];
      const now = new Date();

      console.log("🔍 Fetching monthly trends for", months, "months");

      // Fetch data for each month using date range filters
      const promises = [];
      for (let i = months - 1; i >= 0; i--) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const year = date.getFullYear();
        const month = date.getMonth();
        
        const startDate = new Date(year, month, 1).toISOString().split('T')[0];
        const endDate = new Date(year, month + 1, 0).toISOString().split('T')[0];

        promises.push(
          Promise.all([
            fetch(
              `${process.env.NEXT_PUBLIC_API}/api/income?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
              { headers: { Authorization: `Bearer ${token}` } }
            ).then(res => res.json()),
            fetch(
              `${process.env.NEXT_PUBLIC_API}/api/expense?userId=${userId}&startDate=${startDate}&endDate=${endDate}`,
              { headers: { Authorization: `Bearer ${token}` } }
            ).then(res => res.json())
          ]).then(([incomeData, expenseData]) => ({
            month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
            income: incomeData.total || 0,
            expenses: expenseData.total || 0,
          }))
        );
      }

      const results = await Promise.all(promises);
      console.log("✅ Monthly trends loaded:", results);
      set({ monthlyTrends: results });
    } catch (error) {
      console.error("Failed to fetch monthly trends:", error);
    }
  },
}));