import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center capitalize px-20 py-6">
      <h1 className="text-lg font-medium">Wordhive</h1>
      <nav className="flex-center gap-2">
        <span>home</span>
        <span>about</span>
        <span>faq</span>
      </nav>

      <button className="px-2 py-1 bg-slate-300 rounded-lg">contact now</button>
    </header>
  );
};

export default Header;
