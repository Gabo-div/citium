import Image from "next/image";
import Logo from "@/assets/logo.svg";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-12">
        <div className="flex w-full flex-col items-center justify-between gap-4 md:flex-row md:gap-0">
          <Image
            src={Logo}
            width={150}
            height={72}
            alt="logo"
            className="invert"
          />
          <p className="text-sm font-medium text-white">
            &copy; 2024 - Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
