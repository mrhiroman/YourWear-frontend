/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { CategoryModel } from './CategoryModel';
import type { OrderStatus } from './OrderStatus';

export type OrderModel = {
    id?: number;
    imageUrl?: string | null;
    editableObject?: string | null;
    orderStatus?: OrderStatus;
    cost?: number;
    category?: CategoryModel;
    creatorId?: number;
    creatorName?: string | null;
};
