#!/bin/bash
# http://www.codestrong.com/titanium/guides/command_line_packaging/

VERSION=0.7.0
SOURCE_PATH='/Library/Application Support/Titanium'
PLATFORM=osx
APP_PATH=`pwd`
ASSETS_PATH="$SOURCE_PATH/sdk/$PLATFORM/$VERSION"

"$ASSETS_PATH/tibuild.py" -d "$APP_PATH/dist/$PLATFORM" -s "$SOURCE_PATH" -a "$ASSETS_PATH" -r "$APP_PATH"
