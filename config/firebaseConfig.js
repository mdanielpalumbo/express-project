import admin from 'firebase-admin'


admin.initializeApp({
  credential: admin.credential.cert('./config/firebase.json')
});


const db = admin.firestore()

console.log('conectado a base de datos firebase')

export default db