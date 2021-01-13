import { burgersService } from "../services/BurgersService";
import BaseController from "../utils/BaseController";

export class BurgersController extends BaseController {
  constructor() {
    super("api/burgers");
    this.router
      .get("/model", this.getModel)
      .get("", this.get)
      .get("/:id", this.getOne)
      .post("", this.create)
      .put("/:id", this.change)
      .delete("/:id", this.delete)
  }
  async getModel(_, res, next) {
    try {
      let model = {
        "name": {
          "type": "string",
          "required": true
        },
        "description": {
          "type": "string",
          "required": true
        },
        "ingredients": {
          "type": "array",
          "required": false
        },
        "notes": {
          "type": "string",
          "required": false
        },
        "id": {
          "type": "string",
          "required": false
        }
      }
      res.send(model)
    } catch (error) {
      next(error);
    }
  }
  async get(_, res, next) {
    try {
      res.send(burgersService.get())
    } catch (error) {
      next(error);
    }
  }
  async getOne(req, res, next) {
    try {
      res.send(burgersService.getOne(req.params.id))
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let checkData = {
        "name": [" ", true],
        "description": [" ", true],
        "ingredients": [[], false],
        "notes": [" ", false]
      }
      let acceptedData = {}
      for (const [key, value] of Object.entries(req.body)) {
        if (checkData[key] && typeof checkData[key][0] == typeof value) {
          acceptedData[key] = value
          if (checkData[key][1]) checkData[key][1] = false
        }
      }
      let missesArr = Object.entries(checkData).filter(([key, [type, needed]]) => needed == true)
      let missesObj = {
        "message": "You either didn't pass a required key or passed it with improper data. The following properties show the required keys and their required form of data."
      }
      missesArr.forEach(([key, [type, needed]]) => missesObj[key] = typeof type)

      if (missesArr.length < 1) {
        res.send(burgersService.create(acceptedData))
      } else res.send(missesObj)
    } catch (error) {
      next(error);
    }
  }
  async change(req, res, next) {
    try {
      res.send(burgersService.change(req.params.id, req.body))
    } catch (error) {
      next(error);
    }
  }
  async delete(req, res, next) {
    try {
      res.send(burgersService.delete(req.params.id))
    } catch (error) {
      next(error);
    }
  }
}