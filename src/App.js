import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './client';

import CreateUserForm from './components/CreateUserForm';
import CreateProductForm from './components/CreateProductForm';
import CreateFeedbackForm from './components/CreateFeedbackForm';
import UserList from './components/UserList';
import ProductList from './components/ProductList';
import FeedbacksByProduct from './components/FeedbacksByProduct';
import FeedbackList from './components/FeedbackList';

function App() {
  const [view, setView] = useState('home');
  const [refreshKey, setRefreshKey] = useState(0);

  // Permet de changer de vue et forcer le rechargement
  const changeView = (newView) => {
    setView(newView);
    setRefreshKey(prev => prev + 1); // re-render les listes
  };

  // Affichage dynamique selon la vue sélectionnée
  const renderView = () => {
    switch (view) {
      case 'userForm':
        return <CreateUserForm onCreated={() => changeView('userList')} />;
      case 'productForm':
        return <CreateProductForm onCreated={() => changeView('productList')} />;
      case 'feedbackForm':
        return <CreateFeedbackForm onCreated={() => changeView('feedbacksByProduct')} />;
      case 'userList':
        return <UserList key={refreshKey} />;
      case 'productList':
        return <ProductList key={refreshKey} />;
      case 'feedbacksByProduct':
        return <FeedbacksByProduct key={refreshKey} />;
      default:
        return <p style={{ fontSize: '18px' }}>Bienvenue dans le système de feedback 👋</p>;

      case 'feedbackList':
          return <FeedbackList />;
    }
  };

  return (
    <ApolloProvider client={client}>
      <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ textAlign: 'center', color: '#333' }}>📝 Système de Feedback</h1>

        <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'center', marginBottom: '30px' }}>
          <button onClick={() => changeView('userForm')}>Créer Utilisateur</button>
          <button onClick={() => changeView('productForm')}>Créer Produit</button>
          <button onClick={() => changeView('feedbackForm')}>Créer Feedback</button>
          <button onClick={() => changeView('userList')}>Voir Utilisateurs</button>
          <button onClick={() => changeView('productList')}>Voir Produits</button>
          <button onClick={() => changeView('feedbacksByProduct')}>Voir Feedbacks par Produit</button>
        </nav>

        <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '10px' }}>
          {renderView()}
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
