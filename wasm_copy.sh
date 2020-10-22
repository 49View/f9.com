#!/bin/bash

TARGET=./builds/house_explorer/emscripten/
PROCESSED=./projects/49view.com/public

inotifywait -m -e create -e moved_to --format "%f" $TARGET \
        | while read FILENAME
                do
                	if [ "$FILENAME" = "house_explorer.wasm" -o "$FILENAME" = "house_explorer.js" ]; then
                        echo Detected $FILENAME, copy to public folder
                        cp "$TARGET/$FILENAME" "$PROCESSED/$FILENAME"
									fi
                done