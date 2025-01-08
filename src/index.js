import { Resend } from "resend";

export default {
  async fetch(request, env, ctx) {
    const resend = new Resend("your_resend_api_key");

    const { data, error } = await resend.emails.send({
      from: "hello@example.com",
      to: "someone@example.com",
      subject: "Hello World",
      html: "<p>Hello from Workers</p>",
    });

    return Response.json({ data, error });
  },
};
