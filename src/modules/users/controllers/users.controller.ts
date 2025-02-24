import { ControllerBase } from "../../../core/ControllerBase.ts";
import { ResponseDecorator } from "../../../core/ResponseDecorator.ts";
import ApiResponse from "../../../utils/ApiResponse.ts";
import { Logger, type LoggerType } from "../../../utils/Logger.ts";
import type {
  BorrowBookCompleteProcessRequest,
  BorrowBookCompleteProcessResponse,
  BorrowBookRequest,
  BorrowBookResponse,
  CreateUserRequest,
  CreateUserResponse,
  GetUserResponse,
  ListUsersResponse,
} from "../schemas/users.schema.ts";
import type UserService from "../users.service.ts";

export default class UserController extends ControllerBase<UserService> {
  logger: LoggerType;
  constructor(service: UserService) {
    super(service);
    this.logger = Logger.createLogger("UserController");
  }
  async listUsers(): Promise<ApiResponse<ListUsersResponse>> {
    const res = await this.service.listUsers();
    return new ApiResponse(res);
  }

  async createUser(
    payload: CreateUserRequest
  ): Promise<ApiResponse<CreateUserResponse>> {
    const res = await ResponseDecorator<CreateUserResponse>(
      this.service.createUser(payload)
    );
    return res;
  }

  async getUser(id: string): Promise<ApiResponse<GetUserResponse>> {
    const res = await ResponseDecorator<GetUserResponse>(
      this.service.getUser(id)
    );
    return res;
  }

  async borrowBook(
    payload: BorrowBookRequest
  ): Promise<ApiResponse<BorrowBookResponse>> {
    const res = await ResponseDecorator<BorrowBookResponse>(
      this.service.borrowBook(payload)
    );
    return res;
  }

  async completeBorrow(
    payload: BorrowBookCompleteProcessRequest
  ): Promise<ApiResponse<BorrowBookCompleteProcessResponse>> {
    const res = await ResponseDecorator<BorrowBookCompleteProcessResponse>(
      this.service.completeBorrowProcess(payload)
    );
    return res;
  }
}
