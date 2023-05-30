/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginUserModel } from '../models/LoginUserModel';
import type { RegisterUserModel } from '../models/RegisterUserModel';
import type { UserInfoModel } from '../models/UserInfoModel';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiLogin(
requestBody?: LoginUserModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiRegister(
requestBody?: RegisterUserModel,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody 
     * @returns any Success
     * @throws ApiError
     */
    public static postApiRefresh(
requestBody?: string,
): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/refresh',
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @returns UserInfoModel Success
     * @throws ApiError
     */
    public static getApiInfo(): CancelablePromise<UserInfoModel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/info',
        });
    }

}
