import React from "react";
import { Legend, Pie, PieChart, Tooltip } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: applicationsData = {},
    isLoading: applicationLoading,
    refetch: applicationRefetch,
  } = useQuery({
    queryKey: ["applicationsData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/stats/status");
      return res.data;
    },
  });
  const {
    data: approvedAmounts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["approvedAmounts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/applications/stats/amounts");
      return res.data;
    },
  });
  const {
    data: usersByRole = [],
    isLoading: userLoading,
    refetch: userRefetch,
  } = useQuery({
    queryKey: ["usersByRole"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users-stats/role");
      return res.data;
    },
  });

  const getPiechartData = (stats) => {
    return stats.map((stat) => {
      return { name: stat._id, value: stat.count };
    });
  };

  if (isLoading || applicationLoading || userLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }
  const statusMap = Object.fromEntries(
    applicationsData.applications.map((s) => [s._id, s.count])
  );
  const totalApprovedAmount = approvedAmounts[0]?.totalApprovedAmount || 0;

  const handleRefetch = () => {
    refetch();
    applicationRefetch();
    userRefetch();
  };

  return (
    <div className="py-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">LoanLink — Admin Dashboard</h1>
          <p className="text-sm text-accent-content">
            Overview of applications, revenue and users
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleRefetch}
            className="btn px-4 py-2 bg-primary/10 border rounded-2xl shadow"
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-primary/10 rounded-2xl shadow">
          <div className="text-sm text-accent-content">Total Applications</div>
          <div className="text-2xl font-bold">
            {applicationsData.totalCount}
          </div>
          <div className="text-xs text-accent-content mt-2">
            All-time submitted applications
          </div>
        </div>

        <div className="p-4 bg-primary/10 rounded-2xl shadow">
          <div className="text-sm text-accent-content">Pending</div>
          <div className="text-2xl font-bold">{statusMap.pending || 0}</div>
          <div className="text-xs text-accent-content mt-2">
            Awaiting review
          </div>
        </div>

        <div className="p-4 bg-primary/10 rounded-2xl shadow">
          <div className="text-sm text-accent-content">Approved</div>
          <div className="text-2xl font-bold">{statusMap.approved || 0}</div>
          <div className="text-xs text-accent-content mt-2">
            Applications approved
          </div>
        </div>

        <div className="p-4 bg-primary/10 rounded-2xl shadow">
          <div className="text-sm text-accent-content">
            Total Approved Amount
          </div>
          <div className="text-2xl font-bold">
            ৳ {totalApprovedAmount.toLocaleString()}
          </div>
          <div className="text-xs text-accent-content mt-2">
            Sum of all approved loan amounts
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2 bg-primary/10 p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Applications Over Time</h3>
            <div className="text-sm text-accent-content">Last 30 days</div>
          </div>

          <div className="h-64 flex items-center justify-center border-2 border-dashed border-accent-content rounded-lg">
            <div className="h-full w-full">
              <PieChart
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  maxHeight: "80vh",
                  aspectRatio: 2,
                }}
                responsive
              >
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={getPiechartData(applicationsData.applications)}
                  cx="50%"
                  cy="100%"
                  outerRadius="120%"
                  fill="#8884d8"
                  label
                  isAnimationActive={true}
                />
                <Legend></Legend>
                <Tooltip></Tooltip>
              </PieChart>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {applicationsData.applications.map((s) => (
              <div
                key={s._id}
                className="p-3 bg-base-100 rounded-lg text-center"
              >
                <div className="text-xs text-accent-content">{s._id}</div>
                <div className="text-lg font-semibold">{s.count}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-primary/10 p-4 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Users by Role</h3>
            <div className="text-sm text-accent-content">
              Total: {usersByRole.reduce((a, b) => a + b.count, 0)}
            </div>
          </div>

          <div className="space-y-3">
            {usersByRole.map((r) => (
              <div key={r._id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-sm font-medium">
                    {r._id[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{r._id}</div>
                    <div className="text-xs text-accent-content">
                      {r.count} users
                    </div>
                  </div>
                </div>
                <div className="text-sm text-accent-content">
                  {Math.round(
                    (r.count / usersByRole.reduce((a, b) => a + b.count, 0)) *
                      100
                  )}
                  %
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 h-45 flex items-center justify-center border-2 border-dashed border-accent-content rounded-lg">
            <div className="h-full w-88">
              <PieChart
                style={{
                  width: "100%",
                  maxWidth: "500px",
                  maxHeight: "80vh",
                  aspectRatio: 2,
                }}
                responsive
              >
                <Pie
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  data={getPiechartData(usersByRole)}
                  cx="50%"
                  cy="100%"
                  outerRadius="120%"
                  fill="#8884d8"
                  label
                  isAnimationActive={true}
                />
                <Legend></Legend>
                <Tooltip></Tooltip>
              </PieChart>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-accent-content">
          Last updated: {new Date().toLocaleString()}
        </div>
        {/* <div className="flex gap-2">
          <button className="btn px-4 py-2 border rounded-2xl">
            Export CSV
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default AdminHome;
