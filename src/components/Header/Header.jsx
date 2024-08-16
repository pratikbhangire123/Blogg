import { Logo, MobileMenu, DesktopMenu } from "../index";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full px-4 md:px-5 lg:px-6 xl:px-7 py-3 text-gray-800 bg-gray-50 shadow">
      <nav className="flex items-center justify-between">
        <Logo />

        <MobileMenu />

        <DesktopMenu />
      </nav>
    </header>
  );
}

