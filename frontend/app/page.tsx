"use function";
"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Home() {
  const [dados, setDados] = useState<{ status: string; items: { id: string, nome: string }[] }>({ status: "loading", items: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedItems: { id: string, nome: string }[] = [];

        // Verifica a fonte de dados pela variável de ambiente
        if (process.env.NEXT_PUBLIC_DATA_SOURCE === 'firestore') {
          const querySnapshot = await getDocs(collection(db, "items"));
          querySnapshot.forEach((doc) => {
            fetchedItems.push({ id: doc.id, nome: doc.data().nome });
          });
        }

        // Formato exato exigido no guião
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
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
        Emulador Firestore (Checkpoint 3)
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
              className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg text-black dark:text-zinc-100 bg-white dark:bg-zinc-900 text-center"
            >
              {item.nome}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}