import { expect, test } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";

// One page per GraphQL type kind the formatter renders differently.
const pages = [
  ["object", "docs/types/objects/project", "Project"],
  ["enum", "docs/types/enums/project-status", "ProjectStatus"],
  ["interface", "docs/types/interfaces/node", "Node"],
  ["union", "docs/types/unions/search-result", "SearchResult"],
  ["input", "docs/types/inputs/create-project-input", "CreateProjectInput"],
  ["scalar", "docs/types/scalars/date-time", "DateTime"],
  ["query", "docs/operations/queries/projects", "projects"],
  ["mutation", "docs/operations/mutations/create-project", "createProject"],
  [
    "subscription",
    "docs/operations/subscriptions/project-changed",
    "projectChanged",
  ],
  ["directive", "docs/types/directives/deprecated", "deprecated"],
] as const;

// Element screenshots are stitched while scrolling, so the sticky header and
// sidebar would be painted over the content. Hide them for those shots.
const hideChrome = [
  "#nd-subnav, #nd-sidebar, #nd-toc, header, footer { display: none !important; }",
].join("\n");

const main = (page: import("@playwright/test").Page) => page.locator("#nd-page");

test("home", async ({ page }) => {
  const response = await page.goto("");
  expect(response?.status()).toBe(200);
  await expect(page.locator("h1")).toHaveText("Your API, mapped with intent.");
  await argosScreenshot(page, "home");
});

for (const [kind, path, title] of pages) {
  test(`page: ${kind}`, async ({ page }) => {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toHaveText(title);
    await argosScreenshot(page, `page-${kind}`, {
      element: main(page),
      argosCSS: hideChrome,
    });
  });
}

// Each type is also published as plain Markdown next to its page: no MDX
// or HTML spans.
test("markdown copy", async ({ page }) => {
  const response = await page.request.get("docs/types/objects/project.md");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body.startsWith("# ")).toBe(true);
  expect(body).not.toContain("<span");
});

// Backticked type names in deprecation reasons link to their page.
test("deprecation reason links to a type page", async ({ page }) => {
  await page.goto("docs/types/objects/project");
  const link = page
    .locator("p", { hasText: "Replaced by" })
    .locator("a", { hasText: "ProjectStatus" });
  await expect(link).toHaveAttribute(
    "href",
    /\/docs\/types\/enums\/project-status$/,
  );
});

test.describe("dark mode", () => {
  test.use({ colorScheme: "dark" });

  test("home", async ({ page }) => {
    await page.goto("");
    await argosScreenshot(page, "home-dark");
  });

  test("page: object", async ({ page }) => {
    await page.goto("docs/types/objects/project");
    await argosScreenshot(page, "page-object-dark", {
      element: main(page),
      argosCSS: hideChrome,
    });
  });
});
