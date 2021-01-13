import { fakeDb } from "../db/FakeDatabase"
import { generateId } from "../utils/GenerateId"

class BurgersService {
  get() {
    return fakeDb.burgers
  }
  getOne(id) {
    return fakeDb.burgers.find(burger => burger.id == id)
  }
  create(body) {
    body.id = generateId()
    fakeDb.burgers.push(body)
    return body
  }
  change(id, body) {
    let index = fakeDb.burgers.findIndex(burger => burger.id == id)
    for (const [key, value] of Object.entries(body)) {
      if (fakeDb.burgers[index][key] && key !== "id") {
        fakeDb.burgers[index][key] = value
      }
    }
    return fakeDb.burgers[index]
  }
  delete(id) {
    fakeDb.burgers = fakeDb.burgers.filter(burger => burger.id !== id)
    return `Burger with ID "${id}" has been deleted.`
  }
}

export const burgersService = new BurgersService()