#!/bin/bash

set -x

shopt -s nullglob

GALLERY_DIR=images/gallery
THUMBNAILS_DIR=GALLERY_DIR/thumbnails

mkdir -p $GALLERY_DIR $THUMBNAILS_DIR

# Rename to remove any capitalised extensions.
for FULLPATH in $GALLERY_DIR/*.JPG
do
    FILENAME=`basename $FULLPATH`
    BASENAME=`basename $FILENAME .JPG`
    mv $FULLPATH $GALLERY_DIR/$BASENAME.jpg
done

# Generate thumbnails.
for FULLPATH in $GALLERY_DIR/*.jpg
do
    FILENAME=`basename $FULLPATH`
    convert $FULLPATH -resize 10% $GALLERY_DIR/thumbnails/$FILENAME
done
