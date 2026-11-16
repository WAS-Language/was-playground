import { useState } from "react";

import { EXAMPLES } from "../constants";
import type { ExampleIds } from "../constants";

interface ExampleSelectorProps {
  onSelect: (value: string) => void;
}

export default function ExampleSelector({ onSelect }: ExampleSelectorProps) {
  const [selected, setSelected] = useState<ExampleIds | undefined>();

  return (
    <fieldset className="fieldset">
      <select className="select">
        <option selected={!selected}>Select a example</option>
        {Object.entries(EXAMPLES).map(([key, value]) => (
          <option
            key={key}
            selected={selected === key}
            onClick={() => {
              // SAFETY: key is created from EXAMPLES,
              // which have ExampleIds as proper key (via satisfies)
              setSelected(key as ExampleIds);
              onSelect(value.code);
            }}
          >
            {value.name}
          </option>
        ))}
      </select>
    </fieldset>
  );
}
