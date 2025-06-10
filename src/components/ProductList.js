import React from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      name
      description
    }
  }
`;

export default function ProductList() {
  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    pollInterval: 3000, // <-- interroge le serveur toutes les 3 secondes
    fetchPolicy: 'network-only' // <-- s'assure que les données sont toujours fraîches
  });

  if (loading) return <p>Chargement des produits...</p>;
  if (error) return <p>Erreur: {error.message}</p>;

  if (!data?.getAllProducts?.length) return <p>Aucun produit trouvé.</p>;

  return (
    <ul>
      {data.getAllProducts.map(product => (
        <li key={product.id}>
          <strong>{product.name}</strong>: {product.description}
        </li>
      ))}
    </ul>
  );
}
