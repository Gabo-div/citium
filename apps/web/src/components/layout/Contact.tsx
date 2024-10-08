import ContactForm from "./ContactForm";

export default function Contact() {
  return (
    <section id="contact" className="py-32">
      <div className="container mx-auto flex max-w-6xl flex-wrap px-4">
        <div className="mx-auto mb-6 flex max-w-3xl flex-col p-0 lg:mx-0 lg:mb-4 lg:w-1/2 lg:pr-4">
          <h1 className="text-center font-serif text-2xl font-bold leading-tight md:text-3xl lg:text-left lg:text-5xl">
            ¡Cuéntanos tu idea!
          </h1>
          <p className="mt-4 text-center leading-tight text-zinc-500 md:text-lg lg:text-left lg:text-xl">
            Estamos emocionados de escuchar sobre tu proyecto. Ya sea que
            necesites un rediseño completo de tu sitio web, renovarlo, o
            cualquier solución digital, estamos aquí para ayudarte a convertir
            tu visión en realidad.
          </p>
        </div>
        <div className="mx-auto flex max-w-3xl flex-1 justify-center p-0 lg:mx-0 lg:w-1/2 lg:pl-4">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
