import type { Example } from "../lib/types";

export type ExampleIds =
  | "array-sum"
  | "block"
  | "callback"
  | "controll-flow"
  | "fib"
  | "infered-defaults"
  | "inssertion-sort"
  | "match"
  | "named-args"
  | "operators"
  | "pipeline-effects"
  | "pipelines"
  | "placeholders"
  | "precoditions"
  | "range-membership"
  | "ranges"
  | "shared-captures"
  | "typed-arrays";

export const EXAMPLES = {
  "array-sum": {
    code: `fn main() -> number {
        let values: number[] = [10, 20, 30];
        values[1] = 25;

        return sum(values);
    }

    fn sum(values: number[]) -> number {
        let total: number = 0;
        let index: number = 0;

        while index < len(values) {
            total = total + values[index];
            index = index + 1;
        }

        return total;
    }`,
    name: "Array Sum",
  },
  block: {
    code: `fn is_even(x: number) -> string {
        return if x % 2 == 0 { "Even" } else { "Not even" };
    }

    fn main() -> number {
        let price = 10;
        let preco_final = {
            let tax = 2;

            price * tax
        };

        let counter = 0;
        let sum = loop {
            counter += 1;

            if counter == 10 { break counter; }
        };

        return sum;
    }`,
    name: "Block",
  },
  callback: {
    code: `fn main() -> number {
        let external = 5;

        let sum = (x: number, y: number) => x + y + external;

        return sum(10, 5);
    }`,
    name: "Callback",
  },
  "controll-flow": {
    code: `// Statement loops, transfers, value loops, and scoped values. Returns 25.
    fn main() -> number {
        let count = 0;
        let total = 0;
        while count < 5 {
            count += 1;
            if count == 2 { continue; }
            total += count;
        }

        for value in 10..=1 by -2 {
            if value == 6 { break; }
            total += value;
        }

        loop {
            total -= 1;
            break;
        }

        let chosen = loop {
            if total > 20 { break 3; }
            break 0;
        };
        let adjustment = {
            let total = 2; // This binding shadows, rather than changes, the outer one.
            if chosen > 0 { total } else { 0 }
        };
        return total - chosen - adjustment;
    }`,
    name: "Controll Flow",
  },
  fib: {
    code: `fn fib(n: number) -> number {
        if n <= 1 {
            return n;
        }
        return fib(n - 1) + fib(n - 2);
    }

    fn main(value: number) -> number {
        return fib(value);
    }`,
    name: "Fibonacci",
  },
  "infered-defaults": {
    code: `// Forward inferred results and a named/default diamond. main returns 584.
    fn main() {
        return left(base: 2) + right(3);
    }

    fn left(base: number, extra: number = base + 1) {
        return total(extra: extra, base: base);
    }

    fn right(base: number, extra: number = base + 1) {
        return total(base, extra);
    }

    fn total(base: number, extra: number = base + 1, scale: number = extra * 2) {
        return base * 100 + extra * 10 + scale;
    }`,
    name: "Infered Defaults",
  },
  "inssertion-sort": {
    code: `fn insertionSort(arr: number[]) -> number[] {
        let counter: number = 1;
        while counter < len(arr) {
            let key: number = arr[counter];
            let j: number = counter - 1;
            while j >= 0 && arr[j] > key {
                arr[j + 1] = arr[j];
                j = j - 1;
            }
            arr[j + 1] = key;
            counter = counter + 1;
        }

        return arr;
    }

    fn main() -> number {
        let arr: number[] = [5, 2, 4, 6, 1, 3];
        let sortedArr: number[] = insertionSort(arr);
        return sortedArr[0];
    }`,
    name: "Insertion Sort",
  },
  match: {
    code: `fn describe(value: number) -> string {
        return match value {
            < 0 => "less than 0",
            0 => "is 0",
            0..10 => "between 0 and 10",
            _ => "huge number",
        };
    }

    fn main() -> string {
        let numb = 10;
        let description = describe(numb);

        return description;
    }`,
    name: "Match",
  },
  "named-args": {
    code: `fn scale(value: number, factor: number) -> number {
        return value * factor;
    }

    fn main() -> number {
        let scaled = scale(factor: 2, value: 10);

        return scaled;
    }`,
    name: "named-args",
  },
  operators: {
    code: `// Numbers are f64, including fractions, infinities, NaN and signed zero.
    // main returns 9.
    fn main() -> number {
        let value = 10;
        value += 2;
        value -= 3;
        value *= 2;
        value /= 4;
        value %= 4;

        let negative_remainder = -7 % 3; // -1: remainder follows the dividend.
        let nan = 0 / 0;
        let infinity = 1 / 0;
        let negative_zero = -0;
        let valid = value == 0.5 && negative_remainder == -1;
        let specials = nan != nan && infinity > 100 && negative_zero == 0;
        let text = "Unicode: café 世界 /* this is string content */";

        // Short-circuiting avoids evaluating the division on this path.
        let safe = true || 1 / 0 < 0;
        /* Comments can span lines,
           without changing the source expressions. */
        if valid && specials && safe && text != "" {
            return (3 + 2) * 2 - 1;
        }
        return 0;
    }`,
    name: "Operators",
  },
  "pipeline-effects": {
    code: `// Defaults, local stages, and a final discarded void stage. Returns 15.
    fn scale(value: number, factor: number = 2) -> number {
        return value * factor;
    }

    fn store(value: number, destination: number[]) -> void {
        destination[0] = value;
        return;
    }

    fn main() -> number {
        let result = [0];
        let offset = 3;
        let add_offset = (value: number) => value + offset;

        // A void stage is permitted last when the result is discarded.
        6 |> scale |> add_offset |> store(destination: result);
        return result[0];
    }`,
    name: "Pipeline Effects",
  },
  pipelines: {
    code: `fn pow(value: number) -> number {
        return value * value;
    }

    fn scale(value: number, factor: number) -> number {
        return value * factor;
    }

    fn factorial(value: number) -> number
        requires value > 1 {
        let from_to = value..=1 by -1;
        let acc = 1;

        for value in from_to {
            acc *= value;
        }

        return acc;
    }

    fn sum(x: number, y: number) -> number {
        return x + y;
    }

    fn main() -> number {
        let numb = 2;
        let result =
        numb
        |> scale(factor: 2)
        |> sum(y: 1)
        |> factorial;

        return result;
    }`,
    name: "Pipeline",
  },
  placeholders: {
    code: `// Each expression-position underscore is a separate parameter. Returns 25.
    fn main() -> number {
        let subtract = _ - _;
        let double = _ * 2;
        let both = _ && _;
        // Indexing constrains the anonymous input to number[].
        let first = { let values: number[] = _; values[0] };

        let result = subtract(10, 3) |> double;
        if both(true, !false) {
            result += first([5, 6]);
        }

        // Immediate stages are unary and parenthesized. Their input runs once.
        return result
            |> (_ + 1)
            |> ((value: number) => value + 5);
    }`,
    name: "Placeholders",
  },
  precoditions: {
    code: `fn div(x: number, y: number) -> number
        requires y > 0 {
         return x / y;
    }

    fn main() {
        let result = div(10, 0);
        return result;
    }`,
    name: "Pre Conditions",
  },
  "range-membership": {
    code: `// Ranges can be passed and returned internally. main returns 9.
    fn odd_numbers() -> range {
        return 1..=5 by 2;
    }

    fn sum_range(values: range) -> number {
        let total = 0;
        for value in values { total += value; }
        return total;
    }

    fn main() -> number {
        let odds = odd_numbers();
        let descending = 5..0 by -2;
        if 3 in odds && !(2 in odds) && 1 in descending {
            return sum_range(odds);
        }
        return 0;
    }`,
    name: "Range Membership",
  },
  ranges: {
    code: `fn main() -> number {
        let from_to = 1..=10;
        let list: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        let counter = 0;
        for value in from_to { list[counter] = value; counter += 1; }

        return list[0] + list[9];
    }`,
    name: "Ranges",
  },
  "shared-captures": {
    code: `// Closures observe and update original bindings, not snapshots. Returns 20.
    fn main() -> number {
        let total = 1;
        let values = [2, 3];
        let add = (amount: number) => {
            total += amount;
            return total;
        };
        let add_twice = (amount: number) => {
            // An earlier local callable keeps its live context.
            add(amount);
            return add(amount);
        };

        total = 4;
        add_twice(3);
        let read = () => total + values[0];
        values[0] = 5;
        let result = read();

        for value in 1..=2 {
            // Each iteration binding is read-only, including inside its closure.
            let accumulate = () => { total += value; };
            accumulate();
        }
        return result + total - 8;
    }`,
    name: "Shared Capture",
  },
  "typed-arrays": {
    code: `// Fixed-length arrays share mutable storage. main returns 12.
    fn main() -> number {
        let numbers: number[] = [2, 4, 6];
        let alias = numbers;
        alias[0] += 3;

        let flags: bool[] = [true, false, true];
        flags[1] = !flags[1];
        let words: string[] = ["hello", "世界"];
        words[0] = "hi";

        let score = 0;
        for enabled in flags {
            if enabled { score += 1; }
        }
        for word in words {
            if word == "世界" { score += 1; }
        }
        if numbers == [5, 4, 6] && words != ["hello", "世界"] {
            score += numbers[0];
        }

        // Empty literals can use an explicit element type.
        let empty: string[] = [];
        return score + len(numbers) + len(empty);
    }`,
    name: "Typed Arrays",
  },
} satisfies Record<ExampleIds, Example>;
