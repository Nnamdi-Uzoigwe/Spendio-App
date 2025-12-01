

// import { create } from "zustand";

// interface FinanceState {
//   income: number;
//   expenses: number;
//   balance: number;
//   loading: boolean;
//   error: string;

//   fetchMonthlyFinance: () => Promise<void>;
// }

// // Helper function to decode JWT token
// function decodeToken(token: string) {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
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

//   fetchMonthlyFinance: async () => {
//     try {
//       set({ loading: true, error: "" });

//       const token = localStorage.getItem("token");
//       if (!token) {
//         set({ error: "Not authenticated", loading: false });
//         return;
//       }

//       // Try to get userId from localStorage first (faster)
//       let userId = localStorage.getItem("userId");

//       // If not in localStorage, decode from JWT token
//       if (!userId) {
//         const decoded = decodeToken(token);
//         userId = decoded?.userId || decoded?.id || decoded?.sub;
        
//         if (!userId) {
//           set({ error: "Could not extract userId from token", loading: false });
//           return;
//         }
//       }

//       // Fetch income with userId as query parameter
//       const incomeRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/income/monthly?userId=${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       if (!incomeRes.ok) {
//         throw new Error(`Income fetch failed: ${incomeRes.status}`);
//       }
      
//       const incomeData = await incomeRes.json();

//       // Fetch expenses with userId as query parameter
//       const expenseRes = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/expense/monthly?userId=${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
      
//       if (!expenseRes.ok) {
//         throw new Error(`Expense fetch failed: ${expenseRes.status}`);
//       }
      
//       const expenseData = await expenseRes.json();

//       const income = incomeData.total || 0;
//       const expenses = expenseData.total || 0;
//       const balance = income - expenses;

//       set({
//         income,
//         expenses,
//         balance,
//         loading: false,
//       });
//     } catch (error: any) {
//       console.error("Finance fetch error:", error);
//       set({ loading: false, error: error.message || "Failed to fetch finance data" });
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
//   date: string; // ISO string
// }

// interface FinanceState {
//   income: number;
//   expenses: number;
//   balance: number;
//   loading: boolean;
//   error: string;
//   transactions: Transaction[];

//   fetchMonthlyFinance: () => Promise<void>;
//   addTransaction: (tx: Transaction) => void;
//   latestTransactions: () => Transaction[];
// }

// function decodeToken(token: string) {
//   try {
//     const base64Url = token.split('.')[1];
//     const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split('')
//         .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//         .join('')
//     );
//     return JSON.parse(jsonPayload);
//   } catch (error) {
//     console.error("Failed to decode token:", error);
//     return null;
//   }
// }

// export const useFinanceStore = create<FinanceState>((set, get) => ({
//   income: 0,
//   expenses: 0,
//   balance: 0,
//   loading: false,
//   error: "",
//   transactions: [],

//   fetchMonthlyFinance: async () => {
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

//       const incomeRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/income/monthly?userId=${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const incomeData = await incomeRes.json();

//       const expenseRes = await fetch(`${process.env.NEXT_PUBLIC_API}/api/expense/monthly?userId=${userId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       const expenseData = await expenseRes.json();

//       const income = incomeData.total || 0;
//       const expenses = expenseData.total || 0;
//       const balance = income - expenses;

//       set({ income, expenses, balance, loading: false });
//     } catch (error: any) {
//       console.error("Finance fetch error:", error);
//       set({ loading: false, error: error.message || "Failed to fetch finance data" });
//     }
//   },

//   // Add a transaction to the array
//   addTransaction: (tx: Transaction) => set((state) => ({ transactions: [tx, ...state.transactions] })),

//   // Return latest 5 transactions
//   latestTransactions: () => get().transactions.slice(0, 5),
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

interface FinanceState {
  income: number;
  expenses: number;
  balance: number;
  loading: boolean;
  error: string;
  recentTransactions: Transaction[];

  fetchMonthlyFinance: () => Promise<void>;
  fetchRecentTransactions: () => Promise<void>;
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

export const useFinanceStore = create<FinanceState>((set) => ({
  income: 0,
  expenses: 0,
  balance: 0,
  loading: false,
  error: "",
  recentTransactions: [],

  fetchMonthlyFinance: async () => {
    // Only run on client
    if (typeof window === "undefined") return;

    try {
      set({ loading: true, error: "" });

      const token = localStorage.getItem("token");
      if (!token) {
        set({ error: "Not authenticated", loading: false });
        return;
      }

      let userId = localStorage.getItem("userId");
      if (!userId) {
        const decoded = decodeToken(token);
        userId = decoded?.userId || decoded?.id || decoded?.sub;
        if (!userId) {
          set({ error: "Could not extract userId from token", loading: false });
          return;
        }
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

      console.log("🔍 Fetching recent transactions..."); // Debug log

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/transactions/recent`, // ✅ NO userId query param
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await res.json();
      console.log("📦 API Response:", data); // Debug log

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
}));