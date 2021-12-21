# What is this for?

This app is supposed to be hosted so that users can label Confluence pages based on a fixed taxonomy, without needing to set up API keys for the Confluence API.

The suggested tags are written to a Mongo instance. From there they can either be applied programmatically to the actual Confluence space via API calls or used for local analysis.

It supposes that the confluence-api-db-script has been run first, to take a cut of all pages in a particular space - otherwise there will be no pages to display for triage!

# Running locally

As mentioned above, this app is not really supposed to run locally. However, if you wanted to, the steps would be:

1. `git clone` this repo and `cd` into its root
2. `npm i`
3. `docker build . -t <your-desired-name>` e.g. `docker build . -t dt/confluence-gui`
4. `docker run -d -p <your-desired-port>:3000 <your-desired-name>` e.g. `docker run -d -p 80:3000 dt/confluence-gui`

Now if you navigate to `localhost:<your-desired-port>` you should see the app running.

If you want to see the logs, you can use `docker ps` to find the container ID and then `docker logs <whatever-that-ID-is>`.
