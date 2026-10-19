import { Link } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

const Home = () => {
  // Get authentication and theme information from Context API.
  const { isAuthenticated, user } = useAuth();
  const { darkMode } = useTheme();

  // Reusable TaskFlow features displayed on the landing page.
  const features = [
    {
      icon: "📋",
      title: "Task Management",
      description:
        "Create, update, organize, and manage your tasks from one place.",
    },
    {
      icon: "📊",
      title: "Productivity Analytics",
      description:
        "Track completed tasks, pending work, and your overall progress.",
    },
    {
      icon: "🔔",
      title: "Smart Notifications",
      description:
        "Keep track of upcoming deadlines, overdue tasks, and completions.",
    },
    {
      icon: "📎",
      title: "File Attachments",
      description:
        "Attach relevant files to tasks and keep your work organized.",
    },
    {
      icon: "🎯",
      title: "Priorities and Filters",
      description:
        "Organize tasks by priority, category, status, and deadlines.",
    },
    {
      icon: "🌙",
      title: "Dark Mode",
      description:
        "Switch between light and dark themes for a comfortable experience.",
    },
  ];

  return (
    <main
      className={`min-h-screen ${
        darkMode ? "bg-slate-950 text-white" : "bg-gray-50 text-slate-900"
      }`}
    >
      {/* Hero section: introduces TaskFlow and its main purpose. */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Left side: heading, description, and action buttons. */}
          <div>
            <span
              className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6 ${
                darkMode
                  ? "bg-blue-950 text-blue-300"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              Your work. Your goals. One place.
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Manage Tasks.
              <span className="block text-blue-500">Achieve More.</span>
            </h1>

            <p
              className={`mt-6 text-lg leading-8 ${
                darkMode ? "text-slate-300" : "text-slate-600"
              }`}
            >
              TaskFlow helps you organize your daily work, prioritize important
              tasks, track deadlines, and understand your productivity through a
              simple dashboard.
            </p>

            {/* Authenticated users go to their dashboard.
                Visitors can register or log in. */}
            <div className="flex flex-wrap gap-4 mt-8">
              <Link
                to={isAuthenticated ? "/dashboard" : "/register"}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                <span className="ml-2" aria-hidden="true">
                  →
                </span>
              </Link>

              {!isAuthenticated && (
                <Link
                  to="/login"
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-xl border font-semibold transition ${
                    darkMode
                      ? "border-slate-700 hover:bg-slate-800"
                      : "border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  Login
                </Link>
              )}
            </div>

            {isAuthenticated && user && (
              <p
                className={`mt-5 text-sm ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Welcome back, {user.name}!
              </p>
            )}
          </div>

          {/* Right side: a visual preview of the TaskFlow dashboard. */}
          <div
            className={`rounded-3xl p-6 md:p-8 border shadow-2xl ${
              darkMode
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <p
                  className={`text-sm ${
                    darkMode ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  YOUR WORKSPACE
                </p>
                <h2 className="text-2xl font-bold mt-1">Stay on track</h2>
              </div>

              <span className="text-3xl" aria-hidden="true">
                📈
              </span>
            </div>

            {/* These are illustrative preview values, not live statistics. */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-2xl ${
                  darkMode ? "bg-slate-800" : "bg-blue-50"
                }`}
              >
                <p className="text-sm text-blue-500">Organize</p>
                <p className="text-xl font-bold mt-2">Your Tasks</p>
                <p className="text-2xl mt-2" aria-hidden="true">
                  📝
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl ${
                  darkMode ? "bg-slate-800" : "bg-green-50"
                }`}
              >
                <p className="text-sm text-green-500">Track</p>
                <p className="text-xl font-bold mt-2">Progress</p>
                <p className="text-2xl mt-2" aria-hidden="true">
                  📊
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl ${
                  darkMode ? "bg-slate-800" : "bg-amber-50"
                }`}
              >
                <p className="text-sm text-amber-500">Remember</p>
                <p className="text-xl font-bold mt-2">Deadlines</p>
                <p className="text-2xl mt-2" aria-hidden="true">
                  ⏰
                </p>
              </div>

              <div
                className={`p-4 rounded-2xl ${
                  darkMode ? "bg-slate-800" : "bg-purple-50"
                }`}
              >
                <p className="text-sm text-purple-500">Focus</p>
                <p className="text-xl font-bold mt-2">Priorities</p>
                <p className="text-2xl mt-2" aria-hidden="true">
                  🎯
                </p>
              </div>
            </div>

            <div
              className={`mt-5 p-4 rounded-2xl ${
                darkMode ? "bg-slate-800" : "bg-gray-50"
              }`}
            >
              <p className="font-semibold">Make every task count.</p>
              <p
                className={`text-sm mt-1 ${
                  darkMode ? "text-slate-400" : "text-slate-500"
                }`}
              >
                Plan your work and see your progress in one place.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features section: explains the application's capabilities. */}
      <section
        className={`px-6 py-16 ${darkMode ? "bg-slate-900" : "bg-white"}`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Everything you need to stay organized
            </h2>

            <p
              className={`mt-4 ${
                darkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Simple tools to help you plan, manage, and track your work.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <article
                key={feature.title}
                className={`p-6 rounded-2xl border transition hover:-translate-y-1 hover:shadow-lg ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-gray-200"
                }`}
              >
                <span className="text-3xl" aria-hidden="true">
                  {feature.icon}
                </span>

                <h3 className="text-xl font-bold mt-4">{feature.title}</h3>

                <p
                  className={`mt-3 leading-7 ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final call to action. */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready to take control of your tasks?
          </h2>

          <p
            className={`mt-4 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
          >
            Start organizing your work with TaskFlow today.
          </p>

          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="inline-block mt-7 px-7 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
          >
            {isAuthenticated ? "Open Dashboard" : "Create Your Account"}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer
        className={`border-t px-6 py-6 text-center text-sm ${
          darkMode
            ? "border-slate-800 text-slate-400"
            : "border-gray-200 text-slate-500"
        }`}
      >
        © {new Date().getFullYear()} TaskFlow. Stay organized, achieve more.
      </footer>
    </main>
  );
};

export default Home;
