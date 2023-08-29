import express, {json} from "express";
import cors  from "cors";
import { client } from "./client/client_module.js"
import "dotenv/config.js";


const app = express();

app
    .use(cors())
    .use(json())
    .use("/cliente", client);

export {
    app
};