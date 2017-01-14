# xur-twitterbot

## Set up
Open a command prompt and enter
```bashp
npm run build:watch
```
This will make sure that any changes you're making to the source will immediately be built.

## twitter
Create an account if you haven't already and then navigate to https://apps.twitter.com/app/new. Fill out the details and generate a new token.

## Bungie.net
[Create a new application](https://www.bungie.net/en/Application) on bungie.net.

## Save
In the main project directory, create a `.env` file with the following format, replacing the `x`'s with the API key from your bungie.net application and the OAuth details from your twitter application.
```
BUNGIE_API_KEY=xxxxxxxxxxxxxxxxxxxxx
TWITTER_CONSUMER_KEY=xxxxxxxxxxxxxxxxxxxxx
TWITTER_CONSUMER_SECRET=xxxxxxxxxxxxxxxxxxxxx
TWITTER_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxx
TWITTER_ACCESS_TOKEN_SECRET=xxxxxxxxxxxxxxxxxxxxx
```

## Run
When you're ready, open up a command prompt and enter:
```bashp
npm start
```
When you see `Success!`, check your twitter account and you'll see what Xur is selling.

## FAQ
* ### Why so slow?

   When you first run the app you won't have a content database. The app will download (~5MB) and unzip (~50MB) the database and cache it in your project directory. Subsequent requests will use the cached database until a different version is available.

* ### How do I automate the process?

   There are a bunch of different ways, depending on the platform you're using. If you want to run this on your computer, you can use [Task Scheduler](http://www.howtogeek.com/123393/how-to-automatically-run-programs-and-set-reminders-with-the-windows-task-scheduler/) or [cron](http://www.howtogeek.com/101288/how-to-schedule-tasks-on-linux-an-introduction-to-crontab-files/).

   Just remember Xur appears each [Friday at 9.00 AM UTC](https://www.timeanddate.com/worldclock/converter.html?iso=20170106T090000&p1=1440).

* ### What other data does Xur return?

   [Here's an example](https://github.com/dazarobbo/xur-twitterbot/wiki/Example-Xur-Response).
