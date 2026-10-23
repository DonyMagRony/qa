# Prompt.md

## AI Tool Used

| Item | Value |
|---|---|
| Tool | **Claude Sonnet 5.5** (Anthropic), used in the claude.ai chat interface |
| Capabilities used in the session | Web fetch (read the GitHub repository), bash sandbox (`git clone`, `npm install`, TypeScript type-check, `playwright test --list`), file creation (ZIP archive) |
| Reasoning / effort setting | Default setting of the chat. The model cannot see this value, so edit this line if you chose a specific effort level. |
| Language of the conversation | English (the original prompts were written in Russian; the English rewrites below preserve their intent) |

The prompts below are listed in the order they were sent. Each prompt is presented in English, preserving its original intent.

---

## Prompt 1: Choosing the Language

**Prompt:**

```text
Which is easier for writing Playwright UI tests: TypeScript or Python?
```

**Outcome:** TypeScript was recommended because of its native test runner, fixtures, trace viewer, code generation, and faster feature support. Python remains a reasonable choice when the rest of the project uses Python.

---

## Prompt 2: Task Statement and Request for Questions

**Prompt:**

```text
Repository: https://github.com/DonyMagRony/qa

I want to rewrite these tests in TypeScript.

Required scenarios and acceptance criteria:

1. Register a new customer: a unique new account is created, and the user ends up signed in or on the login page.

2. Log in: valid credentials reach the account page; invalid credentials show an error and do not log the user in.

3. Buy a product: add to cart → the cart shows the correct item and quantity → checkout completes.

4. Compare two products: open two products, capture their names and prices, and assert that the comparison displays the expected products.

5. Reset a password: the forgot-password flow gives the expected confirmation for a known email and an error for an invalid email.

Ask me whatever information you need. Is it enough if I provide all my codegen recordings?
```

**Outcome:** The AI inspected the repository and found incomplete or incorrect test implementations, including a broken `conftest.py`, missing assertions in the login test, debug `print` calls in the comparison test, and an empty reset-password test. It then asked seven clarifying questions.

---

## Prompt 3: Answers and Implementation Instructions

**Prompt:**

```text
The website under test is https://practicesoftwaretesting.com/

My answers to your questions:

1. Registration: using Date.now() is sufficient to generate a unique email. No cleanup is needed. There is no CAPTCHA or email confirmation.

2. Creating a user during test execution before the login test is fine if that is easier. Otherwise, we can log in using an existing account.

3. For product comparison, it is sufficient to assert that both products are displayed on the screen.

4. The password-reset flow should work with a user registered using a fictitious email address. The expected behavior is a confirmation for a known email and an error for an invalid email.

5. I do not have a strong preference for the implementation, as long as it satisfies the acceptance criteria.

6. Choose the code style you consider appropriate.

7. Chromium is sufficient.

I have already created all the test cases, but you need to split them into five separate files.

Please configure the project correctly and make the tests work. If you need additional skills or tools, use them and install whatever is necessary.

Deliver the result as a ZIP archive containing the code and everything needed to run it.

If you still have questions, ask them before starting the implementation.
```

**Outcome:** The AI cloned the repository, inspected the application source code in the official `testsmith-io/practice-software-testing` repository to obtain locators and message text, created a TypeScript project with five spec files, checked TypeScript compilation, listed the tests, and delivered `qa-playwright-ts.zip`.

---

## Prompt 4: First Failing Test

**Prompt:**

```text
# Instructions

The following Playwright test failed.

Explain why, be concise, follow Playwright best practices, and provide a code snippet with the fix if possible.

# Test info

Name: reset-password.spec.ts >> Reset a password >> a known e-mail gets the confirmation
Location: tests/reset-password.spec.ts:5:7

# Error details

Error: expect(locator).toContainText(expected) failed

Locator: getByTestId('forgot-password-form').locator('.alert-success')
Expected pattern: /successfully updated/i
Timeout: 10000ms
Error: element(s) not found

Call log:
- Expect "toContainText" getByTestId('forgot-password-form').locator('.alert-success') with timeout 10000ms
- waiting for getByTestId('forgot-password-form').locator('.alert-success')
  9 × locator resolved to <div role="alert" class="alert alert-success mt-3">page.forgot-password.confirm</div>
  - unexpected value "page.forgot-password.confirm"
```

**Outcome:** The AI diagnosed that the application displayed a raw internationalization key instead of the expected confirmation message. It proposed verifying observable behavior, such as the success alert being visible and the error alert being absent, rather than asserting the broken message text.

---

## Prompt 5: Second Test Run

**Prompt:**

```text
Running 9 tests using 6 workers

✓ 1 … Compare two products › both products appear on the comparison page with the same name and price
✓ 2 … Register a new customer › does not register with an empty form
✓ 3 … Log in › invalid credentials show an error and do not log in
✓ 4 … Register a new customer › creates a unique account and redirects to the login page
✓ 5 … Log in › valid credentials reach the account page
✓ 6 … Buy a product › add to cart → cart shows the item and quantity → checkout completes
✘ 7 … Reset a password › a known e-mail gets the confirmation
✓ 8 … Reset a password › a malformed e-mail shows a validation error
✓ 9 … Reset a password › an unknown e-mail shows an error

1 failed
```

Analyse the test results and explain the failure.
```

**Outcome:** Eight of nine tests passed. The remaining failure was caused by the same internationalization issue. The AI explained that `expect.soft` would not make the test pass and suggested an annotation-based workaround.

---

## Prompt 6: Documentation and Review

**Prompt:**

```text
1. Prompt.md: Save the prompts used with the AI tool and specify exactly which tool and model were used, including the effort level where available.

2. Review.md: Explain what the AI produced, how the results were reviewed and modified, and justify the decisions.

3. Rewrite my prompts in English and write the review.
```

**Outcome:** The AI was asked to document the prompts and tools used, provide a review of the generated project, explain the validation and modifications performed, and rewrite the prompts in English.

---

## Important Note

The outcomes described above reflect the reported session results. They do not independently establish that all tests pass against the live website or that every implementation decision is correct.