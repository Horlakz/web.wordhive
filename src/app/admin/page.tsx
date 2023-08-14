import React from "react";

const AdminDashboard = () => {
  const stats = [
    { name: "Users", value: 10 },
    { name: "Posts", value: 23 },
    { name: "Services", value: 24 },
    { name: "Orders", value: 25 },
    { name: "Admins", value: 1 },
  ];

  return (
    <section className="grid grid-cols-2 gap-8">
      {stats.map((stat: { name: string; value: number }, i) => (
        <div
          key={i}
          className="bg-gray-200 px-6 py-2 rounded-lg drop-shadow-md"
        >
          <h4 className="text-gray-600 text-xl hover:text-admin-primary cursor-pointer default-transition">
            {stat.name}
          </h4>
          <span className="text-4xl font-bold">{stat.value}</span>
        </div>
      ))}
    </section>
  );
};

export default AdminDashboard;
