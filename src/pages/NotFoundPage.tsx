import { Link } from "react-router-dom";
import { usePageNotFound } from "../hooks/usePageNotFound";

export default function NotFoundPage() {
  usePageNotFound();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-10 text-center">
        <p className="text-7xl font-extrabold text-blue-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          Esta página no existe
        </h1>
        <p className="mt-2 text-slate-500">
          La dirección que buscas no se encontró o fue movida.
        </p>
        <Link
          to="/dashboard"
          className="inline-block mt-8 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
        >
          Volver al dashboard
        </Link>
      </div>
    </div>
  );
}