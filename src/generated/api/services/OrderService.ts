/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOrderModel } from '../models/AddOrderModel';
import type { OrderModel } from '../models/OrderModel';
import type { UpdateOrderModel } from '../models/UpdateOrderModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrderService {

    /**
     * @param page 
     * @param limit 
     * @param category 
     * @returns OrderModel Success
     * @throws ApiError
     */
    public static getApiOrders(
page: number = -1,
limit: number = -1,
category: string = '',
): CancelablePromise<Array<OrderModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders',
            query: {
                'page': page,
                'limit': limit,
                'category': category,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiOrders(
requestBody?: AddOrderModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns OrderModel Success
     * @throws ApiError
     */
    public static getApiOrders1(
id: number,
): CancelablePromise<OrderModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiOrdersUpdate(
requestBody?: UpdateOrderModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/orders/update',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns OrderModel Success
     * @throws ApiError
     */
    public static getApiOrdersUndraft(
id: number,
): CancelablePromise<OrderModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/undraft/{id}',
            path: {
                'id': id,
            },
        });
    }

    /**
     * @param id 
     * @returns any Success
     * @throws ApiError
     */
    public static getApiOrdersGetobject(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders/getobject/{id}',
            path: {
                'id': id,
            },
        });
    }

}
