import BillIcon from "@/components/icons/bill";
import GroupIcon from "@/components/icons/group";
import HomeIcon from "@/components/icons/home";
import MessageIcon from "@/components/icons/message";
import SuitIcon from "@/components/icons/suit";

export const links = [
  {
    title: "Home",
    link: "/",
    icon: HomeIcon,
    count: null,
  },
  {
    title: "jobs",
    link: "/jobs",
    icon: SuitIcon,
    count: null,
  },
  {
    title: "Employers",
    link: "/employers",
    icon: GroupIcon,
    count: null,
  },
  {
    title: "Notifications",
    link: "#",
    icon: BillIcon,
    count: null,
  },
  {
    title: "Messages",
    link: "#",
    icon: MessageIcon,
    count: 1,
  },
];

export const profileLinks = [
  {
    title: "Settings and privacy",
    link: "/user/settings-and-privacy",
  },
  {
    title: "Language",
    link: "#en",
  },
  {
    title: "Help",
    link: "/help",
  },
];
