import cardEdit from "@/assets/icons/card-edit.svg";
import cpuSetting from "@/assets/icons/cpu-setting.svg";
import document from "@/assets/icons/document.svg";
import question from "@/assets/icons/question.svg";
import setting from "@/assets/icons/setting.svg";
import shoppingCart from "@/assets/icons/shopping-cart.svg";
import users from "@/assets/icons/users.svg";

export const adminNavLinks = [
  { name: "Users", icon: users, path: "/users" },
  { name: "Services", icon: setting, path: "/services" },
  { name: "Orders", icon: shoppingCart, path: "/orders" },
  { name: "Blogs", icon: cardEdit, path: "/blogs" },
  { name: "Portfolio", icon: document, path: "/portfolio" },
  { name: "FAQ", icon: question, path: "/faq" },
  { name: "Admin Management", icon: cpuSetting, path: "/admin-management" },
];
