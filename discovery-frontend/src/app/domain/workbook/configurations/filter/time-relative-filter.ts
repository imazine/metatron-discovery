/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as _ from 'lodash';
import {TimeFilter} from './time-filter';
import {Field} from '@domain/datasource/datasource';
import {TimeUnit} from '../field/timestamp-field';

declare let moment: any;

export class TimeRelativeFilter extends TimeFilter {

  public tense: TimeRelativeTense;
  public relTimeUnit: TimeUnit;
  public value: number;
  public timeZone: string;
  public baseType: TimeRelativeBaseType;

  // Only UI
  public uiLatestTime?: Date | string;

  constructor(field: Field) {
    super(field);
    this.type = 'time_relative';
    this.timeZone = moment.tz.guess();
    this.baseType = TimeRelativeBaseType.TODAY;
  }

  public toServerSpec() {
    const spec = super.toServerSpec();
    return _.merge(spec, {
      tense: this.tense,
      relTimeUnit: this.relTimeUnit,
      value: this.value,
      baseType: this.baseType
    });
  } // function - toServerSpec
}

/**
 * Relative 시점 형식
 */
export enum TimeRelativeTense {
  PREVIOUS = 'PREVIOUS',
  CURRENT = 'CURRENT',
  NEXT = 'NEXT'
}

export enum TimeRelativeBaseType{
  TODAY = 'TODAY',
  LATEST_TIME = 'LATEST_TIME'
}
