/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategoryModel } from './CategoryModel';

export type WearModel = {
    id?: number;
    name?: string | null;
    imageUrl?: string | null;
    category?: CategoryModel;
    creatorId?: number;
    creatorName?: string | null;
};
