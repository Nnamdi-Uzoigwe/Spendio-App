import { create } from "zustand";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  dueDate: string;
  priority: "high" | "medium" | "low";
  completedAt?: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
  isOverdue?: boolean;
}

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string;

  fetchTasks: () => Promise<void>;
  toggleTaskStatus: (taskId: string, currentStatus: string) => Promise<void>;
  deleteTask: (taskId: string) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  loading: false,
  error: "",

  fetchTasks: async () => {
    if (typeof window === "undefined") return;

    try {
      set({ loading: true, error: "" });

      const token = localStorage.getItem("token");
      if (!token) {
        set({ error: "Not authenticated", loading: false });
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/task`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();

      if (data.success) {
        set({ tasks: data.data, loading: false });
      } else {
        set({ error: data.message, loading: false });
      }
    } catch (error: any) {
      console.error("Failed to fetch tasks:", error);
      set({ loading: false, error: error.message || "Failed to fetch tasks" });
    }
  },

//   toggleTaskStatus: async (taskId: string, currentStatus: string) => {
//     if (typeof window === "undefined") return;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) return;

//       const newStatus = currentStatus === "completed" ? "pending" : "completed";
//       const endpoint = newStatus === "completed" ? "complete" : "pending";

//       // Optimistically update UI
//       set((state) => ({
//         tasks: state.tasks.map((t) =>
//           t._id === taskId
//             ? {
//                 ...t,
//                 status: newStatus,
//                 completedAt: newStatus === "completed" ? new Date().toISOString() : null,
//               }
//             : t
//         ),
//       }));

//       // Update on server
//       const res = await fetch(
//         `${process.env.NEXT_PUBLIC_API}/api/task/${taskId}/${endpoint}`,
//         {
//           method: "PUT",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!res.ok) {
//         // Revert on error
//         set((state) => ({
//           tasks: state.tasks.map((t) =>
//             t._id === taskId ? { ...t, status: currentStatus } : t
//           ),
//         }));
//       } else {
//         // Refresh to get updated data from server
//         const data = await res.json();
//         if (data.success) {
//           set((state) => ({
//             tasks: state.tasks.map((t) =>
//               t._id === taskId ? data.data : t
//             ),
//           }));
//         }
//       }
//     } catch (error) {
//       console.error("Failed to toggle task:", error);
//       // Revert on error
//       set((state) => ({
//         tasks: state.tasks.map((t) =>
//           t._id === taskId ? { ...t, status: currentStatus } : t
//         ),
//       }));
//     }
//   },

toggleTaskStatus: async (taskId: string, currentStatus: string) => {
    if (typeof window === "undefined") return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const newStatus: "pending" | "completed" = currentStatus === "completed" ? "pending" : "completed"; // ✅ Type assertion
      const endpoint = newStatus === "completed" ? "complete" : "pending";

      // Optimistically update UI
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t._id === taskId
            ? {
                ...t,
                status: newStatus, // Now properly typed
                completedAt: newStatus === "completed" ? new Date().toISOString() : null,
              }
            : t
        ),
      }));

      // Update on server
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API}/api/task/${taskId}/${endpoint}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        // Revert on error
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t._id === taskId ? { ...t, status: currentStatus as "pending" | "completed" } : t // ✅ Type assertion
          ),
        }));
      } else {
        // Refresh to get updated data from server
        const data = await res.json();
        if (data.success) {
          set((state) => ({
            tasks: state.tasks.map((t) =>
              t._id === taskId ? data.data : t
            ),
          }));
        }
      }
    } catch (error) {
      console.error("Failed to toggle task:", error);
      // Revert on error
      set((state) => ({
        tasks: state.tasks.map((t) =>
          t._id === taskId ? { ...t, status: currentStatus as "pending" | "completed" } : t // ✅ Type assertion
        ),
      }));
    }
  },
  deleteTask: async (taskId: string) => {
    if (typeof window === "undefined") return;

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      // Optimistically remove from UI
      set((state) => ({
        tasks: state.tasks.filter((t) => t._id !== taskId),
      }));

      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/task/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        // Refresh on error
        get().fetchTasks();
      }
    } catch (error) {
      console.error("Failed to delete task:", error);
      // Refresh on error
      get().fetchTasks();
    }
  },
}));