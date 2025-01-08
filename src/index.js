import { Resend } from "resend";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return Response.redirect("https://os.ppconde.com", 301);
    }

    const resend = new Resend(env.RESEND_API_KEY);

    try {
      const contactMsg = await request.formData();

      const subject = contactMsg.get("subject");
      const fromEmail = contactMsg.get("email");
      const message = contactMsg.get("message");
      const html = contactMsg.get("html");

      const { data, error } = await resend.emails.send({
        from: "No-reply <no-reply@ppconde.com>",
        replyTo: fromEmail,
        to: "contact@ppconde.com",
        subject,
        text: message,
        html,
      });

      return Response.json({ data, error });
    } catch (error) {
      return Response.json({ error: error.message || "Unknown error" });
    }
  },
};
