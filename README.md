# Veneno Bot

For Veneno Club members ;)

## Usage

1. `git clone git@github.com:rdumont/venenobot.git`
2. `npm i`
3. Edit `conf.json`, see [Configuration section](#configuration) below
4. `node venenobot.js`


## Configuration

| Field           | Type     | Description |
|-----------------|----------|-------------|
| **interval**    | _int_    | Interval, in seconds, between each check for new posts. |
| **delay**       | _int_    | After the desired post is found, how long (seconds) should the bot wait to post your name? |
| **accessToken** | _string_ | A Facebook API token with `public_profile`, `publish_actions` and `user_groups` permissions. |
| **groupId**     | _string_ | Veneno Club's Facebook group ID. Get it from the group's URL. |
| **postPattern** | _string_ | The desired post should contain this text fragment. |
| **message**     | _string_ | Your name, which will be posted to the comments. |


The easiest way to get an access token is by using the [Facebook Graph API Explorer](https://developers.facebook.com/tools/explorer).

1. Go to https://developers.facebook.com/tools/explorer
2. Click **Get Access Token**
3. Select the `public_profile`, `publish_actions` and `user_groups` permissions
4. Confirm using the blue **Get Access Token** button
5. Copy the generated access token from the field to the left

Note that the access token provided by the Graph API Explorer **will expire in 1 hour**. But every time you perform any action using the Explorer, the token will be renewed, so you can just click "Debug" every now and then.