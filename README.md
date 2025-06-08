# FeedbackProduct - Backend GraphQL

Ce projet permet à une entreprise SaaS de recueillir des feedbacks utilisateurs sur ses produits numériques.

## Technologies utilisées
- Node.js
- Apollo Server (GraphQL)
- React + Apollo Client (Frontend)

## Fonctionnalités GraphQL

### Queries
- `getAllUsers`: Liste des utilisateurs
- `getAllProducts`: Liste des produits
- `getProduct(id: ID!)`
- `getFeedbackByProduct(productId: ID!)`
- `getFeedbackByUser(userId: ID!)`

### Mutations
- `createUser(name, email)`
- `createProduct(name, description)`
- `createFeedback(userId, productId, rating, comment)`

## Exemple de requête
```graphql
query {
  getAllProducts {
    id
    name
    averageRating
    feedbacks {
      rating
      comment
    }
  }
}



