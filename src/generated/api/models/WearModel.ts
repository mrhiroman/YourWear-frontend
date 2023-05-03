/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClothType } from './ClothType';

export type WearModel = {
    id?: number;
    name?: string | null;
    imageUrl?: string | null;
    clothType?: ClothType;
    creatorId?: number;
    creatorName?: string | null;
};
