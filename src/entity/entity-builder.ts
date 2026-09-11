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

import { NumberUtility, StringUtility } from '@blwatkins/utils';

import { Entity } from './entity';

export abstract class EntityBuilder {
    #id: number = 0;
    #uuid: string = '';
    #isHidden: boolean = false;
    #description: string | undefined = undefined;

    protected constructor() {}

    public setId(id: number): this {
        NumberUtility.assertPositiveInteger(id);
        this.#id = id;
        return this;
    }

    public setUUID(uuid: string): this {
        StringUtility.assertSingleLineTrimmedString(uuid);
        this.#uuid = uuid;
        return this;
    }

    public setHidden(isHidden: boolean): this {
        // TODO - assert boolean type
        this.#isHidden = isHidden;
        return this;
    }

    public setDescription(description: string | undefined): this {
        if (description !== undefined) {
            StringUtility.assertStringType(description);
        }

        this.#description = description;
        return this;
    }

    protected build(): Entity {
        return {
            id: this.#id,
            uuid: this.#uuid,
            isHidden: this.#isHidden,
            description: this.#description,
        };
    }
}
