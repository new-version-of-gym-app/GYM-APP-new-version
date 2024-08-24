import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import Category from './Category';
import Details from './Details'; // Assuming you have a Details component

const Stack = createSharedElementStackNavigator();

const CategoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Categories" component={Category} />
    <Stack.Screen
      name="Details"
      component={Details}
      options={() => ({
        gestureEnabled: false,
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 300 } },
          close: { animation: 'timing', config: { duration: 300 } },
        },
        cardStyleInterpolator: ({ current: { progress } }) => {
          return {
            cardStyle: {
              opacity: progress,
            },
          };
        },
      })}
      sharedElements={(route) => {
        const { catid } = route.params;
        return [
          {
            id: `item.${catid}.photo`,
            animation: 'move',
            resize: 'clip',
          },
          {
            id: `item.${catid}.title`,
            animation: 'fade',
            resize: 'clip',
          },
        ];
      }}
    />
  </Stack.Navigator>
);

// In your Tabs.Navigator, replace the Category screen with CategoryStack
<Tabs.Screen
  name="Category"
  component={CategoryStack}
  options={{
    headerShown: false,
    tabBarIcon: ({ size, focused }) => (
      <MaterialIcons
        name="category"
        size={size}
        color={focused ? "white" : "blue"}
      />
    ),
    tabBarLabel: ({ focused }) => (
      <Text style={{ color: focused ? "white" : "blue" }}>Category</Text>
    ),
  }}
/>