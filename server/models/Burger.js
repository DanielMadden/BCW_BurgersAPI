import { generateId } from "../utils/GenerateId"

export default class Burger {
  constructor(data) {
    this.name = data.name
    this.description = data.description
    this.id = generateId()
    this.signifier = "Hey so hopefully this worked"
  }
}