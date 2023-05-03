/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClothType } from './ClothType';
import type { OrderStatus } from './OrderStatus';

export type OrderModel = {
    id?: number;
    imageUrl?: string | null;
    editableObject?: string | null;
    orderStatus?: OrderStatus;
    cost?: number;
    clothType?: ClothType;
    creatorId?: number;
    creatorName?: string | null;
};
