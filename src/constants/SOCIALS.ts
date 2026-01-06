import {FaGithub, FaLinkedin, FaTelegram} from "react-icons/fa6";
import {SiViber} from "react-icons/si";
import {Social} from "@/types/Social";

export const SOCIALS: Social[] = [
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
];