import { Request } from "express";
import { UserModelType } from "./models/types";

export interface UserContext {
    id: string;
    email: string;
}

// QueryFilter

export interface QueryPaginationFilter {
    fromItem?: number;
    pageSize?: number;
    orderBy?: string;
    orderDir?: 'asc' | 'desc';
}

export interface ResourceWithPagination<T> {
    result: T[];
    pagination: {
        fromItem: number;
        perPage: number;
        count: number;
        totalPages: number;
        totalCount: number;
    }
}

export interface UserDeleteFilter {
    ids?: string[];
}

export interface UserBrowseFilter extends with_text_optional, with_populate_optional {
    _id?: string;
    pagination?: QueryPaginationFilter;
}

export interface DomainBrowseFilter extends with_populate_optional, with_text_optional {
    _id?: string;
    name?: string;
    score?: string;
    pagination?: QueryPaginationFilter;
}

interface with_text_optional {
    text?: string;
}

interface with_populate_optional {
    populate?: boolean;
}

export interface UserDeleteResponse {
    deleteCount: number;
}

// Requests

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    // id: string;
    externalId: string;
    email: string;
    // password: string;
    // confirmPassword: string;
}

export interface UserInfo extends Partial<UserModelType> {
    // fullName: string;
    // // password: string;
    // email: string;
    // id: string;
}

export interface RequestWrapper extends Request { 
    userContext?: UserContext;
}

export interface ScanRequest { 
    url: string;
}

export interface HistoryRequest {
    externalId: string;
}

export interface UserRequest {
    externalId: string;
}

export interface StatisticsRequest {
    externalId: string;
    timeSpan: string; 
}