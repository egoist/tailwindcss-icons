import { test, assert } from "vitest"
import { foo } from "../src"

test("simple", () => {
  assert.equal(foo, "foo")
})
