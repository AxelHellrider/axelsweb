"use client";

import React, {useState} from "react";
import {motion} from "framer-motion";

import {MdEmail} from "react-icons/md";
import {FaGithub, FaLinkedin, FaTelegram} from "react-icons/fa6";
import {SiViber} from "react-icons/si";
import {sendContact} from "@/app/actions/send_contact";

const SOCIALS = [
    {
        label: "Telegram",
        href: "https://t.me/alexnomikos",
        icon: FaTelegram,
    },
    {
        label: "Viber",
        href: "viber://chat?number=+306986773963",
        icon: SiViber,
    },
    {
        label: "GitHub",
        href: "https://github.com/AxelHellrider",
        icon: FaGithub,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/alexandros-nomikos/",
        icon: FaLinkedin,
    },
] as const;

export default function ContactView() {
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    async function action(formData: FormData) {
        const res = await sendContact(formData);
        setStatus(res.ok ? "success" : "error");
    }

    return (
        <section
            className="flex flex-col gap-y-4 w-full max-w-full h-full px-6 pt-6 pb-10 lg:py-6 overflow-x-hidden overflow-y-auto lg:max-w-2xl lg:mx-auto lg:justify-center">
            <div className="flex flex-col gap-x-3">
                <h1 id="contact-heading"
                    className="text-3xl font-semibold bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                    Contact
                </h1>
                <p className="mt-2 text-sm md:text-base text-white/80 max-w-prose">
                    If you’d like to discuss a project, ask a question, or explore working together,
                    feel free to send a message. I usually reply within a day or two.
                </p>
            </div>

            <motion.div
                initial={{y: 20, opacity: 0}}
                animate={{y: 0, opacity: 1}}
                transition={{duration: 0.3, ease: [0.22, 1, 0.36, 1]}}
                className="w-full rounded-2xl bg-black/60 backdrop-blur-md
                   ring-1 ring-white/10 shadow-[0_0_20px_rgba(0,150,255,0.25)]
                   p-4 text-white"
                aria-labelledby="contact-heading"
            >
                {status === "success" ? (
                    <p className="text-green-400 text-center">Message sent successfully. I’ll get back to you soon.</p>
                ) : (
                    <form
                        name="contact"
                        method="POST"
                        action={action}
                        className="mt-6 flex flex-col gap-3"
                    >
                        {/* Netlify required hidden input */}
                        <input type="hidden" name="form-name" value="contact"/>
                        <input type="hidden" name="bot-field"/>

                        <label className="flex flex-col gap-1 text-sm">
                            <span className="text-white/80">Name</span>
                            <input
                                name="name"
                                required
                                minLength={2}
                                maxLength={80}
                                className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2
                         text-white placeholder:text-white/40
                         focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                                placeholder="Your name"
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm">
                            <span className="text-white/80">Email</span>
                            <input
                                type="email"
                                name="email"
                                required
                                minLength={2}
                                maxLength={80}
                                className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2
                         text-white placeholder:text-white/40
                         focus:outline-none focus:ring-2 focus:ring-sky-400/60"
                                placeholder="you@example.com"
                            />
                        </label>

                        <label className="flex flex-col gap-1 text-sm">
                            <span className="text-white/80">Message</span>
                            <textarea
                                name="message"
                                required
                                rows={4}
                                minLength={2}
                                maxLength={500}
                                className="rounded-lg bg-white/5 ring-1 ring-white/10 px-3 py-2
                         text-white placeholder:text-white/40
                         focus:outline-none focus:ring-2 focus:ring-sky-400/60 resize-none"
                                placeholder="A short description of what you have in mind (Max character limit: 500)"
                            />
                        </label>

                        <button
                            type="submit"
                            className="mt-2 self-start rounded-xl px-4 py-2.5
                       bg-sky-500/30 hover:bg-sky-500/50
                       ring-1 ring-sky-400/40 transition
                       text-sm shadow-[0_0_20px_rgba(0,150,255,0.35)]"
                        >
                            Send message
                        </button>
                        {status === "error" && (
                            <p className="text-red-400 text-sm text-center">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </form>
                )}

                {/* Divider */}
                <div className="my-6 h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent"/>

                {/* Alternative contact methods */}
                <ul role="list" className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SOCIALS.map((s) => (
                        <li key={s.label}>
                            <a
                                href={s.href}
                                target={s.href.startsWith("http") ? "_blank" : undefined}
                                rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="flex items-center gap-3 rounded-lg px-3 py-2.5
                           bg-white/5 ring-1 ring-white/10 hover:bg-white/10
                           transition focus-visible:ring-2 focus-visible:ring-sky-400/60"
                            >
                                <span className="inline-flex h-7 w-7 items-center justify-center
                                                 rounded-md bg-sky-400/20 ring-1 ring-sky-400/30">
                                  <s.icon className="h-4 w-4 text-sky-200"/>
                                </span>
                                <span className="text-sm text-white/90">{s.label}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </section>
    );
}
