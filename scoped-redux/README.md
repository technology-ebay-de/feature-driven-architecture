# Redux architecture for large applications.

A set of conventions and principles to make Redux more maintainable. This example is a port of [redux real-world](https://github.com/reduxjs/redux/blob/master/examples/real-world/) example. It **will** appear as over engineered, because this structure is designed for large applications.

## Terminology

### Primitives

- "components" - React components
- "containers" - React component without rendering DOM elements, may use renderers
- "renderers" - React component, equivalent to presentational components renders DOM elements
- "store" - Redux store
- "action creators" - Redux action creators
- "action types" - Redux action types
- "selectors" - Reselect selector functions

### Complex

- "feature" - Renders complex user facing functionality, reusable between pages.
- "page" - Composes entire document information out of features.

## Directory structure

```
src/
├── components/
├── store/
├── router/
├── features/
|   ├── {feature}/
│   |   ├── containers/
│   |   ├── actionCreators/
│   |   ├── actionTypes/
│   |   ├── renderers/
│   |   ├── selectors/
│   |   ├── reducer
│   |   └── index
└── pages/
    └── {page}/
        ├── containers/
        ├── actionCreators/
        ├── actionTypes/
        ├── selectors/
        ├── reducer
        └── index
```

## Page (`src/pages/{page}`)

Every page renders the entire document. It is designed to use features and connect them. It is an interoperability layer between the features. A change on one page should never break a different page.

### Must not

- A page must not import from other pages.

### Must

- A page must export a component.
- A page must export a route for the router.
- A page must use the following naming schema for the action types `page/{page}/{action}`.

### May

- A page may export a reducer.
- A page may connect to the store.
- A page may access the global `state`.
- A page may access the page state `state.pages.{name}`.
- A page may render any feature.
- A page may render feature A inside of feature B by passing a render prop or component.
- A page may exchange data between features.
- A page may provide data to a feature if a feature can't fetch it by itself.

## Feature (`src/features/{feature}`)

A feature is self-contained, renderable, user facing functionality, that is encapsulated and reusable on different pages. In order to make a feature as easily removable as possible with the least possible chance of leaving unused code behind, we need to keep it as cohesive as possible. This should also allow more autonomy in feature development for different teams. A change in a feature should not implicitly break a different feature. You should to be able to swap out a feature on one page without breaking other pages where it is used.

### Must not

- A feature must not import from other features.
- A feature must not import from pages.
- A feature must not access the global `state`.

### Must

- A feature must export a component.
- A feature must use the following naming schema for the action types `feature/{feature}/{action}`.

### May

- A feature may export a route for the router.
- A feature may export a reducer.
- A feature may connect to the store.
- A feature may access the feature state `state.features.{name}`.
- A feature may access shared resources.
- A feature may fetch data from an API.

### Shared components (`src/components`)

Every directory corresponds to one or to a set of components shared between the features or pages.

- May be containers or presentational components.
- Must not connect directly to the store, router or any other global system.

## Todo

- Use state based router
- Root currently isn't a page (mb we need to reuse it over relations or containers)
- Use reselect?
- Make it work on codesandbox
