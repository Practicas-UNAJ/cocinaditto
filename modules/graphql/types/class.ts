import { DateRange } from "./types";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export class TrendingTime {
  static readonly today = new Date();
  static readonly YESTERDAY: TrendingTime = new TrendingTime("YESTERDAY", {
    before: this.today,
    after: new Date(this.today.getTime() - DAY),
  });
  static readonly LAST_WEEK: TrendingTime = new TrendingTime("LAST_WEEK", {
    before: this.today,
    after: new Date(this.today.getTime() - 7 * DAY),
  });
  static readonly LAST_MONTH: TrendingTime = new TrendingTime("LAST_MONTH", {
    before: this.today,
    after: new Date(this.today.getTime() - 31 * DAY),
  });
  static readonly LAST_YEAR: TrendingTime = new TrendingTime("LAST_YEAR", {
    before: this.today,
    after: new Date(this.today.getTime() - 365 * DAY),
  });

  private constructor(
    private readonly key: string,
    public readonly dateRange: DateRange
  ) {}

  toString() {
    return this.key;
  }
}
