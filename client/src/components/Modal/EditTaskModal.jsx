const EditTaskModal = ({
  isOpen,
  formData,
  handleChange,
  handleUpdate,
  onClose,
  darkMode,
}) => {
  // Don't show modal when closed
  if (!isOpen) return null;

  return (
    // Modal overlay
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 overflow-y-auto">
      {/* Modal content box */}
      <div
        className={`w-full max-w-lg rounded-xl p-6 shadow-xl border ${
          darkMode
            ? "bg-slate-800 border-slate-700 text-white"
            : "bg-white border-gray-200 text-black"
        }`}
      >
        <h2 className="text-2xl font-bold mb-5">Edit Task</h2>
        {/* Task title input */}
        <input
          type="text"
          name="title"
          placeholder="Enter task title"
          value={formData.title}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-3 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-300"
          }`}
        />
        {/* Task description input */}
        <textarea
          rows="4"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter task description"
          className={`w-full border p-3 rounded mb-3 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-300"
          }`}
        />
        {/* Task status dropdown */}
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-3 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="Pending">Pending</option>

          <option value="In Progress">In Progress</option>

          <option value="Completed">Completed</option>
        </select>
        {/* Task priority dropdown */}
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-3 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="Low">Low</option>

          <option value="Medium">Medium</option>

          <option value="High">High</option>
        </select>
        {/* Task category dropdown */}
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-3 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-300"
          }`}
        >
          <option value="Work">Work</option>

          <option value="Study">Study</option>

          <option value="Personal">Personal</option>

          <option value="Bug">Bug</option>

          <option value="Feature">Feature</option>

          <option value="Urgent">Urgent</option>
        </select>
        {/* Task due date input */}
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className={`w-full border p-3 rounded mb-3 ${
            darkMode
              ? "bg-slate-700 border-slate-600 text-white"
              : "bg-white border-gray-300"
          }`}
        />
        {/* Save changes button */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
          >
            Cancel
          </button>

          <button
            onClick={handleUpdate}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
