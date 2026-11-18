// Binds every <form data-forminit data-form-id="..." data-thanks="..."> on the page to Forminit.
// Inputs are named fi-{type}-{name}. Rules: https://forminit.com/setup.md
// Each form is its own Forminit form (its own id and inbox); none share one.
import { Forminit } from "forminit";

// One message per field Forminit validates, in the page's language. Keys are Forminit's
// field names: sender.<name> for fi-sender-*, else the {name} of fi-{type}-{name}.
const FIELD_ERRORS: Record<string, string> = {
  "sender.fullName": "Please use only letters, spaces, hyphens, apostrophes and periods.",
  "sender.email": "Please enter a valid email address.",
};

// Forminit names the failing field in error.fieldName or, today, as the first quoted word of error.message
function errorText(error?: { error?: string; fieldName?: string; message?: string }): string {
  const field = error?.fieldName ?? /['"]([^'"]+)['"]/.exec(error?.message ?? "")?.[1];
  if (field && FIELD_ERRORS[field]) return FIELD_ERRORS[field];
  if (error?.error === "TOO_MANY_REQUESTS") return "Please wait a few seconds and try again.";
  return "Something went wrong. Please try again.";
}

const forminit = new Forminit();

function bind(form: HTMLFormElement) {
  if (form.dataset.forminitBound) return; // already bound
  form.dataset.forminitBound = "true";
  const formId = form.dataset.formId;
  const thanksText = form.dataset.thanks ?? "Thanks! We got it.";
  const buttons = form.querySelectorAll<HTMLButtonElement | HTMLInputElement>(
    'button[type="submit"], button:not([type]), input[type="submit"]'
  );
  const status = form.querySelector<HTMLElement>("[data-form-status]")!;
  let sending = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (sending) return;
    if (!formId) {
      console.error("Forminit: form has no data-form-id");
      status.textContent = "Something went wrong. Please try again.";
      return;
    }
    const fd = new FormData(form); // before anything is disabled
    for (const k of ["fi-sender-fullName", "fi-sender-firstName", "fi-sender-lastName"]) {
      const v = fd.get(k);
      if (typeof v === "string") fd.set(k, v.replace(/[‘’]/g, "'"));
    }
    // Optional sender fields left blank are dropped, so an anonymous submission has no sender block.
    for (const k of [...fd.keys()]) {
      const v = fd.get(k);
      if (k.startsWith("fi-sender-") && typeof v === "string" && v.trim() === "") fd.delete(k);
    }
    status.textContent = "";
    sending = true;
    buttons.forEach((b) => (b.disabled = true));
    try {
      const { data, error } = await forminit.submit(formId, fd);
      if (error || typeof data?.hashId !== "string") {
        console.error("Forminit:", error ?? data);
        status.textContent = errorText(error);
        return;
      }
      // Success: replace the form's contents with a thank-you message.
      const thanks = document.createElement("p");
      thanks.setAttribute("role", "status");
      thanks.textContent = thanksText;
      form.replaceChildren(thanks);
    } catch (err) {
      console.error("Forminit:", err);
      status.textContent = "Something went wrong. Please try again.";
    } finally {
      sending = false;
      buttons.forEach((b) => (b.disabled = false));
    }
  });
}

const bindAll = () => document.querySelectorAll<HTMLFormElement>("form[data-forminit]").forEach(bind);
bindAll();
document.addEventListener("astro:page-load", bindAll);
