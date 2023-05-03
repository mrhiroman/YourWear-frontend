/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ClothType } from './ClothType';

export type AddWearModel = {
    name?: string | null;
    imageUrl?: string | null;
    editableObject?: string | null;
    clothType?: ClothType;
};
