cd /d D:\Projects\live-sports-broadcast\web-server\mobile-frontend & call npm run build

@ECHO OFF

SET THEDIR=C:\Apache24\htdocs

Echo Deleting all files from %THEDIR%
DEL "%THEDIR%\*" /F /Q /A

Echo Deleting all folders from %THEDIR%
FOR /F "eol=| delims=" %%I in ('dir "%THEDIR%\*" /AD /B 2^>nul') do rd /Q /S "%THEDIR%\%%I"
@ECHO Folder deleted.

robocopy D:\Projects\live-sports-broadcast\static C:\Apache24\htdocs /COPYALL /E
robocopy D:\Projects\live-sports-broadcast\web-server\mobile-frontend\build C:\Apache24\htdocs /COPYALL /E

net stop Apache2.4
net start Apache2.4
