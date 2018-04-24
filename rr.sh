file=steempay.$1.tar.gz
rm -rf ./build
yarn run build
tar zcvf $file ./build/*
mv steempay.$1.tar.gz ./release
git add ./releases/$file
