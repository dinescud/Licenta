// import { UserModel } from "../../models/lib/UserModel";
// import { UserModelType } from "../../models/types";
// import { ResourceWithPagination, UserBrowseFilter, UserDeleteFilter } from "../../types";
// import { formatPaginationFilter } from "../utils";

// export class UserLib {
//     private userModel: UserModel;

//     constructor(model: UserModel) {
//         this.userModel = model;
//     }

//     async findUsers(filter: UserBrowseFilter): Promise<ResourceWithPagination<UserModelType>> {
//         const pagination = formatPaginationFilter(filter.pagination);

//         return this.userModel.findWithPagination(pagination, filter, filter.populate);
//     }

//     async deleteUsers(filter: UserDeleteFilter): Promise<number> {
//         const query: object = {
//             _id: {
//                 $in: filter.ids || [],
//             }
//         };

//         return this.userModel.deleteMany(query)
//             .then(result => result.deletedCount);
//     }
// }