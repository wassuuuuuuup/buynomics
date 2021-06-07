# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

##Developer notes
I used [Create React App](https://github.com/facebook/create-react-app) just to save a time. Usually I prefer to set up custom webpack build.

I used `material-ui` to make everything look better and save a time with styling.

I used `@reduxjs/toolkit` as basic tool for managing redux state.
Redux thunk is supposed to be used for handling side effects.

Implemented only intermediaries and intermediary details pages. The rest ones are pretty similar.

I wrote tests for reducer, selectors and one of the components. Tests for thunk don't make any sence cause they are dummy async functions that returns stubs.
Tests for other reducer/selectors/components will look similar.

One important thing that have missed due to lack of time is to test validation logic for `RangeComponent`. This test will simply check if entered values conforms the formula `(initialFromValue - currentFromValue) / currentStepValue % 1 === 0`

Total time: 5-6h

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
