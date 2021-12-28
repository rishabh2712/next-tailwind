/**
 *  Requirements
 *
 *  1. Callback function in case the element in focus change
 *  2. Render a given number of items in the container
 *  3. Should be able to start from center with the first element
 *  4. Should be able to end with the last item to the center of the container
 *  5. Should highlight the element in center
 *  6. Should be able to preselct an element on mount
 *
 *  Implementation Details:
 *
 *  1. Calculate the height of the container based on the number of elements to made visible
 *  2. Calculate the height of an element
 *  3. Create a Highlight box of the same height as the element
 *  4. Place the Highlight box at the middle of the container
 *  5. Calculate which element is at the center of the container, in terms of index.
 *
 *
 *
 *  A thought
 *
 *  1. Each element is transformed from some axis. Some axis!
 *  2. Such that they are transformed in terms of their height.
 *  3. Until certain value.
 *  4. Calculate that value.
 *  5. Now look after which element in center, since we have elements controlled in terms of index. The transforms!!
 *  6. Once you have that value, now you style that element.
 *  7. In each center element change call the callback, stating the current and new index, also some provision to call a callback.
 *  8. You have everything in place to control your items.
 *  9. Now focus on the stying of the elements at the end of the edges to give them what the ios design really deserves a replicate in web !!
 *  10.Some rotate degrees. Check the implementation in the following codepens
 *      a.https://codepen.io/gnauhca/pen/JrdpZZ
 *      b.https://codepen.io/maxakohler/pen/JZgXxe
 *  11.Now once the spinner / Wheel is made, start the process of exporting it in terms of component. Make provision for props in styling if not already done.
 *  12.This will be the part where the integration will be crusial for the proper user experience.
 *
 *
    1. Calculate which item is in center
      1. Check with respect to the scrollevent which index will be currently in center
      2. If the scrollTopof forst element and total scrollTop of the container will tell how many blocks it has scroll
 *  5. Now look after which element in center, since we have elements controlled in terms of index. The transforms!!
 *  6. Once you have that value, now you style that element.
 *  7. In each center element change call the callback, stating the current and new index, also some provision to call a callback.
 *  8. You have everything in place to control your items.
 *  9. Now focus on the stying of the elements at the end of the edges to give them what the ios design really deserves a replicate in web !!
 *  10.Some rotate degrees. Check the implementation in the following codepens
 *      a.https://codepen.io/gnauhca/pen/JrdpZZ
 *      b.https://codepen.io/maxakohler/pen/JZgXxe
 *  11.Now once the spinner / Wheel is made, start the process of exporting it in terms of component. Make provision for props in styling if not already done.
 *  12.This will be the part where the integration will be crusial for the proper user experience.
 *
 *
 *
 *  Ending Note: This component will be usful for Time Input in JDS. Make sure we are able to pull off an IOS Wheel component in Bedrock!!!
 *
 */