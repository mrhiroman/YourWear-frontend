/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClothType } from './ClothType';

export type AddOrderModel = {
    imageUrl?: string | null;
    editableObject?: string | null;
    cost?: number;
    clothType?: ClothType;
};
