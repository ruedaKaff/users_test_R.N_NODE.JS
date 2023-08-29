import { Router } from "express";
import "dotenv/config.js"

import {findone, find, create, remove, update } from "./client_service.js";
import { trimMiddleware } from "../common/trimMiddelware.js";
const client = Router();

client.get(
    "/",
    find
);

client.get(
    "/:documento",
    findone
)

client.put('/:documento',trimMiddleware, async (req, res) => {
    
      findone(req, res)
      update(req.params.documento, req.body)
      
  });
  

client.post(
    "/", trimMiddleware,
    create
);

client.delete(
    "/:documento",
    remove
);

export {
    client
}