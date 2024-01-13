cd /d D:\Projects\live-sports-broadcast\web-overlay & call npm run build

@ECHO OFF

SET THEDIR=C:\Apache24\overlay

Echo Deleting all files from %THEDIR%
DEL "%THEDIR%\*" /F /Q /A

Echo Deleting all folders from %THEDIR%
FOR /F "eol=| delims=" %%I in ('dir "%THEDIR%\*" /AD /B 2^>nul') do rd /Q /S "%THEDIR%\%%I"
@ECHO Folder deleted.

robocopy D:\Projects\live-sports-broadcast\web-overlay\build C:\Apache24\overlay /COPYALL /E

net stop Apache2.4
net start Apache2.4
