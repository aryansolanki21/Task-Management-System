import useTheme from "../../hooks/useTheme";

const StatCard = ({ title, value, color }) => {
  const { darkMode } = useTheme();

  return (
    // <div className={`p-6 rounded-xl shadow-md ${darkMode ? "bg-slate-800" : "bg-white"}`}>
    // Statistics card shown on dashboard
    <div
      className={`
        p-6
        rounded-2xl
        shadow-lg
        border
        ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"}
      `}
    >
      {/* Card title */}
      <h3
  className={`text-sm uppercase ${
    darkMode ? "text-slate-400" : "text-gray-500"
  }`}
>{title}</h3>

      {/* Statistic value */}
      <p className={`text-5xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );
};

export default StatCard;
