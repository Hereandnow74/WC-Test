import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc, doc, getDoc, runTransaction, query, getDocs, orderBy, limit, startAfter, deleteDoc } from 'firebase/firestore/lite'
import { useEvents } from './events'

export * from './toggles'
export * from './misc'
export * from './perksLogic'

// export const currentOnline = ref(0)

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

const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export const signIn = () => signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential?.accessToken
    // The signed-in user info.
    const user = result.user
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code
    const errorMessage = error.message
    // The email of the user's account used.
    const email = error.email
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error)
    console.error(errorCode, errorMessage, email, credential)
    // ...
  })

export function proposeWorld(world: any) {
  const { allEvents } = useEvents()
  try {
    addDoc(collection(db, 'worlds'), world).then(() => allEvents.emit({ id: Math.floor(Math.random() * 10000), time: Date.now(), message: 'Successfully sent world proposal.', type: 'success' }))
  }
  catch (e) {
    console.error('Error proposing a world: ', e)
  }
}

export function proposeCompanion(companion: any, func: (msg: string) => void) {
  try {
    addDoc(collection(db, 'companions'), companion).then(docRef => func('Successfully submitted companion'))
  }
  catch (e) {
    console.error('Error proposing a companion: ', e)
    func(`Error while submitting ${e}`)
  }
}

export function sendReportToServer(report: any, func: (msg: string) => void) {
  try {
    addDoc(collection(db, 'reports'), report).then(docRef => func('Successfully reported mistakes'))
  }
  catch (e) {
    console.error('Error proposing a report: ', e)
    func(`Error while submitting ${e}`)
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
export function proposeWaifuPerk(perk: any, callback: any) {
  try {
    addDoc(collection(db, 'waifuPerks'), perk).then(callback)
  }
  catch (e) {
    console.error('Error proposing a perk: ', e)
  }
}

export function proposeMission(mission: any, callback: any) {
  try {
    addDoc(collection(db, 'missions'), mission).then(callback)
  }
  catch (e) {
    console.error('Error proposing a mission: ', e)
  }
}
export function proposeFic(fic: any, callback: any) {
  try {
    addDoc(collection(db, 'fics'), fic).then(callback)
  }
  catch (e) {
    console.error('Error proposing a fic: ', e)
  }
}

export function shareLink(buildData: any, callback: any) {
  try {
    addDoc(collection(db, 'builds'), buildData).then(callback)
  }
  catch (e) {
    console.error('Error while sharing a link: ', e)
  }
}

export function saveBuildGlobally(buildData: any, callback: any) {
  try {
    addDoc(collection(db, 'shared'), buildData).then(callback)
  }
  catch (e) {
    console.error('Error while sharing a build: ', e)
  }
}

export function deleteSaveBuildGlobally(id: any) {
  try {
    deleteDoc(doc(db, 'shared', id))
  }
  catch (e) {
    console.error('Error while deleting a build: ', e)
  }
}

export function sendStats(statsData: any, callback: any) {
  try {
    addDoc(collection(db, 'stats'), statsData).then(callback)
  }
  catch (e) {
    console.error('Error while sending stats: ', e)
  }
}

export async function sendCount() {
  const docRef = doc(db, 'stats2', 'count')
  try {
    await runTransaction(db, async(transaction) => {
      const sfDoc = await transaction.get(docRef)
      if (!sfDoc.exists())
        throw 'Document does not exist!'

      // const newPopulation = sfDoc.data().population + 1
      transaction.update(docRef, { count: sfDoc.data().count + 1 })
    })
  }
  catch (e) {
    console.error('Transaction failed: ', e)
  }
}

export function getBuild(id: string, callback: any) {
  const docRef = doc(db, 'builds', id)
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) callback(docSnap.data())
    else callback()
  })
}
export function getAllBuilds(callback: any) {
  const docRef = collection(db, 'shared')
  getDocs(docRef).then((docSnap) => {
    const res = []
    docSnap.forEach(doc => res.push(doc.data()))
    callback(res)
  })
}

export function getBuilds(callback: any) {
  const docRef = doc(db, 'buildsList', 'currentList')
  getDoc(docRef).then((docSnap) => {
    if (docSnap.exists()) callback(docSnap.data())
    else callback()
  })
}

export function getBuildsQuery(callback: any, last = null) {
  const docRef = collection(db, 'shared')
  let q = null
  if (last)
    q = query(docRef, orderBy('date', 'desc'), startAfter(last), limit(15))
  else
    q = query(docRef, orderBy('date', 'desc'), limit(15))
  getDocs(q).then((docSnap) => {
    const result = []
    docSnap.forEach((x) => {
      if (x.exists()) {
        result.push([x.id, x.data()])
        last = x
      }
    })
    if (docSnap.empty)
      callback(result)
    else
      callback(result, last)
  })
}
