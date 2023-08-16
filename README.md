# Control-Your-PC-Via-Telegram
I decided to write a typescript bot that can control your computer on Windows (beta version)

# Start
For start write this in console:

`npm install`

`tsc`

`npm run build`

`node dist/index.js`

In the same order

Open this link in your browser: `http://localhost:6333`

# AutoStart
If you want the program to start with the start of the computer, then create a shortcut to the `start.bat` file and add it to autorun

## How add file to autorun: 
1. To add a program to startup, Press Windows+R to open the “Run” dialog box.
2. Type “shell:startup” and then hit Enter to open the “Startup” folder.
3. Move the start.bat file shortcut to the opened folder
