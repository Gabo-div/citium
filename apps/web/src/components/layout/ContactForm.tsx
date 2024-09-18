"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "El nombre es obligatorio")
    .max(50, "El nombre no puede tener más de 50 caracteres"),
  email: z
    .string()
    .min(1, "El email es obligatorio")
    .email("El email debe válido"),
  message: z
    .string()
    .min(1, "El mensaje es obligatorio")
    .max(500, "El mensaje no puede tener más de 500 caracteres"),
});

export default function ContactForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("message", data.message);

    const result = await fetch("https://formspree.io/f/mjkbqbla", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    form.reset();

    if (!result.ok) {
      toast({
        title: "¡Ups! Algo salió mal.",
        description: "Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "¡Gracias por tu mensaje!",
      description: "Te responderemos lo antes posible.",
    });
  };

  return (
    <Card className="flex w-full flex-col items-center p-8">
      <h2 className="mb-8 text-2xl font-bold lg:text-3xl">
        Describe tu proyecto
      </h2>
      <Form {...form}>
        <form
          className="flex w-full flex-col space-y-4"
          autoComplete="off"
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Input {...field} placeholder="john@doe.com" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <Textarea
                  {...field}
                  rows={6}
                  className="resize-none"
                  placeholder="Escribe tu mensaje"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Enviar</Button>
        </form>
      </Form>
    </Card>
  );
}
