/**
 * Open the wp-admin page on the wp-env localhost.
 */

const path = require( 'path' );
const fs = require( 'fs' );
const { exec } = require( 'child_process' );

const defaultConfigPath = path.resolve( __dirname, '../.wp-env.json' );
const customConfigPath = path.resolve( __dirname, '../.wp-env.override.json' );

const defaultConfig = require( defaultConfigPath );
let port = defaultConfig.port;

if ( fs.existsSync( customConfigPath ) ) {
	// Load port from custom config if config exists and port is defined.
	const customConfig = require( customConfigPath );
	port = customConfig.port || port;
}

const targetUrl = `http://localhost:${port}/wp-admin/`;

console.info( `Opening ${targetUrl}...\n` );
exec( `npx open ${targetUrl}` );
