# Ajax Env

_The_ official WP environment for Automattic/Ajax projects. Powered by `@wordpress/env`.

## Prerequisites

* `nvm` to manage your Node versions.

## Quick Start

### Install project repositories
The default configuration expects copies of the following repositories at `~/Sites` on your local filesystem:

* Gutenberg - `git clone git@github.com:WordPress/gutenberg.git`.
* Calypso - `git clone git@github.com:Automattic/wp-calypso.git`.
* Jetpack - `git clone git@github.com:Automattic/jetpack.git`.
* Automattic Themes - `git clone git@github.com:Automattic/themes.git`.

### Provision the Environment
Once the above repositories are available locally it's time to provision your environment!:

1. Clone this repo to your local machine within `~/Sites/` (or alongside your project repositories above).

2. `cd` into the cloned directory.

3. Switch to a valid Node version - run `nvm use`. Check you are on the correct Node version.

4. Install project dependencies - run `npm install`.

5. Provision environment - run `npx run env:start`.

Your WordPress environment will be provisioned and available at: [http://localhost:4759](http://localhost:4759/).


## Customizing the Environment

Ajax Env provides sensible default configuration out of the box which provides
all the dependencies required to work on Ajax projects.

Nonetheless, you may find yourself needing to customize the environment. Reasons
for this are varied but may include:

* Needing to place Plugins/Themes in different location on local filesystem.
* Need to use a different WordPress version.
* Need to include additional Plugins/Themes.

The easiest way to do this is by adding a `.wp-env.override.json` file, a placeholder for which is made available in this repo.

[Full documentation for the configuration file](https://developer.wordpress.org/block-editor/packages/packages-env/#wp-env-json) and its syntax is available.

### Create your overrides file

Copy `.wp-env.override.sample.json` file and rename it to `.wp-env.override.json`.

```
cp .wp-env.override.sample.json .wp-env.override.json
```

Next be sure to replace all the `{{ XXXX }}` placeholder paths to match your local file system (likely simply replace with `~/Sites`).

### Plugins

#### Changing Plugin installation paths

To change the installation location of all/any Plugin(s) simply amend the `plugins` array of your `.wp-env.override.json` file with your new file path. For example if your repositories are located at `~/MyCustomLocalLocation` you would do something like this:

```
{
    "plugins": [
        "~/MyCustomLocalLocation/wp-calypso/apps/full-site-editing/full-site-editing-plugin",
        "~/MyCustomLocalLocation/gutenberg",
        "~/MyCustomLocalLocation/jetpack",
    ]
}
```

#### Adding New Plugins

To install _new_ Plugins simply append new entries to the `plugins` array of your `.wp-env.override.json` file. For example to include the latest [CoBlocks from the WordPress Plugin Directory](https://wordpress.org/plugins/coblocks/):

```
{
    "plugins": [
        "~/Sites/wp-calypso/apps/full-site-editing/full-site-editing-plugin",
        "~/Sites/gutenberg",
        "~/Sites/jetpack",
        "https://downloads.wordpress.org/plugin/coblocks.1.22.0.zip"
    ]
}
```

### Themes

#### A note on Theme paths

For a Theme to be considered valid on "Activation" it must include a `style.css` file. Therefore when referencing locally installed Themes you must be sure to point to the root directory of the given theme.

This is easy to forget, particularly if you reference a repo which contains a number of themes such as [github.com/Automattic/themes](https://github.com/Automattic/themes).

#### Changing Theme installation paths

Changing the installation location of all/any Themes(s) follows the same process as for Plugins (above), except you must modify the `themes` entry of your `.wp-env.override.json` file with your new file path. For example if your Automattic Themes repo was located at `~/Sites/a8c-themes` you would add:

```
{
    "themes": [
        "~/Sites/a8c-themes/varia",
        "~/Sites/a8c-themes/maywood"
    ]
}
```

#### Adding New Themes

To install _new_ Themes simply append new entries to the `themes` array of your `.wp-env.override.json` file. For example to include the latest [Go Theme from the WordPress.org Themes directory](https://wordpress.org/themes/go/) you would do:

```
{
    "themes": [
        "~/Sites/themes/varia",
        "~/Sites/themes/maywood",
        "https://downloads.wordpress.org/theme/go.1.2.4.zip
    ]
}
```


## Troubleshooting

Most errors you encounter will be documented over in the [`@wordpress/env` manual](https://developer.wordpress.org/block-editor/packages/packages-env/#troubleshooting-common-problems). You should refer to this document in this first instance.

Ajax env specific issues are listed below:

### Jetpack errors during provisioning

Unbuilt copies of Jetpack may emit error notices on installation (eg: `Fatal error: Uncaught Error: Class 'Jetpack_Options' not found`...etc). To avoid this either:

* Ensure you have fully "built" your local copy of Jetpack before provisioning your environment.
* Removing the Jetpack Plugin dependency via your `.wp-env.override.json` ([see below](#customizing-the-environment)).