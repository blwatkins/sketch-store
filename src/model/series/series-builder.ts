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

import { PrimitiveTypeError, StringUtility } from '@blwatkins/utils';

import { EntityBuilder } from '../entity';

import { Series } from './series';
import { SeriesUtility } from './series-utility';

export class SeriesBuilder extends EntityBuilder {
    #name: string = '';
    #isActive: boolean = true;
    #tags: string[] | undefined = undefined;

    public setName(name: string): this {
        StringUtility.assertSingleLineTrimmedString(name);
        this.#name = name;
        return this;
    }

    public setActive(isActive: boolean): this {
        // TODO - assertBoolean
        this.#isActive = isActive;
        return this;
    }

    public addTag(tag: string): this {
        StringUtility.assertSingleLineTrimmedString(tag);
        if (this.#tags === undefined) this.#tags = [];
        this.#tags.push(tag);
        return this;
    }

    public addTags(tags: string[]): this {
        const allSingleLine: boolean = tags.every((tag: string): boolean => {
            return StringUtility.isSingleLineTrimmedString(tag);
        });

        if (!allSingleLine) {
            throw new PrimitiveTypeError('All tags must be a single line string.');
        }

        if (this.#tags === undefined) this.#tags = [];
        this.#tags.push(...tags);
        return this;
    }

    public override build(): Series {
        const series: Series = {
            ...super.build(),
            name: this.#name,
            isActive: this.#isActive,
            tags: this.#tags
        };
        SeriesUtility.assertSeries(series);
        return series;
    }
}
