import type { Dispatch, SetStateAction } from "react";

type Notification = { text: string; type: "error" | "success" } | null;

function Toast({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification: Dispatch<SetStateAction<Notification>>;
}) {
  if (!notification) return null;

  const isError = notification.type === "error";

  return (
    <div className={`fixed left-1/2 bottom-8 -translate-x-1/2 z-50`}>
      <div
        className={`px-4 py-2 rounded-lg shadow-lg text-sm font-medium flex items-center gap-3 ${
          isError ? "bg-red-600 text-white" : "bg-green-600 text-white"
        }`}
      >
        <span>{notification.text}</span>
        <button
          onClick={() => setNotification(null)}
          className="ml-3 text-white/80 hover:text-white"
          aria-label="dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}

export default Toast;
