/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { WearModel } from './WearModel';

export type UserInfoModel = {
    name?: string | null;
    email?: string | null;
    publishedWears?: Array<WearModel> | null;
};
