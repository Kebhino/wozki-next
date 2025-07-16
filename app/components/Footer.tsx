export default function Footer() {
  return (
    <footer className="bg-white py-4 text-center rounded-b-[25px] overflow-hidden max-w-screen-lg mx-auto">
      <p className="text-sm text-[#00163E]">
        &copy; {new Date().getFullYear()} InstaCode. Wszystkie prawa
        zastrzeżone.
      </p>
    </footer>
  );
}
