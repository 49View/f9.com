#!/bin/bash

TARGET=./builds/wasm_renderer/emscripten/
PROCESSED=./projects/49view.com/public

inotifywait -m -e create -e moved_to --format "%f" $TARGET \
        | while read FILENAME
                do
                	if [ "$FILENAME" = "wasm_renderer.wasm" -o "$FILENAME" = "wasm_renderer.js" ]; then
                        echo Detected $FILENAME, copy to public folder
                        cp "$TARGET/$FILENAME" "$PROCESSED/$FILENAME"
									fi
                done