import { Link } from "react-router-dom"
import Header from "../components/common/Header"

export default function NotFoundPage() {
    return (
        <main className="pt-14">
            <div class="text-center">
                <h1 class="text-9xl font-extrabold text-purple-600 tracking-wider">
                    404
                </h1>
                <h2 class="mt-4 text-3xl font-bold text-gray-800">
                    Oops! Página não encontrada.
                </h2>
                <p class="mt-4 text-gray-500">
                    Lamentamos, mas a página que você procura não existe ou foi movida.
                </p>
                <div className="mt-8">
                    <Link
                        to="/"
                        className="inline-block px-8 py-3 bg-purple-600 text-white font-semibold rounded-lg shadow-md hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        Voltar para a Página Inicial
                    </Link>
                </div>
            </div>
        </main>
    )
}