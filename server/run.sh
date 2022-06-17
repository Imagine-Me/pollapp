#!/bin/sh

yarn migrate
mkdir -p ./seed_details/done
while IFS='' read -r line || [ "$line" ]
do
    printf '%s\n' "$line"
    if [ ! -f "./seed_details/done/$line" ]; then
        > "./seed_details/done/$line"
        echo "SEEDING FILE $line"
        npx sequelize-cli db:seed --seed "./src/seeders/$line"
    fi
done < ./seed_details/files.txt
yarn dev