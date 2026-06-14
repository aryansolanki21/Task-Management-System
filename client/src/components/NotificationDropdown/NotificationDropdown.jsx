import { useEffect, useState } from "react";

import useTheme from "../../hooks/useTheme";

import API from "../../services/api";

const NotificationDropdown = () => {
  const [notifications, setNotifications] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);

  const { darkMode } = useTheme();

  // Get notifications from server
  const fetchNotifications = async () => {
    try {
      const response = await API.get("/notifications");

      setNotifications(response.data.notifications);
    } catch (error) {
      console.error("Notification Error:", error);
    }
  };

  // Mark all unread notifications as read
  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(
        (notification) => !notification.isRead,
      );

      // Instant UI update
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );

      await Promise.all(
        unreadNotifications.map((notification) =>
          API.put(`/notifications/${notification._id}/read`),
        ),
      );

      await fetchNotifications();
    } catch (error) {
      console.error("Notification Error:", error);
    }
  };

  // Load notifications when component mounts
  useEffect(() => {
    const loadNotifications = async () => {
      await fetchNotifications();
    };

    loadNotifications();
  }, []);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="relative">
      <button
        onClick={() => {
          setShowDropdown(!showDropdown);

          if (!showDropdown && unreadCount > 0) {
            markAllAsRead();
          }
        }}
        className="relative text-2xl cursor-pointer"
      >
        🔔
        {unreadCount > 0 && (
          <span
            className="
              absolute
              -top-2
              -right-2
              bg-red-500
              text-white
              text-xs
              min-w-5
              h-5
              flex
              items-center
              justify-center
              rounded-full
              px-1
            "
          >
            {unreadCount}
          </span>
        )}
      </button>

      {showDropdown && (
        <div
          className={`
            absolute
            right-0
            mt-2
            w-80
            rounded-lg
            shadow-xl
            max-h-96
            overflow-y-auto
            z-50
            border
            ${
              darkMode
                ? "bg-slate-800 text-white border-slate-700"
                : "bg-white text-black border-gray-200"
            }
          `}
        >
          {notifications.length === 0 ? (
            <p
              className={`p-4 text-center ${
                darkMode ? "text-slate-400" : "text-gray-500"
              }`}
            >
              No Notifications
            </p>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`
                  p-4 border-b
                  ${
                    darkMode
                      ? notification.isRead
                        ? "bg-slate-800 border-slate-700"
                        : "bg-slate-700 border-slate-600"
                      : notification.isRead
                        ? "bg-white border-gray-200"
                        : "bg-blue-50 border-gray-200"
                  }
                `}
              >
                <h4
                  className={`font-semibold ${
                    !notification.isRead ? "text-blue-500" : ""
                  }`}
                >
                  {notification.title}
                </h4>

                <p className="text-sm">{notification.message}</p>

                <p
                  className={`text-xs mt-1 ${
                    darkMode ? "text-slate-400" : "text-gray-500"
                  }`}
                >
                  {new Date(notification.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
