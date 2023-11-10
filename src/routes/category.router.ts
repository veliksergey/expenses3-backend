import express, {Request, Response} from "express";
import CategoryController from "../controllers/category.controller";
import {Category} from "@prisma/client";

const categoryRouter = express.Router();
const categoryCtrl = new CategoryController();

categoryRouter.get("/", async (req: Request, res: Response): Promise<Response> => {
  const categoryList = await categoryCtrl.getList();
  return res.status(200).json(categoryList);
});

categoryRouter.get("/:id", async (req, res) => {
  const id: number = +req.params.id || 0;
  const category = await categoryCtrl.getOne(id);
  if (!category) {
    return res.status(404).json({message: "category not found"});
  }
  return res.status(200).json(category);
});

categoryRouter.post("/", async (req: Request, res: Response): Promise<Response<Category>> => {
  const createdCategory = await categoryCtrl.create(req.body);
  return res.status(200).json(createdCategory);
});

categoryRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = +req.params.id || 0;

  // if no id provided
  if (!id) {
    return res.status(400).json({message: "no id was provided"});
  }

  const updatedCategory = await categoryCtrl.update(id, req.body);
  return res.status(200).json(updatedCategory);
});

categoryRouter.delete("/", async (req: Request, res: Response) => {
	const id = req.body.id || 0;

  if (!id) {
    return res.status(400).json({message: "no id was provided"});
  }

  const deleted: boolean | {message: string} = await categoryCtrl.delete(id);
  return res.status(200).json({deleted});
});

export default categoryRouter;