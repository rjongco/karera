#!/bin/bash

# sudo rm -r /var/www/html/zodiac_staging/zodiac/server/public/uploads/images/profile-pictures/*

# sudo rm -r /var/www/html/zodiac_staging/zodiac/server/public/uploads/images/govt-pictures/*

#  sudo rm -r /var/www/html/zodiac_staging/zodiac/server/dist/server/public/*

cd client || exit

# Delete the 'dist' folder
sudo rm -r dist

# Go back to the parent folder
cd .. || exit


# Change directory back to the client folder
cd client || exit


# Run npm run build and continue only if successful
npm run build && {
  # Change directory to 'dist' folder
  cd dist || exit



  # Create and edit .htaccess
  sudo tee .htaccess > /dev/null <<EOF
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
EOF
}

# Change directory back to the parent folder
cd ../../ || exit

cd server || exit

npm run build  && {
    #cd dist/server || exit
    # mkdir -p "public/uploads/images/profile-pictures"
    # sudo chmod +x "/var/www/html/zodiac_staging/zodiac/server/dist/server/public/uploads/images/profile-pictures"

    # mkdir -p "/var/www/html/zodiac_staging/zodiac/server/dist/server/public/uploads/images/govt-pictures"
    # sudo chmod +x "/var/www/html/zodiac_staging/zodiac/server/dist/server/public/uploads/images/govt-pictures"

  #cd ../../ || exit
  npm run migrate
  npm run seed:all
  pm2 delete server
  pm2 start dist/server/server.js
}

