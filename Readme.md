This npm-cli package sets the wallpaper of the system to the current IPL points table. A sample image available below.
We fetch the data from https://www.iplt20.com/points-table/men/2024.

### Steps to run
* Run `npx ipl-wallpaper` to update your desktop wallpaper manually.

### Steps to set a cron on MAC
* Open terminal and run `crontab -e`.
* Add the following line to the crontab file: `0 8 * * * npx ipl-wallpaper@latest`. This line will run npx ipl-wallpaper@latest every day at 8:00 AM. You can adjust the timing as per your requirement. The five fields represent minute, hour, day of the month, month, and day of the week, respectively.
* Save and exit the editor. Your cron job is now set up.


#### Note 
#### 1. If you don't have internet connection then the table will show 0 for all values.

Here is a sample Desktop background that is generated

![Sample desktop](./Assets/Sample.png)
