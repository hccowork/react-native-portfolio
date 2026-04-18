"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { submitContactMessage } from "@/app/actions";
import { FormStatusToast } from "@/components/form-status-toast";
import type { FormActionState } from "@/lib/types";

const initialState: FormActionState = {
  status: "idle",
  message: "",
  submittedAt: 0,
};

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(submitContactMessage, initialState);
  const [visibleState, setVisibleState] = useState<FormActionState>(initialState);

  useEffect(() => {
    if (state.status === "idle") {
      return;
    }

    setVisibleState(state);

    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <form ref={formRef} className="contact-form" action={formAction}>
      <FormStatusToast state={visibleState} onDismiss={() => setVisibleState(initialState)} />
      <label>
        Name
        <input type="text" name="name" placeholder="Your name" required />
      </label>
      <label>
        Email
        <input type="email" name="email" placeholder="you@example.com" required />
      </label>
      <label>
        Message
        <textarea name="message" rows={5} placeholder="Tell me about your app or idea" required />
      </label>
      <button type="submit" className="button button-primary" disabled={isPending}>
        {isPending ? "Sending message..." : "Send message"}
      </button>
    </form>
  );
}
