export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="w-full p-2 text-center text-xs md:text-sm font-thin text-gray-50 bg-gray-900"
    >
      <p>
        &copy; Copyright 2024. All Rights Reserved by&nbsp;
        <span className="font-normal">Blogg</span>.
      </p>
    </footer>
  );
}