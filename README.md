# BgRemove

> NOTE! This software is still in the alpha phase! It currently only supports uploading profile pictures, and you might encounter bugs.

## Summary

BgRemove (short for Background Remove) is a tool that allows you to use transparent profile pictures on Twitter and renders transparent pictures from opaque backgrounds.

## Installation Requirements

- You need to have Twitter Developer access.
    - If you don't have access yet: [Apply here](https://developer.twitter.com/EDITME)
- You need to host a Node.js server with internet access (to `api.twitter.com`, and you have to start a web server).
    - If you don't want to host it yourself, then you can use [Deta](https://deta.sh) to host it for free. There are instructions for using Deta below, you just have to register a free account. (I personally use Deta to host the website (and a lot of personal stuff), it just works, and you don't have to pay a cent. 10/10 am recommending rn).

## Setup

The first step is to clone this repository (`git clone https://github.com/lxhom/bgremove.git`). Open it in your IDE/file manager/terminal, you'll have to edit a file or two.

Go back to your IDE/file manager/terminal and create a copy of `keys.template.js` and name it `keys.js`. Open the new `keys.js` file in the editor.

Now we need a Callback URL that the OAuth flow redirects you to. This section depends on where you host it, and there's a part for self-hosting and for Deta users.

---

- For self-hosting

If you're hosting it yourself, you need to use the URL that your server listens on.

If you want to run it locally without exposing it to the internet, use `https://example.com/callback` or use a domain that you own (or you might give your login data to unknown people on the internet) and set the path to `/callback` (for example `https://yourdomain.tld/callback`). Copy that callback URL.

> Example.com is a safe domain for testing (and therefore also for callbacks), see [example.com](https://example.com/) or [the example.com Wikipedia article](https://ex.com/wiki/EDITME).

---

- For Deta users

First you need to install the Deta CLI. To do that, follow the instructions on [the Deta docs](https://deta.sh/EDITME).

> Note for Windows users: You should install the PowerShell version, even if you use regular CMD.exe, a custom shell or WSL. The Linux version is a binary and only works in WSL, and the PowerShell version adds itself to your PATH, so you can use it in your CMD.exe and custom shells.

Now that you have the Deta CLI installed, open your favourite terminal and type `deta login` to log into your account.

Make sure that you are in the directory that you cloned this repo into, because you have to work with the files.

Now type `deta new`, and now the terminal should print you a few lines of JSON, and one of those contains your URL. Take that URL and add `/callback`, and you have your callback URL. Copy it to your clipboard.

---

Open your editor for the `keys.js` file now, and edit the `callbackURL` property to your callback URL (do not remove the quotes, or it'll break).

Now keep your editor in the background, and open your favourite browser. You need to create a Twitter app (or you can use an existing app). To create one, go to the [Twitter Developer dashboard](https://developer.twitter.com/dashboard) and go to Standalone Apps, and then on New App.

You should be on the App Settings page now. There you need to make a few adjustments:

- Set the 3-legged OAuth option to On
- Set the callback URL to the callback URL that you copied
- Set the website URL to the callback URL without the `/callback` at the end
- Set the App Permissions to Read/Write

Now to the App Settings page, and go to Keys and Tokens. Now click on Generate API tokens and click on Regenerate. Now copy the newly generated keys into the `keys.js` file (again: do not remove the quotes, or it'll break).

Now you just have to deploy your code. This is split into a self-hosting & a Deta part again:

---

- For Deta users

Deta users just have to execute `deta deploy` and the code will run on the Deta server.

---

- For self-hosting

Self-hosting can be done with one of two ways:

- Using the `local.js` wrapper: Call `node local [port]` to start the server on `[port]` (defaults to `8000`)
- Writing your own wrapper: `index.js` exports an express server, and you can write your own node.js wrapper by using `require("./index.js")` and calling the `listen` method to start the server.

---

Now your server should be running, and you can navigate to your website to use the bot.