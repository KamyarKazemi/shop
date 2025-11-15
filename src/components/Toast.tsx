type Notification = {
  text: string;
  type: "error" | "success";
  count?: number;
  product?: { id: number; title: string; price?: string | number };
} | null;

export default function Toast({
  notification,
  setNotification,
}: {
  notification: Notification;
  setNotification: (n: Notification) => void;
}) {
  // Debug: log when Toast renders so you can check the browser console
  if (notification) {
    // eslint-disable-next-line no-console
    console.log("Toast rendering:", notification);
  }

  if (!notification) return null;

  const bg = notification.type === "error" ? "bg-red-600" : "bg-green-600";

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-6 bottom-6 z-50 ${bg} text-white rounded-lg shadow-lg`}
    >
      <div className="flex items-center gap-4 p-4 max-w-md">
        <div className="flex-1">
          <div className="font-semibold">{notification.text}</div>
          {notification.product ? (
            <div className="text-sm opacity-90 mt-1">
              {notification.product.title}
              {notification.product.price !== undefined && (
                <span className="ml-2 text-xs">
                  — ${String(notification.product.price)}
                </span>
              )}
            </div>
          ) : null}
        </div>
        {typeof notification.count === "number" ? (
          <div className="flex flex-col items-center justify-center px-3 py-1 bg-white/20 rounded">
            <div className="text-xs">Cart</div>
            <div className="font-bold text-lg">{notification.count}</div>
          </div>
        ) : null}
        <button
          onClick={() => setNotification(null)}
          aria-label="Close notification"
          className="font-bold px-3 py-1 rounded bg-white/20 hover:bg-white/30"
        >
          x
        </button>
      </div>
    </div>
  );
}
