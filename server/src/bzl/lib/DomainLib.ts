import { DomainModel } from "../../models/lib/DomainModel";
import { DomainModelType } from "../../models/types";
import { DomainBrowseFilter, ResourceWithPagination, UserDeleteFilter } from "../../types";
import { formatPaginationFilter } from "../utils";

export class DomainLib {
    private domainModel: DomainModel;

    constructor(model: DomainModel) {
        this.domainModel = model;
    }

    async findUsers(filter: DomainBrowseFilter): Promise<ResourceWithPagination<DomainModelType>> {
        const pagination = formatPaginationFilter(filter.pagination);

        return this.domainModel.findWithPagination(pagination, filter, filter.populate);
    }

    async deleteUsers(filter: UserDeleteFilter): Promise<number> {
        const query: object = {
            _id: {
                $in: filter.ids || [],
            }
        };

        return this.domainModel.deleteMany(query)
            .then(result => result.deletedCount);
    }
}