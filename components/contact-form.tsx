import { submitContactMessage } from "@/app/actions";

export function ContactForm() {
  return (
    <form className="contact-form" action={submitContactMessage}>
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
      <button type="submit" className="button button-primary">
        Send message
      </button>
    </form>
  );
}
