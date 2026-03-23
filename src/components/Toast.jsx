import { useAppContext } from '../context/AppContext';

export default function ToastContainer() {
  const { toasts } = useAppContext();

  return (
    <div className="fixed bottom-6 right-6 z-[3000] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast show ${toast.type} pointer-events-auto !static`}>
          <div className="toast-icon">
            <i
              className={`bx ${
                toast.type === 'success'
                  ? 'bx-check'
                  : toast.type === 'error'
                  ? 'bx-x'
                  : 'bx-info-circle'
              }`}
            ></i>
          </div>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
