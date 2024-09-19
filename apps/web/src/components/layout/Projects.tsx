import Image, { StaticImageData } from "next/image";
import { Card } from "../ui/card";

import CudiImage from "@/assets/projects/cudi.png";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

type Project = {
  title: string;
  image: StaticImageData;
  description: string;
  url: string;
};

export default function Projects() {
  const projects: Project[] = [
    {
      title: "CUDI",
      image: CudiImage,
      url: "https://www.cudicoders.dev",
      description:
        "CUDI es una plataforma innovadora que conecta a programadores universitarios apasionados por la tecnología y la innovación. A través de eventos, talleres y hackathons, ofrece oportunidades únicas para el desarrollo profesional y personal.",
    },
  ];

  return (
    <section id="projects" className="py-32">
      <div className="container mx-auto flex max-w-6xl flex-col items-center px-4">
        <div className="mt-20 flex max-w-xl flex-col items-center justify-center gap-4 text-center">
          <h1 className="font-serif text-2xl font-bold sm:text-3xl md:text-4xl">
            Nuestros Proyectos
          </h1>
          <p className="leading-tight text-zinc-500 md:text-xl">
            Cada uno de nuestros proyectos refleja nuestro compromiso con la
            calidad, la innovación y la satisfacción del cliente. Aquí te
            presentamos algunos de nuestros trabajos más destacados:
          </p>
        </div>
        <div className="flex w-full flex-col gap-4 py-20">
          {projects.map((project, index) => (
            <Link
              key={index}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card
                key={index}
                className="flex flex-wrap overflow-hidden rounded-xl border border-zinc-300 bg-zinc-50 shadow-md group-hover:border-blue-200 group-hover:bg-blue-50/20"
              >
                <div className="w-full p-4 md:w-1/2">
                  <h2 className="mb-2 flex items-center font-serif text-2xl font-bold group-hover:text-blue-600">
                    {project.title}

                    <ExternalLink className="ml-2 transition-all group-hover:-translate-y-1" />
                  </h2>
                  <p className="text-zinc-500">{project.description}</p>
                </div>
                <div className="w-full p-4 md:w-1/2">
                  <Image
                    src={project.image}
                    width={600}
                    height={316}
                    alt="atenas"
                    className="w-full rounded-xl object-cover"
                  />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
