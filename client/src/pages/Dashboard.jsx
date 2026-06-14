import { useEffect, useState } from "react";

import Loader from "../components/Loader/Loader";
import StatCard from "../components/StatCard/StatCard";
import TaskForm from "../components/TaskForm/TaskForm";
import TaskCard from "../components/TaskCard/TaskCard";
import AnalyticsCard from "../components/AnalyticsCard/AnalyticsCard";

import useAuth from "../hooks/useAuth";

import API from "../services/api";

import useTheme from "../hooks/useTheme";

const Dashboard = () => {
  // Task statistics
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingTasks: 0,
    completedTasks: 0,
    highPriorityTasks: 0,
  });

  const [statsLoading, setStatsLoading] = useState(true);

  // Task list
  const [tasks, setTasks] = useState([]);

  const [taskLoading, setTaskLoading] = useState(true);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");

  // Sorting option
  const [sort, setSort] = useState("newest");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { loading } = useAuth();

  const { darkMode } = useTheme();

  // Get dashboard statistics
  const fetchStats = async () => {
    try {
      const response = await API.get("/tasks/stats");

      setStats(response.data.stats);
    } catch (error) {
      console.error(error);
    } finally {
      setStatsLoading(false);
    }
  };

  // Get tasks with filters and pagination
  const fetchTasks = async () => {
    try {
      setTaskLoading(true);

      const response = await API.get("/tasks", {
        params: {
          search,
          status,
          priority,
          category,
          sort,
          page: currentPage,
          limit: 5,
        },
      });

      setTasks(response.data.tasks);

      setTotalPages(response.data.pagination.totalPages);

      if (
        currentPage > response.data.pagination.totalPages &&
        response.data.pagination.totalPages > 0
      ) {
        setCurrentPage(response.data.pagination.totalPages);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setTaskLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // Load statistics on page load
  useEffect(() => {
    fetchStats();
  }, []);

  // Reload tasks when filters change
  useEffect(() => {
    fetchTasks();
  }, [debouncedSearch, status, priority, category, sort, currentPage]);

  // Reset page when filter changes
  useEffect(() => {
    if (currentPage !== 1) {
      setCurrentPage(1);
    }
  }, [search, status, priority, category, sort]);

  if (loading || statsLoading) {
    return <Loader />;
  }

  // Calculate completion percentage
  const completionRate =
    stats.totalTasks > 0
      ? Math.round((stats.completedTasks / stats.totalTasks) * 100)
      : 0;

  // Calculate pending percentage
  const pendingRate =
    stats.totalTasks > 0
      ? Math.round((stats.pendingTasks / stats.totalTasks) * 100)
      : 0;

  // Refresh stats and task list
  const refreshDashboard = async () => {
    await fetchStats();

    await fetchTasks();
  };

  return (
    <>
      <div
        className={`min-h-screen p-8 ${
          darkMode ? "bg-slate-950 text-white" : "bg-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-8">
          <h1 className="text-4xl font-bold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 mb-8">
            <StatCard
              title="Total Tasks"
              value={stats.totalTasks}
              color="text-blue-600"
            />

            <StatCard
              title="Pending Tasks"
              value={stats.pendingTasks}
              color="text-yellow-500"
            />

            <StatCard
              title="Completed Tasks"
              value={stats.completedTasks}
              color="text-green-600"
            />

            <StatCard
              title="High Priority"
              value={stats.highPriorityTasks}
              color="text-red-600"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <AnalyticsCard
              title="Completion Rate"
              value={completionRate}
              color="text-green-600"
            />

            <AnalyticsCard
              title="Pending Rate"
              value={pendingRate}
              color="text-yellow-500"
            />
          </div>

          <div
            className={`mt-10 p-6 rounded-2xl shadow-lg border ${
              darkMode
                ? "bg-slate-800 border-slate-700"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Task completion analytics */}
            <h2 className="text-2xl font-bold mb-5">Task Progress Analytics</h2>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Completion Rate</span>

                <span>{completionRate}%</span>
              </div>

              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${completionRate}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span>Pending Rate</span>

                <span>{pendingRate}%</span>
              </div>

              <div className="w-full bg-gray-300 rounded-full h-4">
                <div
                  className="bg-yellow-500 h-4 rounded-full transition-all duration-500"
                  style={{
                    width: `${pendingRate}%`,
                  }}
                />
              </div>
            </div>
          </div>

          <div
            className={`mt-8 p-5 rounded-xl shadow-md mb-8 ${
              darkMode ? "bg-slate-800" : "bg-white"
            }`}
          >
            {/* Task filters */}
            <h2 className="text-xl font-semibold mb-4">Filter Tasks</h2>

            <div className="grid md:grid-cols-5 gap-4">
              <input
                type="text"
                placeholder="Search Tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`border p-3 rounded ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300 "
                }`}
              />

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className={`border p-3 rounded ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">All Status</option>

                <option value="Pending">Pending</option>

                <option value="In Progress">In Progress</option>

                <option value="Completed">Completed</option>
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`border p-3 rounded ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">All Priority</option>

                <option value="Low">Low</option>

                <option value="Medium">Medium</option>

                <option value="High">High</option>
              </select>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`border p-3 rounded ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="">All Categories</option>

                <option value="Work">Work</option>

                <option value="Study">Study</option>

                <option value="Personal">Personal</option>

                <option value="Bug">Bug</option>

                <option value="Feature">Feature</option>

                <option value="Urgent">Urgent</option>
              </select>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={`border p-3 rounded ${
                  darkMode
                    ? "bg-slate-700 border-slate-600 text-white"
                    : "bg-white border-gray-300"
                }`}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="high">High Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSearch("");
                setStatus("");
                setPriority("");
                setCategory("");
                setSort("newest");
                setCurrentPage(1);
              }}
              className="mt-4 bg-gray-600 text-white px-4 py-2 rounded"
            >
              Clear Filters
            </button>
          </div>

          <div className="mt-8">
            <TaskForm refreshDashboard={refreshDashboard} />
          </div>

          <div className="mt-10">
            {totalPages > 0 && (
              <p
                className={`mb-4 ${
                  darkMode ? "text-slate-400" : "text-gray-600"
                }`}
              >
                Showing page {currentPage} of {totalPages}
              </p>
            )}

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">My Tasks</h2>

              {totalPages > 0 && (
                <span
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  Overdue tasks are highlighted
                </span>
              )}
            </div>

            {taskLoading ? (
              <p className="text-center py-10">Loading tasks...</p>
            ) : tasks.length === 0 ? (
              <p
                className={`text-center py-10 ${
                  darkMode ? "text-slate-400" : "text-gray-500"
                }`}
              >
                No tasks available. Create your first task.
              </p>
            ) : (
              <div className="grid gap-4">
                {tasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    refreshDashboard={refreshDashboard}
                  />
                ))}
              </div>
            )}
          </div>

          {totalPages > 0 && (
            <div className="flex justify-center mt-8">
              <span
                className={`
                px-4 py-2 rounded-full text-sm font-medium
                ${darkMode ? "bg-slate-800 text-slate-300" : "bg-gray-200 text-gray-700"}
              `}
              >
                Page {currentPage} of {totalPages}
              </span>
            </div>
          )}

          {totalPages > 0 && (
          <div className="flex justify-center items-center gap-2 mt-8">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`
                px-4 py-2 rounded-lg transition
                ${
                  darkMode
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-white border hover:bg-gray-100"
                }
              `}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`
                  px-4 py-2 rounded-lg transition
                  ${
                    currentPage === index + 1
                      ? "bg-blue-600 text-white"
                      : darkMode
                        ? "bg-slate-800 text-white hover:bg-slate-700"
                        : "bg-white border hover:bg-gray-100"
                  }
                `}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`
                px-4 py-2 rounded-lg transition
                ${
                  darkMode
                    ? "bg-slate-800 text-white hover:bg-slate-700"
                    : "bg-white border hover:bg-gray-100"
                }
              `}
            >
              Next
            </button>
          </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
