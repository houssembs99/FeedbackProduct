import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';

const GET_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
    }
  }
`;

export default function UserList({ key }) {
  const { loading, error, data, refetch } = useQuery(GET_USERS);

  // Lorsque la key change, on refait une requête
  useEffect(() => {
    refetch();
  }, [key, refetch]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  return (
    <ul>
      {data.getAllUsers.map(user => (
        <li key={user.id}>{user.name} - {user.email}</li>
      ))}
    </ul>
  );
}
