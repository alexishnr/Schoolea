import { db } from './firebase';

// User API

export const doCreateUser = (id, username, email, statut, name, lastname) =>
  db.ref(`users/${id}`).set({
    username,
    email,
    statut,
    name,
    lastname
  });

export const updateUser = (id, email, statut, name, lastname) =>
  db.ref(`users/${id}`).update({
    email,
    statut,
    name,
    lastname
  });
