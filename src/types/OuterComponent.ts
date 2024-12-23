import { AssertionError } from "assert";

const OuterComponentValues = ["div", "p", "span"] as const;
export type OuterComponent = (typeof OuterComponentValues)[number];

export function assertIsOuterComponent(
  component: any,
): asserts component is OuterComponent {
  if (!OuterComponentValues.includes(component)) {
    throw new AssertionError({ message: "Invalid OuterComponent" });
  }
}
