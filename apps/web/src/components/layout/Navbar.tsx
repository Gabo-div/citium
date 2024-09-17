import Image from "next/image";
import Logo from "@/assets/logo.svg";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Navbar() {
  return (
    <nav className="absolute top-0 z-50 w-full border-b">
      <div className="container mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Image
          src={Logo}
          width={150}
          height={72}
          alt="logo"
          className="h-auto w-24 md:w-32"
        />
        <div className="flex items-center gap-4">
          <Link
            className="text-sm font-bold text-zinc-500 md:text-base"
            href="#home"
          >
            Inicio
          </Link>
          <Link
            className="text-sm font-bold text-zinc-500 md:text-base"
            href="#services"
          >
            Servicios
          </Link>
          <Link
            className="text-sm font-bold text-zinc-500 md:text-base"
            href="#contact"
          >
            Contacto
          </Link>
        </div>
        <Button asChild className="hidden font-bold md:block">
          <Link href="#contact">Empieza tu proyecto</Link>
        </Button>
      </div>
    </nav>
  );
}
