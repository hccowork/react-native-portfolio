"use client";

import { useActionState, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { AdminActionState } from "@/lib/types";

const initialState: AdminActionState = {
  status: "idle",
  message: "",
  submittedAt: 0,
};

type AdminAction = (
  previousState: AdminActionState,
  formData: FormData,
) => Promise<AdminActionState>;

type AdminActionFormProps = {
  action: AdminAction;
  children: ReactNode;
  className?: string;
  submitLabel: string;
  pendingLabel?: string;
  submitClassName?: string;
};

export function AdminActionForm({
  action,
  children,
  className,
  submitLabel,
  pendingLabel,
  submitClassName = "button button-primary",
}: AdminActionFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);
  const [visibleState, setVisibleState] = useState<AdminActionState>(initialState);

  useEffect(() => {
    if (state.status !== "idle") {
      setVisibleState(state);
    }
  }, [state]);

  return (
    <form action={formAction} className={className}>
      {visibleState.status !== "idle" ? (
        <div
          className={`status-toast ${
            visibleState.status === "success" ? "status-toast-success" : "status-toast-error"
          }`}
        >
          <span>{visibleState.message}</span>
          <button
            type="button"
            className="toast-dismiss"
            onClick={() => setVisibleState(initialState)}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      ) : null}
      {children}
      <button type="submit" className={submitClassName} disabled={isPending}>
        {isPending ? pendingLabel ?? `${submitLabel}...` : submitLabel}
      </button>
    </form>
  );
}
