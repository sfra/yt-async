#/bin/bash





nodeInstallation() {
  echo "Node installation"
  wget -c https://nodejs.org/dist/v8.12.0/node-v8.12.0-linux-x64.tar.xz && tar -xvf node-v8.12.0-linux-x64.tar.xz && mkdir -p ~/usr/bin/nodeLocal && cp -r node-v8.12.0-linux-x64/* ~/usr/bin/nodeLocal/ && rm -Rf node-v8.12.0-linux-x64* && echo "export PATH=\$PATH:~/nodeLocal/bin:~/usr/bin/" >> ~/.bashrc && echo "export NODE_PATH=~/nodeLocal/lib/node_modules/" >> ~/.bashrc
  . ~/.bashrc
}

youtubeInstallation() {
    wget -c https://yt-dl.org/downloads/latest/youtube-dl
    mv youtude-dl ~/usr/bin/
    chmod a+x ~/ust/bin/youtube-dl
    
}


isNode=`which node`

empty=''

if [[ "$isNode" == "$empty" ]]; then
  echo "Node is not installed. Do you agree to install node and update your \$PATH variable? [Y/n]"
  echo "Check license conditions on https://github.com/nodejs/node/blob/master/LICENSE"
  read answer;
  yes0="y"
  yes1="yes"

  case $answer in
    "yes"|"y"| "Y"| "Yes" |"")

    nodeInstallation;
     ;;

  esac
fi
node install.js


