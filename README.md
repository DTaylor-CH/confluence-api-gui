# What is this for?

This app is supposed to be hosted e.g. on Heroku so that users can label Confluence pages based on a fixed taxonomy, without needing to set up API keys for the Confluence API.

The suggested tags are written to a Mongo instance. From there they can either be applied programmatically to the actual Confluence space via API calls or used for local analysis.

It supposes that the confluence-api-db-script has been run first, to take a cut of all pages in a particular space - otherwise there will be no pages to display for triage!
