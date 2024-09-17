"use client";

import AtenasImage from "@/assets/hero.jpg";
import { Button } from "../ui/button";
import {
  ArrowLeft,
  ArrowRight,
  CalendarPlus,
  LockKeyhole,
  RotateCw,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function HeroDesktopMockup() {
  return (
    <div className="absolute left-[300px] top-0 -z-10 h-[570px] w-[975px] rounded-3xl border bg-zinc-200 p-[3px] shadow-lg">
      <div className="relative h-full w-full overflow-hidden rounded-2xl border bg-white">
        <div className="flex h-full w-full flex-col">
          <div
            style={
              {
                "--atenas-image": `url(${AtenasImage.src})`,
              } as React.CSSProperties
            }
            className="absolute left-0 top-0 h-3/5 w-full bg-[image:var(--atenas-image)] bg-cover bg-center brightness-50 grayscale"
          ></div>

          <div className="relative z-10 flex h-3/5 flex-col p-4">
            <div className="absolute left-0 top-0 z-10 flex w-full items-center space-x-4 border-b bg-white px-6 py-3">
              <ArrowLeft className="size-4" />
              <ArrowRight className="size-4" />
              <RotateCw className="size-4" />
              <div className="flex h-8 flex-1 items-center rounded-full bg-zinc-200 px-4">
                <LockKeyhole className="size-4" />
                <p className="ml-2 text-sm">www.tupaginaweb.com</p>
              </div>
            </div>
            <div className="mt-auto flex flex-col items-center">
              <h1 className="text-4xl font-bold text-white">Atenas</h1>
              <p className="mb-4 font-medium text-white">Capital de Grecia</p>
              <Button variant="secondary" size="sm">
                <CalendarPlus className="mr-2 size-4" />
                Añadir al itinerario
              </Button>
            </div>
          </div>

          <div className="flex h-2/5 flex-col items-center p-4">
            <h1 className="font-bold">Reseñas</h1>
            <p className="mb-4 text-sm">Clientes que han visitado Atenas.</p>
            <div className="flex items-center">
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
            <div className="mt-6 flex items-center justify-center">
              <Avatar className="size-14">
                <AvatarImage src="" />
                <AvatarFallback>GH</AvatarFallback>
              </Avatar>
              <div className="ml-4 flex flex-col">
                <h2 className="font-bold">Gabriel Hernandez</h2>
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
