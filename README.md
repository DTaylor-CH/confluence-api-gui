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

# Deploying to EC2

Because there is some sensitivity even to know the titles of all pages in a Confluence space, I have been running the DB script into one of our internal Mongo dev instances that needs VPN to access. This also means I can't just go ahead and host the user-facing portion on Heroku. To deploy, I expect to:

1. Build locally with Docker (see above)
2. Save the image `docker save <image-name> | gzip > <image-name>.tar.gz`
3. Upload the image to an EC2 instance - I'm using one set up earlier for the dependency scanner, for which I have the pem key, and on which Docker is already running, so there's plenty of set-up that would othewise apply that I am skipping
4. The upload command looks something like this: `scp -i ~/.ssh/dependency-scanner-web-live.pem confluence-gui.tar.gz ubuntu@<instance-public-dns-name>:confluence-gui.tar.gz`
5. `docker load < confluence-gui.tar.gz` from the directory in EC2 where the image is stored
6. `docker run -d -p 3000:3000` to map the exposed port from the app (3000) to port 3000 on the EC2 instance. Note: this only works because the security rules are appropriately configured on the EC2 management console.
