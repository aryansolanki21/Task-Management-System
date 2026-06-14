import { useState } from "react";
import { toast } from "react-toastify";

import API from "../../services/api";

import ConfirmModal from "../Modal/ConfirmModal";
import EditTaskModal from "../Modal/EditTaskModal";

import useTheme from "../../hooks/useTheme";

const TaskCard = ({ task, refreshDashboard }) => {
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description || "",
    status: task.status,
    priority: task.priority,
    category: task.category || "Work",
    dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteLoading, setDeleteLoading] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  const { darkMode } = useTheme();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/tasks/${task._id}`, formData);

      await refreshDashboard();

      toast.success("Task Updated Successfully");
      setIsEditing(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Task Update Failed");
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await API.delete(`/tasks/${task._id}`);

      await refreshDashboard();

      toast.success("Task Deleted Successfully");
      setShowDeleteModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Task Delete Failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a file");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("file", selectedFile);

      await API.post(`/tasks/${task._id}/upload`, formData);

      toast.success("File Uploaded");

      setSelectedFile(null);

      await refreshDashboard();
    } catch (error) {
      console.error(error);

      toast.error("Upload Failed");
    }
  };

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const dueDate = task.dueDate ? new Date(task.dueDate) : null;

  if (dueDate) {
    dueDate.setHours(0, 0, 0, 0);
  }

  const isOverdue = dueDate && dueDate < today && task.status !== "Completed";

  const isDueToday =
    dueDate &&
    dueDate.getTime() === today.getTime() &&
    task.status !== "Completed";

  const statusColor =
    task.status === "Completed"
      ? "bg-green-100 text-green-700"
      : task.status === "In Progress"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-red-100 text-red-700";

  const priorityBadge =
    task.priority === "High"
      ? "bg-red-100 text-red-700"
      : task.priority === "Medium"
        ? "bg-yellow-100 text-yellow-700"
        : "bg-green-100 text-green-700";

  return (
    <div
      className={`p-5 rounded-xl shadow-md border transition-all duration-300 hover:shadow-xl ${
        isOverdue
          ? "border-red-500"
          : darkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
      }`}
    >
      <h3 className="text-xl font-semibold flex items-center gap-2">
        {task.title}

        {isOverdue && <span>🚨</span>}
      </h3>

      <p className={`mt-2 ${darkMode ? "text-slate-300" : "text-gray-600"}`}>
        {task.description || "No Description"}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className={`${statusColor} px-3 py-1 rounded`}>
          {task.status}
        </span>
        <span className={`${priorityBadge} px-3 py-1 rounded`}>
          {task.priority}
        </span>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded">
          {task.category}
        </span>
      </div>

      <p
        className={`mt-4 text-sm ${
          darkMode ? "text-slate-400" : "text-gray-500"
        }`}
      >
        Due:{" "}
        {task.dueDate
          ? new Date(task.dueDate).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })
          : "Not Set"}
      </p>

      <div
        className={`mt-4 border-t pt-3 text-sm ${
          darkMode ? "border-slate-700" : "border-gray-200"
        }`}
      >
        <p className={darkMode ? "text-slate-400" : "text-gray-500"}>
          📅 Created:{" "}
          {new Date(task.createdAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        <p className={darkMode ? "text-slate-400" : "text-gray-500"}>
          ✏️ Updated:{" "}
          {new Date(task.updatedAt).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>

        {task.completedAt && (
          <p className="text-green-500 font-medium">
            ✅ Completed:{" "}
            {new Date(task.completedAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        )}
      </div>

      {task.attachments?.length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Attachments</h4>

          {task.attachments.map((file, index) => (
            <a
              key={index}
              href={`${import.meta.env.VITE_API_URL}${file.fileUrl}`}
              target="_blank"
              rel="noreferrer"
              className="block text-blue-500 underline"
            >
              {file.fileName}
            </a>
          ))}
        </div>
      )}

      {isOverdue && (
        <p className="mt-2 text-red-500 font-semibold">🔴 Overdue Task</p>
      )}

      {isDueToday && (
        <p className="mt-2 text-yellow-500 font-semibold">🟡 Due Today</p>
      )}

      {task.status === "Completed" && (
        <p className="mt-2 text-green-500 font-semibold">✅ Completed</p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          type="file"
          onChange={(e) => setSelectedFile(e.target.files[0])}
          className={`
            border rounded-lg p-2 text-sm
            ${
              darkMode
                ? "bg-slate-700 border-slate-600 text-white"
                : "bg-white border-gray-300"
            }
          `}
        />

        {selectedFile && (
          <p
            className={`text-sm ${
              darkMode ? "text-slate-400" : "text-gray-500"
            }`}
          >
            {selectedFile.name}
          </p>
        )}

        <button
          disabled={!selectedFile}
          onClick={handleUpload}
          className={`
            px-5 py-2 rounded-lg font-medium transition
            ${
              selectedFile
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-400 cursor-not-allowed text-white"
            }
          `}
        >
          Upload
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mt-4">
        <button
          onClick={() => setIsEditing(true)}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Task"
        message="Are you sure you want to delete this task?"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        loading={deleteLoading}
      />

      <EditTaskModal
        isOpen={isEditing}
        formData={formData}
        handleChange={handleChange}
        handleUpdate={handleUpdate}
        onClose={() => setIsEditing(false)}
        darkMode={darkMode}
      />
    </div>
  );
};

export default TaskCard;
