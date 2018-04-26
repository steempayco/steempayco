file=steempay.$1.tar.gz
rm -rf ./build
yarn run build
tar zcvf $file ./build/*
mv $file ./releases/
git add ./releases/$file
