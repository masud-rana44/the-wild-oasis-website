import "@/app/_styles/global.css";
import { Josefin_Sans } from "next/font/google";
import Logo from "./_components/Logo";
import Navigation from "./_components/Navigation";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | The Wild Oasis",
    default: "The Wild Oasis",
  },
  description: "Luxury cabin hotel located in the heart of the dhaka city.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 text-primary-100 min-h-screen ${josefin.className}`}
      >
        <header>
          <Logo />
          <Navigation />
        </header>

        <div>{children}</div>
      </body>
    </html>
  );
}
