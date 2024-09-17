"use client";

import AtenasImage from "@/assets/hero.jpg";
import { Button } from "../ui/button";
import { ArrowLeft, CalendarPlus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeroPhoneMockup() {
  return (
    <div className="z-10 mt-[70px] h-[550px] w-[270px] rounded-[36px] border bg-zinc-200 p-[3px] shadow-lg">
      <div className="relative h-full w-full overflow-hidden rounded-[32px] border bg-white">
        <div className="flex h-full w-full flex-col">
          <div
            style={
              {
                "--atenas-image": `url(${AtenasImage.src})`,
              } as React.CSSProperties
            }
            className="absolute left-0 top-0 h-3/5 w-full bg-[image:var(--atenas-image)] bg-cover bg-center brightness-50 grayscale"
          ></div>

          <div className="z-10 flex h-3/5 flex-col p-4">
            <Button className="rounded-full" variant="secondary" size="icon">
              <ArrowLeft className="size-4" />
            </Button>
            <h1 className="mt-auto text-4xl font-bold text-white">Atenas</h1>
            <p className="mb-4 font-medium text-white">Capital de Grecia</p>
            <Button variant="secondary" size="sm" className="w-full">
              <CalendarPlus className="mr-2 size-4" />
              Añadir al itinerario
            </Button>
          </div>

          <div className="flex h-2/5 flex-col items-center p-4">
            <h1 className="font-bold">Reseñas</h1>
            <p className="mb-4 text-sm">Clientes que han visitado Atenas.</p>
            <div className="flex w-full items-center">
              <Button size="sm" className="w-1/2 rounded-r-none border-r-0">
                Positivas
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="w-1/2 rounded-l-none"
              >
                Negativas
              </Button>
            </div>
            <div className="mt-4 flex items-center justify-center">
              <Avatar className="size-12">
                <AvatarImage src="" />
                <AvatarFallback>GH</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex flex-col">
                <h2 className="mb-1 text-sm font-bold">Gabriel Hernandez</h2>
                <p className="text-xs text-zinc-400">
                  Me gusta Atenas, es un lugar muy bonito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
