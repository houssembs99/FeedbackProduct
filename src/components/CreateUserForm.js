import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export default function CreateUserForm({ onCreated }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      setName('');
      setEmail('');
      setErrorMessage(null);
      if (onCreated) onCreated();
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation simple
    if (!name.trim() || !email.trim()) {
      setErrorMessage('Merci de remplir tous les champs.');
      return;
    }
    createUser({ variables: { name, email } });
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: 'auto' }}>
      <h3>Créer un utilisateur</h3>

      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Nom"
        required
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
        required
        style={{ width: '100%', padding: 8, marginBottom: 10 }}
      />

      {errorMessage && (
        <p style={{ color: 'red', marginBottom: 10 }}>{errorMessage}</p>
      )}

      <button type="submit" disabled={loading} style={{ padding: '10px 20px' }}>
        {loading ? 'Création...' : 'Ajouter'}
      </button>
    </form>
  );
}
