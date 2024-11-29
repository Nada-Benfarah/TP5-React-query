import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { fetchUsers } from "../services/api"; // Assurez-vous que la fonction fetchUsers est correcte

// Fonction pour créer un utilisateur
const createUser = async (newUser) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users", {
    method: "POST",
    body: JSON.stringify(newUser),
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Erreur lors de la création de l'utilisateur");
  }
  return response.json();
};

const UserList = () => {
  // Utilisation de useQuery pour récupérer les utilisateurs
  const { data, isLoading, isError, error, refetch } = useQuery(
    ["users"],
    fetchUsers
  );

  // Utilisation de useMutation pour créer un utilisateur
  const { mutate } = useMutation(createUser, {
    onSuccess: () => {
      // Rafraîchir la liste des utilisateurs après l'ajout d'un nouvel utilisateur
      refetch();
    },
  });

  const handleCreateUser = () => {
    const newUser = {
      name: "Nouvel Utilisateur",
      email: "nouveau@example.com",
    };
    mutate(newUser); // Ajouter l'utilisateur
  };

  return (
    <div>
      <h1>Liste des Utilisateurs</h1>
      <button onClick={handleCreateUser}>Créer un utilisateur</button>
      {isLoading && <div>Chargement...</div>}
      {isError && <div>Erreur : {error.message}</div>}
      <ul>
        {data?.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
