# Introduction

This document outlines conventions and guidelines for contributing to the admin portal project.

The project is over six years old, and a complete refactor hasn't been feasible, though some sprints have seen blocks of improvements (e.g. TypeScript conversion; and migration to Next.js's App Router). KEEP THIS IN MIND as legacy elements like `kebab-based-component-names.tsx` still remain.

**Please adhere to the new standards and, whenever possible, leave things better than you found them.**

**SO PLEASE READ THIS DOCUMENT, ADHERE TO NEW STANDARDS, AND LEAVE THINGS BETTER THAN YOU FOUND THEM!**

- [Introduction](#introduction)
- [Merge Requests (MRs)](#merge-requests-mrs)
  - [IDE Packages](#ide-packages)
  - [MR Creation Flow](#mr-creation-flow)
- [Project Organization](#project-organization)
  - [Folder Structure](#folder-structure)
  - [App Router Folder](#app-router-folder)
- [Conventions, Standards, & Best Practices](#conventions-standards--best-practices)
  - [Naming Conventions, Files, Imports and Exports](#naming-conventions-files-imports-and-exports)
  - [Styling with Cerberus and PandaCSS](#styling-with-cerberus-and-pandacss)
  - [Utilities and Functions](#utilities-and-functions)
  - [App Router Sub-Folder Conventions](#app-router-sub-folder-conventions)
  - [Unit Testing Conventions](#unit-testing-conventions)
  - [Next.js](#nextjs)
  - [Coding and Syntax Conventions](#coding-and-syntax-conventions)
  - [Queries and STATIC_ARRAY](#queries-and-static_array)
  - [Form Handling](#form-handling)
    - [Type Safety](#type-safety)
    - [Form Validation](#form-validation)
    - [Form Submission](#form-submission)
    - [Error Handling](#error-handling)

## Merge Requests (MRs)

### IDE Packages

Please install the following extensions in VSCode and / or Cursor (or your editor of choice, where available):

- **ESLint** by Microsoft
- **Prettier** by Orta
- **Prettier** ESLint by Rebecca Vest

These three packages will provide immediate feedback within the editor when rule violations are detected, enhancing the ability to identify and fix errors faster.

### MR Creation Flow

TODO: Add to DUUI contributions file; The flow for DUUI won't be as relevant in the future, so consult with the team if creating MRs for DUUI. In brief:

1. Create two MRs — one for DUUI with alpha versioning and one in the monorepo with the alpha version set in both projects.
2. Only ever click the "npm publish" pipeline button in gitlab if you are publishing an alpha version like `"2.1.25-alpha"`.
3. Gitlab auto-publishes the final version in the merge pipeline.

For every MR:

- Ensure tests and linting are complete before setting labels.
- Use the frontend template in the [MR creation form](https://repo.bespin.cce.af.mil/bespin/products/digital-u/licensed/digital-university/-/merge_requests).
- Confirm you're merging into the correct branch and check ( ✔ ) relevant items in the MR checklist pertaining to you.
- Set the label to `peer review` and tag `@frontend` in the [Peer Review Slack channel](https://omnifederal.enterprise.slack.com/archives/C07H5HRG4DB).
- After peer review (after peer has resolved comments and all checkboxes are completed), set the MR to `lead review` and mention relevant leads in the channel.
- Upon merging, select "squash commits" and "delete branch."
- !! **Important** !! - after the merge is successful move the status of your ticket to QA testing.

## Project Organization

### Folder Structure

General folder structure rules: 1) For single-use files/classes/components/utilities/hooks, co-locate them in the relavent /app route. If you find something is used more than one time, then move it out to one of the global locations (e.g., components).

- **`app` folder** - Main app structure following Next.js App Router conventions.

  - For details, refer to the [Next.js App Router documentation](https://nextjs.org/docs/app).
  - Internal documentation on our App Router standards can be found in the [App Router Folder Section](#app-router-folder).

- **`api` folder** - Contains reusable Apollo hooks.

  - **Note**: This folder is under review for potential co-location of single-use hooks.

- **`components` folder** (currently `components_new`)

  - For backward compatibility, we use `components_new` during migration. Primary subfolders include `layout`, `form`, etc.

- **`constants` folder** - Holds reusable constants; `enums` may be moved here in the future.

- **`hooks` folder** - For reusable hooks that don’t fit in `api` nor are co-located in the app router.

- **`styles` folder** - Root-level CSS/SCSS files.

- **`utils` folder** - Globally used utility functions.

### App Router Folder

Our project is gradually transitioning from Next.js's Pages Router to the App Router. We aim to align with Next.js standards and use best practices as we progress.

- **File Structure**:

  - Each route uses `page.tsx` for primary content, `layout.tsx` for consistent structure, and `loading.tsx` for route-based loading states.
  - Server components are default for `layout.tsx` and `loading.tsx` files, while `page.tsx` can be client or server depending on data fetching needs (currently, most all are client side for the refactor effort).
  - TODO: add "preferred best example" for server/client side fetches; we have very few server examples, but in the future our layout and pages files will work together in a more streamlined way to optimize performance.

- **Apollo and Data Fetching**:

  - TODO: refactor these future comments:
  - TODO: add "preferred best example" for everything here
  - Future: Place Apollo queries for initial data fetching in `layout.tsx` (server component) if it benefits from server rendering.
  - Future: Subsequent interactions can use client-side queries or mutations in `page.tsx` as needed for immediate responses.
  - Future: Aim to minimize Suspense usage by relying on `loading.tsx` for loading indicators w/ only server-side "foundations"

- **Component Reuse**:
  - Components start as route-specific in `app/subRoute/components`. If reused across routes, move them to the global `components` folder.

The goal is to establish clear separation and optimize performance across client/server boundaries as we complete the App Router transition.

## Conventions, Standards, & Best Practices

### Naming Conventions, Files, Imports and Exports

#### Component Conventions

- Use **PascalCase** for component files, **camelCase** for others.
- Folder names for components should match the component name (`@components/form/TextInput` rather than `text-input`); colocate tests, styles files, and add an index.ts file which should ONLY export one thing in a named export.
- For Next.js components:
  - Use `page.tsx` for page files; we previously considered custom naming but found it messy in VSCode. This convention will remain for now.
  - Refer to the [Metadata Section](#metadata) for layout file details.
- **Typing**: INFER TYPES where possible. For example: Avoid `React.FC`; directly type props within components (DO NOT: type the return object with `: React.FC<PropTypes>` and allow the return type to be inferred).
- **Prop Documentation**: Use inline comments for prop types, following the example in [TextInput.types.ts](src/components_new/form/TextInput/TextInput.types.ts) for improved dev experience.

### Styling with Cerberus and PandaCSS

<details>
  <summary>**CLICK TO EXPAND**</summary>

TODO -- THIS WAS A FIRST PASS -- SOMEONE ELSE NEEDS TO GET IN HERE.

Our project uses [Cerberus](https://cerberus.digitalu.design), a utility-first styling library built on [PandaCSS](https://panda-css.com). This gives us access to a rich theming system and design tokens while supporting conditional styles and utility-driven layouts.

#### Theming Tokens

When working on styles, you should use existing design tokens whenever possible.

- Refer to PandaCSS's [Theming Tokens Documentation](https://panda-css.com/docs/customization/theme) for a comprehensive list of predefined tokens such as colors, fonts, and spacing.
- Additionally, Cerberus includes custom themes tailored for our needs. Explore these at the [Cerberus Theme Documentation](https://cerberus.digitalu.design/preset/theme).

#### Conditional Styles

PandaCSS and Cerberus provide powerful conditional styling capabilities using attributes like `_hover`, `_focus`, `_active`, etc.  
 For example:

```tsx
<Box _hover={{ bg: 'blue.500' }} _focus={{ boxShadow: 'outline' }}>
  Hover or focus to see the effect
</Box>
```

#### Layout Utilities: `container()`, `hstack()`, `vstack()`

To simplify layout styling, we use Cerberus-provided utilities like `container()`, `hstack()`, and `vstack()`. Here’s when to use each:

- **`hstack()`**: A horizontal stack for aligning children in a row with optional spacing. This is great for creating button groups, navbars, or aligning elements side by side.

  ```tsx
  <HStack spacing="4">
    <Button>Cancel</Button>
    <Button colorScheme="blue">Save</Button>
  </HStack>
  ```

- **`vstack()`**: A vertical stack for aligning children in a column with optional spacing. It’s useful for forms, stacked buttons, or content blocks.
  ```tsx
  <VStack spacing="4">
    <Input placeholder="Email" />
    <Input placeholder="Password" />
  </VStack>
  ```

#### When to Use `container()`

Admittedly, the value of `container()` is most apparent for layouts requiring consistent max-width constraints across your app. However, for most internal UI elements, `Box` or `Flex` might be more straightforward. Use `container()` sparingly for top-level layout or page-level constraints.

</details>

### Utilities and Functions

- Use **arrow functions** throughout.
- Limit files to one function each, export with a named export, and use the function name as the file name / folder name.
- Use **named exports** (`export const methodName = () => {}`) rather than default exports.

### App Router Sub-Folder Conventions

- TODO: Here we want to discuss things like component reuse (or, rather, how components start as /app/subRoute/components and only move to the global /components folder when the component is reused across routes).
- TODO: Loading states + loading.tsx + `"use client"`

### Unit Testing Conventions

While we would prefer [Vitest](https://vitest.dev/) for testing, the project remains on Jest due to previous decisions and effort. The following guidelines aim to maximize test reliability and maintain performance in CI/CD until we can make the switch to vitest.

- Co-locate test files ({name}.test.ts(x)) with their respective components; the root-level **test** folder is deprecated and will be removed.
- Aim for **at least 90% coverage** for contractual obligations. Run `npm run coverage` with a specific matcher to view coverage results.
- Do NOT use `data-testid` in component tests. If you need to use them in mocks, that's fine, but take note of the PropTypes note below.
- Organize tests with many `describe` blocks and, often, one `it` block per describe if possible.
  - **Good Example**: [TextInput.test.tsx](src/components_new/form/TextInput/TextInput.test.tsx)
- **Mocking**: Mock dependencies to improve test speed in CI/CD.
  - Use types to enforce structure on mocks, like this:

```typescript
const SomeMockedComponent = ({ children, onClick }: OriginalComponentsPropTypes) => (
  <button onClick={onClick}>{children}</button>
);
```

### Next.js

#### Metadata

- This is for use in layout.tsx files, to provide a consistent structure for page titles that can be easily customized and managed across the application.

- [`metadata` objects](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-object) can only be exported from Server Components; each route can provide a `layout.tsx` file that simply wraps `children` and exports metadata:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | Page Title', // !!! THIS IS ONLY USED WHEN A CHILD FINDS THE FIRST PARENT WHO HAS A TEMPLATE !!!
    default: 'Page Title' // default title for this route; THIS IS INJECTED INTO THE FIRST PARENT (!!! AND ONLY THE FIRST PARENT !!!) WHO HAS A TEMPLATE
  }
};

const PageLayout = ({ children }: { children: React.ReactNode }) => children;
```

### Coding and Syntax Conventions

- **Event Handlers**: Use `onEventName` for props passed into components and `handleEventName` for internal/implementation-side functions. (We've seen weird names like handleOnSaveButtonClicked, and the idea of `handleXyz` and `onXyz` should follow traditional naming standards)
  Inside `MyComponent`:

```jsx
export const MyComponent = ({ onSaveClick }) => {
```

Example:

```jsx
const handleSaveClick = () =>
  console.log('this is on the implementation side.');

<MyComponent onSaveClick={handleSaveClick} />;
```

- **Form Standards**

  - Leverage types when using `useForm` to make it easy at a glance to see what fields are in the form

  ```tsx
  type FormData = {
    name: string;
  };
  const { register, handleSubmit } = useForm<FormData>();
  ```

  - Leverage GraphQL types when possible to have type safety between the form and GraphQL Mutation

  ```tsx
  import { CreateUserMutationVariables } from '@/api/codegen/graphql';
  const { register, handleSubmit } = useForm<CreateUserMutationVariables>();
  ```

  - Provide message attributes in `Controller` `rules` prop, otherwise message will be an empty string

    ```tsx
    // ❌ Bad: Results in an error message of ""
    <Controller
      name="name"
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <TextInput {...field} errorMessage={error?.message} />
      )}
    />

    // ✅ Good: error.message is populated with the correct message
    <Controller
      name="name"
      control={control}
      rules={{ required: 'Name is required' }}
      render={({ field, fieldState: { error } }) => (
        <TextInput {...field} errorMessage={error?.message} />
      )}
    />
    ```

  - Form validation mode should remain `onSubmit` unless design says otherwise
  - Form submit buttons should remain enabled even when fields are invalid unless design says otherwise
  - Disable submission buttons when the form is submitting

    ```tsx
    <Button disabled={isSubmitting} loading={isSubmitting} type="button">
      Submit
    </Button>
    ```

  - Ensure functions passed to `handleSubmit` that are doing async operations return a promise so isSubmitting is updated correctly

    ```tsx
    // ❌ Bad: isSubmitting does not updated correctly
    const onSubmit = data => {
      asyncOperation();
    };
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button disabled={isSubmitting} loading={isSubmitting}>
        Submit
      </Button>
    </form>;

    // ✅ Good
    const onSubmit = data => {
      return asyncOperation();
    };

    // ✅ Good
    const onSubmit = async data => {
      await asyncOperation();
    };

    // ✅ Good
    const onSubmit = async data => {
      return asyncOperation();
    };
    ```

  - When using react-hook-form `Controller` with Cerberus input components and relying on react-hook-form to validate, ensure both components have required. Having `required` in a Cerberus `Field`, `Input`, etc, only puts a `(required)` label on the input field and does not restrict the form from submitting if the field is empty.
  - Don't use `defaultValue` in `Controller` for placeholder text as it will count as a value and will not trigger a required validation error
  - Remember that `Button` defaults to `type="submit"` while inside a `form`. So if you want to use a button for something other than a form submission, remember to set `type="button"`

    ```tsx
    // ❌ Bad: Triggers form submission
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        onClick={cancelForm}
      >
        Cancel
      </Button>
    </form>

    // ✅ Good: Cancel button does not trigger form submission
    <form onSubmit={handleSubmit(onSubmit)}>
      <Button
        onClick={cancelForm}
        type="button"
      >
        Cancel
      </Button>
    </form>
    ```

// TODO: devs need to remember to lint and test before pushing up code.

### Queries and STATIC_ARRAY

- Don't depend on a static_array. When no results exist or there is an error, instead memoize the return object (same idea, a non-changing memoized value so that unexpected re-render loops don't occur).
