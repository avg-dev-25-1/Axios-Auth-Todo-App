## refreshTasks in TRIGGER_REFRESH and RESET_REFRESH
To avoid duplicating fetchTasks inside every component i.e. you need to send it as prop from component to component whenever edit/delete/add/create operations are performed
hence use `refreshTasks`
1. i call getData() in Auth.jsx on authToken validity so here i say refreshTasks:false i.e. no need to ....state(fetch tasks as it is done in SET_TASKS action)
2. In ListItem(which has edit button) i edit the task here i set TRIGGER_REFRESH's refreshTasks to true meaning state will be fetched again (...state)
3. If I DELETE item i will call to TRIGGER_REFRESH in ListItem
4. If I add task from "ADD NEW" on ListHeader i call TRIGGER_REFRESH case

in *detail*
1. Auth.jsx → getData()
On login/signup success, you already fetch the user’s tasks with getData().

At this moment, you don’t need to trigger refreshTasks because
*dispatch({ type: "SET_TASKS", payload: fetchedData })* already populates state.

✅ So here, refreshTasks: false makes sense.

2. ListItem (Edit)
When editing a task, after API PUT /todos/:id, you dispatch:

*dispatch({ type: "TRIGGER_REFRESH" });*

Dashboard will hear this → call fetchTasks() → update tasks.
✅ Correct, ensures you always see the latest version.

3. ListItem (Delete)
After API DELETE /todos/:id, same thing:

*dispatch({ type: "TRIGGER_REFRESH" });*

Dashboard refetches fresh list → deleted item disappears.
✅ Smooth.

4. ListHeader (Add Task)

After API POST /todos, again:
*dispatch({ type: "TRIGGER_REFRESH" });*

Dashboard refetches and the new task shows up immediately.
✅ Great.