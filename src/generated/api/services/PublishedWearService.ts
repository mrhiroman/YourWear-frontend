/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddWearModel } from '../models/AddWearModel';
import type { WearModel } from '../models/WearModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PublishedWearService {

    /**
     * @returns WearModel Success
     * @throws ApiError
     */
    public static getApiWears(): CancelablePromise<Array<WearModel>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wears',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiWears(
requestBody?: AddWearModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/wears',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param id 
     * @returns WearModel Success
     * @throws ApiError
     */
    public static getApiWears1(
id: number,
): CancelablePromise<WearModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wears/{id}',
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
    public static getApiWearsGetobject(
id: number,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/wears/getobject/{id}',
            path: {
                'id': id,
            },
        });
    }

}
