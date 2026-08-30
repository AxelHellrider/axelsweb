"use server";

import nodemailer from "nodemailer";

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

    const turnstileToken = String(formData.get("cf-turnstile-response") || "");
    const expectedHostnames = new Set(
        (process.env.TURNSTILE_HOSTNAMES || "")
            .split(",")
            .map((h) => h.trim())
            .filter(Boolean)
    );

    if (!turnstileToken || turnstileToken.length > 2048 || expectedHostnames.size === 0) {
        return { ok: false, error: "Please complete the verification." };
    }

    let verifyData;
    try {
        const verifyRes = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            signal: AbortSignal.timeout(10_000),
            body: new URLSearchParams({
                secret: process.env.TURNSTILE_SECRET_KEY || "",
                response: turnstileToken,
            }),
        });
        if (!verifyRes.ok) throw new Error(`siteverify ${verifyRes.status}`);
        verifyData = await verifyRes.json();
    } catch (err) {
        console.error("Turnstile verify error:", err);
        return { ok: false, error: "Verification failed. Please try again." };
    }

    if (
        !verifyData.success ||
        verifyData.action !== "contact" ||
        !expectedHostnames.has(verifyData.hostname)
    ) {
        return { ok: false, error: "Verification failed. Please try again." };
    }

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.hostinger.com",
            port: Number(process.env.SMTP_PORT) || 465,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from: `"Axels Web" <${process.env.SMTP_USER}>`,
            to: process.env.SMTP_USER,
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
