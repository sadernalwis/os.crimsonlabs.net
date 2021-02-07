# os.crimsonlabs.net
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](LICENSE)
## Development Setup 
### Automatic Setup
#### To build & configure the site run the following commands and follow instructions.
```
cd ~
git clone https://github.com/sadernalwis/os.crimsonlabs.net.git
cd os.crimsonlabs.net

./BUILD.sh
```
### Manual Setup
#### Using Ubuntu
```
curl -sL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
```
#### Using Debian, as root
curl -sL https://deb.nodesource.com/setup_current.x | bash -
apt-get install -y nodejs
To compile and install native addons from npm you may also need to install build tools:

#### use `sudo` on Ubuntu or run this as root on debian
```
sudo apt-get update
apt-get install -y build-essential
sudo apt-get install yarn

```
### How to install:
```
yarn install

```
### How to run:
```
npm run start

```
### How to add a dependency : `<module-name>`
```
yarn add <module-name>
```
### How to update dependencies to the latest version:
```
sudo npm install -g npm-check-updates
ncu -u
npm update
npm install
```
## API Table
### protection(cloak, dagger) ⇒ <code>survival</code>

**Kind**: global functions

| Param | Type | Description |
| --- | --- | --- |
| cloak | <code>object</code> | Privacy gown |
| dagger | <code>object</code> | Security |

