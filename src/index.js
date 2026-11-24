import { Resend } from "resend";

export default {
  async fetch(request, env, ctx) {
    if (request.method !== "POST") {
      return Response.redirect("https://os.ppconde.com", 301);
    }

    const resend = new Resend(env.RESEND_API_KEY);

    try {
      const formData = await request.formData();
      const searchParams = new URLSearchParams(
        Array.from(formData, ([key, value]) => {
          if (typeof value === "string") {
            return [key, value];
          } else {
            return [key, value.name];
          }
        })
      );

      const subject = searchParams.get("subject");
      const fromEmail = searchParams.get("email");
      const text = searchParams.get("text");

      const { data, error } = await resend.emails.send({
        from: "No-reply <no-reply@ppconde.com>",
        replyTo: fromEmail,
        to: "contact@ppconde.com",
        subject: String(subject),
        text: String(text),
      });

      // A non-2xx status, so the caller knows the email wasn't sent.
      return Response.json({ data, error }, { status: error ? 502 : 200 });
    } catch (error) {
      return Response.json(
        { error: error.message || "Unknown error" },
        { status: 500 }
      );
    }
  },
};
