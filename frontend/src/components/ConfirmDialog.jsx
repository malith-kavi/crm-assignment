import { ui, cx } from "../constants/uiClasses";

const ConfirmDialog = ({
  isOpen,
  title,
  message,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  isLoading = false,
  isDanger = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onCancel}
      />

      
      <div className="relative bg-[var(--surface)] rounded-3xl border border-[var(--border)] shadow-lg max-w-sm w-full mx-4 p-6">
        <div className="mb-4">
          <h2 className={ui.text.titleSm}>{title}</h2>
          <p className={cx(ui.text.mutedSm, "mt-2")}>{message}</p>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className={ui.button.secondary}
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={isDanger ? ui.button.dangerSm : ui.button.primaryWide}
          >
            {isLoading ? "Loading..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
