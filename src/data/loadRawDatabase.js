import { openDB, deleteDB } from 'idb'
import defaultQuiz from './defaultQuiz'

const DB_RAW = async () => {
  const dbName = 'appdb'
  const storeName = 'store1'
  const version = 1 //versions start at 1
  return await openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction) {
      const store = db.createObjectStore(storeName)
    },
  })
}

export default DB_RAW
