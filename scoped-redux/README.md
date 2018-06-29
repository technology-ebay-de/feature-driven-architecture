# React-Redux architecture for large applications. [DRAFT]

A set of conventions and principles to make React-Redux application more maintainable. This example is a port of [redux real-world](https://github.com/reduxjs/redux/blob/master/examples/real-world/) example. It **will** appear as over-engineered, because this structure is designed for large applications.

## Motivation

While React provides us with components and redux with state management layer, they don't come with a structure and architecture out of the box, that fits well for working on a large application with multiple teams.

Structuring application based on basic Redux examples imposes a high risk of namespace collisions of action types and action creators. It also comes with no guidance about when to connect a component to the store and leads to a props passing overhead, when too many props need to be passed from the connected top level component down the deeply nested tree. Global state brings another problem: it is easy to forget to remove properties when component stops using them over time, which leads to state pollution.

React has no opinions on how to structure an application since components are universal. We need a structure that enforces high cohesion principle by keeping code implementing same feature in the same directory. Also, we want to enforce separation of [container and presentational](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) components because it leads to a cleaner code and better reuse.

Another unsolved problem when every component can use every component is all components become highly interconnected at some point. To avoid this, we introduce 2 more complex types "feature" and "page". Also, we keep shared "components" clearly separated.

## Solution

We use Redux to its fullest while avoiding namespace collisions and implicitness as much as possible by defining a set of conventions and principles, without introducing additional abstractions.

1.  We introduce highly cohesive features structure.
1.  We introduce `features` and `pages` namespaces to the state.
1.  We introduce namespaced action types.
1.  We introduce new higher-level types: features and pages.

## Terminology

- "components" - React components
- "containers" - React component without rendering DOM elements, may use renderers
- "renderers" - React component, equivalent to presentational components renders DOM elements
- "store" - Redux store
- "action creators" - Redux action creators
- "action types" - Redux action types
- "selectors" - Reselect selector functions
- "feature" - Renders complex user-facing functionality, reusable between pages.
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

## Page (`src/pages/{page}/`)

Every page renders contents of the entire document. It is designed to use features and connect them. It acts as an interoperability layer between the features. A change on one page should never break a different page.

### Must not

- A page must not import from other pages.
- A page must not access features state `state.features.{feature}`.

### Must

- A page must export a component.
- A page must export a route for the router.
- A page must use the following naming schema for the action types `page/{page}/{action}`.

### May

- A page may export a reducer.
- A page may connect to the store.
- A page may access the global `state`.
- A page may access the page state `state.pages.{page}`.
- A page may render any feature.
- A page may render feature A inside of feature B by passing a render prop or component.
- A page may exchange data between features.
- A page may provide data to a feature if a feature can't fetch it by itself.

## Feature (`src/features/{feature}/`)

A feature is a self-contained, renderable, user-facing functionality, that is encapsulated and reusable on different pages. Our goal is to be able to remove a feature completely by removing its directory, without leaving unused code behind. We need to keep it as cohesive as possible. This should also allow more autonomy in feature development for different teams. A change in a feature should not implicitly break a different feature. You should be able to swap out a feature on a page without breaking other pages still using the old one.

### Must not

- A feature must not import from other features.
- A feature must not import from pages.
- A feature must not access any other state than `state.features.{feature}`.

### Must

- A feature must export a component.
- A feature must use the following naming schema for the action types `feature/{feature}/{action}`.

### May

- A feature may export a subroute for the router.
- A feature may export a reducer.
- A feature may connect to the store.
- A feature may access the feature state `state.features.{feature}`.
- A feature component may accept props.
- A feature may access shared resources.
- A feature may fetch data from an API.

## Shared components (`src/components/`)

Every directory corresponds to one or to a set of components shared between the features or pages.

### Must not

- Must not connect directly to the store, router or any other global system.

### Must

- If directory contains one component, its name must start upper case.
- If directory contains multiple components, its name must start lower case.

### May

- May be containers or presentational components.

## Store (`src/store/`)

We use a single store for the entire application. Here you may:

- Setup the store.
- Combine all reducers.
- Apply middleware.

### State shape

```json
{
  "pages": {
    "pageA": {},
    "pageB": {}
  },
  "features": {
    "featureA": {},
    "featureB": {}
  }  
}
```

## Router (`src/router/`)

Provides a router component that uses routes from pages.

## Todo

- Where does feature starts and where does it ends? What if feature gets too big?
- How to implement and test side effects in features?
- How to get the data of one feature from another?
  - Implement a new feature that demonstrates data exchange between features.
- Remove dependency to features in store by using registration pattern. Currently when removing a feature, it needs to be removed from store.
- How to use subroute in a feature?
- Describe the role of selectors in features and pages
- Describe the role of reducers in features and pages
- Root currently isn't a page (mb we need to reuse it over relations or containers)
- Use reselect.
- Use state based router?
- Make it work on codesandbox
- Flow/TypeScript?
- Graphql?
