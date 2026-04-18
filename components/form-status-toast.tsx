"use client";

import type { FormActionState } from "@/lib/types";

type FormStatusToastProps = {
  onDismiss: () => void;
  state: FormActionState;
};

export function FormStatusToast({ onDismiss, state }: FormStatusToastProps) {
  if (state.status === "idle") {
    return null;
  }

  return (
    <div
      className={`status-toast ${
        state.status === "success" ? "status-toast-success" : "status-toast-error"
      }`}
      role="status"
      aria-live="polite"
    >
      <span>{state.message}</span>
      <button
        type="button"
        className="toast-dismiss"
        onClick={onDismiss}
        aria-label="Dismiss message"
      >
        ×
      </button>
    </div>
  );
}
