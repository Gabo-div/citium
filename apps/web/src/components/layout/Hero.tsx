import Link from "next/link";
import { Button } from "../ui/button";
import HeroDesktopMockup from "./HeroDesktopMockup";
import HeroPhoneMockup from "./HeroPhoneMockup";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <header id="home" className="relative flex h-screen overflow-hidden">
      <Navbar />
      <div className="flex h-full w-full items-center py-20">
        <div className="container mx-auto flex max-w-6xl px-4">
          <div className="mx-auto flex max-w-lg flex-col gap-6 lg:w-2/5">
            <h1 className="text-center font-serif text-2xl font-bold leading-tight sm:text-3xl md:text-4xl lg:text-left lg:text-6xl">
              Agencia especializada en desarrollo y diseño web
            </h1>
            <p className="text-center text-lg leading-tight text-zinc-500 md:text-xl lg:text-left lg:text-2xl">
              Transformamos tus ideas en realidades digitales. Tu imaginas,
              nosotros lo creamos.
            </p>
            <div className="flex w-full items-center justify-center gap-4 lg:justify-start">
              <Button asChild className="font-bold">
                <Link href="#contact">Empieza tu proyecto</Link>
              </Button>
            </div>
          </div>
          <div className="relative hidden w-3/5 items-center justify-center lg:flex">
            <HeroPhoneMockup />
            <HeroDesktopMockup />
          </div>
        </div>
      </div>
    </header>
  );
}
