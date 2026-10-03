"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

export default function Home() {
  const [itens, setItens] = useState<{ id: string, nome: string }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItens() {
      try {
        // Vai à coleção "itens" no Firestore e busca todos os documentos
        const querySnapshot = await getDocs(collection(db, "itens"));
        const lista: { id: string, nome: string }[] = [];
        
        querySnapshot.forEach((doc) => {
          lista.push({ id: doc.id, nome: doc.data().nome });
        });
        
        setItens(lista);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchItens();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-zinc-50 dark:bg-black">
      <h1 className="text-3xl font-bold mb-8 text-black dark:text-white">
        Os Meus Itens na Nuvem
      </h1>
      
      {loading ? (
        <p className="text-zinc-600 dark:text-zinc-400">A carregar dados do Firebase...</p>
      ) : itens.length === 0 ? (
        <p className="text-zinc-600 dark:text-zinc-400">Nenhum item encontrado.</p>
      ) : (
        <ul className="flex flex-col gap-4 w-full max-w-md">
          {itens.map((item) => (
            <li 
              key={item.id} 
              className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm text-black dark:text-zinc-100 bg-white dark:bg-zinc-900 text-center font-medium"
            >
              {item.nome}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}