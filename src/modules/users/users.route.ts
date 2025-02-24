import type { Request, Response, Router } from "express";
import {
  ValidateBody,
  ValidateMerged,
  ValidateParams,
} from "../../middlewares/ValidatorMiddleware.ts";
import type UserController from "./controllers/users.controller";
import {
  BorrowBookCompleteProcessValidation,
  BorrowBookValidation,
  CreateUserValidation,
} from "./schemas/users.validations.ts";

const routes = (router: Router, controller: UserController) => {
  router.get("/", async (_, res: Response) => {
    const response = await controller.listUsers();
    if (response.err) {
      res
        .status(response.err.code || 500)
        .json(response)
        .end();
    } else {
      res.json(response).end();
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    const response = await controller.getUser(req.params.id);
    if (response.err) {
      res
        .status(response.err.code || 500)
        .json(response)
        .end();
    } else {
      res.json(response).end();
    }
  });

  router.post(
    "/",
    ValidateBody(CreateUserValidation),
    async (req: Request, res: Response) => {
      const response = await controller.createUser(req.body);
      if (response.err) {
        res
          .status(response.err.code || 500)
          .json(response)
          .end();
      } else {
        res.json(response).end();
      }
    }
  );

  router.post(
    "/:userId/borrow/:bookId",
    ValidateParams(BorrowBookValidation),
    async (req: Request, res: Response) => {
      const response = await controller.borrowBook({
        userId: req.params.userId,
        bookId: req.params.bookId,
      });
      if (response.err) {
        res
          .status(response.err.code || 500)
          .json(response)
          .end();
      } else {
        res.json(response).end();
      }
    }
  );
  router.post(
    "/:userId/return/:bookId",
    ValidateMerged(BorrowBookCompleteProcessValidation),
    async (req: Request, res: Response) => {
      const response = await controller.completeBorrow({
        userId: req.params.userId,
        bookId: req.params.bookId,
        score: req.body.score,
      });
      if (response.err) {
        res
          .status(response.err.code || 500)
          .json(response)
          .end();
      } else {
        res.json(response).end();
      }
    }
  );
};

export default routes;
