import type { Request, Response, Router } from "express";
import { ValidateBody } from "../../middlewares/ValidatorMiddleware.ts";
import type BookController from "./controllers/books.controller.ts";
import { CreateBookValidation } from "./schemas/books.validations.ts";

const routes = (router: Router, controller: BookController) => {
  router.get("/", async (_, res: Response) => {
    const response = await controller.listBooks();
    res.json(response);
  });

  router.get("/:id", async (req: Request, res: Response) => {
    const response = await controller.getBook(req.params.id);
    res.json(response);
  });

  router.post(
    "/",
    ValidateBody(CreateBookValidation),
    async (req: Request, res: Response) => {
      const response = await controller.createBook(req.body);
      res.json(response);
    }
  );
};

export default routes;
