/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddOrderModel } from '../models/AddOrderModel';
import type { OrderModel } from '../models/OrderModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class OrderService {

    /**
     * @returns OrderModel Success
     * @throws ApiError
     */
    public static getApiOrders(): CancelablePromise<Array<OrderModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/orders',
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
