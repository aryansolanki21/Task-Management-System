const ConfirmModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  loading = false,
}) => {
  // Don't render modal when closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div
        className="
          w-full 
          max-w-md 
          mx-4
          p-6
          rounded-xl
          shadow-lg
          bg-white
          dark:bg-slate-800
          text-black
          dark:text-white
        "
      >
        <h2 className="text-xl font-bold mb-3">{title}</h2>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={loading}
            className="
            bg-gray-500
            hover:bg-gray-600
            text-white
            px-4
            py-2
            rounded
            transition
          "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-4
              py-2
              rounded
              transition
            "
          >
            {/* Show loading state while deleting */}
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
