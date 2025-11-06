import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export default function NotificationCenter() {
  const { notifications, removeNotification } = useAppStore();

  return (
    <div className="fixed bottom-6 right-6 space-y-3 z-50 pointer-events-none">
      {notifications.map((notification) => {
        const bgColor =
          notification.type === 'success'
            ? 'bg-green-50 border-green-200'
            : notification.type === 'error'
            ? 'bg-red-50 border-red-200'
            : notification.type === 'warning'
            ? 'bg-yellow-50 border-yellow-200'
            : 'bg-blue-50 border-blue-200';

        const textColor =
          notification.type === 'success'
            ? 'text-green-800'
            : notification.type === 'error'
            ? 'text-red-800'
            : notification.type === 'warning'
            ? 'text-yellow-800'
            : 'text-blue-800';

        const Icon =
          notification.type === 'success'
            ? CheckCircle
            : notification.type === 'error'
            ? AlertCircle
            : notification.type === 'warning'
            ? AlertCircle
            : Info;

        const iconColor =
          notification.type === 'success'
            ? 'text-green-600'
            : notification.type === 'error'
            ? 'text-red-600'
            : notification.type === 'warning'
            ? 'text-yellow-600'
            : 'text-blue-600';

        return (
          <NotificationItem
            key={notification.id}
            notification={notification}
            bgColor={bgColor}
            textColor={textColor}
            Icon={Icon}
            iconColor={iconColor}
            onClose={() => removeNotification(notification.id)}
          />
        );
      })}
    </div>
  );
}

interface NotificationItemProps {
  notification: any;
  bgColor: string;
  textColor: string;
  Icon: any;
  iconColor: string;
  onClose: () => void;
}

function NotificationItem({
  notification,
  bgColor,
  textColor,
  Icon,
  iconColor,
  onClose,
}: NotificationItemProps) {
  useEffect(() => {
    if (notification.duration) {
      const timer = setTimeout(onClose, notification.duration);
      return () => clearTimeout(timer);
    }
  }, [notification.duration, onClose]);

  return (
    <div
      className={`${bgColor} border rounded-lg shadow-lg p-4 flex items-start gap-3 pointer-events-auto max-w-md animate-in slide-in-from-right`}
    >
      <Icon className={`${iconColor} flex-shrink-0`} size={20} />
      <div className="flex-1">
        <p className={`${textColor} text-sm font-medium`}>{notification.message}</p>
      </div>
      <button
        onClick={onClose}
        className={`${textColor} hover:opacity-70 flex-shrink-0`}
      >
        <X size={18} />
      </button>
    </div>
  );
}
