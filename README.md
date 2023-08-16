# Control-Your-PC-Via-Telegram
I decided to write a typescript bot that can control your computer on Windows (beta version)

# Start

From their official site Install `Node.js LTS version` from their official site: https://nodejs.org/

For start write this in console:

1. `npm install`

2. `tsc`

3. `npm run build`

4. Open `start.bat` file

5. Open this link in your browser: `http://localhost:6333`

_If Windows Defender swears at the `start.bat` file, then compile it through any "Bat To Exe Converter" into an `.exe` file_

_start.bat file content:_ `pm2 start dist/index.js --name ControlPCBotViaTelegram`

# AutoStart
If you want the program to start with the start of the computer

1. Wtire this command in console: `npm i pm2 -g`
2. Create a shortcut to the `start.bat` file and add it to autorun

## How add file to autorun: 
1. To add a program to startup, Press Windows+R to open the “Run” dialog box.
2. Type “shell:startup” and then hit Enter to open the “Startup” folder.
3. Move the start.bat file shortcut to the opened folder
