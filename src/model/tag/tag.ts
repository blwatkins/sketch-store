/*
 * Copyright (c) 2026 Brittni Watkins.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"),
 * to deal in the Software without restriction, including without limitation
 * the rights to use, copy, modify, merge, publish, distribute, sublicense,
 * and/or sell copies of the Software, and to permit persons to whom
 * the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included
 * in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE
 * AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
 * ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * SPDX-License-Identifier: MIT
 */

import { Type, Static } from 'typebox';

import { StringUtility } from '@blwatkins/utils';

import { entitySchema } from '../entity';

export const minTags: 1 = 1 as const;

export const maxTags: 32 = 32 as const;

export const maxTagLength: 64 = 64 as const;

export const tagNameConfig = {
    pattern: StringUtility.singleLineTrimmedPattern,
    maxLength: maxTagLength
};

export const tagsArraySchema = Type.Array(
    Type.String(tagNameConfig),
    {
        minItems: minTags,
        maxItems: maxTags,
        uniqueItems: true
    }
);

export const tagSchema = Type.Intersect([
    entitySchema,
    Type.Object(
        {
            name: Type.Readonly(
                Type.String(tagNameConfig)
            )
        },
        { additionalProperties: false }
    )
]);

export type Tag = Static<typeof tagSchema>;
