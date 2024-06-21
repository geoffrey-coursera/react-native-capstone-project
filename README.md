# React Native Capstone project

This project uses the most recent version of `expo` and `expo-sqlite` at the time of writing, which have breaking changes compared to the ones used in the course, so expect a slightly different code organisation and API.

I decided to stick with `react-navigation` so you can find your cubs. This is achieved by setting `independent={true}` to the `NavigationContainer` component in `app/_layout.tsx`. I onther words I did not totally removed `expo-router`, I am ignoring it and using a nested navigation within it.

## How to run

1) Clone the repo
    ```bash
    git clone https://github.com/geoffrey-coursera/react-native-capstone-project.git
    ```
1) Install the dependencies
    ```bash
    npm install
    ```
1) Run Expo and follow the instructions
    ```bash
    npm run start
    ```