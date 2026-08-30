"use server";

import { Resend } from "resend";

export async function sendContact(formData: FormData) {
    // Honeypot check
    if (formData.get("bot-field")) {
        return { ok: true };
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();

    // Basic validation (never trust client)
    if (!name || !email || !message) {
        return { ok: false, error: "Invalid form submission." };
    }

    if (message.length > 500) {
        return { ok: false, error: "Message too long." };
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        await resend.emails.send({
            from: "Axels Web <info@axelsweb.dev>",
            to: ["info@axelsweb.com"],
            replyTo: email,
            subject: `New contact from ${name}`,
            text: `
                Name: ${name}
                Email: ${email}
                
                ${message}
            `,
        });

        return { ok: true };
    } catch (err) {
        console.error("Contact form error:", err);
        return { ok: false, error: "Failed to send message." };
    }
}
