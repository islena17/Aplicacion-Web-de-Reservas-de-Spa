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

      <section className="px-6 py-20" style={{ background: 'var(--bg-soft)'}}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div>
            <span className="text-sm font-semibold uppercase tracking-wide" style={{color: 'var(--color-secondary)', fontWeight: '800'}}>
              Para empresas
            </span>

            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              ¿Eres una empresa?
            </h2>

            <p className="mt-5 text-gray-600 leading-7">
              Digitaliza la gestión de tu spa con una plataforma pensada para
              controlar reservas, empleados, servicios y disponibilidad desde un
              único lugar.
            </p>

            <button className="mt-8 rounded-full px-6 py-3 font-medium text-white transition hover:bg-emerald-700" style={{background: 'var(--color-secondary)'}}>
              Contactanos
            </button>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <div className="space-y-6">
              {[
                {
                  title: "Realizar y gestionar reservas",
                  text: "Administra las citas de tus clientes de forma rápida y organizada.",
                },
                {
                  title: "Controlar el calendario de empleados",
                  text: "Gestiona horarios, disponibilidad y asignación de trabajadores.",
                },
                {
                  title: "Controlar tus servicios",
                  text: "Crea, edita y organiza tratamientos, precios y duración.",
                },
                {
                  title: "Evitar solapamientos",
                  text: "Reduce errores y mejora la organización diaria del negocio.",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white" style={{background: 'var(--color-secondary)', fontWeight: '700'}} >
                    ✓
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}