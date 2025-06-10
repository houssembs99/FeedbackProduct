import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_PRODUCT = gql`
  mutation CreateProduct($name: String!, $description: String!) {
    createProduct(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export default function CreateProductForm({ onCreated }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({ variables: { name, description } });
      setName('');
      setDescription('');
      onCreated();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
      <h3>Créer un produit</h3>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom du produit"
        required
        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
      />
      <textarea
        value={description}
        onChange={e => setDescription(e.target.value)}
        placeholder="Description"
        required
        rows={4}
        style={{ width: '100%', padding: '8px', margin: '5px 0' }}
      />
      <button type="submit" disabled={loading} style={{ padding: '10px', marginTop: '10px' }}>
        {loading ? 'Création...' : 'Ajouter'}
      </button>
      {error && <p style={{ color: 'red' }}>Erreur: {error.message}</p>}
    </form>
  );
}
