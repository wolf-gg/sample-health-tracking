# Activity Log

## 1. Planning and mapping out the timetable (30 mins)

Use the first 30 minutes to:
- Review the requirements
- Figure out what the specific stack to use
- Determine what features to include
- Create a rough timetable for the implementation plan
- Create a rough design of the interface

```
30m~ - planning
30m~ - setup boilerplate code and github repository
2h~ - backend
2h~ - frontend
1h~ - integration, testing, cleaning up the repository, code review assignment
```

### Tech stack to use?

- React (in Typescript)
- Node.js (express or Nest)
- MongoDB
- turborepo as a monorepo helper
- podman for hosting mongo
- shadcn for design

### What features to include?

Metrics are based on Healthy365, which I am most familiar with:
- Steps
- Exercise minutes
- Sleep

Additional requirements:
- Streak tracking (number of continuous days the metrics are reached, i.e. 10k steps a day)
- Weekly progress (a brief overview that shows the progress of each day in a week)

### What to exclude?

- Syncing of metrics from third-party services (not achievable in 6 hr timeframe)
  - Need to parse different metadata schema depending on provider (i.e. Garmin, Apple watch, Wear OS)
- Multi-user
  - Not achievable in 6 hr timeframe because of authentication and authorization

### Why mongo?

- Easy to extend data from a table
  - i.e. If we want multi-user, then it's easy to add a `userId` column to an existing metric table
- Metadata from third-party provider is unknown
  - It will be easier to store an unknown JSON format to Mongo, then let the application parse the metadata (via strict typings)

### Initial design
#### Dashboard
- Overview: 3 metrics as a bar
  - Steps - [ bar + percentage ] - x / y steps - x streak
  - Exercise - [bar + percentage ] - x / y mins - x streak
  - Sleep - [ bar + percentage ] - x / y hrs - x streak

#### Weekly view
- Vertical
- Clicking from the dashboard will go to the weekly view
- [Sample](https://www.google.com/imgres?q=health%20app%20bar%20graph&imgurl=https%3A%2F%2Fwww.researchgate.net%2Fpublication%2F377431901%2Ffigure%2Ffig2%2FAS%3A11431281217829185%401705416927959%2FA-bar-chart-of-Daphnes-daily-steps-over-one-week-Samsung-Health-app.png&imgrefurl=https%3A%2F%2Fwww.researchgate.net%2Ffigure%2FA-bar-chart-of-Daphnes-daily-steps-over-one-week-Samsung-Health-app_fig2_377431901&docid=54kNwQHip29NxM&tbnid=CDcOf_QmQ7yw0M&vet=12ahUKEwjus4Ho05qWAxVhnGMGHf5uHloQnPAOegQIPBAA..i&w=648&h=1141&hcb=2&ved=2ahUKEwjus4Ho05qWAxVhnGMGHf5uHloQnPAOegQIPBAA)

## 2. Repository setup and boilerplate code (30 mins)

- Create repo
- Use turborepo to create the main repository structure
  - Used the `kitchen-sink` example of turborepo
  - Monorepo with two apps: client and server
- Setup basic repository rules
  - `main` branch is protected
  - Only add code to `main` via merge requests
- Take note that we have only done the basic repository structure and setup
  - We will still heavily modify the two apps in the next timeslots

## 3. Initial server setup (1 hr)

### Add dotenv
To remove all static and sensitive data in the server, such as:
- DB url
- Port

### Implement CRS pattern in server
To make the backend pattern more lean and the flow unidirectional, we will follow the Controller - Service - Repository pattern

### Add mongo driver
  - We will use the native mongodb driver
  - We will not benefit greatly from mongoose's schema based concept
  - Shape of JSON from third-party health trackers will vary greatly

## 4. Backend features (1 hr)

### Tables
- The main metrics:
  - Steps
  - Sleep time
  - Exercise time

### How to handle streaks? Options:
- Create a table that saves the current streak
  - Auto-update whenever new metrics data comes in, increment streak if metrics passed the targets.
  - Remove streak when the day passes without passing the targets
- Do not record the streaks as a count, but add an indicator in the weekly view for the days that targets are reached.

## 5. Client setup and dashboard module (1 hr)

### Shadcn helper
Use the helper to initialize the starting code for the client. This also saves us time to think about the design of the atomic components.

### Dashboard
Create the frontpage by allowing the user to view their metrics and if they reached their goals.
> NOTE: that we provided the targets for the day as a static value for now

### Notes on agent prompts
- Used Copilot to introduce the initial design of the dashboard and the page
- Then added the ability to change the date via buttons at the top

## 6. View activities (1 hr)

### Notes on agent prompts
- Used copilot to create an activity list module
  - It initially created a modal style where the list pops up after clicking in the dashboard
  - Asked the agent to make list appear below the dashboard instead
  - Agent created one component `ActivityList` for all activities. Changed it to three separate components so that it's easier to maintain in the future.

## 7. Add activity (30 mins)

### Notes on agent prompts
- Used copilot to create the components for adding activity via a button and a pop-up
- Used copilot to also add the POST endpoints for the acitivies
- Iterated the generated code to allow decimal points for exercise and sleep metrics

## 8. Weekly view (30 mins)

### Notes on agent promps
- Extracted the subcomponents from `WeekView` to `DayCard` and `CompletedTargetsIndicator`
- Changed the dependency array in the `useEffect` in `WeekView` so that we fix the maximum depth reached issue
- Changed stylings so that `MetricCard` and `DayCard` are more consistent with each other