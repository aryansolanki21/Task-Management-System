import { useState } from "react";

import useTheme from "../../hooks/useTheme";

import API from "../../services/api";
import { toast } from "react-toastify";

const TaskForm = ({ refreshDashboard }) => {
  const { darkMode } = useTheme();

  // Task form data
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    category: "Work",
    dueDate: "",
  });

  const [loading, setLoading] = useState(false);

  // Update input values
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Create new task
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await API.post("/tasks", formData);

      toast.success(response.data.message);

      // Reset form after successful task creation
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        category: "Work",
        dueDate: "",
      });

      await refreshDashboard();
    } catch (error) {
      toast.error(error.response?.data?.message || "Task Creation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-6 rounded-2xl shadow-lg border ${
        darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-gray-200"
      }`}
    >
      <h2 className="text-2xl font-bold mb-6">Create New Task</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-4 ${
            darkMode ? "bg-slate-700 border-slate-600 text-white" : ""
          }`}
        />

        <textarea
          name="description"
          placeholder="Task Description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-4 ${
            darkMode ? "bg-slate-700 border-slate-600 text-white" : ""
          }`}
        />

        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-4 ${
            darkMode ? "bg-slate-700 border-slate-600 text-white" : ""
          }`}
        >
          <option value="Low">Low</option>

          <option value="Medium">Medium</option>

          <option value="High">High</option>
        </select>

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-4 ${
            darkMode ? "bg-slate-700 border-slate-600 text-white" : ""
          }`}
        >
          <option value="Work">Work</option>

          <option value="Study">Study</option>

          <option value="Personal">Personal</option>

          <option value="Bug">Bug</option>

          <option value="Feature">Feature</option>

          <option value="Urgent">Urgent</option>
        </select>

        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-4 ${
            darkMode ? "bg-slate-700 border-slate-600 text-white" : ""
          }`}
        />

        <button
          type="submit"
          disabled={loading}
          className="
            bg-blue-600
            hover:bg-blue-700
            transition
            text-white
            px-5
            py-3
            rounded-lg
            font-medium
          "
        >
          {loading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
};

export default TaskForm;
