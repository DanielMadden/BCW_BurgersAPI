import { generateId } from "../utils/GenerateId"

class FakeDatabase {
  constructor() {
    this.burgers = [
      {
        name: "yummy burrrgurrrr",
        description: "it is very yummmeeee",
        id: generateId()
      }
    ]
  }
}

export const fakeDb = new FakeDatabase()