# Zero code framework for Redux.

A set of conventions and principles to make Redux more maintainable and less verbose. This example is a port of [redux real-world](https://github.com/reduxjs/redux/blob/master/examples/real-world/) example. It **will** appear as over engineered, because this structure is designed for large applications.

## Todo

- Use state based router
- Root currently isn't a page (mb we need relations or just containers)
- Use reselect
- Add propTypes
- Make it work on codesandbox

## Changes to the original proposal

- selector names should start with "select" prefix

## Structure

### `src/components` - components shared between the features

- Can be containers or presentational.
- Can not connect directly to the store, router or any other central instance.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
