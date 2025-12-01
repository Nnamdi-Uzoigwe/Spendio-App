

// "use client";

// import { useEffect, useState, ChangeEvent } from "react";
// import ProfileCard from "@/components/profile/ProfileCard";
// import Settings from "@/components/profile/Setting";
// import { CreditCard, DollarSign, User } from "lucide-react";

// // Type for Profile
// interface ProfileType {
//   _id: string;
//   name: string;
//   email: string;
//   dateJoined: string;
//   currentBalance: number;
//   totalTransactions: number;
//   completedTasks: number;
// }

// interface FormData {
//   name: string;
//   email: string;
// }

// export default function Profile() {
//   const [profile, setProfile] = useState<ProfileType | null>(null);
//   const [editing, setEditing] = useState(false);
//   const [formData, setFormData] = useState<FormData>({ name: "", email: "" });

//   const apiBase = process.env.NEXT_PUBLIC_API;

//   // Fetch profile from backend
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch(`${apiBase}/api/profiles/${profile._id}`, {
//   method: "PUT",
//   headers: { "Content-Type": "application/json" },
//   body: JSON.stringify(formData),
// }); // Replace 1 with userId or /me route
//         const data = await res.json();
//         setProfile(data.data);
//         setFormData({ name: data.data.name, email: data.data.email });
//       } catch (err) {
//         console.error("Error fetching profile:", err);
//       }
//     };
//     fetchProfile();
//   }, [apiBase]);

//   // Handle input changes
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   // Save updated profile
//   const handleSave = async () => {
//     if (!profile) return;
//     try {
//       const res = await fetch(`${apiBase}/api/profiles/${profile._id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await res.json();
//       setProfile(data.data);
//       setEditing(false);
//     } catch (err) {
//       console.error("Error updating profile:", err);
//     }
//   };

//   if (!profile) return <p>Loading...</p>;

//   const profileCardData = [
//     {
//       id: 1,
//       icon: <DollarSign className="text-green-400" />,
//       figure: `₦${profile.currentBalance}`,
//       title: "Current Balance",
//     },
//     {
//       id: 2,
//       icon: <CreditCard className="text-blue-400" />,
//       figure: profile.totalTransactions,
//       title: "Transactions",
//     },
//     {
//       id: 3,
//       icon: <User className="text-purple-400" />,
//       figure: profile.completedTasks,
//       title: "Completed Tasks",
//     },
//   ];

//   return (
//     <div className="mb-20">
//       <div className="border-b border-gray-300 p-4 px-4 lg:px-40">
//         <h3 className="font-semibold text-lg">Profile</h3>
//       </div>

//       <div className="mt-10 px-4 lg:px-40">
//         <div className="border border-gray-300 p-6 rounded-[20px] flex justify-between items-center">
//           {/* Left */}
//           <div className="flex gap-3 items-center">
//             {/* Avatar */}
//             <div className="bg-black text-white h-16 w-16 rounded-full text-xl flex items-center justify-center">
//               {profile.name.slice(0, 2).toUpperCase()}
//             </div>

//             {/* Name & Email */}
//             <div>
//               {editing ? (
//                 <div className="flex flex-col gap-2">
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="border border-gray-300 p-2 rounded"
//                   />
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="border border-gray-300 p-2 rounded"
//                   />
//                 </div>
//               ) : (
//                 <>
//                   <h2 className="text-xl font-semibold">{profile.name}</h2>
//                   <p className="text-gray-500 font-semibold">{profile.email}</p>
//                   <p className="text-sm text-gray-500">
//                     Member since{" "}
//                     {new Date(profile.dateJoined).toLocaleDateString("en-US", {
//                       month: "short",
//                       year: "numeric",
//                     })}
//                   </p>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Right */}
//           <div>
//             {editing ? (
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleSave}
//                   className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg text-sm"
//                 >
//                   Save
//                 </button>
//                 <button
//                   onClick={() => setEditing(false)}
//                   className="border border-gray-300 font-semibold py-2 px-4 rounded-lg text-sm"
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={() => setEditing(true)}
//                 className="border border-gray-300 font-semibold py-2 px-4 text-sm rounded-lg"
//               >
//                 Edit
//               </button>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="mt-10 px-4 lg:px-40 grid grid-cols-3 gap-3">
//         {profileCardData.map((item) => (
//           <ProfileCard key={item.id} icon={item.icon} figure={item.figure} title={item.title} />
//         ))}
//       </div>

//       <div className="mt-10 px-4 lg:px-40 pb-20">
//         <Settings />
//       </div>
//     </div>
//   );
// }



"use client";

import { useEffect, useState, ChangeEvent } from "react";
import ProfileCard from "@/components/profile/ProfileCard";
import Settings from "@/components/profile/Setting";
import { CreditCard, DollarSign, User } from "lucide-react";

// Type for Profile
interface ProfileType {
  _id: string;
  name: string;
  email: string;
  dateJoined: string;
  currentBalance: number;
  totalTransactions: number;
  completedTasks: number;
}

interface FormData {
  name: string;
  email: string;
}

export default function Profile() {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({ name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiBase = process.env.NEXT_PUBLIC_API;

  // Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if (!token || !user) {
          setError("Not authenticated");
          setLoading(false);
          return;
        }

        const userData = JSON.parse(user);

        // Use the user ID from localStorage
        const res = await fetch(`${apiBase}/api/profile/${userData._id}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data = await res.json();
        setProfile(data.data);
        setFormData({ name: data.data.name, email: data.data.email });
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [apiBase]);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Save updated profile
  const handleSave = async () => {
    if (!profile) return;

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${apiBase}/api/profile/${profile._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await res.json();
      setProfile(data.data);
      setEditing(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "Failed to load profile"}</p>
      </div>
    );
  }

  const profileCardData = [
    {
      id: 1,
      icon: <DollarSign className="text-green-400" />,
      figure: `₦${profile.currentBalance.toLocaleString()}`,
      title: "Current Balance",
    },
    {
      id: 2,
      icon: <CreditCard className="text-blue-400" />,
      figure: profile.totalTransactions.toString(),
      title: "Transactions",
    },
    {
      id: 3,
      icon: <User className="text-purple-400" />,
      figure: profile.completedTasks.toString(),
      title: "Completed Tasks",
    },
  ];

  return (
    <div className="mb-20">
      <div className="border-b border-gray-300 p-4 px-4 lg:px-40">
        <h3 className="font-semibold text-lg">Profile</h3>
      </div>

      <div className="mt-10 px-4 lg:px-40">
        <div className="border border-gray-300 p-6 rounded-[20px] flex justify-between items-center">
          {/* Left */}
          <div className="flex gap-3 items-center">
            {/* Avatar */}
            <div className="bg-black text-white h-16 w-16 rounded-full text-xl flex items-center justify-center">
              {profile.name.slice(0, 2).toUpperCase()}
            </div>

            {/* Name & Email */}
            <div>
              {editing ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-2 rounded"
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">{profile.name}</h2>
                  <p className="text-gray-500 font-semibold">{profile.email}</p>
                  <p className="text-sm text-gray-500">
                    Member since{" "}
                    {new Date(profile.dateJoined).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Right */}
          <div>
            {editing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg text-sm"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="border border-gray-300 font-semibold py-2 px-4 rounded-lg text-sm"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setEditing(true)}
                className="border border-gray-300 font-semibold py-2 px-4 text-sm rounded-lg"
              >
                Edit
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="mt-10 px-4 lg:px-40 grid grid-cols-3 gap-3">
        {profileCardData.map((item) => (
          <ProfileCard key={item.id} icon={item.icon} figure={item.figure} title={item.title} />
        ))}
      </div>

      <div className="mt-10 px-4 lg:px-40 pb-20">
        <Settings />
      </div>
    </div>
  );
}