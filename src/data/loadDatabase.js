import { openDB, deleteDB } from 'idb'
import defaultQuiz from './defaultQuiz'

// Load the database
const DB = async () => {
  const dbName = 'appdb'
  const storeName = 'store1'
  const version = 1 //versions start at 1
  const db = await openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const store = db.createObjectStore(storeName)
    },
  })
  const tx = db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)
  for (const [index, quiz] of defaultQuiz.entries()) {
    await store.put(quiz, index)
  }
  await tx.done
  return await db.transaction(storeName).objectStore(storeName).getAll()
}

export default DB
