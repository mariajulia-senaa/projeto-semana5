"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase"; // Certifica-te que este caminho está correto

export default function Home() {
  const [dados, setDados] = useState<{ status: string; items: { id: string, nome: string }[] }>({ status: "loading", items: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedItems: { id: string, nome: string }[] = [];

        // Fomos buscar os dados diretamente sem o IF da variável de ambiente
        const querySnapshot = await getDocs(collection(db, "items"));
        querySnapshot.forEach((doc) => {
          fetchedItems.push({ id: doc.id, nome: doc.data().nome });
        });

        setDados({ status: "ok", items: fetchedItems });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setDados({ status: "error", items: [] });
      }
    }

    fetchData();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-50 dark:bg-black">
      {/* Título alterado para a Versão B exigida no guião */}
      <h1 className="text-3xl font-bold mb-8 text-blue-500 dark:text-blue-400">
        Produção Firestore (Versão B)
      </h1>
      
      {dados.status === "loading" ? (
        <p className="text-zinc-600 dark:text-zinc-400">A carregar dados...</p>
      ) : dados.items.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">Nenhum item na semente ainda.</p>
      ) : (
        <ul className="flex flex-col gap-4 w-full max-w-md">
          {dados.items.map((item) => (
            <li 
              key={item.id} 
              className="p-4 border border-blue-200 dark:border-blue-800 rounded-lg text-black dark:text-zinc-100 bg-white dark:bg-zinc-900 text-center"
            >
              {item.nome}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}