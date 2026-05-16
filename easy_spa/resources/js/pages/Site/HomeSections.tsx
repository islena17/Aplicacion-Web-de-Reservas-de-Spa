import { Weight } from "lucide-react"

export default function HomeSections() {
  return (
    <>
      <section className="px-6 py-20 bg-white">
        <div className="mx-auto max-w-6xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
            Cómo funciona
          </span>

          <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
            Reserva tu experiencia en pocos pasos
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            Elige el servicio, selecciona fecha y hora, confirma tu reserva y
            recibe todos los detalles al instante.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {[
              {
                number: "01",
                title: "Elige un servicio",
                text: "Explora tratamientos, masajes y experiencias disponibles.",
              },
              {
                number: "02",
                title: "Selecciona fecha y hora",
                text: "Consulta la disponibilidad y reserva el horario que prefieras.",
              },
              {
                number: "03",
                title: "Confirma tu reserva",
                text: "Recibe una confirmación con los detalles de tu cita.",
              },
              {
                number: "04",
                title: "Disfruta",
                text: "Acude al spa y vive tu momento de relax.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="rounded-2xl border border-gray-100 bg-gray-50 p-6 text-left shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold text-white" style={{background: 'var(--color-main)', fontWeight: '700'}}>
                  {item.number}
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}