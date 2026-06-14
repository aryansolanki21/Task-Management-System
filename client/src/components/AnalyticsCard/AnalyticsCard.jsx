import useTheme from "../../hooks/useTheme";

const AnalyticsCard = ({ title, value, color }) => {
  // Get current theme mode
  const { darkMode } = useTheme();

  // Card showing task analytics data
  return (
    <div
      className={`p-6 rounded-xl shadow-md border transition-transform hover:scale-[1.02] ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
      }`}
    >
      <h3
        className={`text-sm uppercase ${
          darkMode ? "text-slate-400" : "text-gray-500"
        }`}
      >
        {title}
      </h3>

      <p className={`text-4xl font-bold mt-2 ${color}`}>{value}%</p>
    </div>
  );
};

export default AnalyticsCard;
