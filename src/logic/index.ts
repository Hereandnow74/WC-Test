import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore/lite'

export * from './toggles'
export * from './misc'
export * from './perksLogic'

const app = initializeApp({
  apiKey: 'AIzaSyDpZ7zOTs_IRFs1_OQLR9T45tGl2hOkt5Y',
  authDomain: 'waifu-catalog.firebaseapp.com',
  projectId: 'waifu-catalog',
  storageBucket: 'waifu-catalog.appspot.com',
  messagingSenderId: '737852257331',
  appId: '1:737852257331:web:23b6b85a56fe8776a75f46',
  measurementId: 'G-21TPKY0M0Y',
})

const db = getFirestore(app)

export function proposeWorld(world: any) {
  try {
    addDoc(collection(db, 'worlds'), world).then(docRef => console.log(`Successfully proposed world id: ${docRef.id}`))
  }
  catch (e) {
    console.error('Error proposing a world: ', e)
  }
}

export function proposeCompanion(companion: any) {
  try {
    addDoc(collection(db, 'companions'), companion).then(docRef => console.log(`Successfully proposed companion id: ${docRef.id}`))
  }
  catch (e) {
    console.error('Error proposing a companion: ', e)
  }
}

export function proposeRide(ride: any) {
  try {
    addDoc(collection(db, 'rides'), ride).then(docRef => console.log(`Successfully proposed ride id: ${docRef.id}`))
  }
  catch (e) {
    console.error('Error proposing a ride: ', e)
  }
}

export function proposePerk(perk: any, callback: any) {
  try {
    addDoc(collection(db, 'perks'), perk).then(callback)
  }
  catch (e) {
    console.error('Error proposing a perk: ', e)
  }
}

export function shareLink(buildData: any, callback: any) {
  try {
    addDoc(collection(db, 'builds'), buildData).then(callback)
  }
  catch (e) {
    console.error('Error proposing a companion: ', e)
  }
}

export function getBuild(id: string, callback: any) {
  const docRef = doc(db, 'builds', id)
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) callback(docSnap.data())
    else callback()
  })
}

export function getBuilds(callback: any) {
  const docRef = doc(db, 'buildsList', 'currentList')
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) callback(docSnap.data())
    else callback()
  })
}
